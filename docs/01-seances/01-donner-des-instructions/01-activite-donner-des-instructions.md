# Activité 1 - Donner des instructions

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif de l'activité

Constater par l'expérience qu'une instruction que vous trouvez claire ne l'est
pas pour qui ne partage pas votre contexte.

Ce n'est pas un jeu, et ce n'est pas un brise-glace. C'est la première
observation du cours, et tout ce qui suit pendant le semestre en découle.

## Principe

Vous travaillez par deux. Une personne possède l'information, l'autre exécute.

- La personne qui **donne les instructions** reçoit une figure. Elle la voit.
  L'autre personne ne la voit jamais.
- La personne qui **exécute** reçoit une feuille blanche et un crayon. Elle
  reproduit ce qui lui est dicté, exactement, sans interpréter.
- Les deux personnes sont dos à dos, ou séparées par un carton.

À la fin, on compare la figure d'origine et la reproduction.

## Règles

1. La personne qui exécute **ne pose aucune question** pendant la manche 1.
2. La personne qui exécute fait **exactement** ce qui est dit, pas ce qu'elle
   croit comprendre. Si l'instruction est ambiguë, elle choisit une
   interprétation et continue.
3. La personne qui donne les instructions **ne regarde pas** la feuille de
   l'autre.
4. Aucun geste, aucun dessin dans l'air.

## Déroulé

### Manche 1 - Sans retour (10 minutes)

Figure A. Aucune question autorisée. Aucun retour d'information.

La personne qui donne les instructions parle, l'autre dessine. Six minutes de
dictée maximum, puis on compare.

### Débriefing intermédiaire (5 minutes)

Trois questions, posées dans cet ordre :

1. À la personne qui exécutait : à quel moment avez-vous su que vous vous
   trompiez, et qu'avez-vous fait ?
2. À la personne qui donnait les instructions : à quel moment avez-vous compris
   que ça partait de travers, et qu'avez-vous ressenti ?
3. Aux deux : quelle instruction précise a causé le premier écart ?

La deuxième question compte autant que les autres. La frustration de voir
quelque chose partir de travers sans pouvoir corriger est exactement ce que
l'on ressent face à un programme qui ne fait pas ce qu'on veut. Nommer cette
frustration maintenant évite de la subir en silence en séance 05.

### Manche 2 - Avec retour (10 minutes)

On inverse les rôles. Figure B. Cette fois, la personne qui exécute peut poser
des questions fermées, auxquelles on répond par oui ou par non.

Six minutes maximum, puis on compare.

### Débriefing final (15 minutes)

En plénière.

## Le matériel

Les figures sont composées de formes géométriques simples assemblées de manière
non évidente : des carrés, des triangles, des cercles, des traits, dont les
positions relatives ne correspondent à aucun objet identifiable.

Ce point est important : si la figure ressemble à une maison, la personne qui
exécute dessine une maison dès la troisième instruction et l'activité ne montre
plus rien.

Les figures sont fournies dans le dossier
`presentations/01-donner-des-instructions/images/` du dépôt, en deux versions
de difficulté équivalente.

## Ce que l'on veut faire émerger au débriefing

Le débriefing est la partie utile. Laissez la classe formuler, puis nommez.

### Le vocabulaire partagé

"Un peu à gauche" ne veut rien dire. "À deux centimètres du bord gauche" veut
dire quelque chose. Toute instruction repose sur un vocabulaire et des unités
que les deux parties partagent. Une machine ne partage rien par défaut : tout
doit être dit.

### L'ordre compte

Les mêmes instructions dans un ordre différent produisent un dessin différent.
C'est la notion de **séquence**, qui sera la première structure du cours.

### Le point de référence, ou l'état

"Trace un trait de trois centimètres vers la droite" n'a de sens que si l'on
sait d'où l'on part. Il existe donc un état courant, que les deux parties
doivent maintenir à jour de la même manière. Si les états divergent, tout ce
qui suit est faux.

C'est exactement ce qu'est une **variable** : un état que le programme
maintient et qui conditionne la suite.

### L'erreur se propage

Un écart à l'instruction 3 rend fausses les instructions 4 à 20, même si elles
sont parfaitement exécutées. Chercher le bogue à la fin du dessin est inutile :
il faut remonter au premier point de divergence.

C'est le principe du **débogage**, vu en séance 10.

### Le retour d'information change tout

En manche 2, avec des questions fermées, le résultat est meilleur pour un temps
comparable. Un système qui peut signaler son état se corrige ; un système muet
ne se corrige pas.

C'est pour cela que l'on écrit des messages d'erreur, des traces d'exécution et
des tests.

### Ce qui reste implicite

Personne ne précise l'épaisseur du trait, la couleur, le sens de lecture. On
suppose. Une machine ne suppose pas : elle applique une valeur par défaut que
vous n'avez pas choisie et dont vous ignorez l'existence.

## Transition vers la suite

À ce stade, la classe a établi qu'une instruction utilisable doit être :
non ambiguë, ordonnée, dans un vocabulaire partagé, et relative à un état
connu.

La question suivante est : comment écrit-on cela pour que ce soit lisible et
vérifiable par quelqu'un d'autre ? Réponse de la séance : on le dessine. Voir
[Les diagrammes d'activité](02-diagrammes-dactivite.md).

## Notes pour l'équipe enseignante

- Annoncer l'objectif avant de commencer, en une phrase, et sans humour :
  _"On va observer ce qui se passe quand on donne des instructions à quelqu'un
  qui ne peut pas deviner ce qu'on a en tête."_ Une activité présentée comme un
  jeu est jouée comme un jeu.
- Ne pas laisser la manche 1 dépasser six minutes, même si personne n'a fini.
  L'échec partiel est le matériau du débriefing.
- Circuler pour repérer les formulations intéressantes à citer au débriefing.
  Noter deux ou trois instructions entendues, textuellement.
- Résister à l'envie de donner les conclusions. Si la classe ne trouve pas
  "l'ordre compte", poser la question : _"Si je dicte les mêmes phrases dans le
  désordre, j'obtiens le même dessin ?"_
- Les binômes qui réussissent très bien la manche 1 ont en général convenu d'un
  repère à l'avance. C'est un excellent cas à exposer : ils ont inventé une
  convention, donc un début de langage.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
