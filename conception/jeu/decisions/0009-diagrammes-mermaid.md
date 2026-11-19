# 0009. Des diagrammes Mermaid dans la conception

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : proposée, 19 novembre 2026.

## Contexte

Le dépôt dessine ses diagrammes en Mermaid sur le site, et en PlantUML pour les
présentations, les évaluations et le matériel, avec un SVG généré à côté de
chaque source. Les documents de conception, eux, se lisent sur GitHub.

## Décision

Écrire les diagrammes de la conception en **Mermaid**, directement dans le
Markdown.

## Options écartées

- **PlantUML** : une notation UML plus complète, mais un SVG à régénérer et à
  garder synchronisé, et Docker pour le produire.

## Conséquences

- GitHub et VS Code affichent les diagrammes sans rien générer.
- Les diagrammes Mermaid sont un peu moins expressifs en UML : suffisant pour
  les classes, les états et les séquences dont on a besoin.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
