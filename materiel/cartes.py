"""Outils communs aux cartes d'activité à imprimer.

Chaque séance qui a des cartes a son propre script dans
`materiel/NN-nom-de-la-seance/generer-cartes.py`. Il décrit ses cartes et
s'appuie sur ce module pour la coloration du code, la mise en page, les
diagrammes PlantUML et la production du PDF.

Les couleurs du code reprennent la coloration syntaxique d'IntelliJ IDEA,
thème clair.
"""

import html
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Couleurs d'IntelliJ IDEA, thème clair
COLOR_KEYWORD = "#0033B3"
COLOR_NUMBER = "#1750EB"
COLOR_STRING = "#067D17"
COLOR_METHOD = "#00627A"
COLOR_FIELD = "#871094"
COLOR_TEXT = "#080808"

# Bandeaux des sortes de cartes
BAND_STATEMENT = COLOR_STRING  # du texte en français, comme une chaîne
BAND_CODE = COLOR_KEYWORD  # la couleur des mots-clés
BAND_OUTPUT = "#3C3F41"  # la console
BAND_DIAGRAM = COLOR_FIELD  # une quatrième couleur de l'éditeur

KINDS = {
    "statement": ("Énoncé", BAND_STATEMENT),
    "code": ("Code", BAND_CODE),
    "output": ("Sortie", BAND_OUTPUT),
    "diagram": ("Diagramme", BAND_DIAGRAM),
}

KEYWORDS = {
    "int", "double", "boolean", "while", "for", "do", "if", "else", "return",
    "public", "static", "void", "class", "new", "true", "false", "switch",
    "case", "default",
}

TOKEN = re.compile(
    r'(?P<string>"[^"]*")|(?P<number>\b\d+(?:\.\d+)?\b)'
    r"|(?P<word>[A-Za-z_]\w*)|(?P<space>\s+)|(?P<other>.)"
)

PLANTUML_DOCKER_IMAGE = "plantuml/plantuml:1.2026"


def highlight(code):
    """Colore une ligne ou un bloc de Java comme IntelliJ, thème clair."""
    out = []
    tokens = list(TOKEN.finditer(code))
    for index, match in enumerate(tokens):
        text = html.escape(match.group(0))
        kind = match.lastgroup
        if kind == "string":
            out.append(f'<span style="color:{COLOR_STRING}">{text}</span>')
        elif kind == "number":
            out.append(f'<span style="color:{COLOR_NUMBER}">{text}</span>')
        elif kind == "word":
            word = match.group(0)
            following = tokens[index + 1].group(0) if index + 1 < len(tokens) else ""
            previous = tokens[index - 1].group(0) if index > 0 else ""
            if word in KEYWORDS:
                out.append(f'<span style="color:{COLOR_KEYWORD}">{text}</span>')
            elif following == "(":
                out.append(f'<span style="color:{COLOR_METHOD}">{text}</span>')
            elif word == "out" and previous == ".":
                out.append(
                    f'<span style="color:{COLOR_FIELD};font-style:italic">{text}</span>'
                )
            else:
                out.append(text)
        else:
            out.append(text)
    return "".join(out)


def card(kind, card_id, body, show_footer=True):
    label, color = KINDS[kind]
    footer = f"<footer>{card_id}</footer>" if show_footer else ""
    return f"""
<section class="card card-{kind}">
  <header style="background:{color}">{label}</header>
  <div class="card-body">{body}</div>
  {footer}
</section>"""


def statement_body(text):
    return f'<p class="statement">{html.escape(text)}</p>'


def code_body(code):
    return f'<pre class="code">{highlight(code)}</pre>'


def output_body(output):
    if output == "":
        content = '<span class="empty">&nbsp;</span>'
    else:
        content = html.escape(output)
    return f'<pre class="console">{content}</pre>'


def diagram_body(svg):
    return f'<div class="diagram">{svg}</div>'


def one_per_page(cards):
    """Une carte par page, en A4 paysage : grande, lisible du fond de la salle."""
    return [f'<div class="page landscape">{card_html}</div>' for card_html in cards]


SVG_SIZE = re.compile(r'viewBox="0 0 (?P<w>[\d.]+) (?P<h>[\d.]+)"')


def scale_svgs(svgs, max_width_mm, max_height_mm):
    """Met tous les diagrammes à la même échelle, sans les déformer.

    L'échelle est celle qui fait tenir le plus grand diagramme dans la zone
    donnée. Les autres sont plus petits, mais leur texte a la même taille.
    PlantUML écrit `preserveAspectRatio="none"` et une taille en pixels :
    on remplace les deux.
    """
    sizes = {}
    for key, svg in svgs.items():
        match = SVG_SIZE.search(svg)
        sizes[key] = (float(match["w"]), float(match["h"]))
    scale = min(
        min(max_width_mm / width, max_height_mm / height)
        for width, height in sizes.values()
    )
    scaled = {}
    for key, svg in svgs.items():
        width, height = sizes[key]
        root = re.match(r"<svg[^>]*>", svg).group(0)
        new_root = re.sub(r'\s(style|width|height|preserveAspectRatio)="[^"]*"', "", root)
        new_root = new_root.replace(
            "<svg",
            f'<svg width="{width * scale:.1f}mm" height="{height * scale:.1f}mm" '
            'preserveAspectRatio="xMidYMid meet"',
            1,
        )
        scaled[key] = new_root + svg[len(root):]
    return scaled


def render_plantuml(puml):
    """Produit le SVG d'un diagramme PlantUML, à côté de sa source, et le rend.

    Utilise `/opt/plantuml.jar` s'il existe (dev container), sinon l'image
    Docker du dépôt, comme `generate-diagrams.sh`.
    """
    puml = Path(puml).resolve()
    if Path("/opt/plantuml.jar").exists():
        command = ["java", "-jar", "/opt/plantuml.jar", "-tsvg", str(puml)]
    else:
        command = [
            "docker", "run", "--rm",
            f"--volume={puml.parent}:/data",
            "--user", f"{_uid()}:{_gid()}",
            "--env", "_JAVA_OPTIONS=-Duser.home=/tmp",
            PLANTUML_DOCKER_IMAGE, "-tsvg", f"/data/{puml.name}",
        ]
    subprocess.run(command, check=True, stdout=subprocess.DEVNULL)
    svg = puml.with_suffix(".svg").read_text(encoding="utf-8")
    # Le prologue XML n'a pas sa place au milieu d'une page HTML
    return re.sub(r"^<\?xml[^>]*\?>", "", svg).strip()


def _uid():
    import os
    return os.getuid()


def _gid():
    import os
    return os.getgid()


BASE_CSS = f"""
@page {{ size: A4 portrait; margin: 0; }}
@page landscape {{ size: A4 landscape; margin: 0; }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; font-family: "DejaVu Sans", Arial, sans-serif; color: {COLOR_TEXT}; }}
.page {{ break-after: page; overflow: hidden; }}
.page:last-child {{ break-after: auto; }}
.portrait {{ width: 210mm; height: 297mm; }}
.landscape {{ page: landscape; width: 297mm; height: 210mm; }}
.card {{
  position: relative; width: 210mm; height: 148.5mm;
  border-bottom: 0.3mm dashed #999; display: flex; flex-direction: column;
}}
.card:last-child {{ border-bottom: none; }}
.card header {{
  color: white; font-size: 22pt; font-weight: bold; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 4mm 10mm;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}}
.card-body {{ flex: 1; display: flex; align-items: center; justify-content: center; padding: 6mm 14mm; }}
.card footer {{ position: absolute; right: 6mm; bottom: 4mm; font-size: 8pt; color: #bbb; }}
.statement {{ font-size: 34pt; line-height: 1.25; text-align: center; margin: 0; }}
pre {{ font-family: "DejaVu Sans Mono", "JetBrains Mono", monospace; margin: 0; }}
.code {{ font-size: 25pt; line-height: 1.35; }}
.console {{
  font-size: 28pt; line-height: 1.15; background: #F2F2F2; border: 0.5mm solid #CCC;
  padding: 4mm 18mm; min-width: 70mm; min-height: 30mm; text-align: left;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}}
.diagram {{ display: flex; align-items: center; justify-content: center; }}
.landscape > .card {{ width: 297mm; height: 210mm; border-bottom: none; }}
.landscape > .card header {{ font-size: 26pt; padding: 5mm 12mm; }}
.landscape > .card footer {{ font-size: 10pt; right: 8mm; bottom: 6mm; }}
.landscape > .card .card-body {{ padding: 8mm 16mm; }}
.landscape > .card .statement {{ font-size: 46pt; }}
.landscape > .card .code {{ font-size: 32pt; }}
.landscape > .card .console {{ font-size: 40pt; padding: 6mm 24mm; min-width: 100mm; min-height: 40mm; }}
.solutions {{ padding: 14mm 14mm; font-size: 9.5pt; }}
.solutions h1 {{ font-size: 15pt; margin: 0 0 3mm; }}
.solutions p {{ margin: 0 0 3mm; }}
.solutions table {{ border-collapse: collapse; width: 100%; }}
.solutions th, .solutions td {{ border: 0.2mm solid #999; padding: 1.2mm 2mm; vertical-align: top; text-align: left; }}
.mini {{ font-size: 7.5pt; line-height: 1.2; }}
"""


def document(title, pages, extra_css=""):
    body = "".join(pages).replace("{pages}", str(len(pages)))
    return f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>{html.escape(title)}</title>
<style>{BASE_CSS}{extra_css}</style>
</head>
<body>{body}</body>
</html>
"""


def find_chrome():
    for name in ("google-chrome", "chromium", "chromium-browser", "google-chrome-stable"):
        path = shutil.which(name)
        if path:
            return path
    return None


def write(html_text, html_out, pdf_out):
    """Écrit le HTML, puis le PDF avec Chrome ou Chromium en mode headless."""
    html_out = Path(html_out)
    pdf_out = Path(pdf_out)
    html_out.write_text(html_text, encoding="utf-8")
    print(f"HTML : {html_out.relative_to(ROOT)}")

    chrome = find_chrome()
    if chrome is None:
        print("Chrome introuvable : ouvrez le HTML et imprimez-le en PDF.")
        return

    pdf_out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            chrome, "--headless", "--disable-gpu", "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_out}", html_out.as_uri(),
        ],
        check=True,
        stderr=subprocess.DEVNULL,
    )
    print(f"PDF : {pdf_out.relative_to(ROOT)}")
