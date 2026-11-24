# Ranger dans un tableau

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Garder plusieurs valeurs du même type dans une seule variable, et y accéder par
leur numéro. À la fin de cette page, vous saurez déclarer un tableau, le
remplir, le parcourir avec une boucle, et éviter l'erreur la plus fréquente :
l'indice de trop.

!!! note "Comment lire cette page"

    Cette page est un **tutoriel** : un même programme est réécrit huit fois,
    et chaque version corrige un défaut de la précédente. Exécutez chaque
    version sur votre machine avant de passer à la suivante.

    Comme depuis la séance 05, chaque exemple montre le fichier `Main.java`
    **en entier**. Les lignes **surlignées** sont celles qui comptent dans
    l'exemple. Les blocs **Quiz** se répondent avant de lire la suite.

## Le problème : le fil rouge oublie les notes

À la fin de la séance 07, votre fil rouge lit autant de notes qu'il en faut et
calcule leur moyenne. Pour cela, il additionne chaque note dans `sum` au moment
où il la lit, puis il passe à la suivante.

Ajoutons une demande : **afficher les notes en dessous de la moyenne**, celles à
retravailler.

Le programme ne peut pas le faire. La moyenne n'est connue qu'après la dernière
note, et à ce moment-là, les notes précédentes ont disparu : chacune a été
ajoutée à `sum`, puis remplacée par la suivante. Il faut **garder** les notes.

## Étape 1 : une variable par note

La solution la plus directe : une variable par note. Avec cinq notes écrites
dans le code :

```java title="Main.java" linenums="1" hl_lines="3-7 9-10"
public class Main {
    public static void main(String[] args) {
        double grade1 = 5;
        double grade2 = 6;
        double grade3 = 4;
        double grade4 = 4.5;
        double grade5 = 5.5;

        double sum = (((grade1 + grade2) + grade3) + grade4) + grade5;
        double average = sum / 5;

        System.out.println("Moyenne : " + average);
    }
}
```

```text
Moyenne : 5.0
```

Ça fonctionne. Mais regardez ce que coûte une sixième note : il faut déclarer
`grade6`, l'ajouter à la somme, ligne 9, **et** remplacer le `5` de la ligne 10
par `6`. Oubliez le troisième endroit, et le programme calcule une moyenne
fausse sans aucun message d'erreur.

Et pour afficher les notes en dessous de la moyenne, il faudrait cinq `if`, un
par variable. Avec trente notes, trente variables et trente `if`. Il faut une
autre façon de ranger les notes.

## Étape 2 : un tableau

Un **tableau** est une variable qui contient plusieurs valeurs du même type,
rangées dans des **cases** numérotées.

```java title="Main.java" linenums="1" hl_lines="3 5-7"
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        System.out.println(grades[0]);
        System.out.println(grades[4]);
        System.out.println(grades.length);
    }
}
```

```text
5.0
5.5
5
```

Ligne 3, trois nouveautés :

| Écriture              | Ce qu'elle dit                                                 |
| :-------------------- | :------------------------------------------------------------- |
| `double[]`            | Le type : un tableau de `double`                               |
| `grades`              | Le nom du tableau. Au pluriel, puisqu'il en contient plusieurs |
| `{5, 6, 4, 4.5, 5.5}` | Les valeurs, dans l'ordre, entre accolades                     |

Le tableau ressemble à ceci :

| Indice |   0 |   1 |   2 |   3 |   4 |
| :----- | --: | --: | --: | --: | --: |
| Valeur | 5.0 | 6.0 | 4.0 | 4.5 | 5.5 |

Le numéro d'une case s'appelle son **indice**. On lit une case en écrivant son
indice entre crochets : `grades[0]` vaut `5.0`.

- **Les indices commencent à 0.** La première case est `grades[0]`, pas
  `grades[1]`.
- **`grades.length` est le nombre de cases**, ici 5. Sans parenthèses : ce n'est
  pas un appel de fonction.
- La dernière case a donc l'indice `grades.length - 1`, ici 4.
- **La taille d'un tableau ne change plus** une fois qu'il est créé.

## Étape 3 : lire et écrire une case

Une case s'utilise exactement comme une variable : `grades[0]` remplace
`grade1`, `grades[1]` remplace `grade2`, et ainsi de suite. Reprenons le calcul
de la moyenne de l'étape 1 :

=== "Avant"

    ```java title="Main.java" linenums="1" hl_lines="3-7 9-10"
    public class Main {
        public static void main(String[] args) {
            double grade1 = 5;
            double grade2 = 6;
            double grade3 = 4;
            double grade4 = 4.5;
            double grade5 = 5.5;

            double sum = (((grade1 + grade2) + grade3) + grade4) + grade5;
            double average = sum / 5;

            System.out.println("Moyenne : " + average);
        }
    }
    ```

=== "Après"

    ```java title="Main.java" linenums="1" hl_lines="3 5-6"
    public class Main {
        public static void main(String[] args) {
            double[] grades = {5, 6, 4, 4.5, 5.5};

            double sum = (((grades[0] + grades[1]) + grades[2]) + grades[3]) + grades[4];
            double average = sum / grades.length;

            System.out.println("Moyenne : " + average);
        }
    }
    ```

```text
Moyenne : 5.0
```

Les cinq variables sont remplacées par un tableau, ligne 3. La somme lit les
cases une par une, ligne 5, et le `5` écrit en dur devient `grades.length`,
ligne 6.

Une case se lit, et elle s'écrit aussi : on peut lui **affecter** une nouvelle
valeur, comme à une variable.

```java title="Main.java" linenums="1" hl_lines="5-7"
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        System.out.println("Case 2 : " + grades[2]);
        grades[2] = 5.5;
        System.out.println("Case 2 : " + grades[2]);
    }
}
```

```text
Case 2 : 4.0
Case 2 : 5.5
```

Ligne 6, `grades[2] = 5.5;` remplace la note 4.0 de la case 2 par 5.5. Les
autres cases ne changent pas. À droite du `=`, `grades[2]` se **lit** ; à
gauche, il s'**écrit**.

<div class="quiz" markdown>

Avec `double[] grades = {5, 6, 4, 4.5, 5.5};`, que vaut `grades[1]` ?

- [ ] `5.0`
- [x] `6.0`
- [ ] `4.0`
- [ ] Une erreur : il n'y a pas de case 1

<div class="quiz-explanation" markdown>

La case 0 contient `5.0`, la case 1 contient `6.0`. Si vous avez répondu `5.0`,
vous avez compté à partir de 1. C'est l'erreur la plus naturelle, et elle
reviendra à l'étape 5, sous la forme d'un indice de trop.

</div>

</div>

Regardez à nouveau la ligne 5 du calcul de la moyenne : on y écrit les indices
0, 1, 2, 3 et 4 à la main. Avec trente notes, la ligne serait aussi longue qu'à
l'étape 1. Mais d'une case à l'autre, seul l'indice change : c'est le travail
d'une boucle.

## Étape 4 : parcourir le tableau avec une boucle

Puisque les cases sont numérotées de 0 à `grades.length - 1`, une boucle `for`
de la séance 07 peut les visiter une par une. Réécrivons le calcul de la moyenne
de l'étape 3 :

=== "Avant"

    ```java title="Main.java" linenums="1" hl_lines="5"
    public class Main {
        public static void main(String[] args) {
            double[] grades = {5, 6, 4, 4.5, 5.5};

            double sum = (((grades[0] + grades[1]) + grades[2]) + grades[3]) + grades[4];
            double average = sum / grades.length;

            System.out.println("Moyenne : " + average);
        }
    }
    ```

=== "Après"

    ```java title="Main.java" linenums="1" hl_lines="4 6-8"
    public class Main {
        public static void main(String[] args) {
            double[] grades = {5, 6, 4, 4.5, 5.5};
            double sum = 0;

            for (int i = 0; i < grades.length; i++) {
                sum = sum + grades[i];
            }
            double average = sum / grades.length;

            System.out.println("Moyenne : " + average);
        }
    }
    ```

```text
Moyenne : 5.0
```

La somme case par case de la ligne 5 est remplacée par un accumulateur, ligne 4,
et une boucle, lignes 6 à 8. Le tableau et la division par `grades.length` ne
changent pas.

Le cœur du parcours est la ligne 7 : `grades[i]`. À chaque tour, `i` change, et
`grades[i]` désigne une autre case.

| Condition posée | `i` | `i < grades.length` | `grades[i]` | `sum` en fin de tour |
| :-------------- | --: | :-----------------: | ----------: | -------------------: |
| 1^re^ fois      |   0 |       `true`        |         5.0 |                  5.0 |
| 2^e^ fois       |   1 |       `true`        |         6.0 |                 11.0 |
| 3^e^ fois       |   2 |       `true`        |         4.0 |                 15.0 |
| 4^e^ fois       |   3 |       `true`        |         4.5 |                 19.5 |
| 5^e^ fois       |   4 |       `true`        |         5.5 |                 25.0 |
| 6^e^ fois       |   5 |       `false`       |             |              on sort |

Pour passer à six notes, il suffit maintenant d'ajouter une valeur entre les
accolades. La boucle et la division s'adaptent seules : c'est tout l'intérêt
d'écrire `grades.length` plutôt que `5`.

!!! tip "La boucle de parcours"

    `for (int i = 0; i < grades.length; i++)` est la boucle que vous écrirez le
    plus souvent avec un tableau. Elle part de 0, et elle s'arrête **avant**
    `grades.length`, avec `<` et non `<=`.

## Étape 5 : l'indice de trop

Que se passe-t-il avec `<=` à la place de `<` ?

```java title="Main.java" linenums="1" hl_lines="5-6"
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        for (int i = 0; i <= grades.length; i++) {
            System.out.println(grades[i]);
        }
    }
}
```

```text
5.0
6.0
4.0
4.5
5.5
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
	at Main.main(Main.java:6)
```

Le programme compile. Il affiche les cinq notes, puis il s'arrête avec une
**exception**. Au sixième tour, `i` vaut 5 et `5 <= 5` est vrai : Java essaie de
lire `grades[5]`, une case qui n'existe pas.

Le message se lit de gauche à droite :

| Morceau                              | Ce qu'il dit                                       |
| :----------------------------------- | :------------------------------------------------- |
| `ArrayIndexOutOfBoundsException`     | Un indice de tableau hors des limites              |
| `Index 5 out of bounds for length 5` | L'indice 5 n'existe pas dans un tableau de 5 cases |
| `at Main.main(Main.java:6)`          | C'est arrivé ligne 6                               |

Ce n'est pas une erreur de compilation : le compilateur ne connaît pas la valeur
de `i`. L'erreur ne se voit qu'**à l'exécution**. La séance 10 apprendra à
rattraper ce genre d'arrêt ; pour l'instant, on l'évite.

## Étape 6 : afficher tout le tableau

Pour vérifier le contenu d'un tableau, on a envie d'écrire
`System.out.println(grades);`. Le résultat surprend :

```java title="Main.java" linenums="1" hl_lines="5"
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        System.out.println(grades);
    }
}
```

```text
[D@2b2fa4f7
```

Ce n'est pas le contenu du tableau, mais une sorte d'adresse : `[D` veut dire
_"tableau de `double`"_, et la suite change d'une exécution à l'autre. Pour voir
les valeurs, Java fournit `Arrays.toString` :

```java title="Main.java" linenums="1" hl_lines="1 7-8"
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        grades[2] = 5.5;
        System.out.println(Arrays.toString(grades));
    }
}
```

```text
[5.0, 6.0, 5.5, 4.5, 5.5]
```

Deux nouveautés :

- **Ligne 1, `import java.util.Arrays;`.** `Arrays` n'est pas disponible
  d'office : la ligne `import` dit à Java où le trouver. Elle se place tout en
  haut du fichier, avant `public class Main`. IntelliJ la propose tout seul
  quand vous tapez `Arrays`.
- **Ligne 7, `grades[2] = 5.5;`.** L'écriture de l'étape 3 : `Arrays.toString`
  montre le tableau entier, et la case 2 qui a changé.

## Étape 7 : créer un tableau vide, puis le remplir

Jusqu'ici, les notes sont écrites dans le code. Pour les lire au clavier, il
faut créer le tableau **avant** de connaître les valeurs, avec sa seule taille :

```java title="Main.java" linenums="1" hl_lines="5-6 8 10-12"
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int count = Integer.parseInt(IO.readln("Nombre de notes : "));
        double[] grades = new double[count];

        System.out.println(Arrays.toString(grades));

        for (int i = 0; i < grades.length; i++) {
            grades[i] = Double.parseDouble(IO.readln("Note " + (i + 1) + " : "));
        }
        System.out.println(Arrays.toString(grades));
    }
}
```

```text
Nombre de notes : 3
[0.0, 0.0, 0.0]
Note 1 : 4
Note 2 : 5.5
Note 3 : 6
[4.0, 5.5, 6.0]
```

- **Ligne 6, `new double[count]`** crée un tableau de `count` cases. La taille
  peut venir d'une variable : elle est choisie au moment de l'exécution.
- **Ligne 8** montre qu'un tableau neuf n'est pas vide : chaque case contient la
  valeur par défaut de son type, `0.0` pour un `double`, `0` pour un `int`,
  `false` pour un `boolean`.
- **Ligne 11** remplit la case `i`. La question affiche `i + 1` : pour la
  personne qui tape, la première note est la note 1, même si elle va dans la
  case 0.

## Étape 8 : enfin, afficher les notes en dessous de la moyenne

Les notes sont gardées : on peut les parcourir **une seconde fois**, une fois la
moyenne connue. C'est ce que l'étape 1 ne pouvait pas faire.

```java title="Main.java" linenums="1" hl_lines="12-16"
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};
        double sum = 0;

        for (int i = 0; i < grades.length; i++) {
            sum = sum + grades[i];
        }
        double average = sum / grades.length;
        System.out.println("Moyenne : " + average);

        for (int i = 0; i < grades.length; i++) {
            if (grades[i] < average) {
                System.out.println("En dessous : " + grades[i]);
            }
        }
    }
}
```

```text
Moyenne : 5.0
En dessous : 4.0
En dessous : 4.5
```

Deux boucles, deux parcours. Le premier additionne les notes : la moyenne n'est
connue qu'**après** lui, ligne 9. Le second compare chaque note à cette moyenne.

Une seule boucle ne suffirait pas : pendant le premier parcours, `average`
n'existe pas encore, et on ne peut pas comparer une note à une moyenne qu'on est
en train de calculer. C'est exactement pour cela qu'il fallait garder les notes.
Avec cinq notes ou avec trente, le programme est le même.

## Résumé

| Écriture                           | Ce qu'elle fait                                 |
| :--------------------------------- | :---------------------------------------------- |
| `double[] grades = {5, 6, 4};`     | Crée un tableau avec ses valeurs                |
| `double[] grades = new double[n];` | Crée un tableau de `n` cases, remplies de `0.0` |
| `grades[i]`                        | La case d'indice `i`, à lire ou à affecter      |
| `grades.length`                    | Le nombre de cases                              |
| `Arrays.toString(grades)`          | Le contenu du tableau, sous forme de texte      |

- Les indices vont de **0** à **`length - 1`**.
- La boucle de parcours : `for (int i = 0; i < grades.length; i++)`.
- Un indice hors des limites ne se voit pas à la compilation. Il arrête le
  programme à l'exécution avec une `ArrayIndexOutOfBoundsException`.
- La taille d'un tableau est fixée à sa création et ne change plus.

## Pour aller plus loin

- [Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html) -
  tutoriel officiel de Java, en anglais.
- [`java.util.Arrays`](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Arrays.html) -
  la documentation de `Arrays`, en anglais. Vous y trouverez `toString`, et
  d'autres méthodes que la séance 11 utilisera.
- [Java Visualizer de Python Tutor](https://pythontutor.com/java.html) - collez
  un des programmes de cette page et regardez les cases se remplir, pas à pas.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
