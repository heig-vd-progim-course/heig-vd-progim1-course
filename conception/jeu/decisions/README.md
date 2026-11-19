# Décisions d'architecture

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Une décision par fichier, au format ADR (Architecture Decision Record) : le
contexte, la décision, les options écartées et les conséquences. Une décision
n'est jamais modifiée après coup : si elle change, une nouvelle ADR la remplace
et le dit.

| N°   | Décision                                                                                 | Statut   |
| :--- | :--------------------------------------------------------------------------------------- | :------- |
| 0001 | [Construire notre propre jeu](0001-construire-notre-propre-jeu.md)                       | Proposée |
| 0002 | [TypeScript, esbuild et un fichier figé](0002-typescript-esbuild-fichier-fige.md)        | Proposée |
| 0003 | [Un cœur pur, des adaptateurs autour](0003-coeur-pur-et-adaptateurs.md)                  | Proposée |
| 0004 | [Des sauts plutôt que des cartes imbriquées](0004-sauts-plutot-que-cartes-imbriquees.md) | Proposée |
| 0005 | [Une exécution calculée, puis animée](0005-execution-precalculee.md)                     | Proposée |
| 0006 | [Le format des niveaux en Markdown](0006-format-des-niveaux-en-markdown.md)              | Proposée |
| 0007 | [Un canevas et un atlas de tuiles](0007-rendu-canevas-et-atlas.md)                       | Proposée |
| 0008 | [Le pixel art de Ninja Adventure](0008-pixel-art-ninja-adventure.md)                     | Proposée |
| 0009 | [Des diagrammes Mermaid dans la conception](0009-diagrammes-mermaid.md)                  | Proposée |

## Modèle

```markdown
# NNNN. Titre

**Statut** : proposée, acceptée, ou remplacée par NNNN.

## Contexte

## Décision

## Options écartées

## Conséquences
```

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
