# Atelier - `for` et FizzBuzz

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Réécrire des boucles avec `for`, écrire FizzBuzz, le classique des exercices de
programmation, puis faire traiter au fil rouge un groupe de taille quelconque.
FizzBuzz réunit les boucles de cette séance et les conditions de la séance 06.

**Règle de l'atelier : avant d'écrire une boucle, répondez à la question
_"est-ce que je sais combien de tours elle va faire ?"_. Oui : `for`. Non :
`while`.**

## 1. Réécrire avec `for`

Reprenez les trois programmes de la partie _Écrire_ de
l'[atelier précédent](03-atelier-derouler-et-reparer.md#4-ecrire) : le
décollage, la somme de Gauss et la table de 7. Réécrivez chacun avec une boucle
`for`. La sortie doit rester exactement la même.

Pour chacun, comptez les lignes gagnées.

??? note "Une solution possible pour la somme de Gauss"

    === "Avant"

        ```java title="Main.java" linenums="1" hl_lines="4 6 8"
        public class Main {
            public static void main(String[] args) {
                int sum = 0;
                int i = 1;

                while (i <= 100) {
                    sum = sum + i;
                    i++;
                }
                System.out.println("Somme : " + sum);
            }
        }
        ```

    === "Après"

        ```java title="Main.java" linenums="1" hl_lines="5"
        public class Main {
            public static void main(String[] args) {
                int sum = 0;

                for (int i = 1; i <= 100; i++) {
                    sum = sum + i;
                }
                System.out.println("Somme : " + sum);
            }
        }
        ```

    ```text
    Somme : 5050
    ```

    `int i = 1;`, `i <= 100` et `i++` montent dans les parenthèses du `for`.
    `int sum = 0;` reste avant la boucle : c'est un accumulateur, on en a
    besoin après.

## 2. Prédire

Pour chaque programme, **écrivez ce que la console va afficher**, puis
exécutez-le. En cas de doute, réécrivez le `for` en `while`.

### Programme E

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i += 3) {
            System.out.println(i);
        }
    }
}
```

### Programme F

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        for (int i = 5; i <= 1; i--) {
            System.out.println(i);
        }
        System.out.println("Fin");
    }
}
```

### Programme G

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int count = 0;

        for (int i = 1; i <= 20; i++) {
            if ((i % 4) == 0) {
                count++;
            }
        }
        System.out.println(count);
    }
}
```

??? note "Les sorties attendues"

    | Programme | Sortie       | Ce qu'il fallait voir                                                      |
    | :-------- | :----------- | :------------------------------------------------------------------------- |
    | E         | `1 4 7 10`   | 10 est atteint pile, et `10 <= 10` est vrai. Le tour suivant, 13, sort     |
    | F         | `Fin`        | `5 <= 1` est faux dès le départ : zéro tour. Il fallait `i >= 1`           |
    | G         | `5`          | Les multiples de 4 entre 1 et 20 : 4, 8, 12, 16 et 20                      |

## 3. FizzBuzz

Affichez les nombres de 1 à 15, un par ligne, mais :

- à la place des multiples de 3, affichez `Fizz` ;
- à la place des multiples de 5, affichez `Buzz` ;
- à la place des multiples de 3 **et** de 5, affichez `FizzBuzz`.

La sortie attendue, mise sur une ligne pour gagner de la place :

```text
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz
```

Avancez par étapes, en exécutant à chaque fois :

1. affichez les nombres de 1 à 15 ;
2. ajoutez `Fizz` ;
3. ajoutez `Buzz` ;
4. ajoutez `FizzBuzz`.

`%` donne le reste de la division entière, vu en séance 04. Un nombre est un
multiple de 3 quand le reste de sa division par 3 vaut 0 : `(i % 3) == 0`.

??? tip "Coup de pouce : l'étape 2"

    ```java title="Main.java" linenums="1" hl_lines="4-8"
    public class Main {
        public static void main(String[] args) {
            for (int i = 1; i <= 15; i++) {
                if ((i % 3) == 0) {
                    System.out.println("Fizz");
                } else {
                    System.out.println(i);
                }
            }
        }
    }
    ```

    ```text
    1
    2
    Fizz
    4
    5
    Fizz
    7
    8
    Fizz
    10
    11
    Fizz
    13
    14
    Fizz
    ```

??? tip "Coup de pouce : remettre FizzBuzz dans l'ordre"

    Si vous êtes bloqué ou bloquée à l'étape 4, voici les lignes de la
    solution, mélangées.

    <div class="parsons" markdown>

    Ce programme affiche FizzBuzz de 1 à 15.

    ```java
    public class Main {
        public static void main(String[] args) {
            for (int i = 1; i <= 15; i++) {
                if ((i % 15) == 0) {
                    System.out.println("FizzBuzz");
                } else if ((i % 3) == 0) {
                    System.out.println("Fizz");
                } else if ((i % 5) == 0) {
                    System.out.println("Buzz");
                } else {
                    System.out.println(i);
                }
            }
        }
    }
    ```

    <div class="parsons-explanation" markdown>

    Les trois tests de divisibilité ont la même indentation : c'est l'ordre
    qui compte, et le test de 15 doit venir **en premier**. La section
    suivante explique pourquoi.

    </div>

    </div>

??? note "Une solution possible"

    ```java title="Main.java" linenums="1" hl_lines="4-12"
    public class Main {
        public static void main(String[] args) {
            for (int i = 1; i <= 15; i++) {
                if ((i % 15) == 0) {
                    System.out.println("FizzBuzz");
                } else if ((i % 3) == 0) {
                    System.out.println("Fizz");
                } else if ((i % 5) == 0) {
                    System.out.println("Buzz");
                } else {
                    System.out.println(i);
                }
            }
        }
    }
    ```

    ```text
    1
    2
    Fizz
    4
    Buzz
    Fizz
    7
    8
    Fizz
    Buzz
    11
    Fizz
    13
    14
    FizzBuzz
    ```

    Un multiple de 3 et de 5 est un multiple de 15. On aurait aussi pu écrire
    `((i % 3) == 0) && ((i % 5) == 0)`.

### Le piège de l'ordre

Une version que beaucoup écrivent d'abord :

```java title="Main.java" linenums="1" hl_lines="4 8"
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 15; i++) {
            if ((i % 3) == 0) {
                System.out.println("Fizz");
            } else if ((i % 5) == 0) {
                System.out.println("Buzz");
            } else if ((i % 15) == 0) {
                System.out.println("FizzBuzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
```

```text
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 Fizz
```

Elle n'affiche jamais `FizzBuzz`. C'est la règle de la séance 06 : avec
`else if`, **la première condition vraie gagne**. 15 est un multiple de 3, la
ligne 4 le capture, et la ligne 8 n'est jamais atteinte. Le cas le plus
particulier se teste en premier.

Ce bug ne se voit qu'au 15^e^ tour. Si vous aviez arrêté vos tests à 10, il
serait passé.

## 4. Le fil rouge compte le groupe

Repartez de votre fil rouge de l'étape 2 de l'atelier précédent : celui qui
demande le nombre de notes.

### Étape 1 - Un `for` pour les notes

Dans `processPerson`, le nombre de notes est connu avant la boucle. Remplacez
le `while` par un `for`.

### Étape 2 - Autant de personnes qu'il en faut

`main` appelle encore `processPerson` exactement trois fois. Faites-lui
demander `Nombre de personnes : `, puis appeler `processPerson` autant de fois.

Vérifiez avec 2 personnes : Camille, 2 notes, 3.3 et 4.6 ; Noah, 3 notes, 4, 5
et 6.

??? note "Une solution possible pour les étapes 1 et 2"

    === "Avant"

        ```java title="Main.java" linenums="1" hl_lines="44-49 59-61"
        public class Main {
            public static double readGrade(String question) {
                double grade = Double.parseDouble(IO.readln(question));

                while (!isValidGrade(grade)) {
                    System.out.println("Note invalide, entre 1 et 6");
                    grade = Double.parseDouble(IO.readln(question));
                }
                return grade;
            }

            public static double computeAverage(double sum, int count) {
                return sum / count;
            }

            public static double roundToTenth(double value) {
                return Math.round(value * 10) / 10.0;
            }

            public static boolean isValidGrade(double grade) {
                return (grade >= 1) && (grade <= 6);
            }

            public static boolean hasPassed(double average) {
                return average >= 4;
            }

            public static String describe(double average) {
                if (average >= 5.5) {
                    return "excellent";
                } else if (average >= 5) {
                    return "bien";
                } else if (average >= 4) {
                    return "suffisant";
                } else {
                    return "insuffisant";
                }
            }

            public static void processPerson() {
                String name = IO.readln("Nom : ");
                int count = Integer.parseInt(IO.readln("Nombre de notes : "));
                double sum = 0;
                int i = 1;

                while (i <= count) {
                    sum = sum + readGrade("Note " + i + " : ");
                    i++;
                }

                double average = roundToTenth(computeAverage(sum, count));
                String verdict = hasPassed(average) ? "réussi" : "échoué";

                System.out.printf("%s : %.1f, %s%n", name, average, verdict);
                System.out.println("Appréciation : " + describe(average));
            }

            public static void main(String[] args) {
                processPerson();
                processPerson();
                processPerson();
            }
        }
        ```

    === "Après"

        ```java title="Main.java" linenums="1" hl_lines="45-47 57-61"
        public class Main {
            public static double readGrade(String question) {
                double grade = Double.parseDouble(IO.readln(question));

                while (!isValidGrade(grade)) {
                    System.out.println("Note invalide, entre 1 et 6");
                    grade = Double.parseDouble(IO.readln(question));
                }
                return grade;
            }

            public static double computeAverage(double sum, int count) {
                return sum / count;
            }

            public static double roundToTenth(double value) {
                return Math.round(value * 10) / 10.0;
            }

            public static boolean isValidGrade(double grade) {
                return (grade >= 1) && (grade <= 6);
            }

            public static boolean hasPassed(double average) {
                return average >= 4;
            }

            public static String describe(double average) {
                if (average >= 5.5) {
                    return "excellent";
                } else if (average >= 5) {
                    return "bien";
                } else if (average >= 4) {
                    return "suffisant";
                } else {
                    return "insuffisant";
                }
            }

            public static void processPerson() {
                String name = IO.readln("Nom : ");
                int count = Integer.parseInt(IO.readln("Nombre de notes : "));
                double sum = 0;

                for (int i = 1; i <= count; i++) {
                    sum = sum + readGrade("Note " + i + " : ");
                }

                double average = roundToTenth(computeAverage(sum, count));
                String verdict = hasPassed(average) ? "réussi" : "échoué";

                System.out.printf("%s : %.1f, %s%n", name, average, verdict);
                System.out.println("Appréciation : " + describe(average));
            }

            public static void main(String[] args) {
                int people = Integer.parseInt(IO.readln("Nombre de personnes : "));

                for (int i = 1; i <= people; i++) {
                    processPerson();
                }
            }
        }
        ```

    ```text
    Nombre de personnes : 2
    Nom : Camille
    Nombre de notes : 2
    Note 1 : 3.3
    Note 2 : 4.6
    Camille : 4.0, réussi
    Appréciation : suffisant
    Nom : Noah
    Nombre de notes : 3
    Note 1 : 4
    Note 2 : 5
    Note 3 : 6
    Noah : 5.0, réussi
    Appréciation : bien
    ```

    Dans `processPerson`, les quatre lignes du `while` (`int i = 1;`, la
    condition, `i++;` et l'accolade) deviennent les trois lignes du `for`. Dans
    `main`, les trois appels sont remplacés par la lecture du nombre de
    personnes et une boucle.

    Le `i` de `main` et celui de `processPerson` sont deux variables
    différentes, chacune locale à sa boucle : la règle de portée de la séance
    05.

### Étape 3 - Pour aller plus loin : `do-while`

Réécrivez `readGrade` avec une boucle `do-while`. Que perdez-vous au passage ?

??? note "Une solution possible pour l'étape 3"

    ```java title="Main.java" linenums="1" hl_lines="3-8"
    public class Main {
        public static double readGrade(String question) {
            double grade;

            do {
                grade = Double.parseDouble(IO.readln(question));
            } while (!isValidGrade(grade));
            return grade;
        }

        public static double computeAverage(double sum, int count) {
            return sum / count;
        }

        public static double roundToTenth(double value) {
            return Math.round(value * 10) / 10.0;
        }

        public static boolean isValidGrade(double grade) {
            return (grade >= 1) && (grade <= 6);
        }

        public static boolean hasPassed(double average) {
            return average >= 4;
        }

        public static String describe(double average) {
            if (average >= 5.5) {
                return "excellent";
            } else if (average >= 5) {
                return "bien";
            } else if (average >= 4) {
                return "suffisant";
            } else {
                return "insuffisant";
            }
        }

        public static void processPerson() {
            String name = IO.readln("Nom : ");
            int count = Integer.parseInt(IO.readln("Nombre de notes : "));
            double sum = 0;

            for (int i = 1; i <= count; i++) {
                sum = sum + readGrade("Note " + i + " : ");
            }

            double average = roundToTenth(computeAverage(sum, count));
            String verdict = hasPassed(average) ? "réussi" : "échoué";

            System.out.printf("%s : %.1f, %s%n", name, average, verdict);
            System.out.println("Appréciation : " + describe(average));
        }

        public static void main(String[] args) {
            int people = Integer.parseInt(IO.readln("Nombre de personnes : "));

            for (int i = 1; i <= people; i++) {
                processPerson();
            }
        }
    }
    ```

    ```text
    Nombre de personnes : 2
    Nom : Camille
    Nombre de notes : 2
    Note 1 : 3.3
    Note 2 : 7
    Note 2 : 4.6
    Camille : 4.0, réussi
    Appréciation : suffisant
    Nom : Noah
    Nombre de notes : 3
    Note 1 : 4
    Note 2 : 5
    Note 3 : 6
    Noah : 5.0, réussi
    Appréciation : bien
    ```

    La lecture n'est plus écrite qu'une fois. En échange, le message _"Note
    invalide"_ a disparu : la question se répète sans explication. Pour le
    garder, il faudrait un `if` dans la boucle, et le `while` redevient plus
    simple. Aucune des deux versions n'est fausse : c'est un choix.

### Étape 4 - Pour aller plus loin : combien ont réussi ?

À la fin, affichez `Réussi : 2 sur 3`. Indice : `processPerson` peut rendre un
`boolean`, et `main` compter les `true`.

??? note "Une solution possible pour l'étape 4"

    Seules `processPerson` et `main` changent : le reste du fichier est celui
    des étapes 1 et 2.

    ```java title="Main.java" linenums="1" hl_lines="40 54 59 61-64 66"
    public class Main {
        public static double readGrade(String question) {
            double grade = Double.parseDouble(IO.readln(question));

            while (!isValidGrade(grade)) {
                System.out.println("Note invalide, entre 1 et 6");
                grade = Double.parseDouble(IO.readln(question));
            }
            return grade;
        }

        public static double computeAverage(double sum, int count) {
            return sum / count;
        }

        public static double roundToTenth(double value) {
            return Math.round(value * 10) / 10.0;
        }

        public static boolean isValidGrade(double grade) {
            return (grade >= 1) && (grade <= 6);
        }

        public static boolean hasPassed(double average) {
            return average >= 4;
        }

        public static String describe(double average) {
            if (average >= 5.5) {
                return "excellent";
            } else if (average >= 5) {
                return "bien";
            } else if (average >= 4) {
                return "suffisant";
            } else {
                return "insuffisant";
            }
        }

        public static boolean processPerson() {
            String name = IO.readln("Nom : ");
            int count = Integer.parseInt(IO.readln("Nombre de notes : "));
            double sum = 0;

            for (int i = 1; i <= count; i++) {
                sum = sum + readGrade("Note " + i + " : ");
            }

            double average = roundToTenth(computeAverage(sum, count));
            String verdict = hasPassed(average) ? "réussi" : "échoué";

            System.out.printf("%s : %.1f, %s%n", name, average, verdict);
            System.out.println("Appréciation : " + describe(average));
            return hasPassed(average);
        }

        public static void main(String[] args) {
            int people = Integer.parseInt(IO.readln("Nombre de personnes : "));
            int passedCount = 0;

            for (int i = 1; i <= people; i++) {
                if (processPerson()) {
                    passedCount++;
                }
            }
            System.out.println("Réussi : " + passedCount + " sur " + people);
        }
    }
    ```

    ```text
    Nombre de personnes : 3
    Nom : Camille
    Nombre de notes : 2
    Note 1 : 3.3
    Note 2 : 4.6
    Camille : 4.0, réussi
    Appréciation : suffisant
    Nom : Noah
    Nombre de notes : 3
    Note 1 : 4
    Note 2 : 5
    Note 3 : 6
    Noah : 5.0, réussi
    Appréciation : bien
    Nom : Lou
    Nombre de notes : 2
    Note 1 : 3
    Note 2 : 3.5
    Lou : 3.3, échoué
    Appréciation : insuffisant
    Réussi : 2 sur 3
    ```

    `processPerson` rend maintenant un `boolean`, ligne 40 et ligne 54. Dans
    `main`, `passedCount` est un compteur : déclaré avant la boucle, augmenté
    dans un `if`, affiché après.

## Discussion

En fin d'atelier, nous regardons quelques programmes ensemble, en classe :

- Qui a écrit FizzBuzz avec le test de 15 en dernier ? À quel nombre l'avez-vous
  vu ?
- Dans le fil rouge, `for` ou `while` pour les notes ? Et pour redemander une
  note invalide ? Pourquoi pas le même ?
- `do-while` ou `while` pour `readGrade` : qu'avez-vous choisi ?

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
