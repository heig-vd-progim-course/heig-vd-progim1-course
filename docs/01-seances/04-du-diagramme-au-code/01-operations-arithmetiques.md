# Les opérations arithmétiques

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Connaître les opérations de calcul dont dispose un programme Java, et l'ordre
dans lequel il les effectue. C'est l'outil de la colonne _"traitement"_ de
tous les problèmes de cette séance.

## Les cinq opérateurs

```java
System.out.println(7 + 2);
System.out.println(7 - 2);
System.out.println(7 * 2);
System.out.println(7 / 2);
System.out.println(7 % 2);
System.out.println(7.0 / 2);
```

```text
9
5
14
3
1
3.5
```

| Opérateur | Opération      | Remarque                                         |
| :-------- | :------------- | :----------------------------------------------- |
| `+`       | Addition       | Avec un `String`, colle au lieu d'additionner    |
| `-`       | Soustraction   |                                                  |
| `*`       | Multiplication | Pas de `x`, pas de `·`                           |
| `/`       | Division       | Entre deux entiers, la division est **entière**  |
| `%`       | Reste          | Le reste de la division entière, appelé modulo   |

Vous avez vu la division entière en séance 03 : `7 / 2` vaut `3`, parce que
`7` et `2` sont des `int`. Dès qu'un des deux est un `double`, le résultat est
un `double`.

## À quoi sert le reste

`%` paraît anecdotique. Il sert dès qu'on découpe une quantité en unités :

```java
int totalMinutes = 135;
int hours = totalMinutes / 60;
int minutes = totalMinutes % 60;
System.out.println(hours + " h " + minutes + " min");
```

```text
2 h 15 min
```

La division entière donne le nombre d'unités complètes, le reste donne ce qui
dépasse. Le même couple sert pour les secondes, les centimes, les jours de la
semaine.

## L'ordre des opérations

Java applique les règles des mathématiques : `*`, `/` et `%` avant `+` et `-`.
À priorité égale, de gauche à droite.

C'est la source du bogue le plus courant du fil rouge :

```java
double grade1 = 4.0;
double grade2 = 5.0;
System.out.println(grade1 + grade2 / 2);
System.out.println((grade1 + grade2) / 2);
```

```text
6.5
4.5
```

La première ligne calcule `4.0 + 2.5`. Aucune erreur, un résultat plausible
au premier coup d'oeil, et faux. Les parenthèses ne coûtent rien : dans le
doute, mettez-en.

### Quand l'ordre change le type

La conversion de Celsius en Fahrenheit, écrite de trois façons qui semblent
équivalentes :

```java
double celsius = 20;
System.out.println(celsius * 9 / 5 + 32);
System.out.println(9 / 5 * celsius + 32);
System.out.println(9.0 / 5 * celsius + 32);
```

```text
68.0
52.0
68.0
```

La deuxième ligne commence par `9 / 5`, deux entiers : cela vaut `1`, pas
`1.8`. Le calcul de gauche à droite fait que la division entière a lieu
**avant** que le `double` n'entre en jeu.

## Les raccourcis

Modifier une variable à partir de sa propre valeur est si fréquent que Java a
des raccourcis :

```java
int score = 10;
score += 5;
System.out.println(score);
score -= 3;
System.out.println(score);
score *= 2;
System.out.println(score);
score++;
System.out.println(score);
```

```text
15
12
24
25
```

`score += 5` est exactement `score = score + 5`. `score++` ajoute 1. Vous les
lirez partout ; rien ne vous oblige à les écrire.

## Ce que les opérateurs ne font pas : `Math`

Pas d'opérateur pour la puissance ou la racine carrée. On passe par `Math` :

```java
System.out.println(Math.pow(2, 10));
System.out.println(Math.sqrt(16));
System.out.println(Math.abs(-4.5));
System.out.println(Math.round(4.5));
System.out.println(Math.max(4.5, 5.2));
```

```text
1024.0
4.0
4.5
5
5.2
```

| Écriture          | Calcule                         |
| :---------------- | :------------------------------ |
| `Math.pow(a, b)`  | `a` puissance `b`               |
| `Math.sqrt(a)`    | La racine carrée de `a`         |
| `Math.abs(a)`     | La valeur absolue de `a`        |
| `Math.round(a)`   | `a` arrondi à l'entier le plus proche |
| `Math.max(a, b)`  | Le plus grand des deux          |

!!! warning "`^` n'est pas la puissance"

    ```java
    System.out.println(2 ^ 10);
    ```

    ```text
    8
    ```

    Le code compile et affiche un nombre. Ce n'est pas `1024` : en Java, `^`
    est une opération sur les bits, qui n'a rien à voir avec la puissance.
    Pour une puissance, c'est `Math.pow`.

## Diviser par zéro

```java
System.out.println(5.0 / 0);
System.out.println(0.0 / 0);
System.out.println(5 / 0);
```

```text
Infinity
NaN
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at Main.main(Main.java:5)
```

Avec des `double`, Java ne s'arrête pas : il rend `Infinity`, l'infini, ou
`NaN`, _"not a number"_. Avec des `int`, le programme s'arrête net. Ni l'un ni
l'autre n'est une bonne nouvelle : un `NaN` se propage silencieusement dans
tous les calculs qui suivent.

## Résumé

- Cinq opérateurs : `+`, `-`, `*`, `/`, `%`.
- `/` entre deux entiers est une division entière, `%` en donne le reste.
- `*`, `/` et `%` passent avant `+` et `-`. Dans le doute, des parenthèses.
- L'ordre de gauche à droite peut provoquer une division entière là où vous
  ne l'attendiez pas.
- Puissance, racine, arrondi : `Math`. Jamais `^`.

## Pour aller plus loin

- [Operators](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html) -
  tutoriel officiel, avec le tableau complet des priorités.
- [Math](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Math.html) -
  la liste complète des fonctions de `Math`.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
