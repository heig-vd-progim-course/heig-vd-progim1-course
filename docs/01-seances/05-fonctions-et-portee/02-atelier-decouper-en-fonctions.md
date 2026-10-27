# Atelier - Découper en fonctions

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Lire des appels de fonctions et prévoir ce qu'ils font, réparer des fonctions
cassées, puis réécrire le fil rouge avec des fonctions. À la fin, votre `main`
ne fait plus que lire, appeler et afficher.

**Règle de l'atelier : une fonction de calcul ne lit rien au clavier et
n'affiche rien.**

Comme dans le support, chaque programme est donné **en entier**. Créez un
nouveau projet `seance-05` dans IntelliJ et remplacez le contenu de
`Main.java` à chaque exercice.

## 1. Prédire

Pour chaque programme : **écrivez ce que la console va afficher**, sur papier,
**avant** de l'exécuter. Puis exécutez-le et comparez. Si votre prédiction est
fausse, trouvez la ligne où votre raisonnement s'est séparé de celui de Java.

### Programme A

```java title="Main.java" linenums="1"
public class Main {
    public static int triple(int number) {
        return number * 3;
    }

    public static void main(String[] args) {
        int a = 4;
        int b = triple(a);
        System.out.println(a + " " + b);
        System.out.println(triple(triple(2)));
    }
}
```

### Programme B

```java title="Main.java" linenums="1"
public class Main {
    public static double half(double value) {
        System.out.println("half reçoit " + value);
        return value / 2;
    }

    public static void main(String[] args) {
        System.out.println("Début");
        double result = half(10) + half(4);
        System.out.println("Résultat : " + result);
    }
}
```

Ce programme enfreint la règle de l'atelier : `half` affiche. C'est voulu, pour
que vous voyiez **quand** elle est exécutée.

### Programme C

```java title="Main.java" linenums="1"
public class Main {
    public static int addTen(int x) {
        x = x + 10;
        return x;
    }

    public static void main(String[] args) {
        int x = 5;
        addTen(x);
        System.out.println(x);
        x = addTen(x);
        System.out.println(x);
    }
}
```

### Programme D

```java title="Main.java" linenums="1"
public class Main {
    public static double computeAverage(int grade1, int grade2) {
        return (grade1 + grade2) / 2;
    }

    public static void main(String[] args) {
        System.out.println(computeAverage(4, 5));
    }
}
```

??? note "Les sorties, à ouvrir après avoir exécuté"

    Programme A :

    ```text
    4 12
    18
    ```

    `a` vaut toujours 4 : `triple` a reçu une copie. `triple(triple(2))` calcule
    d'abord l'appel intérieur, 6, puis `triple(6)`.

    Programme B :

    ```text
    Début
    half reçoit 10.0
    half reçoit 4.0
    Résultat : 7.0
    ```

    Les deux appels sont exécutés avant l'addition, de gauche à droite. Les
    arguments `10` et `4` sont des `int`, copiés dans un paramètre `double` :
    ils deviennent `10.0` et `4.0`.

    Programme C :

    ```text
    5
    15
    ```

    Ligne 9, le résultat de `addTen` est perdu. Ligne 11, il est rangé dans le
    `x` de `main`. Les deux `x` sont des variables différentes.

    Programme D :

    ```text
    4.0
    ```

    `grade1 + grade2` est un `int`, divisé par l'`int` 2 : division entière, 4.
    Le type de retour `double` arrive trop tard, il transforme seulement 4 en
    4.0. Le piège de la séance 03, caché dans une fonction.

## 2. Réparer

Chacun de ces programmes contient **une** erreur, placée exprès. Pour chacun :

1. exécutez-le ;
2. dites si c'est une erreur de compilation, une erreur à l'exécution, ou un
   résultat faux sans erreur ;
3. pour une erreur de compilation, trouvez la ligne indiquée par le message et
   reformulez le message avec vos mots ;
4. corrigez, en modifiant le moins de lignes possible.

### Bug 1 - La température

```java title="Main.java" linenums="1"
public class Main {
    public static double toFahrenheit(double celsius) {
        double fahrenheit = celsius * 9 / 5 + 32;
        return fahrenheit;
    }

    public static void main(String[] args) {
        double temperature = 20;
        toFahrenheit(temperature);
        System.out.println(temperature + " °C = " + fahrenheit + " °F");
    }
}
```

### Bug 2 - La moyenne bavarde

```java title="Main.java" linenums="1"
public class Main {
    public static void computeAverage(double grade1, double grade2) {
        double average = (grade1 + grade2) / 2;
        System.out.println(average);
    }

    public static void main(String[] args) {
        double average = computeAverage(4.5, 5.0);
        System.out.printf("Moyenne : %.1f%n", average);
    }
}
```

### Bug 3 - La note finale

L'examen compte pour 60 % et le projet pour 40 %. La personne a obtenu 2.5 à
l'examen et 5.5 au projet. Calculez d'abord à la main ce que le programme
devrait afficher.

```java title="Main.java" linenums="1"
public class Main {
    public static double computeFinalGrade(double exam, double project) {
        return exam * 0.6 + project * 0.4;
    }

    public static void main(String[] args) {
        double exam = 2.5;
        double project = 5.5;
        System.out.println(computeFinalGrade(project, exam));
    }
}
```

??? note "Les corrections, à ouvrir après avoir cherché"

    **Bug 1** - erreur de compilation :

    ```text
    Main.java:10: error: cannot find symbol
            System.out.println(temperature + " °C = " + fahrenheit + " °F");
                                                        ^
      symbol:   variable fahrenheit
      location: class Main
    1 error
    ```

    `fahrenheit` est déclarée dans `toFahrenheit`, ligne 3. Elle n'existe pas
    dans `main`. Et la valeur rendue ligne 9 est perdue. Il faut la ranger :

    ```java title="Main.java" linenums="1" hl_lines="9"
    public class Main {
        public static double toFahrenheit(double celsius) {
            double fahrenheit = celsius * 9 / 5 + 32;
            return fahrenheit;
        }

        public static void main(String[] args) {
            double temperature = 20;
            double fahrenheit = toFahrenheit(temperature);
            System.out.println(temperature + " °C = " + fahrenheit + " °F");
        }
    }
    ```

    ```text
    20.0 °C = 68.0 °F
    ```

    **Bug 2** - erreur de compilation :

    ```text
    Main.java:8: error: incompatible types: void cannot be converted to double
            double average = computeAverage(4.5, 5.0);
                                           ^
    1 error
    ```

    `computeAverage` est `void` : elle affiche, elle ne rend rien. Afficher
    n'est pas rendre. On change le type de retour, et l'affichage devient un
    `return` :

    ```java title="Main.java" linenums="1" hl_lines="2 4"
    public class Main {
        public static double computeAverage(double grade1, double grade2) {
            double average = (grade1 + grade2) / 2;
            return average;
        }

        public static void main(String[] args) {
            double average = computeAverage(4.5, 5.0);
            System.out.printf("Moyenne : %.1f%n", average);
        }
    }
    ```

    ```text
    Moyenne : 4.8
    ```

    **Bug 3** - aucune erreur, résultat faux :

    ```text
    4.3
    ```

    La bonne réponse est 2.5 × 0.6 + 5.5 × 0.4 = 3.7 : une note insuffisante.
    Le programme en affiche une suffisante. Ligne 9, les arguments sont
    inversés : `project` arrive dans le paramètre `exam`. Java ne regarde que
    l'ordre, et les deux sont des `double` : le compilateur ne peut rien voir.

    ```java title="Main.java" linenums="1" hl_lines="9"
    public class Main {
        public static double computeFinalGrade(double exam, double project) {
            return exam * 0.6 + project * 0.4;
        }

        public static void main(String[] args) {
            double exam = 2.5;
            double project = 5.5;
            System.out.println(computeFinalGrade(exam, project));
        }
    }
    ```

    ```text
    3.7
    ```

    C'est le bug le plus dangereux des trois. Seul un résultat calculé à la
    main avant d'exécuter permet de le voir.

## 3. Le fil rouge en fonctions

Vous repartez de votre programme de la séance 04. Si vous ne l'avez pas, voici
une version possible :

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        // Lire la première note
        double grade1 = Double.parseDouble(IO.readln("Première note : "));

        // Lire la deuxième note
        double grade2 = Double.parseDouble(IO.readln("Deuxième note : "));

        // Calculer la moyenne
        double average = (grade1 + grade2) / 2;

        // Arrondir la moyenne au dixième
        double rounded = Math.round(average * 10) / 10.0;

        // Afficher la moyenne
        System.out.printf("Moyenne : %.1f%n", rounded);
    }
}
```

### Étape 1 - Écrire et tester les fonctions de calcul

Écrivez deux fonctions :

- `computeAverage`, qui reçoit deux notes et rend leur moyenne ;
- `roundToTenth`, qui reçoit une valeur et la rend arrondie au dixième.

Avant de brancher la saisie au clavier, **testez-les seules**. Remplacez
provisoirement le contenu de `main` par des appels avec les valeurs du tableau
de tests de la séance 04, et vérifiez chaque ligne affichée contre votre
tableau.

C'est l'avantage d'une fonction de calcul qui ne lit rien au clavier : on la
vérifie en une exécution, sans rien taper.

??? note "Une solution possible pour l'étape 1"

    ```java title="Main.java" linenums="1" hl_lines="2-8 11-16"
    public class Main {
        public static double computeAverage(double grade1, double grade2) {
            return (grade1 + grade2) / 2;
        }

        public static double roundToTenth(double value) {
            return Math.round(value * 10) / 10.0;
        }

        public static void main(String[] args) {
            // Tableau de tests de la séance 04
            System.out.println(roundToTenth(computeAverage(4, 5)));
            System.out.println(roundToTenth(computeAverage(4.5, 5)));
            System.out.println(roundToTenth(computeAverage(6, 6)));
            System.out.println(roundToTenth(computeAverage(1, 6)));
            System.out.println(roundToTenth(computeAverage(3.3, 4.6)));
        }
    }
    ```

    ```text
    4.5
    4.8
    6.0
    3.5
    4.0
    ```

### Étape 2 - Brancher la saisie

Remettez la saisie au clavier dans `main`, et appelez vos deux fonctions.
Ajoutez une troisième fonction, `readGrade`, qui reçoit la question à poser et
rend la note tapée, déjà convertie en `double`. Elle lit au clavier : ce n'est
pas une fonction de calcul, la règle ne s'applique pas à elle.

Vérifiez à nouveau avec votre tableau de tests, en tapant les notes cette
fois.

??? note "Une solution possible pour l'étape 2"

    ```java title="Main.java" linenums="1" hl_lines="2-4 15-23"
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

        public static void main(String[] args) {
            // Lire les deux notes
            double grade1 = readGrade("Première note : ");
            double grade2 = readGrade("Deuxième note : ");

            // Calculer la moyenne arrondie au dixième
            double average = roundToTenth(computeAverage(grade1, grade2));

            // Afficher la moyenne
            System.out.printf("Moyenne : %.1f%n", average);
        }
    }
    ```

    ```text
    Première note : 3.3
    Deuxième note : 4.6
    Moyenne : 4.0
    ```

    Comparez avec la version de la séance 04 : les commentaires de `main` sont
    les mêmes, mais chaque groupe tient en une ou deux lignes. Les détails sont
    descendus dans les fonctions.

### Étape 3 - Un groupe de trois personnes

Le fil rouge parle d'un **groupe**. Faites en sorte que le programme demande,
pour trois personnes l'une après l'autre, un nom et deux notes, et affiche la
moyenne de chacune.

Contrainte : la formule de la moyenne et celle de l'arrondi ne doivent être
écrites **qu'une seule fois** dans tout le fichier.

Indice : une fonction peut n'avoir aucun paramètre et ne rien rendre. Ses
parenthèses restent vides : `processPerson()`.

??? note "Une solution possible pour l'étape 3"

    ```java title="Main.java" linenums="1" hl_lines="14-22 25-27"
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

        public static void processPerson() {
            String name = IO.readln("Nom : ");
            double grade1 = readGrade("Première note : ");
            double grade2 = readGrade("Deuxième note : ");

            double average = roundToTenth(computeAverage(grade1, grade2));

            System.out.printf("%s : %.1f%n", name, average);
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
    Camille : 4.0
    Nom : Noah
    Première note : 5.5
    Deuxième note : 4
    Noah : 4.8
    Nom : Lou
    Première note : 4.5
    Deuxième note : 5
    Lou : 4.8
    ```

    À chaque appel de `processPerson`, les variables `name`, `grade1`,
    `grade2` et `average` sont créées à neuf, puis disparaissent à la ligne
    22. Les trois personnes ne se mélangent pas.

    Trois appels identiques à la suite : c'est encore une répétition. Elle
    disparaîtra en séance 07, avec les boucles.

### Étape 4 - Provoquer l'erreur de portée

Dans votre programme de l'étape 3, ajoutez à la fin de `main` la ligne :

```java
System.out.println(average);
```

Lisez le message. Quelle ligne cite-t-il ? Pourquoi `average` n'existe-t-elle
pas à cet endroit, alors qu'elle a été calculée trois fois ? Écrivez la réponse
en une phrase, puis retirez la ligne.

## Extensions

Pour celles et ceux qui ont terminé. Pour chaque fonction : écrivez sa
signature, puis un tableau de tests calculé à la main, puis le code, puis les
appels de test dans `main`.

1. **La température.** `celsiusToFahrenheit`, qui reçoit des degrés Celsius et
   rend des degrés Fahrenheit.
2. **Le trajet à pied.** `walkingMinutes`, qui reçoit une distance en
   kilomètres et une vitesse en km/h, et rend une durée en minutes.
3. **Le partage de l'addition.** `splitBill`, qui reçoit un montant total et
   un nombre de personnes, et rend la part de chacune arrondie aux 5 centimes.
   Écrivez l'arrondi aux 5 centimes dans sa propre fonction, `roundTo5Cents`.
4. **La durée lisible.** `formatDuration`, qui reçoit un nombre entier de
   minutes et rend un `String` comme `"2 h 15 min"`. Une fonction peut rendre
   un texte.
5. **La note finale.** `computeFinalGrade`, avec l'évaluation écrite et le
   mini-projet à 50 % chacun. Les poids sont des constantes : voyez le bloc
   repliable _"Et une constante utilisée par plusieurs fonctions ?"_ du
   [support](01-fonctions-et-portee.md).
6. **Le demi-point.** `roundToHalf`, qui arrondit au demi-point.

??? note "Quelques valeurs pour vérifier vos extensions"

    ```java title="Main.java" linenums="1"
    public class Main {
        public static double walkingMinutes(double distanceKm, double speedKmh) {
            return distanceKm / speedKmh * 60;
        }

        public static double roundTo5Cents(double amount) {
            return Math.round(amount * 20) / 20.0;
        }

        public static double splitBill(double total, int people) {
            return roundTo5Cents(total / people);
        }

        public static double computeFinalGrade(double exam, double project) {
            final double EXAM_WEIGHT = 0.5;
            final double PROJECT_WEIGHT = 0.5;
            return exam * EXAM_WEIGHT + project * PROJECT_WEIGHT;
        }

        public static String formatDuration(int totalMinutes) {
            int hours = totalMinutes / 60;
            int minutes = totalMinutes % 60;
            return hours + " h " + minutes + " min";
        }

        public static double roundToHalf(double value) {
            return Math.round(value * 2) / 2.0;
        }

        public static void main(String[] args) {
            System.out.println(walkingMinutes(3, 5));
            System.out.println(splitBill(100, 3));
            System.out.println(computeFinalGrade(4.2, 5.5));
            System.out.println(formatDuration(135));
            System.out.println(roundToHalf(4.66));
        }
    }
    ```

    ```text
    36.0
    33.35
    4.85
    2 h 15 min
    4.5
    ```

    Ici, les poids sont des constantes locales à `computeFinalGrade`. C'est
    suffisant tant qu'aucune autre fonction n'en a besoin.

## Discussion

En fin d'atelier, nous regardons quelques programmes ensemble, en classe :

- Lisez seulement `main`. Comprend-on ce que fait le programme sans lire les
  fonctions ?
- Quels noms de fonctions avez-vous choisis ? Lesquels disent ce qu'elles
  font, lesquels non ?
- Qui a écrit une fonction de calcul qui affiche ? Qu'est-ce que cela empêche ?
- Quel bug de la partie _Réparer_ vous a pris le plus de temps, et pourquoi ?

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
