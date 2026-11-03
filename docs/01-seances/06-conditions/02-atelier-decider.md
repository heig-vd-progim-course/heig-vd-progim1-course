# Atelier - Décider

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Prévoir quelles lignes d'un programme s'exécutent, réparer des conditions
fausses, puis faire décider le fil rouge : réussi ou échoué. Vous travaillez
seul ou seule, et vous comparez avec votre voisine ou votre voisin à la fin de
chaque partie.

**Règle de l'atelier : toute condition se teste avec trois valeurs, une qui la
rend vraie, une qui la rend fausse, et la valeur limite.**

Pour `average >= 4`, ce sont par exemple 4.5, 3.5 et **4**. La limite est celle
qu'on oublie, et c'est là que se cachent les bugs.

Créez un nouveau projet `seance-06` dans IntelliJ et remplacez le contenu de
`Main.java` à chaque exercice.

## 1. Prédire

Pour chaque programme : **écrivez sur papier ce que la console va afficher**,
**avant** de l'exécuter. Puis exécutez-le et comparez. Si votre prédiction est
fausse, trouvez la ligne où votre raisonnement s'est séparé de celui de Java.

### Programme A

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int temperature = 18;

        if (temperature > 20) {
            System.out.println("T-shirt");
        }
        if (temperature < 10) {
            System.out.println("Manteau");
        }
        System.out.println("On sort");
    }
}
```

### Programme B

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int count = 0;

        if (count < 3) {
            count = count + 1;
        }
        System.out.println(count);
    }
}
```

### Programme C

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        double average = 4.5;
        boolean passed = average >= 4;

        average = 3.0;
        System.out.println(average);
        System.out.println(passed);
    }
}
```

### Programme D

`%` est le reste de la division entière, vu en séance 04 : `10 % 2` vaut 0,
`7 % 2` vaut 1.

```java title="Main.java" linenums="1"
public class Main {
    public static boolean isEven(int number) {
        return (number % 2) == 0;
    }

    public static void main(String[] args) {
        System.out.println(isEven(10));
        System.out.println(isEven(7));

        if (isEven(7)) {
            System.out.println("7 est pair");
        } else {
            System.out.println("7 est impair");
        }
    }
}
```

??? note "Les sorties, à ouvrir après avoir exécuté"

    Programme A :

    ```text
    On sort
    ```

    18 n'est ni plus grand que 20, ni plus petit que 10. Les deux blocs sont
    sautés. Un `if` sans `else` peut très bien ne rien faire.

    Programme B :

    ```text
    1
    ```

    Un `if` s'exécute **une seule fois**. Il ne recommence pas tant que sa
    condition est vraie : `count` passe de 0 à 1, et le programme continue.
    Répéter, c'est le rôle des boucles, en séance 07.

    Programme C :

    ```text
    3.0
    true
    ```

    Ligne 4, `average >= 4` est calculé **une fois**, avec la valeur de ce
    moment, 4.5 : `passed` reçoit `true`. Changer `average` ligne 6 ne
    recalcule rien. C'est la règle de la séance 05 : une variable est remplacée
    par sa valeur au moment où la ligne s'exécute.

    Programme D :

    ```text
    true
    false
    7 est impair
    ```

    `isEven(7)` rend `false`, donc c'est le bloc du `else` qui s'exécute.

## 2. Réparer

Chacun de ces programmes contient **une** erreur, placée exprès. Pour chacun :

1. exécutez-le ;
2. dites si c'est une erreur de compilation, une erreur à l'exécution, ou un
   résultat faux sans erreur ;
3. pour une erreur de compilation, trouvez la ligne indiquée par le message et
   reformulez le message avec vos mots ;
4. corrigez, en modifiant le moins de lignes possible.

### Bug 1 - Pile 18 ans

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int age = 18;

        if (age = 18) {
            System.out.println("Pile 18 ans");
        }
    }
}
```

### Bug 2 - Tout le monde réussit

La moyenne est de 3.5. Le programme ne devrait pas afficher _"Réussi"_.

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        double average = 3.5;

        if (average >= 4); {
            System.out.println("Réussi");
        }
        System.out.println("Fin du programme");
    }
}
```

### Bug 3 - Le droit de vote

En Suisse, on vote à partir de 18 ans. Ce programme affiche `true` puis
`false`, ce qui semble juste. Appliquez la règle de l'atelier.

```java title="Main.java" linenums="1"
public class Main {
    public static boolean canVote(int age) {
        return age > 18;
    }

    public static void main(String[] args) {
        System.out.println(canVote(25));
        System.out.println(canVote(12));
    }
}
```

### Bug 4 - La fonction qui ne rend pas toujours

```java title="Main.java" linenums="1"
public class Main {
    public static boolean hasPassed(double average) {
        if (average >= 4) {
            return true;
        }
    }

    public static void main(String[] args) {
        System.out.println(hasPassed(4.5));
    }
}
```

??? note "Les corrections, à ouvrir après avoir cherché"

    **Bug 1** - erreur de compilation :

    ```text
    Main.java:5: error: incompatible types: int cannot be converted to boolean
            if (age = 18) {
                    ^
    1 error
    ```

    Un seul `=` range 18 dans `age`. Le résultat est un `int`, et un `if`
    attend un `boolean`. Pour comparer, il faut `==` :

    ```java title="Main.java" linenums="1" hl_lines="5"
    public class Main {
        public static void main(String[] args) {
            int age = 18;

            if (age == 18) {
                System.out.println("Pile 18 ans");
            }
        }
    }
    ```

    ```text
    Pile 18 ans
    ```

    **Bug 2** - aucune erreur, résultat faux :

    ```text
    Réussi
    Fin du programme
    ```

    Le point-virgule de la ligne 5 termine le `if`. Il ne contrôle plus rien,
    et le bloc des lignes 5 à 7 devient un bloc ordinaire, exécuté dans tous
    les cas. Java ne signale rien. On retire le point-virgule :

    ```java title="Main.java" linenums="1" hl_lines="5"
    public class Main {
        public static void main(String[] args) {
            double average = 3.5;

            if (average >= 4) {
                System.out.println("Réussi");
            }
            System.out.println("Fin du programme");
        }
    }
    ```

    ```text
    Fin du programme
    ```

    **Bug 3** - aucune erreur, résultat faux, mais seulement à la limite.
    Ajoutez le test `canVote(18)` : il affiche `false`. Une personne de 18 ans
    ne pourrait pas voter. `>` exclut la limite, `>=` l'inclut :

    ```java title="Main.java" linenums="1" hl_lines="3 9"
    public class Main {
        public static boolean canVote(int age) {
            return age >= 18;
        }

        public static void main(String[] args) {
            System.out.println(canVote(25));
            System.out.println(canVote(12));
            System.out.println(canVote(18));
        }
    }
    ```

    ```text
    true
    false
    true
    ```

    C'est le bug le plus dangereux des quatre. Les deux tests du programme
    passaient : seul le test de la limite le révèle.

    **Bug 4** - erreur de compilation :

    ```text
    Main.java:6: error: missing return statement
        }
        ^
    1 error
    ```

    La fonction promet de rendre un `boolean`. Si `average` est plus petit que
    4, le `if` est sauté et on arrive ligne 6 sans rien avoir rendu. Le
    compilateur vérifie **tous** les chemins, pas seulement celui que prendra
    votre test. La correction la plus courte rend directement la comparaison :

    ```java title="Main.java" linenums="1" hl_lines="3"
    public class Main {
        public static boolean hasPassed(double average) {
            return average >= 4;
        }

        public static void main(String[] args) {
            System.out.println(hasPassed(4.5));
        }
    }
    ```

    ```text
    true
    ```

    Ajouter un `else { return false; }` fonctionne aussi.

## 3. Écrire

Pour chacune de ces fonctions, dans l'ordre :

1. écrivez sa signature ;
2. écrivez son tableau de tests, **à la main** : une valeur vraie, une fausse,
   la limite ;
3. écrivez son corps, en une ligne ;
4. appelez-la dans `main` avec les valeurs du tableau, et comparez.

| Fonction       | Paramètres                       | Rend `true` quand                   |
| :------------- | :------------------------------- | :---------------------------------- |
| `isFreezing`   | une température en °C (`double`) | il gèle : 0 °C ou moins             |
| `canAfford`    | un prix et un budget (`double`)  | le prix ne dépasse pas le budget    |
| `isMultipleOf` | deux entiers                     | le premier est multiple du deuxième |

Pour finir, utilisez `canAfford` dans un `if` de `main` : afficher _"Vous pouvez
l'acheter."_, ou combien il manque.

??? note "Une solution possible"

    ```java title="Main.java" linenums="1"
    public class Main {
        public static boolean isFreezing(double celsius) {
            return celsius <= 0;
        }

        public static boolean canAfford(double price, double budget) {
            return price <= budget;
        }

        public static boolean isMultipleOf(int number, int divisor) {
            return (number % divisor) == 0;
        }

        public static void main(String[] args) {
            // isFreezing : vrai, limite, faux
            System.out.println(isFreezing(-5));
            System.out.println(isFreezing(0));
            System.out.println(isFreezing(3));

            // canAfford : vrai, limite, faux
            System.out.println(canAfford(20, 50));
            System.out.println(canAfford(50, 50));
            System.out.println(canAfford(60, 50));

            // isMultipleOf : vrai, faux
            System.out.println(isMultipleOf(15, 5));
            System.out.println(isMultipleOf(15, 4));

            // Utiliser une des fonctions dans un if
            double price = 60;
            double budget = 50;
            if (canAfford(price, budget)) {
                System.out.println("Vous pouvez l'acheter.");
            } else {
                System.out.println("Il vous manque " + (price - budget) + " francs.");
            }
        }
    }
    ```

    ```text
    true
    true
    false
    true
    true
    false
    true
    false
    Il vous manque 10.0 francs.
    ```

    `isMultipleOf` n'a pas de limite au sens de `<=` : un nombre est multiple
    ou ne l'est pas. Deux tests suffisent.

## 4. Le fil rouge décide

Vous repartez de votre fil rouge de la séance 05, étape 3 : la fonction
`processPerson`, appelée trois fois. Si vous ne l'avez pas, prenez la solution
de l'[atelier de la séance 05](../05-fonctions-et-portee/02-atelier-decouper-en-fonctions.md#etape-3-un-groupe-de-trois-personnes).

### Étape 1 - Écrire et tester `hasPassed`

Écrivez une fonction `hasPassed`, qui reçoit une moyenne et rend `true` si
elle vaut au moins 4.

Comme en séance 05, **testez-la seule** avant de la brancher : remplacez
provisoirement `main` par des appels avec les trois valeurs de la règle. Puis
ajoutez le cas de Camille, 3.3 et 4.6.

Question à trancher avant d'écrire le test de Camille : faut-il décider sur la
moyenne exacte, ou sur la moyenne **arrondie** au dixième ? Essayez les deux.

??? note "Une solution possible pour l'étape 1"

    ```java title="Main.java" linenums="1" hl_lines="10-12 15-21"
    public class Main {
        public static double computeAverage(double grade1, double grade2) {
            return (grade1 + grade2) / 2;
        }

        public static double roundToTenth(double value) {
            return Math.round(value * 10) / 10.0;
        }

        public static boolean hasPassed(double average) {
            return average >= 4;
        }

        public static void main(String[] args) {
            // Tableau de tests : la limite, juste au-dessus, juste en dessous
            System.out.println(hasPassed(4));
            System.out.println(hasPassed(4.1));
            System.out.println(hasPassed(3.9));

            // Le cas de Camille : 3.3 et 4.6
            System.out.println(hasPassed(roundToTenth(computeAverage(3.3, 4.6))));
        }
    }
    ```

    ```text
    true
    true
    false
    true
    ```

    La moyenne exacte de Camille est 3.9499999999999997 : sans l'arrondi,
    `hasPassed` rendrait `false`. Arrondie, elle vaut 4.0 et Camille réussit.
    On décide sur la note **affichée**, sinon le programme affiche _"4.0,
    échoué"_, ce que personne ne comprendrait. La page suivante revient sur ce
    3.9499999999999997.

### Étape 2 - Afficher le verdict

Remettez les trois appels de `processPerson` dans `main`. Dans
`processPerson`, après le calcul de la moyenne, affichez par exemple
_"Camille : 4.0, réussi"_ ou _"Lou : 3.8, échoué"_.

Vérifiez avec ces trois personnes : Camille, 3.3 et 4.6 ; Noah, 5.5 et 4 ; Lou,
3.5 et 4.

??? note "Une solution possible pour l'étape 2"

    ```java title="Main.java" linenums="1" hl_lines="14-16 25-29"
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

        public static boolean hasPassed(double average) {
            return average >= 4;
        }

        public static void processPerson() {
            String name = IO.readln("Nom : ");
            double grade1 = readGrade("Première note : ");
            double grade2 = readGrade("Deuxième note : ");

            double average = roundToTenth(computeAverage(grade1, grade2));

            if (hasPassed(average)) {
                System.out.printf("%s : %.1f, réussi%n", name, average);
            } else {
                System.out.printf("%s : %.1f, échoué%n", name, average);
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
    Première note : 3.5
    Deuxième note : 4
    Lou : 3.8, échoué
    ```

    `main` n'a pas changé. La décision est descendue dans `hasPassed`, et
    `processPerson` ne fait que lire, appeler et afficher.

### Étape 3 - Et si on tape 7 ?

Exécutez votre programme avec une note de 7, puis de -2. Que se passe-t-il ?
Notez ces cas : vous les traiterez après la pause.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
