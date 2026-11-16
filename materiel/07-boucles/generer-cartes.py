#!/usr/bin/env python3
"""Cartes à imprimer pour l'activité de la séance 07, Des boucles en chair et
en os.

Produit `cartes.html` à côté de ce script, puis le PDF publié dans
`docs/98-equipe-enseignante/materiel/07-boucles-cartes.pdf`, avec Chrome ou
Chromium en mode headless.

    python3 materiel/07-boucles/generer-cartes.py

Les couleurs du code reprennent la coloration syntaxique d'IntelliJ IDEA, thème
clair. Toute sortie écrite ici a été obtenue en exécutant le code avec le JDK
25 du cours : si vous modifiez un code, réexécutez-le.
"""

import html
import re
import shutil
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
HTML_OUT = HERE / "cartes.html"
PDF_OUT = ROOT / "docs" / "98-equipe-enseignante" / "materiel" / "07-boucles-cartes.pdf"

# Couleurs d'IntelliJ IDEA, thème clair
COLOR_KEYWORD = "#0033B3"
COLOR_NUMBER = "#1750EB"
COLOR_STRING = "#067D17"
COLOR_METHOD = "#00627A"
COLOR_FIELD = "#871094"
COLOR_TEXT = "#080808"

# Bandeaux des trois sortes de cartes
BAND_STATEMENT = COLOR_STRING  # du texte en français, comme une chaîne
BAND_CODE = COLOR_KEYWORD  # la couleur des mots-clés
BAND_OUTPUT = "#3C3F41"  # la console

TRIOS = [
    ("T01", "Afficher les nombres de 0 à 5",
     "int i = 0;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
     "0\n1\n2\n3\n4\n5"),
    ("T02", "Afficher les nombres de 0 à 4",
     "int i = 0;\nwhile (i < 5) {\n    System.out.println(i);\n    i++;\n}",
     "0\n1\n2\n3\n4"),
    ("T03", "Afficher les nombres de 1 à 5",
     "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
     "1\n2\n3\n4\n5"),
    ("T04", "Afficher les nombres de 1 à 6",
     "int i = 0;\nwhile (i <= 5) {\n    i++;\n    System.out.println(i);\n}",
     "1\n2\n3\n4\n5\n6"),
    ("T05", "Compter à rebours de 5 à 1",
     "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
     "5\n4\n3\n2\n1"),
    ("T06", "Compter à rebours de 5 à 0",
     "int i = 5;\nwhile (i >= 0) {\n    System.out.println(i);\n    i--;\n}",
     "5\n4\n3\n2\n1\n0"),
    ("T07", "Afficher les nombres pairs de 0 à 8",
     "int i = 0;\nwhile (i <= 8) {\n    System.out.println(i);\n    i += 2;\n}",
     "0\n2\n4\n6\n8"),
    ("T08", "Afficher les nombres impairs de 1 à 9",
     "int i = 1;\nwhile (i <= 9) {\n    System.out.println(i);\n    i += 2;\n}",
     "1\n3\n5\n7\n9"),
    ("T09", "Afficher les puissances de 2 jusqu'à 16",
     "int i = 1;\nwhile (i <= 16) {\n    System.out.println(i);\n    i = i * 2;\n}",
     "1\n2\n4\n8\n16"),
    ("T10", "Afficher 0, encore et encore, sans jamais s'arrêter",
     "int i = 0;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
     "0\n0\n0\n0\n0\n0\n..."),
    ("T11", "Ne rien afficher du tout",
     "int i = 10;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
     ""),
    ("T12", "Additionner 1, 2, 3 et 4",
     "int sum = 0;\nint i = 1;\nwhile (i <= 4) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);",
     "10"),
]

# Le programme joué devant la classe : une ligne par personne
PLAYED = [
    ("int i = 0;", "Situation initiale"),
    ("while (i <= 2) {", "Condition"),
    ("System.out.println(i);", "Corps"),
    ("i++;", "Mise à jour"),
    ("}", "Retour à la condition"),
    ('System.out.println("Fin");', "Après la boucle"),
]

KEYWORDS = {
    "int", "double", "boolean", "while", "for", "do", "if", "else", "return",
    "public", "static", "void", "class", "new", "true", "false",
}

TOKEN = re.compile(
    r'(?P<string>"[^"]*")|(?P<number>\b\d+(?:\.\d+)?\b)'
    r"|(?P<word>[A-Za-z_]\w*)|(?P<space>\s+)|(?P<other>.)"
)


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


def card(kind, trio_id, body):
    labels = {
        "statement": ("Énoncé", BAND_STATEMENT),
        "code": ("Code", BAND_CODE),
        "output": ("Sortie", BAND_OUTPUT),
    }
    label, color = labels[kind]
    return f"""
<section class="card card-{kind}">
  <header style="background:{color}">{label}</header>
  <div class="card-body">{body}</div>
  <footer>{trio_id}</footer>
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


def two_per_page(cards):
    pages = []
    for start in range(0, len(cards), 2):
        pair = "".join(cards[start:start + 2])
        pages.append(f'<div class="page portrait">{pair}</div>')
    return pages


def solutions_page():
    rows = []
    for trio_id, statement, code, output in TRIOS:
        shown = output.replace("\n", " ") if output else "(rien)"
        rows.append(
            f"<tr><td>{trio_id}</td><td>{html.escape(statement)}</td>"
            f'<td><pre class="mini">{highlight(code)}</pre></td>'
            f"<td><code>{html.escape(shown)}</code></td></tr>"
        )
    return f"""
<div class="page portrait solutions">
  <h1>Séance 07 - Des boucles en chair et en os</h1>
  <p>Solutions des trios, pour l'équipe enseignante et les arbitres.
  {{pages}} pages A4 en tout, à imprimer en couleur, recto seul.
  Pages 2 à 19 : cartes de trios, à couper en deux (A5).
  Pages 20 à 27 : cartes de la boucle jouée, en A4 paysage.</p>
  <p>Ordre de retrait si la salle compte moins de 36 personnes :
  T09, T08, T07, T12, T06, T05, T11, T10, T04, T03, T02, T01.</p>
  <table>
    <thead><tr><th>Trio</th><th>Énoncé</th><th>Code</th><th>Sortie</th></tr></thead>
    <tbody>{"".join(rows)}</tbody>
  </table>
</div>"""


def played_pages():
    pages = []
    for line, role in PLAYED:
        pages.append(f"""
<div class="page landscape played">
  <pre class="played-line">{highlight(line)}</pre>
  <p class="played-role">{html.escape(role)}</p>
</div>""")
    pages.append("""
<div class="page landscape played">
  <pre class="played-line played-variable"><span style="color:#080808">i</span></pre>
  <p class="played-role">La variable : vous seule ou vous seul changez sa valeur</p>
</div>""")
    pages.append(f"""
<div class="page landscape played">
  <pre class="played-line" style="color:{BAND_OUTPUT}">Console</pre>
  <p class="played-role">Vous écrivez au tableau ce qu'on vous dicte, rien d'autre</p>
</div>""")
    return pages


CSS = f"""
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
.solutions {{ padding: 14mm 14mm; font-size: 9.5pt; }}
.solutions h1 {{ font-size: 15pt; margin: 0 0 3mm; }}
.solutions p {{ margin: 0 0 3mm; }}
.solutions table {{ border-collapse: collapse; width: 100%; }}
.solutions th, .solutions td {{ border: 0.2mm solid #999; padding: 1.2mm 2mm; vertical-align: top; text-align: left; }}
.mini {{ font-size: 7.5pt; line-height: 1.2; }}
.played {{ display: flex; flex-direction: column; align-items: center; justify-content: center; }}
.played-line {{ font-size: 54pt; }}
.played-variable {{ font-size: 160pt; }}
.played-role {{ font-size: 20pt; color: #777; margin-top: 14mm; }}
"""


def build_html():
    statements = [card("statement", t, statement_body(s)) for t, s, _, _ in TRIOS]
    codes = [card("code", t, code_body(c)) for t, _, c, _ in TRIOS]
    outputs = [card("output", t, output_body(o)) for t, _, _, o in TRIOS]
    pages = [solutions_page()]
    pages += two_per_page(statements) + two_per_page(codes) + two_per_page(outputs)
    pages += played_pages()
    body = "".join(pages).replace("{pages}", str(len(pages)))
    return f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Séance 07 - Cartes de l'activité</title>
<style>{CSS}</style>
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


def main():
    HTML_OUT.write_text(build_html(), encoding="utf-8")
    print(f"HTML : {HTML_OUT.relative_to(ROOT)}")

    chrome = find_chrome()
    if chrome is None:
        print("Chrome introuvable : ouvrez le HTML et imprimez-le en PDF.")
        return

    PDF_OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            chrome, "--headless", "--disable-gpu", "--no-pdf-header-footer",
            f"--print-to-pdf={PDF_OUT}", HTML_OUT.as_uri(),
        ],
        check=True,
        stderr=subprocess.DEVNULL,
    )
    print(f"PDF : {PDF_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
