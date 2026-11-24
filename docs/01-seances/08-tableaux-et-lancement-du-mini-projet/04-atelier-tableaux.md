# Atelier - Tableaux

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Lire, réparer et écrire des parcours de tableau, puis faire garder ses notes au
fil rouge. C'est la dernière version du fil rouge : à partir de maintenant, le
mini-projet prend le relais.

**Règle de l'atelier : avant d'exécuter un programme, écrivez sur papier le
contenu du tableau à la fin, case par case.**

## 1. Prédire

Pour chaque programme, écrivez ce que la console va afficher, puis exécutez-le.

### Programme A

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int[] values = {3, 8, 2, 7};
        int total = 0;

        for (int i = 1; i < values.length; i++) {
            total = total + values[i];
        }
        System.out.println(total);
    }
}
```

### Programme B

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int[] values = {3, 8, 2, 7};

        for (int i = values.length - 1; i >= 0; i--) {
            System.out.println(values[i]);
        }
    }
}
```

### Programme C

```java title="Main.java" linenums="1"
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] values = {3, 8, 2, 7};

        for (int i = 0; i < values.length; i++) {
            values[i] = values[i] * 2;
        }
        System.out.println(Arrays.toString(values));
    }
}
```

??? note "Les sorties attendues"

    | Programme | Sortie           | Ce qu'il fallait voir                                              |
    | :-------- | :--------------- | :----------------------------------------------------------------- |
    | A         | `17`             | La boucle part de `i = 1` : la case 0, qui contient 3, est sautée  |
    | B         | `7 2 8 3`        | Le parcours à l'envers part de `values.length - 1`, la dernière case |
    | C         | `[6, 16, 4, 14]` | Chaque case reçoit le double de sa propre valeur                   |

## 2. Réparer

Ces deux programmes contiennent chacun un **bug placé exprès**. Trouvez-le,
expliquez-le en une phrase, puis corrigez-le.

### Programme D

Il doit afficher la température la plus haute, `-1`.

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int[] temperatures = {-3, -8, -1, -5};
        int max = 0;

        for (int i = 0; i < temperatures.length; i++) {
            if (temperatures[i] > max) {
                max = temperatures[i];
            }
        }
        System.out.println("Maximum : " + max);
    }
}
```

```text
Maximum : 0
```

??? note "La correction"

    `max` part de 0, et aucune température n'est plus grande que 0 : `max` ne
    change jamais. Il faut partir de la première case, ligne 4 :

    ```java title="Main.java" linenums="1" hl_lines="4 6"
    public class Main {
        public static void main(String[] args) {
            int[] temperatures = {-3, -8, -1, -5};
            int max = temperatures[0];

            for (int i = 1; i < temperatures.length; i++) {
                if (temperatures[i] > max) {
                    max = temperatures[i];
                }
            }
            System.out.println("Maximum : " + max);
        }
    }
    ```

    ```text
    Maximum : -1
    ```

    La boucle peut alors partir de `i = 1`, puisque la case 0 a déjà été vue.

### Programme E

Il doit mettre la note 4.5 dans la dernière case, puis afficher `Fin`.

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        double[] grades = new double[3];

        grades[3] = 4.5;
        System.out.println("Fin");
    }
}
```

```text
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
	at Main.main(Main.java:5)
```

??? note "La correction"

    Un tableau de 3 cases a les indices 0, 1 et 2. La dernière case est
    `grades[2]`, ou, sans avoir à compter, `grades[grades.length - 1]` :

    ```java title="Main.java" linenums="1" hl_lines="5"
    public class Main {
        public static void main(String[] args) {
            double[] grades = new double[3];

            grades[grades.length - 1] = 4.5;
            System.out.println("Fin");
        }
    }
    ```

    ```text
    Fin
    ```

## 3. Le fil rouge garde ses notes

Repartez de votre fil rouge de la séance 07, étapes 1 et 2 de l'atelier _`for`
et FizzBuzz_.

### Étape 1 - Ranger les notes

Dans `processPerson`, créez un tableau de `count` cases. À chaque tour de la
boucle, rangez la note lue dans sa case, puis ajoutez-la à `sum`. Après la
boucle, affichez les notes avec `Arrays.toString`.

### Étape 2 - Les notes à retravailler

Après l'appréciation, affichez chaque note en dessous de la moyenne, précédée de
`À retravailler : `.

Vérifiez avec 2 personnes : Camille, 2 notes, 3.3 et 4.6 ; Noah, 3 notes, 4, 5
et 6.

??? note "Une solution possible"

    === "Avant"

        ```java title="Main.java" linenums="1" hl_lines="45-47 53"
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

    === "Après"

        ```java title="Main.java" linenums="1" hl_lines="1 45 48-51 58 60-64"
        import java.util.Arrays;

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
                double[] grades = new double[count];
                double sum = 0;

                for (int i = 0; i < grades.length; i++) {
                    grades[i] = readGrade("Note " + (i + 1) + " : ");
                    sum = sum + grades[i];
                }

                double average = roundToTenth(computeAverage(sum, count));
                String verdict = hasPassed(average) ? "réussi" : "échoué";

                System.out.printf("%s : %.1f, %s%n", name, average, verdict);
                System.out.println("Appréciation : " + describe(average));
                System.out.println("Notes : " + Arrays.toString(grades));

                for (int i = 0; i < grades.length; i++) {
                    if (grades[i] < average) {
                        System.out.println("À retravailler : " + grades[i]);
                    }
                }
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
    Notes : [3.3, 4.6]
    À retravailler : 3.3
    Nom : Noah
    Nombre de notes : 3
    Note 1 : 4
    Note 2 : 5
    Note 3 : 6
    Noah : 5.0, réussi
    Appréciation : bien
    Notes : [4.0, 5.0, 6.0]
    À retravailler : 4.0
    ```

    La ligne 1 importe `Arrays`. Ligne 45, le tableau est créé avec la taille
    lue. La boucle des lignes 48 à 51 part maintenant de 0, pour suivre les
    indices du tableau, et affiche `i + 1` dans la question. Les lignes 58 à 64
    sont nouvelles : l'affichage des notes, puis un second parcours, qui
    compare chaque note à la moyenne.

    La boucle de `main` part toujours de 1 : elle ne parcourt pas de tableau,
    elle compte des personnes.

### Étape 3 - Pour aller plus loin : la meilleure et la moins bonne

Affichez aussi la meilleure et la moins bonne note de chaque personne, avec le
parcours de la page [Parcourir pour calculer](03-parcourir-pour-calculer.md).

## Discussion

En fin d'atelier, nous regardons quelques programmes ensemble :

- Dans le fil rouge, pourquoi la boucle des notes part-elle maintenant de 0,
  alors que celle des personnes part toujours de 1 ?
- Qui a obtenu une `ArrayIndexOutOfBoundsException` ? À quelle ligne, avec quel
  indice ?
- Le programme D compile, s'exécute sans erreur et donne une réponse fausse.
  Comment s'en rendre compte, si l'on ne connaît pas la bonne réponse ?

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
