# Séance 06 - Conditions

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Notes pour l'équipe enseignante. Le support de cours de cette séance est
[ici](../01-seances/06-conditions/index.md).

## Ce que la séance doit produire

**Chaque personne sait traduire un losange en `if` et `else`, et teste toute
condition à sa limite. Et elle repart avec un fil rouge qui refuse une note de
7 et dit, à 4.0 pile, _"réussi"_.**

Si une seule chose reste : `>=` et `>` ne diffèrent que d'un caractère, et
seule la valeur limite les distingue.

## Pourquoi cette approche

| Choix                                                       | Raison                                                                                                         |
| :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| Partir du losange de la séance 01                           | La sélection est déjà dessinée. Le code n'est qu'une nouvelle notation pour une idée acquise                   |
| Les conditions dans des fonctions qui rendent un `boolean`  | Prolonge la règle de la séance 05 (_une fonction de calcul rend_) et prépare le fil rouge                       |
| Prédire avant d'exécuter, partout                           | PRIMM, comme en séance 05. Lire et tracer précède écrire (Lister et al., 2004)                                 |
| Des quiz à choix multiple avec rétroaction immédiate        | Effet de test, voir ci-dessous. La rétroaction neutralise les leurres des mauvaises réponses                    |
| Chaque mauvaise réponse de quiz est une idée fausse répertoriée | Un distracteur plausible localise l'idée fausse, un distracteur absurde ne mesure rien                     |
| La règle des trois valeurs, puis le tableau des limites     | Le bug le plus fréquent de la séance (`>` pour `>=`) ne se voit qu'à la limite                                 |
| `switch` et ternaire à la fin, pas en annexe                | Demande explicite : ils viennent une fois `if`, `else` et les opérateurs logiques compris                       |
| Le `switch` avec `->` uniquement                            | Celui du cours OpenClassrooms actuel. La forme avec `break` est dans un bloc repliable, pour la lecture de code |
| Un `switch` sur un `String` avant la séance 09              | Réagir à un texte tapé sans `equals`, et désamorcer `choice == "a"`, qui compile et ment                       |

### Ce que fait OpenClassrooms

Le chapitre
[Manipulez vos données](https://openclassrooms.com/fr/courses/8383791-apprenez-a-programmer-en-java/8439941-manipulez-vos-donnees)
traite conditions **et** boucles. Pour les conditions :

- une analogie de la vie courante (_s'il fait beau, la plage, sinon le
  cinéma_), reprise ici par le parapluie de la séance 01 ;
- la condition est un `boolean`, d'abord un paramètre `boolean` testé tel quel,
  puis `==`, `!` et `equals` ;
- `&&` et `||` sur un intervalle (`valeur > 0 && valeur < 10`) ;
- les accolades toujours, explicitement recommandées ;
- `else if`, puis `switch` avec `->`, `default`, plusieurs valeurs par `case`,
  `switch` qui rend une valeur, et `yield`.

Écarts assumés :

- **les fonctions d'OpenClassrooms affichent**, toutes `void`. Ici, elles
  rendent un `boolean`, conformément à la règle de la séance 05 ;
- **`equals` est repoussé** en séance 09, et remplacé par un `switch` sur du
  texte ;
- **l'opérateur ternaire est ajouté** : OpenClassrooms ne le montre pas ;
- **`yield` est laissé de côté** : il ne sert qu'aux `case` de plusieurs lignes,
  absents de la séance ;
- **les parenthèses autour de chaque comparaison** : la règle _une opération,
  deux opérandes_ du dépôt, qu'OpenClassrooms ne suit pas.

### Ce que dit la recherche

Critère retenu : publication évaluée par les pairs, résultat reproduit par des
équipes indépendantes de celle qui l'a proposé. Peu de résultats de didactique
de l'informatique passent les deux filtres. Ce qui suit est classé du plus
solide au moins solide.

- **L'effet de test** (_retrieval practice_). Se tester fait mieux retenir que
  relire, à temps d'étude égal. C'est l'un des résultats les plus reproduits de
  la psychologie de l'apprentissage. Il justifie les quiz du support, et la
  consigne de les refaire une semaine plus tard. La rétroaction après un choix
  multiple supprime l'effet négatif des leurres (Butler et Roediger, 2008).
- **Les idées fausses répertoriées.** Le catalogue
  [progmiscon.org](https://progmiscon.org/) recense, sources à l'appui, les
  idées fausses sur Java. Celles visées par la séance :
  [ConditionalIsSequence](https://progmiscon.org/misconceptions/Java/ConditionalIsSequence/),
  [IfIsLoop](https://progmiscon.org/misconceptions/Java/IfIsLoop/),
  [MapToBooleanWithIf](https://progmiscon.org/misconceptions/Java/MapToBooleanWithIf/),
  [MapToBooleanWithConditionalOperator](https://progmiscon.org/misconceptions/Java/MapToBooleanWithConditionalOperator/),
  [ComparisonWithBooleanLiteral](https://progmiscon.org/misconceptions/Java/ComparisonWithBooleanLiteral/),
  [AssignCompares](https://progmiscon.org/misconceptions/Java/AssignCompares/)
  et [NoShortCircuit](https://progmiscon.org/misconceptions/Java/NoShortCircuit/).
- **L'enseignement par les pairs** (_peer instruction_) : question à choix
  multiple, vote individuel, discussion entre voisins, nouveau vote. Porter,
  Bailey Lee et Simon (2013) rapportent un taux d'échec réduit de 61 % sur
  seize éditions de quatre cours. Étude observationnelle, pas expérimentale,
  mais cohérente avec les résultats antérieurs en physique. Les diapositives de
  quiz de la présentation sont faites pour ce format.
- **PRIMM** (Sentance, Waite et Kallia, 2019) : 493 élèves de 11 à 14 ans, dans
  13 écoles, avec groupe contrôle. Évalué par les pairs, mais par l'équipe qui
  a conçu la méthode, et sur un public plus jeune. À prendre comme un appui,
  pas comme une preuve.

Les **confettis** n'ont, à ma connaissance, aucune preuve d'effet sur
l'apprentissage. Ils sont là pour le plaisir, ce qui n'est pas rien. L'effet
attendu des quiz vient de l'effort de rappel et de la rétroaction, pas d'eux.

### Sources

- H. L. Roediger et J. D. Karpicke, _Test-enhanced learning: taking memory
  tests improves long-term retention_, Psychological Science 17(3), 2006.
- O. O. Adesope, D. A. Trevisan et N. Sundararajan, _Rethinking the use of
  tests: a meta-analysis of practice testing_, Review of Educational Research
  87(3), 2017.
- A. C. Butler et H. L. Roediger, _Feedback enhances the positive effects and
  reduces the negative effects of multiple-choice testing_, Memory & Cognition
  36(3), 2008. [DOI](https://doi.org/10.3758/MC.36.3.604).
- L. Porter, C. Bailey Lee et B. Simon, _Halving fail rates using peer
  instruction: a study of four computer science courses_, SIGCSE 2013.
  [DOI](https://doi.org/10.1145/2445196.2445250).
- S. Sentance, J. Waite et M. Kallia, _Teaching computer programming with
  PRIMM: a sociocultural perspective_, Computer Science Education 29(2-3),
  2019. [DOI](https://doi.org/10.1080/08993408.2019.1608781).
- R. Lister et al., _A multi-national study of reading and tracing skills in
  novice programmers_, ITiCSE Working Group Reports, 2004.
- L. Chiodini et al., _A curated inventory of programming language
  misconceptions_, ITiCSE 2021. Le catalogue en ligne :
  [progmiscon.org](https://progmiscon.org/).
- [Manipulez vos données](https://openclassrooms.com/fr/courses/8383791-apprenez-a-programmer-en-java/8439941-manipulez-vos-donnees),
  OpenClassrooms.

## Avant la séance

| Quoi                                     | Détail                                                                                             |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------- |
| Annoncer que la séance est hors examen   | Une classe passe l'évaluation écrite avant cette séance, l'autre après. Le dire en ouvrant         |
| Tester les quiz sur le site publié       | Les confettis viennent d'un CDN : vérifier depuis le réseau de l'école                             |
| Préparer le vote                         | Quatre doigts levés, A à D, pour les diapositives de quiz. Ou un outil de vote, si la salle le permet |
| Préparer les deux live codings           | Voir les sections correspondantes. Un projet IntelliJ vide, police agrandie                        |
| Récupérer deux ou trois fils rouges      | Ceux de la séance 05, étape 3. Ils servent de point de départ au premier atelier                   |
| Avoir le diagramme du parapluie au tableau | Celui de la séance 01. Il reste affiché pendant la première théorie                              |

### Les sorties ont été obtenues sur JDK 25

Tous les exemples ont été exécutés avec `eclipse-temurin:25-jdk`. Deux
messages sont propres aux versions récentes et peuvent différer sur un JDK
plus ancien :

- `the switch expression does not cover all possible input values` ;
- le `switch` sur un `double`, dont la première ligne
  (`primitive patterns are a preview feature`) n'existe que depuis les JDK qui
  proposent les motifs primitifs en préversion.

## Rappel - Dans quel ordre ?

Deux programmes, projetés l'un après l'autre. Pour chacun : trente secondes de
réflexion seule, vote, puis seulement l'explication.

- **Le premier** est fait pour que tout le monde ait juste, `1 2 3 4 5`.
  L'intérêt est dans la question qui suit : _"les lignes qui affichent 2, 3, 4
  sont écrites en premier dans le fichier, pourquoi s'affichent-elles après
  1 ?"_. Faire dire : `main` d'abord, toujours.
- **Le second** numérote dans l'ordre **du fichier**. Une partie de la salle
  répond `1 2 3 4 5`, c'est l'idée fausse visée. Dérouler au tableau avec les
  numéros de ligne, comme en séance 05.
- **Transition** : _"jusqu'ici, toutes les lignes s'exécutent. Aujourd'hui,
  certaines vont être sautées."_

## Théorie - Décider avec `if` et `else`

Quinze minutes. Tout ne tient pas : le support est complet, la présentation
ne garde que l'essentiel.

### Ce qu'il faut faire

- **Partir du diagramme du parapluie**, au tableau. Écrire le code à côté, et
  relier chaque morceau à son élément du diagramme.
- **Faire prédire `average > 4` avec 4.** C'est le quiz de la page. La salle
  se partage souvent, c'est le moment de poser la règle des trois valeurs.
- **Montrer le passage de `if` qui rend `true` ou `false` à
  `return average >= 4;`.** Le faire en deux temps : écrire la version longue,
  puis demander _"que rend la fonction quand la condition est vraie ? et quand
  elle est fausse ?"_. IntelliJ propose d'ailleurs cette simplification (une
  ampoule jaune sur le `if`) : la montrer si elle apparaît.

### Ce qui rate habituellement

- **`=` au lieu de `==`.** Le message (`double cannot be converted to boolean`)
  ne parle pas d'égalité. Lire le message ensemble, au moins une fois.
- **Un `;` après la condition.** IntelliJ le signale par un avertissement
  discret. Montrer à quoi il ressemble.
- **La variable déclarée dans le bloc.** Laisser pour la correction si le temps
  manque : c'est la portée de la séance 05, ils ont les outils.

## Pendant le premier atelier

### Prédire

Exiger les prédictions écrites. Les quatre programmes visent chacun une idée
fausse :

| Programme | Idée fausse visée                                                         |
| :-------- | :------------------------------------------------------------------------ |
| A         | Un `if` sans `else` fait forcément quelque chose                          |
| B         | Un `if` se répète tant que sa condition est vraie (_IfIsLoop_)            |
| C         | Un `boolean` se recalcule quand la variable comparée change               |
| D         | Lecture d'une fonction qui rend un `boolean`, puis son usage dans un `if` |

Le programme C est le plus intéressant à débriefer : il relie la séance 06 à la
règle _"remplacer par la valeur"_ de la séance 05.

### Réparer

Le bug 3 (`canVote` avec `>`) est le plus important. Ne pas le laisser passer
sans la règle : les deux tests du programme sont justes, seule la limite révèle
l'erreur. Faire dire à la salle pourquoi il n'y a pas d'erreur de compilation.

### Le fil rouge

- **La question de l'arrondi** (étape 1) est la seule vraie décision de
  conception de la séance. Ne pas trancher à leur place : faire essayer les deux
  et constater _"4.0, échoué"_.
- Le verdict dans `processPerson`, pas dans `main` : `main` ne change pas.

## Correction au tableau, en live coding

Quinze minutes, à partir des questions de la salle. Si elles ne viennent pas,
cette suite, une étape par question :

1. Écrire `canVote` avec `>`, tester 25 et 12. Demander : _"c'est juste ?"_.
   Ajouter 18. Corriger.
2. Ajouter un `;` après la condition d'un `if`. Exécuter avec une valeur qui
   rend la condition fausse. Montrer l'avertissement d'IntelliJ.
3. Écrire `hasPassed` dans le fil rouge, et l'appeler sur la moyenne de
   Camille, exacte puis arrondie.
4. Déclarer `verdict` dans les deux blocs, provoquer `cannot find symbol`, puis
   `might not have been initialized` en retirant le `else`.

Ce qu'il faut faire émerger : le compilateur vérifie **tous** les chemins
(`missing return statement`, `might not have been initialized`), pas seulement
celui que prendra votre test.

## Théorie - Plusieurs cas et opérateurs logiques

### Ce qu'il faut faire

- **Faire voter le quiz de l'ordre inversé.** Beaucoup répondent
  _"Excellent"_. Dérouler : la première condition vraie gagne.
- **Montrer `1 <= grade <= 6`** et son message. C'est la notation qu'ils
  écriraient en mathématiques : mieux vaut qu'ils la voient échouer en classe.
- **La table de vérité** : la projeter, ne pas la faire apprendre. `&&` faux
  dès qu'un est faux, `||` vrai dès qu'un est vrai, cela suffit.
- **Le 3.9499999999999997 de Camille** : ils le connaissent depuis la séance
  05. Il montre que `==` sur des `double` n'est pas un piège théorique.

### Ce qu'il ne faut pas faire

- Ne pas parler de lois de De Morgan. `!(a && b)` apparaît dans un programme à
  prédire, c'est assez.
- Ne pas présenter le court-circuit comme un point central. Il est dans un bloc
  repliable : à mentionner si la question vient.

## Pendant le second atelier

- **Le bug 1 (`ticketPrice`)** demande d'écrire le tableau de tests avant
  d'exécuter. Ceux qui exécutent d'abord ne voient pas le problème : 10 francs
  pour 4 ans _"paraît possible"_.
- **Le bug 2 (`||`)** : demander une valeur pour laquelle la condition est
  fausse. Il n'y en a pas, et c'est la réponse.
- **`isLeapYear`** est difficile. C'est voulu : `&&` et `||` mélangés, et les
  parenthèses deviennent indispensables. Ne pas la donner avant vingt minutes.
- **La chasse aux cas non couverts** (partie 5) : cinq minutes, chronométrées.
  Les cas typiques : 4, 3.95, 0, 6.5, une virgule, un mot. Ces deux derniers
  ne se corrigent pas encore. Le dire.

## Théorie - `switch` et l'opérateur ternaire

Quinze minutes, après la seconde pause. Ce n'est pas indispensable : le dire.
L'objectif est qu'ils sachent **lire** ces deux formes et choisir.

- **Le ternaire** : partir du `verdict` du fil rouge, la version avec
  `if` et `else` à gauche, la version ternaire à droite.
- **Le `switch`** : partir de la suite de `else if` de `dayName`, qui est
  longue et répétitive exprès.
- **Le `String` et `==`** : faire voter avant d'exécuter. La quasi-totalité de
  la salle pense que `choice == "a"` marche. Ne pas expliquer pourquoi : _"en
  séance 09"_. Toute explication sur les références coûte dix minutes et
  suppose les objets.
- **La forme avec `break`** : ne pas la montrer en classe. Elle est dans le
  support pour celles et ceux qui la croiseront.

## Live coding et clôture

Dix minutes. Écrire en direct un petit menu :

1. `IO.readln("Votre choix (a, b ou q) : ")`, puis un `switch` sur le texte.
2. Dans le `case "a"`, lire deux notes et afficher la moyenne arrondie avec les
   fonctions du fil rouge. Dans le `case "b"`, afficher le verdict avec le
   ternaire.
3. Taper `x` : le `default` répond.
4. Terminer par la question : _"Lou a tapé 7. Comment lui redemander sa note,
   autant de fois qu'il faut ?"_. On ne sait pas : il faut **répéter**. C'est
   la séance 07, et le troisième losange de la séance 01, celui dont la flèche
   remonte.

## Si la séance déborde

| Ce qui se comprime                                       | Ce qui ne se comprime jamais                          |
| :------------------------------------------------------- | :---------------------------------------------------- |
| La partie _Écrire_ des deux ateliers, à finir à la maison | Les parties _Prédire_ et _Réparer_ du premier atelier |
| La théorie `switch` et ternaire, réduite à la lecture     | Le bug 3 du premier atelier, `canVote` à 18           |
| La chasse aux cas non couverts                           | Le fil rouge qui décide, testé à 4                    |
| Le court-circuit et les `double`, renvoyés au support     | La règle des trois valeurs                            |
| Le live coding final                                     | Le quiz sur l'ordre des `else if`                     |

## La contrainte de progression

À cette séance, les personnes n'ont vu **ni boucle, ni tableau, ni méthode de
`String`**. Aucun exemple ne doit en contenir, y compris au tableau.

Les pièges propres à cette séance :

- **redemander une note invalide** : cela demande une boucle. La réponse est
  _"en séance 07"_, et c'est la meilleure transition possible ;
- **comparer deux `String`** : `equals` relève de la séance 09. En attendant,
  `switch` ;
- **vérifier qu'un texte tapé est un nombre** avant `Double.parseDouble` :
  impossible sans méthode de `String` ni exceptions. Le dire, ne pas
  contourner ;
- **`switch` sur un `long`** : `Math.round` rend un `long`, et
  `switch (Math.round(average))` ne compile pas. Ne pas s'y aventurer.

## L'évaluation écrite

L'évaluation du 9 novembre 2026 porte sur les séances 01 à 05, parce qu'une des
deux classes n'aura pas eu cette séance. Les conditions n'y apparaissent pas,
ni dans l'examen blanc. Le support le dit en tête de séance, en admonition.

Pour la classe qui passe l'évaluation **après** cette séance, la question
_"est-ce que les `if` sont à l'examen ?"_ viendra. La réponse est non, sans
nuance.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
