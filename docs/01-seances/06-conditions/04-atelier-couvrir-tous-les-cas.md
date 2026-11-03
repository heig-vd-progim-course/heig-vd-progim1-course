# Atelier - Couvrir tous les cas

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Écrire des suites de conditions qui ne laissent aucun cas de côté, et les
vérifier par un tableau de tests. Puis protéger le fil rouge contre les notes
impossibles, et lui faire donner une appréciation.

**Règle de l'atelier : avant d'écrire une suite de conditions, écrivez le
tableau des cas qu'elle doit couvrir, avec une valeur de chaque côté de chaque
limite.**

Les parties 1 à 5 se font avant la pause. La partie 6 se fait après la théorie
sur [`switch` et l'opérateur ternaire](05-switch-et-ternaire.md).

## 1. Prédire

Comme dans le premier atelier : prédiction **écrite** d'abord, exécution
ensuite.

### Programme E

```java title="Main.java" linenums="1"
public class Main {
    public static String chooseClothing(int temperature) {
        if (temperature > 25) {
            return "T-shirt";
        } else if (temperature > 15) {
            return "Pull";
        } else if (temperature > 5) {
            return "Veste";
        } else {
            return "Manteau";
        }
    }

    public static void main(String[] args) {
        System.out.println(chooseClothing(30));
        System.out.println(chooseClothing(25));
        System.out.println(chooseClothing(10));
        System.out.println(chooseClothing(-3));
    }
}
```

### Programme F

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int age = 16;
        boolean hasTicket = true;

        System.out.println((age >= 18) && hasTicket);
        System.out.println((age >= 18) || hasTicket);
        System.out.println(!hasTicket);
        System.out.println(!((age >= 18) && hasTicket));
    }
}
```

??? note "Les sorties, à ouvrir après avoir exécuté"

    Programme E :

    ```text
    T-shirt
    Pull
    Veste
    Manteau
    ```

    25 n'est pas plus grand que 25 : la première condition est fausse, la
    deuxième vraie. Ceux qui ont prédit _"T-shirt"_ pour 25 ont lu `>=`.

    Programme F :

    ```text
    false
    true
    false
    true
    ```

    `age >= 18` est faux et `hasTicket` est vrai. `&&` donne faux, `||` donne
    vrai. La dernière ligne inverse la première.

## 2. Réparer

Une erreur par programme, placée exprès. Même démarche que dans le premier
atelier : exécuter, classer l'erreur, lire le message, corriger le moins de
lignes possible.

### Bug 1 - Le prix du billet

Le billet est gratuit avant 6 ans, coûte 10 francs avant 16 ans, et 20 francs
ensuite. Écrivez d'abord le tableau de tests, puis exécutez.

```java title="Main.java" linenums="1"
public class Main {
    public static int ticketPrice(int age) {
        if (age < 16) {
            return 10;
        } else if (age < 6) {
            return 0;
        } else {
            return 20;
        }
    }

    public static void main(String[] args) {
        System.out.println(ticketPrice(4));
        System.out.println(ticketPrice(10));
        System.out.println(ticketPrice(30));
    }
}
```

### Bug 2 - La note acceptée

```java title="Main.java" linenums="1"
public class Main {
    public static boolean isValidGrade(double grade) {
        return (grade >= 1) || (grade <= 6);
    }

    public static void main(String[] args) {
        double grade = 7;

        if (isValidGrade(grade)) {
            System.out.println("Note acceptée : " + grade);
        } else {
            System.out.println("Note invalide : " + grade);
        }
    }
}
```

### Bug 3 - Il manque un cas

```java title="Main.java" linenums="1"
public class Main {
    public static String chooseClothing(int temperature) {
        if (temperature > 25) {
            return "T-shirt";
        } else if (temperature > 15) {
            return "Pull";
        } else if (temperature > 5) {
            return "Veste";
        }
    }

    public static void main(String[] args) {
        System.out.println(chooseClothing(10));
    }
}
```

??? note "Les corrections, à ouvrir après avoir cherché"

    **Bug 1** - aucune erreur, résultat faux :

    ```text
    10
    10
    20
    ```

    Un enfant de 4 ans paie 10 francs. Ligne 3, `4 < 16` est vrai : on rend 10
    et on s'arrête. La ligne 5 n'est atteinte que si l'âge est d'au moins 16,
    et alors `age < 6` est toujours faux. Avec des `<`, on teste du plus petit
    au plus grand :

    ```java title="Main.java" linenums="1" hl_lines="3-6"
    public class Main {
        public static int ticketPrice(int age) {
            if (age < 6) {
                return 0;
            } else if (age < 16) {
                return 10;
            } else {
                return 20;
            }
        }

        public static void main(String[] args) {
            System.out.println(ticketPrice(4));
            System.out.println(ticketPrice(10));
            System.out.println(ticketPrice(30));
        }
    }
    ```

    ```text
    0
    10
    20
    ```

    **Bug 2** - aucune erreur, résultat faux :

    ```text
    Note acceptée : 7.0
    ```

    `(grade >= 1) || (grade <= 6)` est vrai pour **tout** nombre : 7 est au
    moins 1, donc la condition est vraie. _"Entre 1 et 6"_, c'est _"au moins 1
    **et** au plus 6"_ :

    ```java title="Main.java" linenums="1" hl_lines="3"
    public class Main {
        public static boolean isValidGrade(double grade) {
            return (grade >= 1) && (grade <= 6);
        }

        public static void main(String[] args) {
            double grade = 7;

            if (isValidGrade(grade)) {
                System.out.println("Note acceptée : " + grade);
            } else {
                System.out.println("Note invalide : " + grade);
            }
        }
    }
    ```

    ```text
    Note invalide : 7.0
    ```

    **Bug 3** - erreur de compilation :

    ```text
    Main.java:10: error: missing return statement
        }
        ^
    1 error
    ```

    Pour 5 °C ou moins, aucune condition n'est vraie, et la fonction arrive
    ligne 10 sans rien rendre. Le compilateur ne sait pas que vous ne
    l'appellerez qu'avec 10 : il exige une réponse pour **toutes** les
    températures. On ajoute le `else` final :

    ```java title="Main.java" linenums="1" hl_lines="9-10"
    public class Main {
        public static String chooseClothing(int temperature) {
            if (temperature > 25) {
                return "T-shirt";
            } else if (temperature > 15) {
                return "Pull";
            } else if (temperature > 5) {
                return "Veste";
            } else {
                return "Manteau";
            }
        }

        public static void main(String[] args) {
            System.out.println(chooseClothing(10));
        }
    }
    ```

    ```text
    Veste
    ```

## 3. Écrire

Pour chaque fonction : signature, tableau de tests écrit à la main, corps,
appels de test dans `main`.

1. **Le prix du billet, complet.** `ticketPrice` : gratuit avant 6 ans, 10
   francs avant 16 ans, 15 francs dès 65 ans, 20 francs sinon. Testez 4, 6,
   15, 16 et 70.
2. **Le week-end.** `isWeekend`, qui reçoit un numéro de jour, 1 pour lundi à 7
   pour dimanche, et rend `true` pour samedi et dimanche.
3. **L'année bissextile.** `isLeapYear`. Une année est bissextile si elle est
   divisible par 4 **et** pas par 100, **ou** si elle est divisible par 400.
   Testez 2024, 2023, 1900 et 2000. Les parenthèses sont indispensables : `&&`
   et `||` se mélangent.

??? note "Une solution possible"

    ```java title="Main.java" linenums="1"
    public class Main {
        public static boolean isLeapYear(int year) {
            return (((year % 4) == 0) && ((year % 100) != 0)) || ((year % 400) == 0);
        }

        public static int ticketPrice(int age) {
            if (age < 6) {
                return 0;
            } else if (age < 16) {
                return 10;
            } else if (age >= 65) {
                return 15;
            } else {
                return 20;
            }
        }

        public static boolean isWeekend(int day) {
            return (day == 6) || (day == 7);
        }

        public static void main(String[] args) {
            System.out.println(isLeapYear(2024));
            System.out.println(isLeapYear(2023));
            System.out.println(isLeapYear(1900));
            System.out.println(isLeapYear(2000));
            System.out.println(ticketPrice(4));
            System.out.println(ticketPrice(6));
            System.out.println(ticketPrice(15));
            System.out.println(ticketPrice(16));
            System.out.println(ticketPrice(70));
            System.out.println(isWeekend(5));
            System.out.println(isWeekend(6));
        }
    }
    ```

    ```text
    true
    false
    false
    true
    0
    10
    10
    20
    15
    false
    true
    ```

    1900 est divisible par 4 et par 100, mais pas par 400 : il n'est pas
    bissextile. 2000 l'est, grâce à la partie droite du `||`.

## 4. Le fil rouge se protège

Repartez de votre fil rouge du premier atelier.

### Étape 1 - Refuser les notes impossibles

Ajoutez une fonction `isValidGrade`. Dans `processPerson`, si l'une des deux
notes n'est pas valable, affichez un message et ne calculez pas la moyenne.

Écrivez d'abord le tableau de tests d'`isValidGrade` : cinq valeurs suffisent.

Vérifiez avec : Camille, 3.3 et 4.6 ; Noah, 5.5 et 4 ; Lou, 4.5 et 7.

??? note "Une solution possible pour l'étape 1"

    ```java title="Main.java" linenums="1" hl_lines="14-16 27-37"
    public class Main {
        public static double readGrade(String question) {
            return Double.parseDouble(IO.readln(question));
        }

        public static double computeAverage(double grade1, double grade2) {
            return (grade1 + grade2) / 2;
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

        public static void processPerson() {
            String name = IO.readln("Nom : ");
            double grade1 = readGrade("Première note : ");
            double grade2 = readGrade("Deuxième note : ");

            if (isValidGrade(grade1) && isValidGrade(grade2)) {
                double average = roundToTenth(computeAverage(grade1, grade2));

                if (hasPassed(average)) {
                    System.out.printf("%s : %.1f, réussi%n", name, average);
                } else {
                    System.out.printf("%s : %.1f, échoué%n", name, average);
                }
            } else {
                System.out.println(name + " : note invalide, entre 1 et 6");
            }
        }

        public static void main(String[] args) {
            processPerson();
            processPerson();
            processPerson();
        }
    }
    ```

    ```text
    Nom : Camille
    Première note : 3.3
    Deuxième note : 4.6
    Camille : 4.0, réussi
    Nom : Noah
    Première note : 5.5
    Deuxième note : 4
    Noah : 4.8, réussi
    Nom : Lou
    Première note : 4.5
    Deuxième note : 7
    Lou : note invalide, entre 1 et 6
    ```

    Le programme ne redemande pas la note de Lou : il faudrait **répéter** la
    question tant que la réponse n'est pas valable. C'est une boucle, en séance
    07.

### Étape 2 - L'appréciation

Ajoutez une fonction `describe`, qui reçoit une moyenne et rend son
appréciation : _excellent_ dès 5.5, _bien_ dès 5, _suffisant_ dès 4,
_insuffisant_ en dessous. Affichez-la sous le verdict.

Testez-la d'abord seule, avec les huit valeurs du tableau de la
[page précédente](03-plusieurs-cas-et-operateurs-logiques.md#couvrir-tous-les-cas).

Vérifiez ensuite avec : Camille, 3.3 et 4.6 ; Noah, 5.5 et 6 ; Lou, 4.5 et 7.

??? note "Une solution possible pour l'étape 2"

    ```java title="Main.java" linenums="1" hl_lines="22-32 47"
    public class Main {
        public static double readGrade(String question) {
            return Double.parseDouble(IO.readln(question));
        }

        public static double computeAverage(double grade1, double grade2) {
            return (grade1 + grade2) / 2;
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
            double grade1 = readGrade("Première note : ");
            double grade2 = readGrade("Deuxième note : ");

            if (isValidGrade(grade1) && isValidGrade(grade2)) {
                double average = roundToTenth(computeAverage(grade1, grade2));

                if (hasPassed(average)) {
                    System.out.printf("%s : %.1f, réussi%n", name, average);
                } else {
                    System.out.printf("%s : %.1f, échoué%n", name, average);
                }
                System.out.println("Appréciation : " + describe(average));
            } else {
                System.out.println(name + " : note invalide, entre 1 et 6");
            }
        }

        public static void main(String[] args) {
            processPerson();
            processPerson();
            processPerson();
        }
    }
    ```

    ```text
    Nom : Camille
    Première note : 3.3
    Deuxième note : 4.6
    Camille : 4.0, réussi
    Appréciation : suffisant
    Nom : Noah
    Première note : 5.5
    Deuxième note : 6
    Noah : 5.8, réussi
    Appréciation : excellent
    Nom : Lou
    Première note : 4.5
    Deuxième note : 7
    Lou : note invalide, entre 1 et 6
    ```

## 5. La chasse aux cas non couverts

Échangez votre ordinateur avec votre voisine ou votre voisin. Pendant cinq
minutes, essayez de faire afficher **quelque chose de faux** au fil rouge de
l'autre : une note limite, une note négative, une note à trois décimales, une
virgule au lieu d'un point.

Pour chaque cas trouvé, notez :

- ce que vous avez tapé ;
- ce que le programme a affiché ;
- ce qu'il aurait dû afficher ;
- si vous savez le corriger aujourd'hui, ou s'il faut une notion à venir.

Certains cas ne se corrigent pas encore. Une virgule au lieu d'un point arrête
le programme avec une erreur à l'exécution, comme en séance 04 : la vérifier
demande d'examiner le texte tapé, en séance 09.

## 6. Après la pause : `switch` et ternaire

À faire après la page [`switch` et l'opérateur ternaire](05-switch-et-ternaire.md).

### Étape 1 - Le verdict en une ligne

Dans votre fil rouge, remplacez le `if` et le `else` qui affichent _"réussi"_
ou _"échoué"_ par une variable `verdict`, calculée avec l'opérateur ternaire, et
un seul `printf`.

??? note "Une solution possible pour l'étape 1"

    Seul le bloc de `processPerson` qui affiche le verdict change.

    === "Avant"

        ```java title="Main.java" linenums="1" hl_lines="42-46"
        public class Main {
            public static double readGrade(String question) {
                return Double.parseDouble(IO.readln(question));
            }

            public static double computeAverage(double grade1, double grade2) {
                return (grade1 + grade2) / 2;
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
                double grade1 = readGrade("Première note : ");
                double grade2 = readGrade("Deuxième note : ");

                if (isValidGrade(grade1) && isValidGrade(grade2)) {
                    double average = roundToTenth(computeAverage(grade1, grade2));

                    if (hasPassed(average)) {
                        System.out.printf("%s : %.1f, réussi%n", name, average);
                    } else {
                        System.out.printf("%s : %.1f, échoué%n", name, average);
                    }
                    System.out.println("Appréciation : " + describe(average));
                } else {
                    System.out.println(name + " : note invalide, entre 1 et 6");
                }
            }

            public static void main(String[] args) {
                processPerson();
                processPerson();
                processPerson();
            }
        }
        ```

    === "Après"

        ```java title="Main.java" linenums="1" hl_lines="41 43"
        public class Main {
            public static double readGrade(String question) {
                return Double.parseDouble(IO.readln(question));
            }

            public static double computeAverage(double grade1, double grade2) {
                return (grade1 + grade2) / 2;
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
                double grade1 = readGrade("Première note : ");
                double grade2 = readGrade("Deuxième note : ");

                if (isValidGrade(grade1) && isValidGrade(grade2)) {
                    double average = roundToTenth(computeAverage(grade1, grade2));
                    String verdict = hasPassed(average) ? "réussi" : "échoué";

                    System.out.printf("%s : %.1f, %s%n", name, average, verdict);
                    System.out.println("Appréciation : " + describe(average));
                } else {
                    System.out.println(name + " : note invalide, entre 1 et 6");
                }
            }

            public static void main(String[] args) {
                processPerson();
                processPerson();
                processPerson();
            }
        }
        ```

    Les cinq lignes du `if` et du `else` deviennent deux lignes : le calcul du
    verdict, ligne 41, et un seul affichage, ligne 43. La sortie est identique
    à celle de l'étape 2.

### Étape 2 - Réécrire avec `switch`

1. Réécrivez `isWeekend` avec un `switch` qui rend un `boolean`.
2. Écrivez `daysInMonth`, qui reçoit un numéro de mois et une année, et rend le
   nombre de jours du mois. Février a 29 jours les années bissextiles : servez
   vous d'`isLeapYear` et de l'opérateur ternaire. Rendez 0 pour un mois qui
   n'existe pas.

Testez février 2024, février 2026, avril 2026 et le mois 13.

??? note "Une solution possible pour l'étape 2"

    ```java title="Main.java" linenums="1"
    public class Main {
        public static boolean isLeapYear(int year) {
            return (((year % 4) == 0) && ((year % 100) != 0)) || ((year % 400) == 0);
        }

        public static int daysInMonth(int month, int year) {
            return switch (month) {
                case 1, 3, 5, 7, 8, 10, 12 -> 31;
                case 4, 6, 9, 11 -> 30;
                case 2 -> isLeapYear(year) ? 29 : 28;
                default -> 0;
            };
        }

        public static boolean isWeekend(int day) {
            return switch (day) {
                case 6, 7 -> true;
                default -> false;
            };
        }

        public static void main(String[] args) {
            System.out.println(daysInMonth(2, 2024));
            System.out.println(daysInMonth(2, 2026));
            System.out.println(daysInMonth(4, 2026));
            System.out.println(daysInMonth(13, 2026));
            System.out.println(isWeekend(5));
            System.out.println(isWeekend(7));
        }
    }
    ```

    ```text
    29
    28
    30
    0
    false
    true
    ```

    Pour `isWeekend`, le `switch` n'est pas plus court que
    `(day == 6) || (day == 7)`. Les deux sont justes : choisissez celle que
    vous lisez le mieux.

### Étape 3 - Bug : le jour oublié

Ce programme ne compile pas. Lisez le message, puis corrigez-le en ajoutant
**une** ligne.

```java title="Main.java" linenums="1"
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
        System.out.println(dayName(6));
    }
}
```

??? note "La correction, à ouvrir après avoir cherché"

    ```text
    Main.java:3: error: the switch expression does not cover all possible input values
            return switch (day) {
                   ^
    1 error
    ```

    Les sept jours sont là. Mais `day` est un `int` : il peut valoir 8, 0 ou
    -12, et pour ces valeurs le `switch` n'a rien à rendre. Comme pour le
    `missing return statement`, le compilateur exige une réponse pour **toutes**
    les valeurs possibles. On ajoute `default -> "inconnu";` après la ligne 10.

## Discussion

En fin d'atelier, nous regardons quelques programmes ensemble, en classe :

- Quel cas non couvert avez-vous trouvé chez l'autre ? Était-il corrigeable ?
- Qui a écrit `describe` avec les conditions dans le mauvais ordre ? Combien de
  tests a-t-il fallu pour le voir ?
- Pour `isWeekend`, `switch` ou `||` : qu'avez-vous choisi, et pourquoi ?

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
