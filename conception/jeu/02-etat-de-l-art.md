# État de l'art

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Ce qui existe déjà, en jeux comme en recherche et en bibliothèques, et ce que
nous en retenons. Le but : ne pas réinventer la roue, et savoir précisément ce
que notre jeu apporte de plus.

## Les jeux et environnements existants

Un robot sur une grille pour apprendre à programmer est une idée vieille de 45
ans, et éprouvée.

| Nom                     | Depuis | Licence                     | Ce qui nous intéresse                                                        |
| :---------------------- | -----: | :-------------------------- | :--------------------------------------------------------------------------- |
| Karel le robot          |   1981 | Plusieurs versions          | Le modèle d'origine : un robot aux coins des rues d'une grille               |
| Karel J. Robot          |      - | -                           | La version Java de Karel                                                     |
| Reeborg's World         |   2004 | Code sur GitHub             | Héritier de Karel, dans le navigateur, Python et JavaScript, avec Blockly    |
| Blockly Games, « Maze » |   2012 | Apache 2.0                  | Labyrinthe en blocs ; Blockly est passé à la Raspberry Pi Foundation en 2025 |
| Rapid Router (Ocado)    |   2015 | AGPL (code), images exclues | 109 niveaux, des blocs vers du vrai Python : `v.move_forwards()`             |
| Lightbot                |      - | Commercial                  | Les fonctions (« procédures ») apparaissent comme une nécessité              |
| Code.org, CodeHS        |      - | Plateformes hébergées       | Parcours très guidés, Karel en JavaScript chez CodeHS                        |
| Brilliant               |      - | Commercial                  | Le format qui a inspiré ce projet ; détails du cours non vérifiés            |

### Ce que nous en retenons

- **Le concept fonctionne**, et il est compris tout de suite : un robot, une
  grille, un but.
- **Lightbot et Brilliant sont les plus proches de notre forme** : des icônes,
  sans syntaxe. Lightbot montre aussi une bonne façon d'introduire les fonctions
  : le niveau est trop long pour la place disponible, et la fonction devient le
  seul moyen de le finir. Tous deux sont commerciaux et fermés.
- **Rapid Router** mène des blocs vers du vrai Python. C'est une application
  Django, sous AGPL : rien n'est réutilisable tel quel dans un site statique.
- **Aucun ne combine** ce dont nous avons besoin : des **problèmes de Parsons**
  en icônes, intégrés à des **pages Zensical**, en **français**, écrits par
  l'enseignant en **Markdown**, et alignés sur la **progression de ProgIM1**.

## La recherche

### Les problèmes de Parsons

Le groupe de travail ITiCSE 2022 a passé en revue plus de mille articles
(Ericson, Denny, Prather et coll.). En résumé :

- les problèmes de Parsons donnent des **gains d'apprentissage équivalents** à
  l'écriture de code, en **moins de temps**, avec une **charge cognitive plus
  faible** ;
- les personnes les trouvent engageants, et plus abordables que la page blanche.

Des travaux plus récents précisent trois variantes utiles pour nous :

- **Les distracteurs** (lignes pièges à ne pas utiliser) : environ 10 points de
  plus au test immédiat comme au test différé, dans une étude de 2024. Ils
  forcent à lire chaque ligne au lieu de deviner.
- **Les problèmes adaptatifs** : après un échec, on simplifie (retirer un
  distracteur, fusionner deux lignes). Sur plus de 8000 personnes, deux fois
  plus de réussites, sans perte d'apprentissage.
- **Les problèmes « estompés »** (faded) : certaines lignes ont un trou à
  compléter. Transposé aux icônes : une carte « avancer de ... cases » dont il
  faut choisir le nombre.

### Les machines notionnelles

Une machine notionnelle est un dispositif pédagogique qui aide à comprendre
comment un programme s'exécute (Fincher, du Boulay et coll., 2020). Le robot sur
sa grille en est une : il rend visibles l'exécution pas à pas et l'état
(position, orientation, objets portés). Conséquence pour la conception :
**l'exécution doit pouvoir se suivre carte par carte**, avec la carte en cours
mise en évidence, et pas seulement montrer le résultat final.

### L'évaluation de ce genre de jeux

Gouws, Bradshaw et Wentworth (2013) proposent une grille pour mesurer quelles
compétences de pensée computationnelle un jeu exerce, appliquée à Lightbot. Nous
pourrons nous en servir pour vérifier, niveau par niveau, que le jeu couvre bien
les notions visées.

## Les briques techniques

| Besoin             | Options                                   | Avis provisoire                                                           |
| :----------------- | :---------------------------------------- | :------------------------------------------------------------------------ |
| Remettre en ordre  | Notre `parsons.js`, SortableJS, Pragmatic | Partir de `parsons.js` : souris, doigt et clavier, déjà en production     |
| Dessiner la grille | SVG, Canvas (PixiJS), Phaser              | SVG : léger, net sur mobile, accessible, animable en CSS                  |
| Blocs visuels      | Blockly (Apache 2.0)                      | À réévaluer : ses blocs imbriqués représentent bien conditions et boucles |
| Langage            | JavaScript, TypeScript                    | TypeScript : les erreurs de type se voient avant l'exécution              |
| Construction       | esbuild                                   | Comme la recette de CodeMirror : un fichier figé dans le dépôt            |
| Tests              | Vitest                                    | Le moteur (grille, robot, exécution) sans DOM, testé à part               |
| Qualité            | Prettier, ESLint                          | Déjà Prettier dans le dépôt ; ESLint pour TypeScript                      |

**Blockly mérite un second regard** depuis le choix des icônes seules. Ses blocs
qui s'emboîtent représentent naturellement une boucle qui contient d'autres
cartes, ou une condition avec son emplacement. On peut limiter sa boîte à outils
aux seules cartes du niveau, ce qui ressemble à un problème de Parsons. Ses
inconvénients : son poids (plusieurs centaines de kilo-octets), une apparence à
adapter, et une logique de composition libre plutôt que de remise en ordre. À
trancher à l'étape de conception, maquettes à l'appui.

Le point délicat est le glisser-déposer : SortableJS gère bien le doigt mais son
accessibilité au clavier est discutée ; Pragmatic drag and drop s'appuie sur le
glisser-déposer natif du navigateur, moins fiable au doigt. Notre `parsons.js`
gère déjà les trois. L'extraire en module réutilisable par le quiz et par le jeu
est probablement le meilleur choix, à confirmer à l'étape d'architecture.

## Ce que notre jeu apporte

1. Des **icônes alignées sur le cours** : chaque niveau pratique, sans syntaxe,
   la notion Java enseignée juste à côté dans la page.
2. Le **format Parsons**, avec distracteurs et aide adaptative, dont l'effet est
   documenté.
3. L'**exécution pas à pas**, carte en cours mise en évidence, comme une machine
   notionnelle.
4. **Plusieurs grilles par niveau**, pour faire sentir pourquoi les conditions
   et les boucles existent.
5. Une **intégration au support** : les niveaux vivent dans les pages des
   séances, écrits en Markdown.

## Décisions à consigner

À formaliser en ADR à l'étape d'architecture, une fois le cadrage validé :

- construire notre propre jeu plutôt qu'adapter un existant ;
- utiliser Blockly ou non pour les cartes imbriquées ;
- dessiner en SVG ;
- écrire en TypeScript, construit avec esbuild et figé dans le dépôt ;
- réutiliser et extraire `parsons.js`.

## Sources

- Ericson, B. et coll., _Parsons Problems and Beyond: Systematic Literature
  Review and Empirical Study Designs_, ITiCSE-WGR 2022.
  [Texte intégral](https://acris.aalto.fi/ws/portalfiles/portal/131069230/Parsons_Problems_and_Beyond_-_Systematic_Literature_Review_and_Empirical_Study_Designs_.pdf)
- Ericson, B. et coll., _Multi-Institutional Multi-National Studies of Parsons
  Problems_, ITiCSE-WGR 2023. [Notice](https://repository.falmouth.ac.uk/5216/)
- _Distractors Make You Pay Attention: Investigating the Learning Outcomes of
  Including Distractor Blocks in Parsons Problems_, ICER 2024.
  [Notice](https://unpaywall.org/10.1145%2F3632620.3671114)
- Runestone Academy, documentation des problèmes de Parsons adaptatifs.
  [Documentation](https://runestone.academy/ns/books/published/authorguide/directives/parsons.html)
- Fincher, S., Jeuring, J., Miller, C. S., Donaldson, P., du Boulay, B. et
  coll., _Notional Machines in Computing Education: The Education of Attention_,
  ITiCSE-WGR 2020.
  [Texte intégral](https://acris.aalto.fi/ws/portalfiles/portal/76828957/SCI_Hellas_Notional_Machines_in_Computing_Education_The_Education_of_Attention.pdf)
- Gouws, L., Bradshaw, K. et Wentworth, P., _Computational Thinking in
  Educational Activities: An Evaluation of the Educational Game Light-Bot_,
  ITiCSE 2013. [Notice](https://unpaywall.org/10.1145%2F2462476.2466518)
- [Karel le robot](https://en.wikipedia.com/wiki/Karel_the_robot), Wikipédia.
- [Reeborg's World](https://reeborg.ca/docs/en/contribute/developers.html),
  documentation pour les développeurs.
- [Blockly rejoint la Raspberry Pi Foundation](https://opensource.googleblog.com/2025/10/blockly-graduates-from-google.html),
  Google Open Source Blog, 2025.
- [Rapid Router](https://www.github.com/ocadotechnology/rapid-router), Ocado
  Technology, et sa
  [documentation](https://code-for-life.gitbook.io/rapid-router).
- [Pragmatic drag and drop, accessibilité](https://atlassian.design/components/pragmatic-drag-and-drop/accessibility-guidelines/),
  Atlassian.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
