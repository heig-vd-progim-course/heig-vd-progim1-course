# Atelier - Dérouler et réparer

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Prévoir ce qu'affiche une boucle en la déroulant sur papier, réparer des boucles
fausses, puis apprendre au fil rouge à redemander une note et à accepter autant
de notes qu'il en faut. Vous travaillez seul ou seule, et vous comparez avec
votre voisine ou votre voisin à la fin de chaque partie.

**Règle de l'atelier : pour toute boucle, nommez ses trois ingrédients avant
d'écrire la moindre ligne, ou avant de chercher le moindre bug.**

Situation initiale, condition, mise à jour. Un bug de boucle est presque
toujours un ingrédient absent, mal placé ou mal écrit.

Créez un nouveau projet `seance-07` dans IntelliJ et remplacez le contenu de
`Main.java` à chaque exercice.

## 1. Dérouler

Pour chaque programme : **faites son tableau de trace sur papier**, puis écrivez
ce que la console va afficher. **Ensuite seulement**, exécutez-le et comparez.

Le tableau a une ligne par fois où la condition est posée, et une colonne par
variable. Reprenez le modèle de la
[page de théorie](01-repeter-avec-while.md#derouler-une-boucle-a-la-main).

### Programme A

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int i = 1;

        while (i < 20) {
            System.out.println(i);
            i = i * 3;
        }
        System.out.println("Fin : " + i);
    }
}
```

### Programme B

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int n = 10;

        while (n > 0) {
            n = n - 3;
        }
        System.out.println(n);
    }
}
```

### Programme C

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int total = 0;
        int i = 5;

        while (i > 0) {
            total = total + i;
            i = i - 2;
        }
        System.out.println(total);
    }
}
```

### Programme D

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int count = 0;
        int i = 1;

        while (i <= 10) {
            if ((i % 2) == 0) {
                count++;
            }
            i++;
        }
        System.out.println(count);
    }
}
```

??? note "Les sorties attendues"

    | Programme | Sortie          | Ce qu'il fallait voir                                                   |
    | :-------- | :-------------- | :---------------------------------------------------------------------- |
    | A         | `1 3 9 Fin : 27` | La mise à jour n'est pas forcément `+ 1`. `i` vaut 27 après la boucle    |
    | B         | `-2`            | La boucle s'arrête quand `n` n'est **plus** positif : 10, 7, 4, 1, -2    |
    | C         | `9`             | 5 + 3 + 1. Quand `i` vaut -1, on sort                                    |
    | D         | `5`             | Un compteur dans un `if` : il compte les nombres pairs de 1 à 10         |

    Chaque nombre est affiché sur sa propre ligne. Ils sont mis côte à côte ici
    pour gagner de la place.

## 2. Remettre dans l'ordre

Les lignes de ces programmes ont été mélangées. Faites-les glisser, à la souris
ou au doigt, pour les remettre dans l'ordre. Au clavier : sélectionnez une ligne
avec ++tab++, puis déplacez-la avec les flèches ++arrow-up++ et ++arrow-down++.

Quand vous pensez avoir le bon ordre, cliquez sur _Valider ma solution_. Chaque
validation compte comme un essai. Si vous n'y arrivez pas en trois essais,
c'est un signal : relisez la page de théorie avant de continuer. Rien ne vous
empêche d'essayer encore, mais déplacer des lignes au hasard jusqu'à tomber
juste ne vous apprendra rien.

L'indentation est un indice : elle dit dans quel bloc se trouve chaque ligne.

<div class="parsons" markdown>

Ce programme affiche `3`, `2`, `1`, puis `Partez !`.

```java
public class Main {
    public static void main(String[] args) {
        int i = 3;
        while (i >= 1) {
            System.out.println(i);
            i--;
        }
        System.out.println("Partez !");
    }
}
```

<div class="parsons-explanation" markdown>

La situation initiale vient avant le `while`, la mise à jour dans le corps, et
`Partez !` après l'accolade fermante de la boucle : on ne l'affiche qu'une fois.

</div>

</div>

<div class="parsons" markdown>

Ce programme additionne les nombres de 1 à 4 et affiche `Somme : 10`.

```java
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int i = 1;
        while (i <= 4) {
            sum = sum + i;
            i++;
        }
        System.out.println("Somme : " + sum);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;
        int sum = 0;
        while (i <= 4) {
            sum = sum + i;
            i++;
        }
        System.out.println("Somme : " + sum);
    }
}
```

<div class="parsons-explanation" markdown>

`int sum = 0;` et `int i = 1;` peuvent s'écrire dans un sens ou dans l'autre
sans rien changer au résultat : les deux ordres sont acceptés. L'essentiel,
c'est que les deux soient **avant** le `while`.

</div>

</div>

<div class="parsons" markdown>

Ce programme redemande la note tant qu'elle n'est pas entre 1 et 6.

```java
public class Main {
    public static boolean isValidGrade(double grade) {
        return (grade >= 1) && (grade <= 6);
    }
    public static void main(String[] args) {
        double grade = Double.parseDouble(IO.readln("Note : "));
        while (!isValidGrade(grade)) {
            System.out.println("Note invalide, entre 1 et 6");
            grade = Double.parseDouble(IO.readln("Note : "));
        }
        System.out.println("Note acceptée : " + grade);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        double grade = Double.parseDouble(IO.readln("Note : "));
        while (!isValidGrade(grade)) {
            System.out.println("Note invalide, entre 1 et 6");
            grade = Double.parseDouble(IO.readln("Note : "));
        }
        System.out.println("Note acceptée : " + grade);
    }
    public static boolean isValidGrade(double grade) {
        return (grade >= 1) && (grade <= 6);
    }
}
```

<div class="parsons-explanation" markdown>

Les deux lignes qui lisent la note sont identiques : peu importe laquelle va où.
L'une est la situation initiale, avant la boucle. L'autre est la mise à jour, à
la fin du corps, après le message d'erreur.

</div>

</div>

## 3. Réparer

Chacun de ces programmes contient **un** bug, placé exprès. Pour chacun :

1. nommez les trois ingrédients de la boucle, avec leur numéro de ligne ;
2. dites lequel est faux, et ce que le programme fait à la place ;
3. corrigez, exécutez, vérifiez.

Si un programme ne s'arrête pas, arrêtez-le avec le carré rouge d'IntelliJ.

### Bug 1 - Le compte à rebours

Il devrait afficher `3`, `2`, `1`, puis `Partez !`.

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int i = 3;

        while (i >= 1) {
            System.out.println(i);
            i++;
        }
        System.out.println("Partez !");
    }
}
```

??? note "Correction du bug 1"

    ```java title="Main.java" linenums="1" hl_lines="7"
    public class Main {
        public static void main(String[] args) {
            int i = 3;

            while (i >= 1) {
                System.out.println(i);
                i--;
            }
            System.out.println("Partez !");
        }
    }
    ```

    La mise à jour allait dans le mauvais sens. `i` valait 3, 4, 5, 6... et
    restait toujours plus grand que 1 : le programme affichait des nombres sans
    s'arrêter. Une mise à jour doit **rapprocher** la variable de la sortie.

### Bug 2 - Il en manque un

Il devrait afficher les nombres de 1 à 10.

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        // Afficher les nombres de 1 à 10
        int i = 1;

        while (i < 10) {
            System.out.println(i);
            i++;
        }
    }
}
```

??? note "Correction du bug 2"

    ```java title="Main.java" linenums="1" hl_lines="6"
    public class Main {
        public static void main(String[] args) {
            // Afficher les nombres de 1 à 10
            int i = 1;

            while (i <= 10) {
                System.out.println(i);
                i++;
            }
        }
    }
    ```

    Avec `i < 10`, la boucle affiche 1 à 9 : quand `i` vaut 10, `10 < 10` est
    faux. Il fallait `i <= 10`. Pour trouver ce bug, il suffit de regarder le
    **dernier** tour : c'est toujours là que se cache un _off-by-one_.

### Bug 3 - Le compteur qui oublie

Il devrait compter les multiples de 3 entre 1 et 12, et en trouver 4 : 3, 6, 9
et 12.

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        // Compter les multiples de 3 entre 1 et 12
        int count = 0;
        int i = 1;

        while (i <= 12) {
            count = 0;
            if ((i % 3) == 0) {
                count++;
            }
            i++;
        }
        System.out.println("Multiples de 3 : " + count);
    }
}
```

```text
Multiples de 3 : 1
```

??? note "Correction du bug 3"

    ```java title="Main.java" linenums="1" hl_lines="4"
    public class Main {
        public static void main(String[] args) {
            // Compter les multiples de 3 entre 1 et 12
            int count = 0;
            int i = 1;

            while (i <= 12) {
                if ((i % 3) == 0) {
                    count++;
                }
                i++;
            }
            System.out.println("Multiples de 3 : " + count);
        }
    }
    ```

    La ligne `count = 0;` était dans le corps de la boucle : le compteur
    repartait de zéro à chaque tour. Au dernier tour, `i` vaut 12, qui est un
    multiple de 3, d'où le 1. La remise à zéro fait partie de la situation
    initiale : elle a lieu une fois, **avant** la boucle, et la ligne 4 s'en
    charge déjà.

### Bug 4 - Rien ne s'affiche

Il devrait afficher `Tour 1`, `Tour 2`, `Tour 3`, puis `Fin`. Il n'affiche rien
et ne s'arrête pas.

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int i = 1;

        while (i <= 3); {
            System.out.println("Tour " + i);
            i++;
        }
        System.out.println("Fin");
    }
}
```

??? note "Correction du bug 4"

    ```java title="Main.java" linenums="1" hl_lines="5"
    public class Main {
        public static void main(String[] args) {
            int i = 1;

            while (i <= 3) {
                System.out.println("Tour " + i);
                i++;
            }
            System.out.println("Fin");
        }
    }
    ```

    Le `;` après la condition donnait à la boucle un corps vide. `i` ne
    changeait jamais, et la boucle tournait sans fin sur la ligne 5. IntelliJ
    le signale par un avertissement discret sur le `;` : apprenez à le
    reconnaître.

## 4. Écrire

Pour chaque exercice : écrivez d'abord les trois ingrédients en français, sur
papier. Puis le code. Puis exécutez.

1. **Décollage.** Affichez un compte à rebours de 10 à 0, puis `Décollage !`.
2. **La somme de Gauss.** Affichez la somme des nombres de 1 à 100. Vous devez
   trouver 5050.
3. **La table de 7.** Affichez la table de multiplication de 7, de `7 x 1 = 7` à
   `7 x 10 = 70`.

??? note "Une solution possible pour l'exercice 1"

    ```java title="Main.java" linenums="1" hl_lines="3 5 7"
    public class Main {
        public static void main(String[] args) {
            int i = 10;

            while (i >= 0) {
                System.out.println(i);
                i--;
            }
            System.out.println("Décollage !");
        }
    }
    ```

    ```text
    10
    9
    8
    7
    6
    5
    4
    3
    2
    1
    0
    Décollage !
    ```

??? note "Une solution possible pour l'exercice 2"

    ```java title="Main.java" linenums="1" hl_lines="3 7"
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

    ```text
    Somme : 5050
    ```

??? note "Une solution possible pour l'exercice 3"

    ```java title="Main.java" linenums="1" hl_lines="6"
    public class Main {
        public static void main(String[] args) {
            int i = 1;

            while (i <= 10) {
                System.out.println("7 x " + i + " = " + (7 * i));
                i++;
            }
        }
    }
    ```

    ```text
    7 x 1 = 7
    7 x 2 = 14
    7 x 3 = 21
    7 x 4 = 28
    7 x 5 = 35
    7 x 6 = 42
    7 x 7 = 49
    7 x 8 = 56
    7 x 9 = 63
    7 x 10 = 70
    ```

    Les parenthèses autour de `7 * i` sont indispensables : sans elles, Java
    colle `7` puis `i` au texte, et affiche `7 x 2 = 72`.

## 5. Le fil rouge répète

Repartez de votre fil rouge de la séance 06, dans sa version avec le verdict en
une ligne.

### Étape 1 - Redemander une note invalide

Modifiez `readGrade` : tant que la note tapée n'est pas valable, affichez
`Note invalide, entre 1 et 6` et redemandez-la. Utilisez `isValidGrade`.

Comme `readGrade` ne rend plus que des notes valables, `processPerson` n'a plus
besoin de son `if` et de son `else` : simplifiez-la.

Vérifiez avec : Camille, 3.3 et 4.6 ; Noah, 5.5 et 6 ; Lou, 4.5, puis 7, puis 5.

??? note "Une solution possible pour l'étape 1"

    === "Avant"

        ```java title="Main.java" linenums="1" hl_lines="3 39-47"
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

    === "Après"

        ```java title="Main.java" linenums="1" hl_lines="3-9 44-48"
        public class Main {
            public static double readGrade(String question) {
                double grade = Double.parseDouble(IO.readln(question));

                while (!isValidGrade(grade)) {
                    System.out.println("Note invalide, entre 1 et 6");
                    grade = Double.parseDouble(IO.readln(question));
                }
                return grade;
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
                double average = roundToTenth(computeAverage(grade1, grade2));
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
    Note invalide, entre 1 et 6
    Deuxième note : 5
    Lou : 4.8, réussi
    Appréciation : suffisant
    ```

    `readGrade` contient la boucle de la page de théorie, avec `question` à la
    place de `"Note : "`. Dans `processPerson`, le `if` et le `else` ont
    disparu : une note invalide ne peut plus y arriver. La ligne 5 de la boucle
    utilise `isValidGrade`, qui est définie plus bas dans le fichier : l'ordre
    des fonctions dans le fichier n'a pas d'importance, vous l'avez vu en
    séance 05.

### Étape 2 - Autant de notes qu'il en faut

Jusqu'ici, chaque personne a exactement deux notes. Modifiez `processPerson`
pour qu'elle demande d'abord `Nombre de notes : `, puis lise autant de notes, en
les additionnant au fil des tours. La moyenne est alors la somme divisée par le
nombre de notes.

Indices :

- `Integer.parseInt(IO.readln("Nombre de notes : "))` lit un nombre entier,
  comme en séance 04 ;
- la question peut changer à chaque tour : `"Note " + i + " : "` ;
- `computeAverage` reçoit maintenant la somme et le nombre de notes.

Vérifiez avec : Camille, 2 notes, 3.3 et 4.6 ; Noah, 3 notes, 4, 5 et 6 ; Lou, 4
notes, 4.5, puis 7, puis 5, 3 et 4.

??? note "Une solution possible pour l'étape 2"

    === "Avant"

        ```java title="Main.java" linenums="1" hl_lines="12-14 42-44"
        public class Main {
            public static double readGrade(String question) {
                double grade = Double.parseDouble(IO.readln(question));

                while (!isValidGrade(grade)) {
                    System.out.println("Note invalide, entre 1 et 6");
                    grade = Double.parseDouble(IO.readln(question));
                }
                return grade;
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
                double average = roundToTenth(computeAverage(grade1, grade2));
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

        ```java title="Main.java" linenums="1" hl_lines="12-14 42-49 51"
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

    ```text
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
    Nombre de notes : 4
    Note 1 : 4.5
    Note 2 : 7
    Note invalide, entre 1 et 6
    Note 2 : 5
    Note 3 : 3
    Note 4 : 4
    Lou : 4.1, réussi
    Appréciation : suffisant
    ```

    `computeAverage` change de paramètres : la somme et le nombre de notes, au
    lieu de deux notes. Dans `processPerson`, les deux lectures de note sont
    remplacées par la lecture du nombre de notes, ligne 42, et par une boucle
    qui accumule les notes dans `sum`, lignes 43 à 49. `grade1` et `grade2` ont
    disparu.

    Pour Lou, la note 7 est refusée par la boucle de `readGrade`, **à
    l'intérieur** de la boucle de `processPerson`. Une boucle peut en appeler
    une autre, par l'intermédiaire d'une fonction.

### Étape 3 - Et si on tape 0 ?

Tapez `0` comme nombre de notes. Que se passe-t-il, et pourquoi ? Comment
l'empêcher avec ce que vous savez déjà ?

??? note "Ce qui se passe"

    ```text
    Nom : Lou
    Nombre de notes : 0
    Lou : 0.0, échoué
    Appréciation : insuffisant
    ```

    La boucle fait zéro tour, `sum` vaut 0, et `computeAverage` calcule
    `0.0 / 0`. Pour un `double`, cela ne plante pas : le résultat est `NaN`,
    _not a number_. `Math.round` transforme ensuite `NaN` en 0. Le programme
    affiche une moyenne de 0 sans prévenir, ce qui est pire qu'une erreur.

    Pour l'empêcher : une boucle qui redemande le nombre de notes tant qu'il
    est plus petit que 1, sur le modèle de `readGrade`.

## Discussion

En fin d'atelier, nous regardons quelques programmes ensemble, en classe :

- Quel programme de la partie _Dérouler_ vous a trompé ou trompée ? À quelle
  ligne de votre tableau votre raisonnement s'est-il séparé de celui de Java ?
- Pour chaque bug de la partie _Réparer_, quel ingrédient était en cause ?
- Dans le fil rouge, combien de boucles s'exécutent quand Lou tape 7 ?

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
