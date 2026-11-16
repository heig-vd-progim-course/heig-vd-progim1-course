#!/usr/bin/env python3
"""Cartes à imprimer pour l'activité de la séance 06, Des conditions en
quatuor.

Chaque quatuor réunit un énoncé, un diagramme d'activité, un code et la sortie
de ce code. Les diagrammes sont écrits en PlantUML dans `diagrammes/` ; ce
script produit leurs SVG à côté des sources, puis `cartes.html` et le PDF
publié dans `docs/98-equipe-enseignante/materiel/06-conditions-cartes.pdf`.
La mise en page et la coloration du code sont dans `materiel/cartes.py`.

    python3 materiel/06-conditions/generer-cartes.py

Toute sortie écrite ici a été obtenue en exécutant le code avec le JDK 25 du
cours : si vous modifiez un code, réexécutez-le.
"""

import html
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))

from cartes import (  # noqa: E402
    ROOT, card, diagram_body, document, highlight, output_body,
    render_plantuml, statement_body, two_per_page, write,
)

HTML_OUT = HERE / "cartes.html"
PDF_OUT = ROOT / "docs" / "98-equipe-enseignante" / "materiel" / "06-conditions-cartes.pdf"
DIAGRAMS = HERE / "diagrammes"

# Identifiant, énoncé, code, sortie. Le diagramme est `diagrammes/<id>.puml`.
QUARTETS = [
    ("Q01", "Moyenne de 4. Réussi à partir de 4, échoué en dessous.",
     'double average = 4;\nif (average >= 4) {\n    System.out.println("Réussi");\n} else {\n    System.out.println("Échoué");\n}',
     "Réussi"),
    ("Q02", "Moyenne de 4. Réussi seulement au-dessus de 4, échoué sinon.",
     'double average = 4;\nif (average > 4) {\n    System.out.println("Réussi");\n} else {\n    System.out.println("Échoué");\n}',
     "Échoué"),
    ("Q03", "Moyenne de 3.5. Féliciter en cas de réussite, dès 4, puis afficher Fin.",
     'double average = 3.5;\nif (average >= 4) {\n    System.out.println("Bravo");\n}\nSystem.out.println("Fin");',
     "Fin"),
    ("Q04", "Moyenne de 5.2. Excellent dès 5.5, bien dès 5, suffisant dès 4, insuffisant en dessous.",
     'double average = 5.2;\nif (average >= 5.5) {\n    System.out.println("Excellent");\n} else if (average >= 5) {\n    System.out.println("Bien");\n} else if (average >= 4) {\n    System.out.println("Suffisant");\n} else {\n    System.out.println("Insuffisant");\n}',
     "Bien"),
    ("Q05", "Moyenne de 5.2. Tester d'abord « au moins 4 », puis « au moins 5 », puis « au moins 5.5 ».",
     'double average = 5.2;\nif (average >= 4) {\n    System.out.println("Suffisant");\n} else if (average >= 5) {\n    System.out.println("Bien");\n} else if (average >= 5.5) {\n    System.out.println("Excellent");\n} else {\n    System.out.println("Insuffisant");\n}',
     "Suffisant"),
    ("Q06", "Note de 7. Dire si elle est valide : entre 1 et 6, limites comprises.",
     'double grade = 7;\nif ((grade >= 1) && (grade <= 6)) {\n    System.out.println("Note valide");\n} else {\n    System.out.println("Note invalide");\n}',
     "Note invalide"),
    ("Q07", "Note de 7. Accepter toute note d'au moins 1, ou d'au plus 6.",
     'double grade = 7;\nif ((grade >= 1) || (grade <= 6)) {\n    System.out.println("Note valide");\n} else {\n    System.out.println("Note invalide");\n}',
     "Note valide"),
    ("Q08", "Moyenne de 5.5. Deux questions indépendantes : au moins 5 ? Au moins 4 ?",
     'double average = 5.5;\nif (average >= 5) {\n    System.out.println("Bien");\n}\nif (average >= 4) {\n    System.out.println("Suffisant");\n}',
     "Bien\nSuffisant"),
    ("Q09", "Un billet pour 16 ans. Gratuit avant 6 ans, 10 francs avant 16 ans, 20 francs ensuite.",
     'int age = 16;\nif (age < 6) {\n    System.out.println("Gratuit");\n} else if (age < 16) {\n    System.out.println("10 francs");\n} else {\n    System.out.println("20 francs");\n}',
     "20 francs"),
    ("Q10", "Un billet pour 6 ans. Gratuit avant 6 ans, 10 francs avant 16 ans, 20 francs ensuite.",
     'int age = 6;\nif (age < 6) {\n    System.out.println("Gratuit");\n} else if (age < 16) {\n    System.out.println("10 francs");\n} else {\n    System.out.println("20 francs");\n}',
     "10 francs"),
]

REMOVAL_ORDER = "Q10, Q09, Q08, Q03, Q07, Q06, Q05, Q04, Q02, Q01"


def code_body(code):
    """Le code des conditions est plus large que celui des boucles."""
    return f'<pre class="code code-small">{highlight(code)}</pre>'


def solutions_page():
    rows = []
    for quartet_id, statement, code, output in QUARTETS:
        rows.append(
            f"<tr><td>{quartet_id}</td><td>{html.escape(statement)}</td>"
            f'<td><pre class="mini">{highlight(code)}</pre></td>'
            f"<td><code>{html.escape(output).replace(chr(10), '<br>')}</code></td></tr>"
        )
    return f"""
<div class="page portrait solutions">
  <h1>Séance 06 - Des conditions en quatuor</h1>
  <p>Solutions des quatuors, pour l'équipe enseignante et les arbitres.
  {{pages}} pages A4 en tout, à imprimer en couleur, recto seul, puis à couper
  en deux (A5). Les diagrammes de Q09 et Q10 sont identiques : c'est voulu,
  seule la valeur les distingue.</p>
  <p>Ordre de retrait si la salle compte moins de 40 personnes :
  {REMOVAL_ORDER}.</p>
  <table>
    <thead><tr><th>Id</th><th>Énoncé</th><th>Code</th><th>Sortie</th></tr></thead>
    <tbody>{"".join(rows)}</tbody>
  </table>
</div>"""


EXTRA_CSS = """
.code-small { font-size: 19pt; line-height: 1.3; }
.statement { font-size: 30pt; }
.solutions { font-size: 8.5pt; padding: 10mm 12mm; }
.mini { font-size: 6.5pt; }
.diagram { width: 182mm; height: 112mm; flex: none; }
.diagram svg { width: 100% !important; height: 100% !important; }
"""


def main():
    svgs = {q[0]: render_plantuml(DIAGRAMS / f"{q[0].lower()}.puml") for q in QUARTETS}
    statements = [card("statement", q, statement_body(s)) for q, s, _, _ in QUARTETS]
    diagrams = [card("diagram", q, diagram_body(svgs[q])) for q, _, _, _ in QUARTETS]
    codes = [card("code", q, code_body(c)) for q, _, c, _ in QUARTETS]
    outputs = [card("output", q, output_body(o)) for q, _, _, o in QUARTETS]
    pages = [solutions_page()]
    for group in (statements, diagrams, codes, outputs):
        pages += two_per_page(group)
    write(document("Séance 06 - Cartes de l'activité", pages, EXTRA_CSS), HTML_OUT, PDF_OUT)


if __name__ == "__main__":
    main()
