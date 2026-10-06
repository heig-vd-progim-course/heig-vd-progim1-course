#!/usr/bin/env python3
"""Verifie que le contenu des presentations Marp tient dans les diapositives.

Le script fait deux controles independants :

1. Un controle statique : nombre de caracteres et de lignes par diapositive,
   compare a la limite documentee dans les instructions du depot.
2. Un controle par rendu : chaque diapositive est construite en HTML avec le
   theme du depot, mesuree dans Chromium, et signalee si son contenu depasse
   la hauteur ou la largeur disponibles.

Le controle par rendu est une approximation. Il n'utilise pas Marp mais
reconstruit la mise en page a partir de `.marp/theme.css`. Les polices
distantes du theme sont remplacees par des polices locales, ce qui decale
legerement les largeurs. Prendre les resultats comme une alerte a verifier,
pas comme une verite.

Usage :
    python3 check-presentations.py [--png] [chemin/vers/PRESENTATION.md ...]

Sans argument, toutes les presentations de `presentations/` sont verifiees.
Avec `--png`, une image est produite dans `.check-presentations/` pour chaque
diapositive signalee.

Dependances : `markdown` et `playwright` (avec Chromium installe).
"""

from __future__ import annotations

import argparse
import asyncio
import json
import pathlib
import re
import sys

try:
    import markdown
except ImportError:
    sys.exit("Le paquet `markdown` est requis : pip install markdown")

# Limites
MAX_CHARS = 800  # limite documentee dans les instructions du depot
SLIDE_WIDTH = 1280
SLIDE_HEIGHT = 720

# Polices de substitution, les polices du theme etant chargees depuis Internet
FONT_TEMPLATE = """
section, section * {{ font-family: "{sans}", sans-serif !important; }}
section code, section pre, section pre * {{
	font-family: "{mono}", monospace !important;
}}
"""

# Deux polices pour encadrer l'estimation : une large et une etroite.
# Ce qui depasse avec les deux depasse vraiment.
FONTS = {
	"large": ("DejaVu Sans", "DejaVu Sans Mono"),
	"etroite": ("Carlito", "DejaVu Sans Mono"),
}

COMMENT_RE = re.compile(r"<!--(.*?)-->", re.DOTALL)
BG_IMAGE_RE = re.compile(r"!\[bg([^\]]*)\]\[[^\]]*\]|!\[bg([^\]]*)\]\([^)]*\)")
SPLIT_RE = re.compile(r"^(#{1,2}) ", re.MULTILINE)


def strip_front_matter(text: str) -> str:
	"""Retire le front matter YAML et le bloc de directives globales."""
	lines = text.split("\n")
	if lines and lines[0].strip() == "---":
		for i in range(1, len(lines)):
			if lines[i].strip() == "---":
				lines = lines[i + 1 :]
				break
	rest = "\n".join(lines)
	# Le premier commentaire HTML porte les directives globales
	match = COMMENT_RE.search(rest)
	if match and "theme:" in match.group(1):
		rest = rest[: match.start()] + rest[match.end() :]
	return rest


def split_slides(body: str) -> list[str]:
	"""Decoupe sur les titres de niveau 1 et 2 (headingDivider: 2)."""
	positions = [m.start() for m in SPLIT_RE.finditer(body)]
	if not positions:
		return [body]
	slides = []
	for index, start in enumerate(positions):
		end = positions[index + 1] if index + 1 < len(positions) else len(body)
		slides.append(body[start:end].strip())
	return slides


def slide_directives(raw: str) -> dict:
	"""Lit les directives locales et la presence d'une image de fond."""
	directives = {"class": "", "split": 0}
	for comment in COMMENT_RE.findall(raw):
		for line in comment.strip().split("\n"):
			line = line.strip()
			if line.startswith("_class:"):
				directives["class"] = line.split(":", 1)[1].strip()
	for match in BG_IMAGE_RE.finditer(raw):
		options = (match.group(1) or match.group(2) or "").strip()
		side = re.search(r"\b(right|left):(\d+)%", options)
		if side:
			directives["split"] = int(side.group(2))
		elif re.search(r"\b(right|left)\b", options):
			directives["split"] = 50
	return directives


def clean_slide(raw: str) -> str:
	"""Retire les commentaires et les images de fond, qui ne prennent pas de place."""
	text = COMMENT_RE.sub("", raw)
	text = BG_IMAGE_RE.sub("", text)
	return text.strip()


def heading_of(raw: str) -> str:
	for line in raw.split("\n"):
		if line.startswith("#"):
			return line.lstrip("#").strip()[:60]
	return "(sans titre)"


def build_html(slides: list[dict], theme_css: str, font: str = "large") -> str:
	md = markdown.Markdown(
		extensions=["tables", "fenced_code", "attr_list", "sane_lists", "md_in_html"]
	)
	sections = []
	for slide in slides:
		md.reset()
		content = md.convert(slide["markdown"])
		classes = slide["directives"]["class"]
		split = slide["directives"]["split"]
		style = ""
		if split:
			# `bg right:40%` reduit la zone de contenu a 60% de la largeur
			style = f'style="--content-width: {100 - split}%"'
		sections.append(
			f'<section class="{classes}" {style}>'
			f'<header>en-tete</header>'
			f'<div class="content">{content}</div>'
			f'<footer>pied de page</footer>'
			f"</section>"
		)
	return f"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<style>
{theme_css}
{FONT_TEMPLATE.format(sans=FONTS[font][0], mono=FONTS[font][1])}
section {{
	display: flex;
	flex-flow: column nowrap;
	overflow: hidden;
	position: relative;
	margin: 0;
	box-sizing: border-box;
}}
section .content {{
	width: var(--content-width, 100%);
	flex: 0 0 auto;
}}
</style></head><body>
{"".join(sections)}
</body></html>"""


async def measure(html: str, png_dir: pathlib.Path | None, label: str) -> list[dict]:
	from playwright.async_api import async_playwright

	async with async_playwright() as p:
		browser = await p.chromium.launch()
		page = await browser.new_page(
			viewport={"width": SLIDE_WIDTH, "height": SLIDE_HEIGHT}
		)
		await page.set_content(html, wait_until="load")
		results = await page.evaluate(
			"""() => Array.from(document.querySelectorAll('section')).map((s, i) => {
				const c = s.querySelector('.content');
				const style = getComputedStyle(s);
				const padTop = parseFloat(style.paddingTop);
				const padBottom = parseFloat(style.paddingBottom);
				const available = s.clientHeight - padTop - padBottom;
				return {
					index: i,
					contentHeight: Math.round(c.scrollHeight),
					available: Math.round(available),
					overflowY: Math.round(c.scrollHeight - available),
					overflowX: Math.round(c.scrollWidth - c.clientWidth),
				};
			})"""
		)
		if png_dir is not None:
			png_dir.mkdir(parents=True, exist_ok=True)
			for item in results:
				if item["overflowY"] > 0 or item["overflowX"] > 0:
					element = page.locator("section").nth(item["index"])
					await element.screenshot(
						path=str(png_dir / f"{label}-{item['index'] + 1:02d}.png")
					)
		await browser.close()
	return results


def check_file(path: pathlib.Path, theme_css: str, png_dir: pathlib.Path | None):
	raw = path.read_text(encoding="utf-8")
	body = strip_front_matter(raw)
	slides = []
	for chunk in split_slides(body):
		slides.append(
			{
				"raw": chunk,
				"heading": heading_of(chunk),
				"directives": slide_directives(chunk),
				"markdown": clean_slide(chunk),
			}
		)

	label = path.parent.name
	measures = asyncio.run(
		measure(build_html(slides, theme_css, "large"), png_dir, label)
	)
	narrow = asyncio.run(measure(build_html(slides, theme_css, "etroite"), None, label))

	print(f"\n{path} - {len(slides)} diapositives")
	print("-" * 78)

	problems = 0
	for index, slide in enumerate(slides):
		chars = len(slide["markdown"])
		m = measures[index]
		flags = []
		n = narrow[index]
		if m["overflowY"] > 0 and n["overflowY"] > 0:
			flags.append(
				f"DEPASSE DE {n['overflowY']}px EN HAUTEUR"
				f" (jusqu'a {m['overflowY']}px selon la police)"
			)
		elif m["overflowY"] > 0:
			flags.append(
				f"limite : depasse de {m['overflowY']}px avec une police large,"
				f" tient avec une police etroite"
			)
		if m["overflowX"] > 0:
			flags.append(f"deborde de {m['overflowX']}px en largeur")
		# La diapositive de credits est une liste de liens : elle depasse la
		# limite de caracteres sans pour autant deborder.
		if chars > MAX_CHARS and not slide["heading"].lower().startswith("sources"):
			flags.append(f"{chars} caracteres (limite {MAX_CHARS})")
		if flags:
			problems += 1
			print(f"  {index + 1:3d}. {slide['heading']}")
			for flag in flags:
				print(f"       - {flag}")
			marge = m["available"] - m["contentHeight"]
			print(f"       hauteur utilisee {m['contentHeight']}px"
				  f" sur {m['available']}px disponibles (marge {marge}px)")

	if problems == 0:
		print("  Rien a signaler.")
	else:
		print(f"\n  {problems} diapositive(s) a revoir sur {len(slides)}.")

	serre = [
		(i + 1, slides[i]["heading"], m["available"] - m["contentHeight"])
		for i, m in enumerate(measures)
		if 0 <= m["available"] - m["contentHeight"] <= 60 and m["overflowY"] <= 0
	]
	if serre:
		print("\n  Diapositives serrees (moins de 60px de marge) :")
		for number, heading, marge in serre:
			print(f"    {number:3d}. {heading} - {marge}px de marge")

	return problems


def main():
	parser = argparse.ArgumentParser(description=__doc__)
	parser.add_argument("files", nargs="*", help="fichiers PRESENTATION.md a verifier")
	parser.add_argument("--png", action="store_true", help="produire une image par diapositive signalee")
	parser.add_argument("--theme", default=".marp/theme.css", help="chemin du theme Marp")
	parser.add_argument("--json", action="store_true", help="sortie brute en JSON")
	args = parser.parse_args()

	theme_path = pathlib.Path(args.theme)
	if not theme_path.exists():
		sys.exit(f"Theme introuvable : {theme_path}")
	theme_css = theme_path.read_text(encoding="utf-8")
	# Les polices et la coloration syntaxique sont chargees depuis Internet
	theme_css = re.sub(r"@import\s+[\"'][^\"']+[\"'];", "", theme_css)

	if args.files:
		paths = [pathlib.Path(f) for f in args.files]
	else:
		paths = sorted(pathlib.Path("presentations").glob("*/PRESENTATION.md"))

	if not paths:
		sys.exit("Aucune presentation trouvee.")

	png_dir = pathlib.Path(".check-presentations") if args.png else None

	print("Controle des presentations Marp")
	print("Rendu approximatif : polices locales au lieu des polices du theme.")

	total = 0
	for path in paths:
		total += check_file(path, theme_css, png_dir)

	print()
	if total:
		print(f"Total : {total} diapositive(s) a revoir.")
		if png_dir:
			print(f"Images dans {png_dir}/")
		sys.exit(1)
	print("Total : aucune diapositive a revoir.")


if __name__ == "__main__":
	main()
