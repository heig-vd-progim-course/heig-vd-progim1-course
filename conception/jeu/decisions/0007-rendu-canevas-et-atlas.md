# 0007. Un canevas et un atlas de tuiles

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : acceptée, 19 novembre 2026.

## Contexte

Le plateau est en pixel art de 16 pixels, avec des rues de trois tuiles, des
coins intérieurs et un décor tiré au hasard. Les images de référence sont
produites par `niveaux/generer.py`.

## Décision

Dessiner le plateau dans un **canevas**, à partir d'un **atlas** qui ne contient
que les tuiles utilisées. Le rendu reprend les règles de `niveaux/generer.py`,
avec un hasard **reproductible** initialisé par l'identifiant du niveau.

## Options écartées

- **Des images précalculées par niveau** : elles demanderaient de relancer
  Python à chaque niveau écrit ou modifié par l'enseignant.
- **Du SVG** : très bien pour des icônes, lourd pour des centaines de tuiles.
- **Le pack entier** (89 Mo) : inutile, l'atlas pèse quelques dizaines de Ko.

## Conséquences

- Un niveau écrit en Markdown s'affiche tout de suite, sans étape de
  construction.
- Le rendu TypeScript doit rester fidèle au script Python : un test compare les
  images.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
