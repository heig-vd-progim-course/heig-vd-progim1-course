# `switch` et l'opérateur ternaire

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Deux écritures plus courtes de ce que vous savez déjà faire avec `if` et
`else`. L'opérateur ternaire choisit entre **deux valeurs**, `switch` choisit
parmi **plusieurs valeurs exactes**.

Rien sur cette page n'est indispensable : tout peut s'écrire avec `if`,
`else if` et `else`. Mais vous croiserez ces deux formes partout, et elles
rendent certains programmes plus lisibles.

## L'opérateur ternaire

### Choisir entre deux valeurs

Le fil rouge choisit un mot selon une condition :

=== "Avant"

    ```java title="Main.java" linenums="1" hl_lines="8 10-14"
    public class Main {
        public static boolean hasPassed(double average) {
            return average >= 4;
        }

        public static void main(String[] args) {
            double average = 4.5;
            String verdict;

            if (hasPassed(average)) {
                verdict = "réussi";
            } else {
                verdict = "échoué";
            }
            System.out.println("Verdict : " + verdict);
        }
    }
    ```

=== "Après"

    ```java title="Main.java" linenums="1" hl_lines="8"
    public class Main {
        public static boolean hasPassed(double average) {
            return average >= 4;
        }

        public static void main(String[] args) {
            double average = 4.5;
            String verdict = hasPassed(average) ? "réussi" : "échoué";
            System.out.println("Verdict : " + verdict);
        }
    }
    ```

```text
Verdict : réussi
```

La déclaration, le `if` et le `else` des lignes 8 à 14 deviennent la seule
ligne 8. Elle se lit : _"`verdict` vaut, si `hasPassed(average)`, alors
`"réussi"`, sinon `"échoué"`"_.

```text
condition ? valeur si vrai : valeur si faux
```

On l'appelle **ternaire** parce qu'il a trois opérandes : la condition et les
deux valeurs. C'est le seul opérateur de Java dans ce cas.

Le résultat est une **valeur**, comme `2 + 3`. On peut le ranger dans une
variable, le rendre avec `return`, ou le passer en argument :
`System.out.println(hasPassed(average) ? "réussi" : "échoué");`.

### Pour des valeurs, pas pour des actions

L'opérateur ternaire choisit une valeur. Il ne choisit pas entre deux actions :

```java title="Main.java" linenums="1" hl_lines="4"
public class Main {
    public static void main(String[] args) {
        double average = 4.5;
        (average >= 4) ? System.out.println("Réussi") : System.out.println("Échoué");
    }
}
```

```text
Main.java:4: error: not a statement
        (average >= 4) ? System.out.println("Réussi") : System.out.println("Échoué");
                       ^
1 error
```

Une ligne qui ne contient qu'une valeur n'est pas une instruction : Java ne
sait pas quoi en faire. Pour faire l'une ou l'autre chose, c'est `if` et
`else`.

### Inutile pour rendre `true` ou `false`

```java title="Main.java" linenums="1" hl_lines="3"
public class Main {
    public static boolean hasPassed(double average) {
        return (average >= 4) ? true : false;
    }

    public static void main(String[] args) {
        System.out.println(hasPassed(4.5));
    }
}
```

```text
true
```

C'est juste, et c'est le même détour que le `if` qui rend `true` ou `false` de
la première page. `average >= 4` vaut déjà `true` ou `false` :
`return average >= 4;` suffit.

<div class="quiz" markdown>

Que contient `price` après
`int price = (age < 16) ? 10 : 20;`, avec `age` qui vaut 16 ?

- [ ] `10`
- [x] `20`
- [ ] `true`
- [ ] Rien, la ligne ne compile pas

<div class="quiz-explanation" markdown>

`16 < 16` est faux : on prend la valeur après les deux-points, 20. L'opérateur
ternaire rend une valeur du type des deux possibilités, ici un `int`, jamais le
`boolean` de la condition.

</div>

</div>

## `switch` : choisir parmi des valeurs exactes

### Une longue suite de `else if`

Donner le nom d'un jour à partir de son numéro, de 1 pour lundi à 7 pour
dimanche :

=== "Avant"

    ```java title="Main.java" linenums="1" hl_lines="3-19"
    public class Main {
        public static String dayName(int day) {
            if (day == 1) {
                return "lundi";
            } else if (day == 2) {
                return "mardi";
            } else if (day == 3) {
                return "mercredi";
            } else if (day == 4) {
                return "jeudi";
            } else if (day == 5) {
                return "vendredi";
            } else if (day == 6) {
                return "samedi";
            } else if (day == 7) {
                return "dimanche";
            } else {
                return "inconnu";
            }
        }

        public static void main(String[] args) {
            System.out.println(dayName(1));
            System.out.println(dayName(5));
            System.out.println(dayName(9));
        }
    }
    ```

=== "Après"

    ```java title="Main.java" linenums="1" hl_lines="3-12"
    public class Main {
        public static String dayName(int day) {
            return switch (day) {
                case 1 -> "lundi";
                case 2 -> "mardi";
                case 3 -> "mercredi";
                case 4 -> "jeudi";
                case 5 -> "vendredi";
                case 6 -> "samedi";
                case 7 -> "dimanche";
                default -> "inconnu";
            };
        }

        public static void main(String[] args) {
            System.out.println(dayName(1));
            System.out.println(dayName(5));
            System.out.println(dayName(9));
        }
    }
    ```

```text
lundi
vendredi
inconnu
```

Les deux versions affichent la même chose. Dans la première, `day ==` est
répété sept fois. Dans la seconde, `day` n'est écrit qu'une fois, ligne 3, et
chaque ligne `case` ne contient que ce qui change : la valeur et le résultat.

| Morceau              | Rôle                                                 |
| :------------------- | :--------------------------------------------------- |
| `switch (day)`       | La valeur à examiner, écrite une seule fois          |
| `case 1 -> "lundi";` | Si `day` vaut **exactement** 1, le résultat est ce qui suit la flèche |
| `default -> ...;`    | Toutes les autres valeurs, comme le `else` final     |
| `};`                 | Le `switch` est une valeur : la ligne 3 se termine ici, d'où le `;` |

Ici, le `switch` **rend une valeur**, comme l'opérateur ternaire : on la rend
directement avec `return`.

### Plusieurs valeurs par `case`

Un `case` peut accepter plusieurs valeurs, séparées par des virgules :

```java title="Main.java" linenums="1" hl_lines="3-8"
public class Main {
    public static int daysInMonth(int month) {
        return switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> 28;
            default -> 0;
        };
    }

    public static void main(String[] args) {
        System.out.println(daysInMonth(1));
        System.out.println(daysInMonth(4));
        System.out.println(daysInMonth(2));
        System.out.println(daysInMonth(13));
    }
}
```

```text
31
30
28
0
```

Avec des `else if`, la ligne 4 aurait été
`(month == 1) || (month == 3) || (month == 5) || ...`, sept comparaisons.

Les années bissextiles sont laissées de côté : vous les ajouterez dans
l'atelier.

### Un `default` obligatoire

```java title="Main.java" linenums="1" hl_lines="3"
public class Main {
    public static String dayName(int day) {
        return switch (day) {
            case 1 -> "lundi";
            case 2 -> "mardi";
            case 3 -> "mercredi";
            case 4 -> "jeudi";
            case 5 -> "vendredi";
            case 6 -> "samedi";
            case 7 -> "dimanche";
        };
    }

    public static void main(String[] args) {
        System.out.println(dayName(1));
    }
}
```

```text
Main.java:3: error: the switch expression does not cover all possible input values
        return switch (day) {
               ^
1 error
```

Un `switch` qui rend une valeur doit en rendre une pour **toutes** les valeurs
possibles. Un `int` peut valoir 8, 0 ou -12 : sans `default`, que rendre ?
C'est le même raisonnement que le `missing return statement`.

### Un `switch` qui agit

Un `switch` peut aussi **faire** quelque chose dans chaque cas, au lieu de
rendre une valeur. Après la flèche, on met alors une instruction. Il marche
aussi avec du texte :

```java title="Main.java" linenums="1" hl_lines="5-10"
public class Main {
    public static void main(String[] args) {
        String choice = IO.readln("Votre choix (a, b ou q) : ");

        switch (choice) {
            case "a" -> System.out.println("Calculer une moyenne");
            case "b" -> System.out.println("Afficher le verdict");
            case "q" -> System.out.println("Au revoir");
            default -> System.out.println("Choix inconnu : " + choice);
        }
    }
}
```

=== "On tape a"

    ```text
    Votre choix (a, b ou q) : a
    Calculer une moyenne
    ```

=== "On tape b"

    ```text
    Votre choix (a, b ou q) : b
    Afficher le verdict
    ```

=== "On tape x"

    ```text
    Votre choix (a, b ou q) : x
    Choix inconnu : x
    ```

Ce `switch` ne rend rien : pas de `return` devant, pas de `;` après l'accolade
fermante.

!!! danger "Ne comparez pas du texte avec `==`"

    Avec un `if`, l'idée naturelle serait `if (choice == "a")`. Elle compile, et
    elle est fausse :

    ```java title="Main.java" linenums="1" hl_lines="5"
    public class Main {
        public static void main(String[] args) {
            String choice = IO.readln("Votre choix (a, b ou q) : ");

            if (choice == "a") {
                System.out.println("Calculer une moyenne");
            } else {
                System.out.println("Choix inconnu : " + choice);
            }
        }
    }
    ```

    ```text
    Votre choix (a, b ou q) : a
    Choix inconnu : a
    ```

    On a tapé `a`, et le programme répond que `a` est inconnu. Pour un
    `String`, `==` ne compare pas le texte. Pourquoi, et comment comparer du
    texte correctement, c'est la séance 09. D'ici là, pour réagir à un texte
    tapé au clavier, utilisez un `switch`.

### Ce que `switch` ne sait pas faire

Un `case` teste une **égalité exacte**. Il ne sait pas dire _"5.5 ou plus"_ :
pour des intervalles, c'est `else if`.

Et il n'accepte pas les `double` :

```java title="Main.java" linenums="1" hl_lines="3-6"
public class Main {
    public static String describe(double average) {
        return switch (average) {
            case 6 -> "Excellent";
            case 5 -> "Bien";
            case 4 -> "Suffisant";
            default -> "Insuffisant";
        };
    }

    public static void main(String[] args) {
        System.out.println(describe(5));
    }
}
```

```text
Main.java:3: error: primitive patterns are a preview feature and are disabled by default.
        return switch (average) {
                      ^
  (use --enable-preview to enable primitive patterns)
Main.java:4: error: constant label of type int is not compatible with switch selector type double
            case 6 -> "Excellent";
                 ^
Main.java:5: error: constant label of type int is not compatible with switch selector type double
            case 5 -> "Bien";
                 ^
Main.java:6: error: constant label of type int is not compatible with switch selector type double
            case 4 -> "Suffisant";
                 ^
4 errors
```

Le message est long et parle de choses que vous ne connaissez pas. Retenez la
ligne qui compte : `switch selector type double`. Un `switch` sur un `double`
ne fonctionne pas en Java 25, et ce ne serait de toute façon pas une bonne
idée : on a vu qu'on ne compare pas deux `double` avec `==`.

<div class="quiz" markdown>

Pour laquelle de ces fonctions un `switch` est-il le bon choix ?

- [ ] `describe(double average)`, qui rend l'appréciation d'une moyenne
- [ ] `ticketPrice(int age)`, gratuit avant 6 ans, 10 francs avant 16 ans
- [x] `monthName(int month)`, qui rend _"janvier"_ pour 1, _"février"_ pour 2...
- [ ] `isValidGrade(double grade)`, entre 1 et 6

<div class="quiz-explanation" markdown>

Seul `monthName` associe une valeur exacte à chaque résultat. Les trois autres
testent des **intervalles** : _"avant 6 ans"_, _"entre 1 et 6"_. C'est le
travail de `<`, `>=` et `else if`. Et deux d'entre elles portent sur un
`double`.

</div>

</div>

??? note "Vous croiserez une autre forme, avec `:` et `break`"

    Avant Java 14, le `switch` s'écrivait avec deux-points et `break`. On le
    trouve encore dans beaucoup de code et de tutoriels :

    ```java title="Main.java" linenums="1" hl_lines="6-10"
    public class Main {
        public static void main(String[] args) {
            int day = 6;

            switch (day) {
                case 6:
                    System.out.println("samedi");
                case 7:
                    System.out.println("dimanche");
                    break;
                default:
                    System.out.println("semaine");
            }
        }
    }
    ```

    ```text
    samedi
    dimanche
    ```

    `day` vaut 6, et pourtant _"dimanche"_ s'affiche aussi. Sans `break`, cette
    forme **continue** dans le `case` suivant jusqu'au prochain `break`. C'est
    une source de bugs connue, et c'est pour cela que la forme avec `->` a été
    ajoutée : elle n'exécute que son propre `case`.

    Dans ce cours, on écrit toujours la forme avec `->`.

## Quelle forme choisir ?

| Situation                                      | Forme                     |
| :--------------------------------------------- | :------------------------ |
| Faire quelque chose, ou ne rien faire          | `if`                      |
| Faire l'une ou l'autre de deux choses          | `if` et `else`            |
| Plusieurs cas, avec des intervalles (`<`, `>=`) | `if`, `else if`, `else`   |
| Plusieurs cas, avec des valeurs exactes        | `switch`                  |
| Choisir entre deux **valeurs**                 | l'opérateur ternaire      |
| Rendre une condition (`true` ou `false`)       | `return` de la condition, sans rien autour |

Quand vous hésitez, `if` et `else` marchent toujours.

## Résumé

- `condition ? a : b` vaut `a` si la condition est vraie, `b` sinon. Il choisit
  une valeur, jamais une action.
- `switch` compare une valeur à des **constantes exactes**, `case` par `case`.
  Un `case` peut en lister plusieurs : `case 6, 7 -> ...`.
- Un `switch` qui rend une valeur doit couvrir tous les cas, en général avec
  `default`.
- `switch` fonctionne avec des `int` et des `String`, pas avec des `double`.
- Pour comparer du texte, jamais `==`. En attendant la séance 09, un `switch`.

## Pour aller plus loin

- [Manipulez vos données](https://openclassrooms.com/fr/courses/8383791-apprenez-a-programmer-en-java/8439941-manipulez-vos-donnees) -
  OpenClassrooms, section _Vérifiez plusieurs cas possibles_. Il montre aussi
  `yield`, pour un `case` qui a besoin de plusieurs lignes. L'opérateur
  ternaire n'y figure pas.
- [Switch Expressions](https://docs.oracle.com/en/java/javase/25/language/switch-expressions-and-statements.html) -
  la documentation officielle de Java 25, en anglais, sur les deux formes de
  `switch`.
- [Equality, Relational, and Conditional Operators](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op2.html) -
  tutoriel officiel, en anglais. L'opérateur ternaire y est appelé _"the
  conditional operator"_.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
