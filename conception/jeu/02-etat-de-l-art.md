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

## Variables, fonctions, pas à pas : recherche complémentaire

Recherche du 19 novembre 2026, après le premier code des routines et des tasses,
jugé « fait pour être fait ». Les sources sont en fin de document ; pour
chacune, il est indiqué si le texte a été lu en entier ou seulement son résumé.

### Les variables : la métaphore compte

- **La boîte pousse à additionner.** Hermans et coll. (2018) ont expliqué la
  variable comme une boîte ou comme une étiquette, à 496 novices, enfants et
  adultes. Avec une seule affectation, la boîte fait mieux. Avec deux
  affectations de suite, l'étiquette fait mieux, surtout pour du texte ; et pour
  des entiers, le groupe « boîte » croit plus souvent que les deux valeurs
  s'additionnent.
- **Un modèle faux de l'affectation est fréquent, et il coûte.** Ma et coll.
  (2007) trouvent beaucoup de modèles non viables chez des novices en Java, et
  de meilleurs résultats chez celles et ceux qui ont un modèle juste. Leur suite
  (2008) combine **conflit cognitif** (faire prédire, la prédiction échoue) et
  **visualisation** : pour l'affectation d'une valeur, la visualisation seule
  aide déjà ; pour les références, l'ajout du conflit semble aider davantage.
- **Les variables ont des rôles** : valeur fixe, compteur, dernière valeur lue,
  accumulateur, etc. Un enseignement fondé sur ces rôles, avec une animation, a
  fait apprendre plus vite les schémas de programmes (Sajaniemi et coll., deux
  petites études du même groupe).

C'est cohérent avec la règle que la séance 03 fait retenir : avant d'exécuter
une ligne, Java remplace chaque variable par sa valeur du moment. Notre
charrette qui « contient » des tasses est une boîte : elle encourage l'addition
qu'on veut combattre.

### Un jeu apprend ce qu'il fait faire

- **Cargo-Bot** (Tessler, Beth et Lin, 2013) : 47 lycéennes et lycéens jouent
  avant le cours sur la récursivité. Ce groupe progresse nettement plus pour
  **écrire** des fonctions récursives, mais pas pour **suivre** leur exécution,
  ce que le jeu ne fait jamais faire.
- **Gidget** (Lee et Ko, 2011) : un robot qui se reproche lui-même ses erreurs.
  Avec un robot plus personnifié (paroles, sons, image), 116 novices ont fini
  nettement plus de niveaux, alors qu'ils pouvaient arrêter à tout moment.
- **Human Resource Machine**, jeu à sauts façon assembleur, joué six semaines
  par plus de 50 personnes à l'UOC : plus d'intérêt et de sentiment de
  compétence, mais des blocages ; les auteurs recommandent des aides.
- **Reduct** (Arawjo et coll., 2017) fait passer peu à peu des blocs du jeu au
  vrai JavaScript, avec des résultats annoncés comme prometteurs.

### Les fonctions dans les jeux : peu de preuves

Lightbot justifie ses procédures par le manque de place dans le programme
principal ; BOTS donne plus de points aux solutions courtes. Ce sont des choix
de conception, sans évaluation indépendante trouvée de l'apprentissage des
fonctions. Dans les deux cas, le besoin naît d'une **contrainte** ; dans un
problème de Parsons, où toutes les cartes sont données, cette contrainte
disparaît.

### Le pas à pas : utile si l'on est actif

La revue de Sorva, Karavirta et Malmi (2013) fait le tour de trente ans d'outils
de visualisation de programmes pour débutants.

- **La forme de l'exercice compte plus que l'image.** La méta-étude de
  Hundhausen et coll. (2002), sur 24 expériences, conclut que la visualisation
  aide, mais selon ce qu'on fait faire, pas selon sa qualité graphique. Une
  animation seulement regardée peut faire moins bien qu'une image fixe, voire
  que rien.
- **L'échelle d'engagement** (Naps et coll.) : ne rien voir, regarder, répondre,
  modifier, construire, présenter. On suppose que plus on monte, plus on
  apprend. Avec Jeliot, regarder l'animation rendait les personnes moins actives
  que de ne rien regarder (Myller et coll.).
- **Le débogueur ordinaire n'aide pas à comprendre l'état.** Bennedsen et
  Schulte (2010) : pas à pas dans le débogueur de BlueJ ou traçage à la main,
  aucune différence au test sur l'état du programme. Un débogueur avance
  instruction par instruction et cache le calcul des expressions : il est fait
  pour trouver un bug, pas pour expliquer l'affectation.
- **Un outil pensé pour apprendre aide.** Avec Jeliot 3 à la place de l'IDE, de
  meilleurs résultats aux tests de compréhension (Maravić Čisar et coll.) ;
  utile pour les conditions, les boucles, la portée et les paramètres, trop
  compliqué pour les références (Ma et coll.).
- **Récemment**, 829 personnes sur 12 semaines (Sibia et coll., 2025,
  prépublication) : les aides visuelles réduisent l'effort ressenti et
  augmentent l'engagement, mais l'étude ne mesure pas l'apprentissage par des
  tests.

Python Tutor, qui existe aussi pour Java, montre le code, la ligne en cours et
les variables à côté. Il s'exécute vraisemblablement sur son serveur : un lien,
pas une intégration. L'essai de Java exécutable n'a pas de pas à pas ; la piste
est d'instrumenter le code avant de le compiler, puis de rejouer la trace.

### Les exemples résolus qui s'effacent

Un **exemple résolu** montre une solution complète, étape par étape. Pour des
novices, l'étudier apprend plus que chercher seul : il n'y a qu'à comprendre la
solution, pas à la découvrir (Kirschner, Sweller et Clark, 2006). Cet avantage
disparaît, puis s'inverse, quand l'expertise grandit.

L'**effacement progressif** (_fading_) fait la transition : un exemple
entièrement résolu, puis le même genre de problème avec la dernière étape à
faire, puis les deux dernières, et ainsi de suite jusqu'au problème seul (Renkl,
Atkinson et coll., à partir de 2000). On parle d'effacement à rebours quand on
retire les étapes en partant de la fin. Les résultats :

- il aide en général le transfert, comparé à la résolution de problèmes seule ;
- son avantage sur une simple alternance exemple, puis problème n'est pas
  constant ;
- un effacement **adaptatif**, qui suit les réussites de la personne, fait mieux
  qu'un calendrier fixe ;
- demander à la personne d'expliquer chaque étape ajoute un gain.

En programmation, les **problèmes de Parsons estompés** (Weinman, Fox et
Hearst, 2021) font remettre en ordre et compléter des lignes partiellement
vides. Avec 237 personnes, ils enseignent mieux les schémas de programmes que
l'écriture ou le traçage de code, améliorent l'écriture de code autant que des
exercices d'écriture, et sont préférés.

Pour Thealivery, le verrou de l'aide fait déjà l'inverse d'un effacement : il
place les premières cartes après des échecs. Une suite de niveaux pourrait
partir de cartes déjà placées et verrouillées, puis en placer de moins en moins.

### Comprendre ce qu'on fait, pas seulement faire

- **Mayer (2004)** passe en revue trois décennies de découverte pure, dont
  l'apprentissage de stratégies de programmation en LOGO : la découverte guidée
  fait mieux que la découverte pure. Sa conclusion : l'apprentissage actif est
  une activité **cognitive**, pas une activité **comportementale**. Être occupé
  à manipuler ne suffit pas.
- **Piaget, _Réussir et comprendre_ (1974)** distingue le savoir-faire (réussir
  en action) de la compréhension (le concevoir), qui peut venir des années après
  la réussite.
- **« Nous n'apprenons pas de l'expérience, mais de la réflexion sur
  l'expérience »** circule partout sous le nom de John Dewey. Lagueux montre que
  la phrase ne figure pas dans ses écrits : c'est un résumé apocryphe de sa
  pensée.
- Une méta-analyse de 2011, sur 580 comparaisons, trouve l'enseignement direct
  supérieur à la découverte non guidée dans la plupart des situations.

Cargo-Bot le confirme à petite échelle : on y a appris à écrire, pas à suivre,
parce qu'on n'y a jamais suivi.

### Le déclic : les concepts seuils

Un **concept seuil** change la façon dont on voit toute la discipline. Avant le
déclic, on traverse un **espace liminal** : on imite, on oscille, sans encore
comprendre (Boustedt et coll., 2007 ; McCartney et coll., 2009). Le passage
prend du temps, et c'est normal.

Les récits de déclic recueillis sur Hacker News vont dans le même sens, avec les
limites d'un public choisi qui se souvient après coup. On y lit le temps et les
échecs, l'affectation comprise (`x = x + 1` n'est pas une équation), la fonction
qui prend des entrées et rend une sortie, `GOSUB`/`RETURN` qui montre comment la
machine avance, et la machine elle-même (assembleur, mémoire). Reddit n'a pas pu
être consulté : le site bloque l'agent.

### Ce que font les enseignantes et enseignants qui réussissent

- **L'instruction par les pairs** (Porter, Bailey-Lee et Simon, 2013) : une
  question, un vote, une discussion entre voisins, un second vote. Dans quatre
  cours et 16 éditions, le taux d'échec passe en moyenne de 20 % à 7 %.
- **Les sous-objectifs nommés** (Margulieux, Morrison et Decker) : des exemples
  résolus découpés en étapes nommées. Mieux aux quiz, moins d'abandons et
  d'échecs, pas de différence aux examens finaux.
- **Lire le code à voix haute** (Swidan et Hermans, 2019) : avec 49 enfants,
  meilleure mémorisation, pas de meilleure compréhension.
- **_Teaching Tech Together_** (Wilson, 2019), gratuit sous CC BY-NC 4.0, fait
  le tour de ces méthodes pour qui enseigne : modèles mentaux, machine
  notionnelle, idées fausses, problèmes de Parsons, exemples qui s'effacent,
  instruction par les pairs, programmation en direct.

### Ce que nous en retenons

- **Rendre visible le remplacement** d'une variable par sa valeur : c'est la
  notion difficile, pas le remplissage d'un compteur.
- **Préférer l'étiquette ou l'ardoise à la boîte**, ou utiliser la boîte exprès
  pour provoquer l'erreur de l'addition, puis la corriger.
- **Faire prédire avant d'exécuter** : le jeu n'apprendra à suivre les valeurs
  que s'il fait suivre les valeurs. Conflit, puis visualisation.
- **Le pas à pas vaut par ce qu'il fait faire** : prédire, répondre, pas
  seulement regarder. Un débogueur ordinaire ne suffit pas.
- **Effacer peu à peu** : des niveaux qui partent de cartes placées et en
  placent de moins en moins.
- **Pour les fonctions**, peu de preuves : le test avec des personnes qui
  étudient comptera plus que la littérature.

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

### Recherche complémentaire du 19 novembre 2026

Texte lu en entier :

- Hermans, F., Swidan, A., Aivaloglou, E. et Smit, M., _Thinking out of the Box:
  Comparing Metaphors for Variables in Programming Education_, WiPSCE 2018.
  [Texte intégral](https://www.felienne.com/wp-content/uploads/2018/08/box-label-vars.pdf)
- Tessler, J., Beth, B. et Lin, C., _Using Cargo-Bot to Provide Contextualized
  Learning of Recursion_, ICER 2013.
  [Texte intégral](https://cs.utexas.edu/~lin/papers/icer13.pdf)
- Lee, M. J. et Ko, A. J., _Personifying Programming Tool Feedback Improves
  Novice Programmers' Learning_, ICER 2011.
  [Texte intégral](https://faculty.washington.edu/ajko/papers/Lee2011Gidget.pdf)
- Sorva, J., Karavirta, V. et Malmi, L., _A Review of Generic Program
  Visualization Systems for Introductory Programming Education_, ACM TOCE
  13(4), 2013. Citée ici pour Hundhausen et coll. 2002, Naps et coll., Myller et
  coll., Bennedsen et Schulte 2010, Maravić Čisar et coll. et Ma et coll.
  [Texte intégral](https://romisatriawahono.net/lecture/rm/survey/software%20engineering/Software%20Architecture/Sorva%20-%20Generic%20Program%20Visualization%20Systems%20for%20Introductory%20Programming%20-%202013.pdf)
- Weinman, N., Fox, A. et Hearst, M. A., _Improving Instruction of Programming
  Patterns with Faded Parsons Problems_, CHI 2021.
  [Texte intégral](https://acelab.berkeley.edu/wp-content/papercite-data/pdf/parsons-chi2021.pdf)
- Renkl, A., Atkinson, R. K. et Maier, U. H., _From Studying Examples to Solving
  Problems: Fading Worked-Out Solution Steps Helps Learning_, CogSci 2000.
  [Notice et texte](https://escholarship.org/uc/item/81b9j9hs)
- Wilson, G., _Teaching Tech Together_, Taylor & Francis, 2019, CC BY-NC 4.0.
  [Version en ligne](https://teachtogether.tech/en/)

Résumé ou notice seulement :

- Ma, L., Ferguson, J., Roper, M. et Wood, M., _Investigating the Viability of
  Mental Models Held by Novice Programmers_, SIGCSE 2007.
  [Notice](https://dblp.dagstuhl.de/rec/conf/sigcse/MaFRW07.html)
- Ma, L., Ferguson, J., Roper, M., Ross, I. et Wood, M., _Using Cognitive
  Conflict and Visualisation to Improve Mental Models Held by Novice
  Programmers_, SIGCSE 2008.
  [Notice](https://strathprints.strath.ac.uk/id/eprint/32524)
- Sajaniemi, J. et coll., rôles des variables :
  [étude de 2004](https://saja.kapsi.fi/var_roles/abstracts/ivs04.html) et
  [réplication de 2007](https://saja.kapsi.fi/var_roles/abstracts/vlhcc07.html).
- Arawjo, I. et coll., _Teaching Programming with Gamified Semantics_, CHI 2017.
  [Notice](https://www.cs.cornell.edu/andru/papers/reduct-chi17)
- UOC, jeux vidéo commerciaux pour apprendre à programmer, 2025.
  [Communiqué](https://www.uoc.edu/en/news/2025/video-games-to-learn-programming)
- [Lightbot, How does Lightbot teach programming?](https://lightbot.com/hoclearn.html)
- BOTS, rapport de NC State.
  [Document](https://repository.lib.ncsu.edu/server/api/core/bitstreams/f14e577f-d046-41fa-b401-27bfe9a5a97c/content)
- Hundhausen, C., Douglas, S. et Stasko, J., _A Meta-Study of Algorithm
  Visualization Effectiveness_, JVLC 13(3), 2002.
  [Notice](https://www.academia.edu/15636659/A_Meta_Study_of_Algorithm_Visualization_Effectiveness)
- Sibia, N. et coll., _From Code to Concept: Evaluating Multiple Coordinated
  Views in Introductory Programming_, arXiv, 2025 (prépublication).
  [Résumé](https://arxiv.org/abs/2509.26466)
- [Python Tutor, visualiseur Java](https://pythontutor.com/articles/java-visualizer.html).
- Kirschner, P. A., Sweller, J. et Clark, R. E., _Why Minimal Guidance During
  Instruction Does Not Work_, Educational Psychologist 41(2), 2006.
  [Texte](https://www.davidlewisphd.com/courses/EDD8121/readings/2006-Kirschner_et_al.pdf)
- Mayer, R. E., _Should There Be a Three-Strikes Rule Against Pure Discovery
  Learning?_, American Psychologist 59(1), 2004.
  [Notice](https://bibsonomy.org/bibtex/2afaf704c1c0c9adebec5339afaf209c2/ji)
- Piaget, J., _Réussir et comprendre_, PUF, 1974.
  [Archives Jean Piaget](https://unige.ch/piaget/piaget1974RCO_01)
- Lagueux, R., _A Spurious John Dewey Quotation on Reflection_.
  [Présentation](https://www.slideshare.net/slideshow/a-spurious-john-dewey-quotation-on-reflection/259649444)
- ASCD, _The Perils and Promises of Discovery Learning_, pour la méta-analyse
  de 2011.
  [Article](https://www.ascd.org/el/articles/the-perils-and-promises-of-discovery-learning)
- McCartney, R., Boustedt, J., Eckerdal, A. et coll., _Liminal Spaces and
  Learning Computing_, 2009.
  [Notice](https://research.aber.ac.uk/en/publications/liminal-spaces-and-learning-computing/)
- Porter, L., Bailey-Lee, C. et Simon, B., _Halving Fail Rates using Peer
  Instruction_, SIGCSE 2013.
  [Texte](https://files.software-carpentry.org/training-course/2012/08/porter-halving-fail-peer-instruction-2013.pdf)
- Margulieux, L., Morrison, B. et Decker, A., sous-objectifs nommés, IJ STEM
  Education, 2020.
  [Notice](https://doaj.org/article/9a2c85d66fd54ec9ab019e9a510bbf17)
- Swidan, A. et Hermans, F., _The Effect of Reading Code Aloud on
  Comprehension_, CompEd 2019.
  [Notice](https://serg.ewi.tudelft.nl/publications/the-effect-of-reading-code-aloud-on-comprehension-an-empirical-study-with-school-students/)
- Hacker News,
  [What made programming finally click for you?](https://news.ycombinator.com/item?id=33770114)
  et
  [What is the single most important concept to understand for programming?](https://news.ycombinator.com/item?id=17792580)

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
