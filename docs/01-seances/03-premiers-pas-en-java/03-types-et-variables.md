# Les types et les variables

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Rappel de la séance 01

Dans l'activité de dictée de dessin, vous aviez besoin de savoir d'où partait
le crayon pour que l'instruction suivante ait un sens. Nous avions appelé cela
l'**état**.

Une **variable**, c'est exactement cela : un endroit où le programme retient
quelque chose, avec un nom pour y revenir.

## Déclarer une variable

```java
int age = 20;
```

Trois éléments, dans l'ordre :

- `int` : le **type**, ce que la variable a le droit de contenir ;
- `age` : le **nom**, choisi par vous ;
- `20` : la **valeur** initiale.

Une fois déclarée, la variable se réutilise par son nom :

```java
int age = 20;
age = age + 1;
System.out.println(age);
```

```text
21
```

Le signe `=` n'est pas celui des mathématiques. `age = age + 1` ne dit pas que
`age` est égal à `age` plus un, ce qui serait faux. Il dit : **calcule
`age + 1`, et range le résultat dans `age`**. C'est une affectation, pas une
équation.

## Pourquoi déclarer un type

Parce que Java refuse de compiler si vous mettez autre chose que ce que vous
avez annoncé :

```java
int age = "vingt";
```

```text
error: incompatible types: String cannot be converted to int
```

C'est une contrainte, et c'est un service. Cette erreur apparaît sur votre
écran en trois secondes. Dans un langage qui ne vérifie rien, le même code
démarre, tourne, et plante plus tard, ailleurs, sans que rien n'indique d'où
cela vient.

## Les huit types primitifs

Java a exactement huit types de base. Ils s'écrivent en minuscules, et ce sont
les seuls qui ne sont pas des objets.

### Les nombres entiers

| Type    | Taille  | Valeur minimale            | Valeur maximale            |
| :------ | :------ | -------------------------: | -------------------------: |
| `byte`  | 8 bits  | -128                       | 127                        |
| `short` | 16 bits | -32 768                    | 32 767                     |
| `int`   | 32 bits | -2 147 483 648             | 2 147 483 647              |
| `long`  | 64 bits | -9 223 372 036 854 775 808 | 9 223 372 036 854 775 807  |

**En pratique, utilisez `int`.** C'est le choix par défaut, et il couvre
l'immense majorité des cas. Passez à `long` quand vous dépassez deux milliards,
ce qui arrive avec des durées en millisecondes ou des identifiants.

`byte` et `short` existent pour économiser la mémoire dans des contextes très
contraints. Vous n'en aurez pas besoin cette année.

Un `long` s'écrit avec un `L` à la fin, et on peut aérer les grands nombres
avec des traits de soulignement :

```java
long population = 9_000_000_000L;
System.out.println(population);
```

```text
9000000000
```

### Les nombres à virgule

| Type     | Taille  | Chiffres significatifs environ |
| :------- | :------ | :----------------------------- |
| `float`  | 32 bits | 7                              |
| `double` | 64 bits | 15 à 16                        |

**Utilisez `double`.** `float` n'économise que quatre octets et perd beaucoup
de précision ; il n'a d'intérêt que dans des cas très particuliers.

### Les deux autres

| Type      | Contient                       | Exemple          |
| :-------- | :----------------------------- | :--------------- |
| `char`    | Un seul caractère              | `char c = 'A';`  |
| `boolean` | Vrai ou faux, rien d'autre     | `boolean ok = true;` |

Un `char` se note avec des apostrophes simples. Il est stocké comme un nombre :

```java
char lettre = 'A';
System.out.println(lettre);
System.out.println((int) lettre);
System.out.println((char) (lettre + 1));
System.out.println('A' + 1);
```

```text
A
65
B
66
```

Les deux dernières lignes méritent qu'on s'y arrête : `(char) (lettre + 1)`
donne `B`, mais `'A' + 1` sans conversion donne `66`. Java a additionné deux
nombres et vous a rendu un nombre.

Le `boolean` ne peut valoir que `true` ou `false`. Pas `0`, pas `1`, pas
`"oui"`. C'est le type sur lequel reposeront toutes les conditions de la
séance 05.

### Et `String` ?

`String` contient du texte et s'écrit avec une majuscule, parce que **ce n'est
pas un type primitif** : c'est une classe. Nous verrons ce que cela implique en
ProgIM2. Pour l'instant, il s'utilise comme les autres, avec des guillemets
doubles :

```java
String prenom = "Camille";
System.out.println("Bonjour " + prenom);
```

```text
Bonjour Camille
```

## La division entière, premier piège

```java
System.out.println(7 / 2);
System.out.println(7 % 2);
System.out.println(7.0 / 2);
```

```text
3
1
3.5
```

Quand les deux opérandes sont des entiers, Java fait une **division entière** :
il garde le quotient et jette le reste. `7 / 2` vaut `3`, pas `3.5`.

L'opérateur `%`, appelé **modulo**, donne ce reste. Il vous servira
constamment : tester la parité, boucler sur un cycle, formater un affichage.

Pour obtenir une division décimale, il suffit qu'un seul des deux soit décimal.

Appliqué au problème du semestre :

```java
int premiereNote = 5;
int deuxiemeNote = 4;
int troisiemeNote = 5;

int somme = premiereNote + deuxiemeNote + troisiemeNote;

System.out.println(somme / 3);
System.out.println((double) somme / 3);
```

```text
4
4.666666666666667
```

La première ligne est fausse, et elle ne produit **aucune erreur**. Le
programme compile, s'exécute, affiche un résultat plausible, et il est faux.
C'est exactement le type de bogue que le compilateur ne peut pas attraper pour
vous.

## La virgule flottante, le vrai piège

Tapez ceci et exécutez-le.

```java
System.out.println(0.1 + 0.2);
```

```text
0.30000000000000004
```

Ce n'est pas un bogue de Java. Vous obtiendrez exactement la même chose en
Python, en JavaScript, en C et dans votre tableur.

### Pourquoi

Un `double` est stocké en binaire, sur 64 bits. En binaire, on écrit les
nombres comme des sommes de puissances de deux : un demi, un quart, un
huitième, et ainsi de suite.

Avec ces briques, `0.5` s'écrit exactement. `0.25` aussi. Mais `0.1` ne tombe
jamais juste : il faudrait une infinité de termes. L'ordinateur s'arrête donc
au bit près et garde la valeur représentable la plus proche.

C'est le même phénomène qu'un tiers en décimal : `0,3333...` ne se termine
jamais, et si vous écrivez `0,33`, vous avez déjà perdu quelque chose.

Deux approximations minuscules, additionnées, donnent une erreur visible.

### Ce qui en découle

L'erreur s'accumule à chaque opération :

```java
double somme = 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1;
System.out.println(somme);
```

```text
0.9999999999999999
```

Dix fois un dixième ne font pas un. Chaque addition ajoute sa petite erreur à
celle des précédentes.

Le cas le plus traître est celui-ci :

```java
double total = 1.1 + 1.1 + 1.1;
System.out.println(total);
System.out.println(total == 3.3);
```

```text
3.3000000000000003
false
```

Le résultat affiché a l'air juste au premier coup d'oeil, et la comparaison
répond pourtant `false`.

### `float` ment encore mieux

```java
System.out.println(0.1f + 0.2f);
System.out.println(0.1 + 0.2);
```

```text
0.3
0.30000000000000004
```

Le `float` affiche `0.3`, ce qui est rassurant et faux : il a si peu de
précision que l'affichage arrondit l'erreur. Le `double` est plus précis, donc
plus honnête. C'est une raison de plus de préférer `double` : un type qui cache
ses erreurs est pire qu'un type qui les montre.

### La règle à retenir

!!! danger "Ne comparez jamais deux nombres à virgule avec `==`"

    ```java
    System.out.println(0.1 + 0.2 == 0.3);
    ```

    ```text
    false
    ```

    Cette ligne est fausse, elle compile, elle ne produit aucun avertissement,
    et le bogue qui en résulte est très difficile à trouver.

Trois solutions, selon le besoin.

=== "Comparer à une tolérance près"

    Pour savoir si deux valeurs sont « assez proches » :

    ```java
    System.out.println(Math.abs((0.1 + 0.2) - 0.3) < 1e-9);
    ```

    ```text
    true
    ```

    `1e-9` se lit « un milliardième ». C'est la méthode courante en calcul
    scientifique.

=== "Arrondir à l'affichage"

    Pour afficher un résultat propre sans toucher au calcul :

    ```java
    System.out.printf("%.2f%n", 0.1 + 0.2);
    ```

    ```text
    0.30
    ```

    `%.2f` veut dire « un nombre à virgule, deux décimales ». `%n` est le
    passage à la ligne.

    Attention : cela change seulement ce qui est affiché. La valeur en mémoire
    reste approximative.

=== "Ne pas utiliser de virgule du tout"

    Pour de l'argent, la bonne réponse est souvent de **compter en centimes**,
    avec des entiers. Pas de virgule, pas d'approximation.

    Un `BigDecimal` existe aussi, et il calcule en décimal exact. Il est plus
    verbeux et plus lent ; vous le rencontrerez plus tard.

!!! tip "Une bonne nouvelle pour nos moyennes"

    Comparer une moyenne à un seuil avec `>=` fonctionne presque toujours :
    l'erreur est de l'ordre du quadrillionième et ne fait pas basculer un
    résultat de part et d'autre de 4.0.

    C'est `==` qui casse, et l'accumulation d'un grand nombre d'additions.
    Gardez la règle simple : `>=` et `<=` sur des `double`, oui ; `==`,
    jamais.

## Les conversions

### Automatiques, quand rien ne se perd

```java
int entier = 5;
double decimal = entier;
System.out.println(decimal);
```

```text
5.0
```

Un `int` entre sans problème dans un `double` : aucune information n'est
perdue.

### Explicites, quand quelque chose se perd

L'inverse exige que vous le demandiez, par un **transtypage** :

```java
double note = 3.99;
int tronque = (int) note;
System.out.println(tronque);
```

```text
3
```

Notez que cela **tronque** et n'arrondit pas. `3.99` devient `3`. Pour
arrondir, il y a `Math.round`.

Java vous oblige à écrire `(int)` parce qu'il veut une confirmation : vous êtes
en train de jeter de l'information, et il refuse de le faire dans votre dos.

### Le dépassement de capacité

```java
System.out.println(Integer.MAX_VALUE);
System.out.println(Integer.MAX_VALUE + 1);
```

```text
2147483647
-2147483648
```

Ajouter un au plus grand `int` donne le plus petit. Le compteur a fait le tour,
comme un compteur kilométrique mécanique qui repasse à zéro.

Aucune erreur, aucun avertissement. Le programme continue avec une valeur
absurde. C'est pour cela qu'on choisit son type en pensant à l'ordre de
grandeur des valeurs attendues.

### La concaténation, qui surprend tout le monde

```java
System.out.println("1" + 2 + 3);
System.out.println(1 + 2 + "3");
```

```text
123
33
```

Java lit de gauche à droite. Dans le premier cas, il rencontre d'abord du texte
et colle tout. Dans le second, il additionne `1 + 2` puis colle `"3"` au
résultat.

## Nommer ses variables

Les règles du cours, et les conventions de Java :

- en **anglais** : `averageGrade`, pas `moyenneNote` ;
- en **camelCase** : première lettre minuscule, puis une majuscule par mot ;
- un nom qui dit **ce que la variable contient**, pas son type :
  `studentCount`, pas `nbInt` ;
- pas d'abréviation sauf si elle est universelle : `index` plutôt que `idx` ;
- une `CONSTANTE` en majuscules avec des traits de soulignement.

```java
// Correct
int studentCount = 24;
double averageGrade = 4.7;
final double PASSING_GRADE = 4.0;

// À éviter
int n = 24;
double x2 = 4.7;
double passing_grade = 4.0;
```

Le mot-clé `final` déclare une **constante** : une variable qu'on ne peut plus
modifier après sa création. C'est la réponse au problème que vous avez
rencontré en séance 02, quand une même valeur était écrite à deux endroits et
que vous n'en aviez changé qu'un. Une constante n'existe qu'à un seul endroit.

## Atelier

Dans votre projet `hello-world`. Chaque exercice se fait en modifiant le
fichier et en relançant.

1. Déclarez une variable pour votre prénom, une pour votre âge, une pour votre
   taille en mètres. Affichez une phrase les utilisant toutes les trois. Quels
   types avez-vous choisis, et pourquoi ?
2. Affichez le résultat de `0.1 + 0.2`. Puis affichez-le arrondi à deux
   décimales.
3. Calculez la moyenne de trois notes stockées dans trois variables `int`.
   Obtenez d'abord le résultat faux, puis corrigez-le. Expliquez à voix haute à
   la personne à côté de vous d'où venait l'erreur.
4. Trouvez par vous-même la valeur de `Integer.MAX_VALUE + 2`. Prédisez avant
   d'exécuter.
5. Déclarez une constante `PASSING_GRADE` à 4.0, puis essayez de la modifier à
   la ligne suivante. Lisez le message d'erreur et reformulez-le avec vos mots.
6. Que vaut `(int) -3.99` ? Prédisez, puis vérifiez. Est-ce que cela vous
   surprend ?

L'exercice 3 est celui qui compte. C'est le bogue que vous referez tous dans le
mini-projet.

## Résumé

- Une variable est un état que le programme retient, avec un type, un nom et
  une valeur.
- Huit types primitifs. En pratique : `int`, `double`, `boolean`, parfois
  `char` et `long`.
- La division de deux entiers est entière, et le compilateur ne vous
  préviendra pas.
- Les nombres à virgule sont approchés, et l'erreur s'accumule à chaque
  opération. Jamais de `==` sur un `double`.
- Une conversion qui perd de l'information doit être demandée explicitement.
- Un nom de variable dit ce qu'elle contient. Une valeur fixe devient une
  constante `final`.

## Pour aller plus loin

- [Primitive data types](https://dev.java/learn/language-basics/primitive-types/) -
  tutoriel officiel.
- [What Every Computer Scientist Should Know About Floating-Point Arithmetic](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html) -
  l'article de référence de David Goldberg, 1991. Exigeant, et la réponse
  complète à la question du jour.
- [0.30000000000000004.com](https://0.30000000000000004.com/) - le même calcul
  dans une cinquantaine de langages, pour se convaincre que ce n'est pas la
  faute de Java.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
