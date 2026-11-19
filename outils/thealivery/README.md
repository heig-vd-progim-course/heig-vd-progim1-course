# Thealivery

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Le code du jeu d'apprentissage Thealivery. La conception (besoins, maquettes,
architecture, décisions) est dans [`conception/jeu/`](../../conception/jeu/).

Seul le résultat construit est publié : `docs/javascripts/thealivery.js`,
`docs/javascripts/thealivery-sandbox.js`, `docs/stylesheets/thealivery.css`
(écrit à la main) et `docs/vendor/thealivery/`. Le workflow du site n'a pas
besoin de Node.

## Travailler sur le jeu

Il faut Node 20.19 ou plus récent.

```sh
npm ci                 # installe les versions figées
npm run check          # types, lint, Prettier, tests et couverture
npm run build          # reconstruit les deux fichiers de docs/javascripts/
```

Après toute modification de `src/`, relancer `npm run build` et versionner les
fichiers construits avec les sources.

## Images et sons

Ils viennent du pack
[Ninja Adventure](https://pixel-boy.itch.io/ninja-adventure-asset-pack)
(Pixel-boy et AAA, CC0), qui n'est pas dans le dépôt. Il faut Pillow et ffmpeg.

```sh
python3 atlas/construire-atlas.py "<dossier Ninja Adventure - Asset Pack>"
npm run compare-rendu -- "<dossier Ninja Adventure - Asset Pack>"
```

Le second script vérifie que le plateau du jeu est identique, au pixel près, aux
images de `conception/jeu/niveaux/generer.py`.

## Écrire un niveau

Le format est décrit dans
[`conception/jeu/05-architecture.md`](../../conception/jeu/05-architecture.md).
Le bac à sable du site permet de l'essayer sans rien construire.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
