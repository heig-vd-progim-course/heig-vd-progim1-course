# Séance 05 - Fonctions et portée des variables

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Notes pour l'équipe enseignante. Le support de cours de cette séance est
[ici](../01-seances/05-fonctions-et-portee/index.md).

## Ce que la séance doit produire

**Chaque personne sait dire, devant un appel de fonction, quelle valeur entre,
où elle va, et quelle valeur revient. Et elle repart avec un fil rouge dont le
`main` ne fait plus que lire, appeler et afficher.**

Si une seule chose reste : un paramètre est une variable qui reçoit une
**copie** de l'argument, et une valeur ne sort d'une fonction que par
`return`.

## Pourquoi cette approche

Les paramètres, le passage de paramètres et les valeurs de retour sont décrits
dans la littérature comme un **concept seuil** : une notion qui bloque tant
qu'elle n'est pas comprise, et qui transforme la manière de voir les
programmes une fois qu'elle l'est (Kallia et Sentance, 2021). D'où les choix
suivants, chacun appuyé sur une source ou une pratique établie.

| Choix                                                          | Raison                                                                                                                            |
| :------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| Partir des trois colonnes de la séance 04                      | Ancrer le vocabulaire nouveau dans une structure déjà acquise : entrées, traitement, sortie deviennent paramètres, corps, retour |
| Montrer d'abord les fonctions qu'ils utilisent déjà            | Utiliser avant de créer, comme dans PRIMM (_Predict, Run, Investigate, Modify, Make_) de Sentance et Waite                        |
| Faire prédire avant d'exécuter                                 | Idem. Une prédiction fausse localise l'idée fausse, une exécution seule ne le fait pas                                            |
| Des noms différents pour l'argument et le paramètre            | Idée fausse répertoriée : _"les noms des arguments doivent correspondre à ceux des paramètres"_                                  |
| La portée par l'erreur, avant la règle                         | Notion la plus abstraite du semestre. Le message du compilateur rend le problème concret                                         |
| Des exemples complets, numérotés, les lignes utiles surlignées | Les personnes peinent encore avec le cadre `public class Main`. Un fichier partiel ne s'exécute pas tel quel                      |
| Des bugs placés exprès dans l'atelier                          | Lire et corriger un programme faux oblige à suivre l'exécution ligne à ligne                                                      |

Le tutoriel OpenClassrooms dont l'ordre du semestre s'inspire a été relu. Il
part de la signature de `main`, décompose ses cinq éléments, puis passe aux
fonctions sans paramètre, avec paramètre, avec retour, et termine par la
récursivité. Deux réserves :

- il appelle _"signature"_ toute la première ligne, alors que la documentation
  officielle de Java la limite au nom et aux types des paramètres ;
- il ne distingue pas paramètre et argument.

Le support suit la définition officielle et le signale, pour que les personnes
qui lisent les deux ne soient pas perdues. La récursivité est laissée de côté :
elle suppose une condition d'arrêt, donc la séance 06.

### Sources

- M. Kallia et S. Sentance, _Threshold concepts, conceptions and skills:
  teachers' experiences with students' engagement in functions_, Journal of
  Computer Assisted Learning 37(2), 2021.
  [Notice](https://eprints.gla.ac.uk/229008).
- L. Margulieux, B. Morrison et A. Decker, _Design and pilot testing of
  subgoal labeled worked examples for five core concepts in CS1_, ITiCSE 2019.
  [Notice](https://researchconnect.buffalo.edu/en/publications/design-and-pilot-testing-of-subgoal-labeled-worked-examples-for-f/).
  Les commentaires de `main` repris des rectangles du diagramme jouent le rôle
  des étiquettes de sous-objectifs.
- [Catalogue d'idées fausses en programmation](https://tha.de/misconceptions),
  rubriques _Functions_, _Parameters_, _Return values_ et _Scope_.
- [Defining Methods](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)
  et
  [Passing Information to a Method](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html),
  tutoriel officiel de Java : définition de la signature, distinction
  paramètre et argument.
- [Exécutez des fonctions](https://openclassrooms.com/fr/courses/8383791-apprenez-a-programmer-en-java/8439602-executez-des-fonctions),
  OpenClassrooms.

## Avant la séance

| Quoi                                     | Détail                                                                                     |
| :--------------------------------------- | :----------------------------------------------------------------------------------------- |
| Exécuter les exemples avec un JDK 25     | Les sorties du support ont été obtenues sur JDK 21. Voir ci-dessous                        |
| Ouvrir le Java Visualizer de Python Tutor | Préparer l'exemple `addBonus` du support pour la démonstration de la portée              |
| Récupérer deux ou trois fils rouges      | Ceux de la séance 04, pour le rappel. Idéalement un avec la ligne `/ 10` fautive           |
| Préparer le tableau                      | Les trois colonnes de la séance 04, à transformer en direct en paramètres, corps, retour  |

### Les sorties ont été obtenues sur JDK 21

Comme pour la séance 04, aucun JDK 25 n'était disponible à la rédaction. Les
exemples de cette séance n'utilisent presque pas `IO.readln`, et aucune
fonction propre au JDK 25. Les messages de compilation (`cannot find symbol`,
`missing return statement`, `unreachable statement`, `incompatible types`,
`cannot be applied to given types`) ont le même format depuis de nombreuses
versions. À vérifier quand même, en particulier la ligne `Note: Some messages
have been simplified` de l'exemple du mauvais type d'argument.

### Le Java Visualizer de Python Tutor

[pythontutor.com/java.html](https://pythontutor.com/java.html) montre, pas à
pas, un cadre par appel de fonction avec ses variables. C'est l'outil qui rend
la portée visible : on voit le `grade` de `main` et le `grade` de `addBonus`
côte à côte, avec des valeurs différentes.

Il ne connaît pas `IO.readln`. L'utiliser uniquement sur des programmes sans
saisie, ce qui est le cas de presque tous les exemples du support.

## Rappel et cadrage

Reprendre les trois colonnes de la séance 04 au tableau, sur la moyenne :
_deux notes_, _(a + b) / 2_, _la moyenne_. Puis réécrire les titres des
colonnes en direct : **paramètres**, **corps**, **valeur de retour**. Tout le
reste de la séance accroche son vocabulaire à ce tableau. Le laisser affiché.

Si un fil rouge de la séance 04 contient une erreur d'arrondi copiée (`/ 10`),
le montrer : c'est la motivation de la séance, sortie des copies de la classe.

## Pendant la théorie - Écrire et appeler une fonction

### Ce qu'il faut faire

- **Faire prédire.** Avant chaque sortie, demander à la salle ce qui va
  s'afficher. Surtout pour `walkingMinutes(5, 3)` et pour la valeur rendue
  ignorée (`Moyenne : 3.9499999999999997`).
- **Dérouler l'exécution à voix haute, avec les numéros de ligne.** _"Ligne
  12, `main` se met en pause. Ligne 3, `value` vaut 3.95. Ligne 4, on rend
  4.0. Retour ligne 12."_ Les numéros sont dans le support exprès.
- **Insister sur la copie.** L'argument est évalué, puis sa valeur est copiée
  dans le paramètre. Tout le reste en découle : les noms qui n'ont pas besoin
  de correspondre, l'ordre qui compte, le paramètre qu'on peut modifier sans
  toucher à l'argument.

### Ce qui rate habituellement

- **Écrire la fonction dans `main`.** Les accolades se mélangent, IntelliJ
  souligne tout. Montrer le fichier entier et pointer les deux niveaux.
- **Répéter le type à l'appel** : `roundToTenth(double average)`. Idée fausse
  répertoriée. Le compilateur répond par une erreur peu lisible ; corriger
  oralement : _"le type, c'est dans l'en-tête ; à l'appel, on donne une
  valeur"_.
- **Afficher au lieu de rendre.** C'est l'erreur la plus fréquente, et la plus
  coûteuse pour la suite : une fonction qui affiche ne peut pas servir en
  séance 06 pour décider. Le bug 2 de l'atelier la provoque exprès.
- **Croire que la fonction modifie la variable passée.** `roundToTenth(average);`
  seul sur sa ligne. Le programme compile, et la moyenne n'est pas arrondie.

### Le vocabulaire

Exiger les mots justes à l'oral dès cette séance : _"tu passes quel argument ?
il arrive dans quel paramètre ?"_. Le support donne un tableau de
correspondance ; le projeter en fin de partie.

Sur la signature : la définition officielle (nom et types des paramètres) sert
surtout plus tard, pour la surcharge, qui n'est pas au programme de ProgIM1.
Ne pas s'y attarder au-delà de ce que dit le support. Si une personne cite
OpenClassrooms, lui donner raison sur l'usage courant et renvoyer à la
documentation officielle.

`public static` : ne pas expliquer. _"Le même cadre que `main`, on y
reviendra"_. Toute tentative d'expliquer `static` en séance 05 coûte dix
minutes et ne sert à rien aujourd'hui.

## Pendant la théorie - Une fonction en appelle une autre, la portée

### Ce qu'il faut faire

Suivre l'ordre du support : l'erreur d'abord, la règle ensuite.

1. Projeter le programme où `main` utilise `average`. Faire prédire : _"ça
   compile ?"_. La majorité dit oui.
2. Compiler, lire le message ensemble. `cannot find symbol`, ligne 9.
3. Seulement alors, énoncer la règle : une variable existe de sa déclaration
   à l'accolade fermante de son bloc.
4. Démonstration de `addBonus` dans le Java Visualizer : deux cadres, deux
   `grade`.

### Ce qui rate habituellement

- **Penser qu'une variable de même nom est la même variable.** L'exemple
  `addBonus` est là pour cela. Insister : _"deux variables qui portent le même
  nom, comme deux personnes qui s'appellent Camille"_. Pas plus loin, l'analogie
  s'use vite.
- **Vouloir déclarer une variable hors de toute fonction** pour qu'elle soit
  visible partout. Le support l'autorise uniquement pour les constantes, dans
  un bloc repliable. Ne pas montrer de variable de classe modifiable : c'est
  une mauvaise habitude qui se prend très vite et se perd très lentement.

### Ce qu'il ne faut pas faire

Ne pas parler de pile d'appels, de mémoire, de passage par référence. Les
types primitifs suffisent cette semaine : tout est copie. La question des
tableaux passés en paramètre viendra en séance 08.

## Pendant l'atelier

### Prédire

Exiger les prédictions **écrites** avant l'exécution. Passer dans les rangs
pendant les cinq premières minutes. Une personne qui exécute avant d'avoir
écrit ne peut plus savoir ce qu'elle pensait.

Les quatre programmes visent chacun une idée fausse :

| Programme | Idée fausse visée                                         |
| :-------- | :-------------------------------------------------------- |
| A         | La fonction modifie l'argument. Appels imbriqués           |
| B         | Les appels s'exécutent dans un autre ordre que l'écriture |
| C         | Deux `x` sont la même variable. Une valeur rendue est rangée toute seule |
| D         | Le type de retour `double` rattrape une division entière  |

Le programme D est le plus intéressant à débriefer : beaucoup prédisent 4.5.

### Réparer

Les trois bugs sont de nature différente, exprès : deux erreurs de
compilation, puis un résultat faux sans erreur. Le bug 3 est le plus
important. Faire calculer la bonne réponse à la main **avant** l'exécution,
sinon personne ne voit que 4.3 est faux. C'est une note insuffisante qui
devient suffisante : le dire.

### Le fil rouge

- **L'étape 1 est celle qu'on saute.** Les personnes veulent brancher la
  saisie tout de suite. Exiger de voir les cinq lignes de test avant de passer
  à l'étape 2 : c'est le premier test unitaire de leur vie, sans le nom.
- `readGrade` lit au clavier : rappeler qu'elle n'est pas une fonction de
  calcul, et que la règle de l'atelier ne la concerne pas.
- À l'étape 3, beaucoup écrivent trois fois le bloc complet dans `main`. Leur
  demander combien de fois la formule de la moyenne apparaît dans le fichier.
  `processPerson()` sans paramètre surprend : l'indice est dans l'énoncé.
- L'étape 4 provoque volontairement l'erreur de portée sur leur propre code.
  Ne pas la sauter : c'est le moment où la règle devient la leur.

### Les extensions

`formatDuration` montre qu'une fonction peut rendre un `String`. `splitBill`
fait appeler une fonction par une autre. `computeFinalGrade` ramène les
constantes, et la question de leur portée.

## Discussion et clôture

Projeter deux fils rouges. Ne montrer que `main` et demander : _"que fait ce
programme ?"_. Si la classe répond sans lire les fonctions, les noms sont
bons.

Clore sur la séance 06 : _"votre `computeAverage` accepte encore 7 comme
note. La semaine prochaine, une fonction `isValidGrade` vous dira si une note
est valable, et une fonction `hasPassed` si la moyenne suffit."_ Ce sont deux
fonctions qui rendent un `boolean` : la séance 06 en dépend.

## Si la séance déborde

| Ce qui se comprime                           | Ce qui ne se comprime jamais                     |
| :------------------------------------------- | :----------------------------------------------- |
| Les extensions de l'atelier                  | La partie _Prédire_                              |
| L'étape 3 du fil rouge, à finir à la maison  | La partie _Réparer_, en particulier le bug 3     |
| Le bloc repliable sur les constantes         | La portée montrée par l'erreur avant la règle    |
| La démonstration du Java Visualizer          | Le tableau des trois colonnes réécrit en direct  |
| La discussion finale, réduite à un exemple   | _"Afficher n'est pas rendre"_                    |

## La contrainte de progression

À cette séance, les personnes n'ont vu **ni condition, ni boucle, ni tableau,
ni méthode de `String`**. Aucun exemple ne doit en contenir, y compris au
tableau.

Les pièges propres à cette séance :

- montrer une fonction `max(a, b)` ou `isPassing(grade)` : elles demandent un
  `if` ou une comparaison, réservés à la séance 06 ;
- montrer la récursivité, comme le fait OpenClassrooms : elle demande une
  condition d'arrêt ;
- répondre à _"comment éviter les trois `processPerson()` ?"_ par une boucle.
  La bonne réponse : _"en séance 07"_.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
