# 0006. Le format des niveaux en Markdown

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : proposée, 19 novembre 2026.

## Contexte

L'enseignant écrit les niveaux dans les pages des séances, comme les quiz et les
problèmes de Parsons (US-20). Le format est donc une interface publique.

## Décision

Un niveau est un bloc `<div class="thealivery" data-id="…" markdown>` : une
consigne, un bloc `text` par rue, et la liste des cartes dans un ordre qui
réussit. Les sauts désignent leur cible par une étiquette `{#nom}`. Le script
lit le **HTML produit par Zensical**, pas le Markdown brut.

## Options écartées

- **Un fichier JSON ou YAML par niveau** : plus simple à lire pour le code, mais
  loin de la page et du texte qui entoure le niveau.
- **Un éditeur visuel** : exclu de la première version (US-26).

## Conséquences

- Un niveau invalide est remplacé par un message clair, dans la page.
- Une vérification hors navigateur valide tous les niveaux du site.
- Changer le format demande une migration des pages : il doit rester stable.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
