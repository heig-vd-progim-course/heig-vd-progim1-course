#!/usr/bin/env python3
"""Cartes à imprimer pour l'activité de la séance 08, Des tableaux en quatuor.

Chaque quatuor réunit un code, son diagramme d'activité, la sortie de ce code
et une carte Tableau : l'état du tableau au début et à la fin du programme.
Les diagrammes sont écrits en PlantUML dans `diagrammes/` ; ce script produit
leurs SVG à côté des sources, puis `cartes.html` et le PDF publié dans
`docs/98-equipe-enseignante/materiel/08-tableaux-cartes.pdf`. La mise en page
et la coloration du code sont dans `materiel/cartes.py`.

    python3 materiel/08-tableaux-et-lancement-du-mini-projet/generer-cartes.py

Toute sortie et tout état final écrits ici ont été obtenus en exécutant le code
avec le JDK 25 du cours : si vous modifiez un code, réexécutez-le.
"""

import html
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))

from cartes import (  # noqa: E402
    ROOT, array_body, card, code_body, diagram_body, document, highlight,
    output_body, render_plantuml, scale_svgs, one_per_page, write,
)

HTML_OUT = HERE / "cartes.html"
PDF_OUT = ROOT / "docs" / "98-equipe-enseignante" / "materiel" / "08-tableaux-cartes.pdf"
DIAGRAMS = HERE / "diagrammes"

START = [3, 8, 2, 7, 5]
DECLARATION = "int[] values = {3, 8, 2, 7, 5};\n"
CRASH = "Exception in thread \"main\"\njava.lang.\nArrayIndexOutOfBoundsException:\nIndex 5 out of bounds for length 5"

# Identifiant, code (sans la déclaration), sortie, état du tableau à la fin.
# Pour A04, l'état final est celui du tableau au moment où le programme
# s'arrête : les quatre premiers tours ont eu lieu.
QUATUORS = [
    ("A01", "for (int i = 0; i < values.length; i++) {\n    values[i] = values[i] * 2;\n}\nSystem.out.println(values[0]);",
     "6", [6, 16, 4, 14, 10]),
    ("A02", "for (int i = 1; i < values.length; i++) {\n    values[i] = values[i] * 2;\n}\nSystem.out.println(values[0]);",
     "3", [3, 16, 4, 14, 10]),
    ("A03", "for (int i = 0; i < values.length - 1; i++) {\n    values[i] = values[i + 1];\n}\nSystem.out.println(values[4]);",
     "5", [8, 2, 7, 5, 5]),
    ("A04", "for (int i = 0; i < values.length; i++) {\n    values[i] = values[i + 1];\n}\nSystem.out.println(values[4]);",
     CRASH, [8, 2, 7, 5, 5]),
    ("A05", "for (int i = values.length - 1; i > 0; i--) {\n    values[i] = values[i - 1];\n}\nSystem.out.println(values[0]);",
     "3", [3, 3, 8, 2, 7]),
    ("A06", "for (int i = 1; i < values.length; i++) {\n    values[i] = values[i - 1];\n}\nSystem.out.println(values[0]);",
     "3", [3, 3, 3, 3, 3]),
    ("A07", "int count = 0;\nfor (int i = 0; i < values.length; i++) {\n    if (values[i] > 4) {\n        values[i] = 0;\n        count++;\n    }\n}\nSystem.out.println(count);",
     "3", [3, 0, 2, 0, 0]),
    ("A08", "int count = 0;\nfor (int i = 0; i < values.length; i++) {\n    if (values[i] < 4) {\n        values[i] = 0;\n        count++;\n    }\n}\nSystem.out.println(count);",
     "2", [0, 8, 0, 7, 5]),
    ("A09", "int temp = values[0];\nvalues[0] = values[4];\nvalues[4] = temp;\nSystem.out.println(values[0]);",
     "5", [5, 8, 2, 7, 3]),
    ("A10", "values[0] = values[4];\nvalues[4] = values[0];\nSystem.out.println(values[0]);",
     "5", [5, 8, 2, 7, 5]),
    ("A11", "int sum = 0;\nfor (int i = 0; i < values.length; i += 2) {\n    sum = sum + values[i];\n}\nSystem.out.println(sum);",
     "10", [3, 8, 2, 7, 5]),
    ("A12", "for (int i = 0; i < values.length; i++) {\n    values[i] = values[i] + i;\n}\nSystem.out.println(values[4]);",
     "9", [3, 9, 4, 10, 9]),
]

REMOVAL_ORDER = "A12, A11, A08, A07, A02, A01, A06, A05, A10, A09, A04, A03"


def solutions_page():
    rows = []
    for quatuor_id, code, output, end in QUATUORS:
        shown = "ArrayIndexOutOfBoundsException" if output == CRASH else output
        rows.append(
            f"<tr><td>{quatuor_id}</td>"
            f'<td><pre class="mini">{highlight(code)}</pre></td>'
            f"<td><code>{html.escape(shown)}</code></td>"
            f"<td><code>{html.escape(str(end))}</code></td></tr>"
        )
    return f"""
<div class="page portrait solutions">
  <h1>Séance 08 - Des tableaux en quatuor</h1>
  <p>Solutions des quatuors, pour l'équipe enseignante et les arbitres.
  {{pages}} pages A4 en tout, à imprimer en couleur, recto seul : une carte
  par page, en paysage. Tous les codes commencent par
  <code>int[] values = {{3, 8, 2, 7, 5}};</code></p>
  <p>Les paires se ressemblent exprès : A03 et A04 ont le même tableau à la
  fin, seule la sortie les distingue ; A05 et A06 affichent tous deux 3,
  seul le tableau les distingue ; A09 et A10 aussi. Pour A04, la carte
  Tableau montre l'état au moment où le programme s'arrête, et la carte
  Sortie la première ligne du message d'erreur, coupée pour tenir.</p>
  <p>Ordre de retrait si la salle compte moins de 48 personnes : {REMOVAL_ORDER}.
  Retirer les paires ensemble : un jumeau sans l'autre perd son intérêt.</p>
  <table>
    <thead><tr><th>Quatuor</th><th>Code</th><th>Sortie</th><th>Tableau à la fin</th></tr></thead>
    <tbody>{"".join(rows)}</tbody>
  </table>
</div>"""


EXTRA_CSS = """
.landscape > .card .code-small { font-size: 26pt; line-height: 1.3; }
.landscape > .card .console-small { font-size: 26pt; }
"""


def main():
    svgs = {q[0]: render_plantuml(DIAGRAMS / f"{q[0].lower()}.puml") for q in QUATUORS}
    svgs = scale_svgs(svgs, 262, 168)
    codes = [
        card("code", q, f'<pre class="code code-small">{highlight(DECLARATION + c)}</pre>')
        for q, c, _, _ in QUATUORS
    ]
    diagrams = [card("diagram", q, diagram_body(svgs[q])) for q, _, _, _ in QUATUORS]
    outputs = [
        card("output", q, output_body(o).replace('class="console"', 'class="console console-small"')
             if o == CRASH else output_body(o))
        for q, _, o, _ in QUATUORS
    ]
    arrays = [
        card("array", q, array_body("values", START, end), show_footer=False)
        for q, _, _, end in QUATUORS
    ]
    pages = [solutions_page()]
    for group in (codes, diagrams, outputs, arrays):
        pages += one_per_page(group)
    write(document("Séance 08 - Cartes de l'activité", pages, EXTRA_CSS), HTML_OUT, PDF_OUT)


if __name__ == "__main__":
    main()
