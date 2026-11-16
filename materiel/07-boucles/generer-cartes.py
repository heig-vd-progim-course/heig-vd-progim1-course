#!/usr/bin/env python3
"""Cartes à imprimer pour l'activité de la séance 07, Des boucles en chair et
en os.

Produit `cartes.html` à côté de ce script, puis le PDF publié dans
`docs/98-equipe-enseignante/materiel/07-boucles-cartes.pdf`, avec Chrome ou
Chromium en mode headless. La mise en page et la coloration du code sont dans
`materiel/cartes.py`.

    python3 materiel/07-boucles/generer-cartes.py

Toute sortie écrite ici a été obtenue en exécutant le code avec le JDK 25 du
cours : si vous modifiez un code, réexécutez-le.
"""

import html
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))

from cartes import (  # noqa: E402
    BAND_OUTPUT, ROOT, card, code_body, document, highlight, output_body,
    statement_body, one_per_page, write,
)

HTML_OUT = HERE / "cartes.html"
PDF_OUT = ROOT / "docs" / "98-equipe-enseignante" / "materiel" / "07-boucles-cartes.pdf"

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
  Pages 2 à 37 : cartes de trios, une par page.
  Pages 38 à 45 : cartes de la boucle jouée.</p>
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


EXTRA_CSS = """
.played { display: flex; flex-direction: column; align-items: center; justify-content: center; }
.played-line { font-size: 54pt; }
.played-variable { font-size: 160pt; }
.played-role { font-size: 20pt; color: #777; margin-top: 14mm; }
"""


def main():
    statements = [card("statement", t, statement_body(s)) for t, s, _, _ in TRIOS]
    codes = [card("code", t, code_body(c)) for t, _, c, _ in TRIOS]
    outputs = [card("output", t, output_body(o)) for t, _, _, o in TRIOS]
    pages = [solutions_page()]
    pages += one_per_page(statements) + one_per_page(codes) + one_per_page(outputs)
    pages += played_pages()
    write(document("Séance 07 - Cartes de l'activité", pages, EXTRA_CSS), HTML_OUT, PDF_OUT)


if __name__ == "__main__":
    main()
