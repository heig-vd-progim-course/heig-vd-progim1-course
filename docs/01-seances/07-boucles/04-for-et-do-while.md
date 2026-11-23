# `for` et `do-while`

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Écrire plus court la boucle la plus fréquente, celle qui compte : la boucle
`for`. Puis voir `do-while`, la boucle qui fait toujours au moins un tour, et
savoir choisir entre les trois.

## Les trois mêmes ingrédients, sur une ligne

Une boucle qui compte de 0 à 5, avec `while` puis avec `for` :

=== "Avant"

    ```java title="Main.java" linenums="1" hl_lines="3 5 7"
    public class Main {
        public static void main(String[] args) {
            int i = 0;

            while (i <= 5) {
                System.out.println(i);
                i++;
            }
            System.out.println("Fin");
        }
    }
    ```

=== "Après"

    ```java title="Main.java" linenums="1" hl_lines="3"
    public class Main {
        public static void main(String[] args) {
            for (int i = 0; i <= 5; i++) {
                System.out.println(i);
            }
            System.out.println("Fin");
        }
    }
    ```

```text
0
1
2
3
4
5
Fin
```

Les deux programmes affichent la même chose. Les trois ingrédients du `while`,
dispersés sur les lignes 3, 5 et 7, sont regroupés dans les parenthèses du
`for`, séparés par des **points-virgules** :

```text
for (int i = 0; i <= 5; i++) {
     ---------  ------  ---
     situation  condi-  mise
     initiale   tion    à jour
```

Le `for` s'exécute **exactement** comme le `while` d'avant :

1. la situation initiale, **une seule fois**, au début ;
2. la condition : si elle est fausse, on sort ;
3. le corps ;
4. la mise à jour, **à la fin** du tour, même si elle est écrite en haut ;
5. retour à l'étape 2.

L'étape 4 surprend : `i++` est écrit avant le corps, mais il s'exécute après.
Si vous hésitez sur ce que fait un `for`, réécrivez-le en `while` : c'est la
même boucle.

<div class="quiz" markdown>

Que vaut `i` au moment où l'on affiche `Fin`, dans la version `while` ?

- [ ] 5
- [x] 6
- [ ] 0
- [ ] `i` n'existe plus

<div class="quiz-explanation" markdown>

La boucle s'arrête quand `i <= 5` devient faux, donc quand `i` vaut 6. Dans la
version `while`, `i` est déclarée ligne 3, avant la boucle : elle existe encore
après, et vaut 6. Dans la version `for`, la réponse serait différente : voir
la section suivante.

</div>

</div>

## La variable du `for` n'existe que dans le `for`

```java title="Main.java" linenums="1" hl_lines="3 6"
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i <= 5; i++) {
            System.out.println(i);
        }
        System.out.println("i vaut " + i);
    }
}
```

```text
Main.java:6: error: cannot find symbol
        System.out.println("i vaut " + i);
                                       ^
  symbol:   variable i
  location: class Main
1 error
```

Une variable déclarée dans les parenthèses du `for` appartient à la boucle :
elle disparaît à l'accolade fermante, ligne 5. C'est voulu. Un compteur de
tours ne sert à rien après la boucle, et cela permet de réutiliser le nom `i`
dans la boucle suivante.

Un **accumulateur**, lui, sert après la boucle : il se déclare donc toujours
avant le `for`, comme avant le `while`.

```java title="Main.java" linenums="1" hl_lines="3 5-7"
public class Main {
    public static void main(String[] args) {
        int sum = 0;

        for (int i = 1; i <= 4; i++) {
            sum = sum + i;
        }
        System.out.println("Somme : " + sum);
    }
}
```

```text
Somme : 10
```

## Compter autrement

Les trois ingrédients d'un `for` s'écrivent comme on veut. Pour compter à
rebours, on part du haut et on retire 1 :

```java title="Main.java" linenums="1" hl_lines="3"
public class Main {
    public static void main(String[] args) {
        for (int i = 5; i >= 1; i--) {
            System.out.println(i);
        }
        System.out.println("Partez !");
    }
}
```

```text
5
4
3
2
1
Partez !
```

Pour avancer de 2 en 2, la mise à jour est `i += 2`, vu en séance 04 :

```java title="Main.java" linenums="1" hl_lines="3"
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i <= 8; i += 2) {
            System.out.println(i);
        }
    }
}
```

```text
0
2
4
6
8
```

## `for` ou `while` ?

Les deux font la même chose : tout `for` peut s'écrire en `while`, et
inversement. Le choix sert à **dire au lecteur** quel genre de boucle il lit.

| Vous savez, avant d'entrer dans la boucle...       | Utilisez | Exemple                               |
| :------------------------------------------------- | :------- | :------------------------------------ |
| combien de tours elle va faire                     | `for`    | Compter de 1 à 10, lire 3 notes       |
| seulement quand elle doit s'arrêter, pas quand     | `while`  | Redemander une note tant qu'elle est fausse |

_"Combien de tours ?"_ n'a pas besoin d'être un nombre écrit dans le code. Dans
le fil rouge, le nombre de notes est tapé au clavier, mais il est connu **avant**
la boucle : c'est un `for`. Le nombre de saisies d'une note invalide, lui,
personne ne le connaît à l'avance : c'est un `while`.

<div class="quiz" markdown>

Un programme demande des mots de passe jusqu'à ce que le bon soit tapé. Quelle
boucle convient le mieux ?

- [ ] `for`, parce qu'on compte les essais
- [x] `while`, parce qu'on ne sait pas combien d'essais il faudra
- [ ] `if`, parce qu'on vérifie le mot de passe
- [ ] Aucune, il faut écrire la question plusieurs fois

<div class="quiz-explanation" markdown>

Le nombre de tours dépend de ce que tape la personne, et personne ne le connaît
avant. C'est le cas du `while`. On peut compter les essais **dans** un
`while`, avec un compteur, sans que cela en fasse une boucle `for`. Et un `if`
ne vérifie qu'une fois : c'était le rappel du début de séance.

</div>

</div>

## `do-while` : au moins un tour

???+ note "Pour aller plus loin : la boucle `do-while`"

    La boucle `do-while` pose sa condition **à la fin** du tour, et non au
    début. Elle fait donc toujours au moins un tour.

    C'est exactement ce qu'il faut pour redemander une note : on demande
    **toujours** une première fois. Reprenons la boucle de la page `while`.

    === "Avant"

        ```java title="Main.java" linenums="1" hl_lines="7 9-12"
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

    === "Après"

        ```java title="Main.java" linenums="1" hl_lines="7 9-11"
        public class Main {
            public static boolean isValidGrade(double grade) {
                return (grade >= 1) && (grade <= 6);
            }

            public static void main(String[] args) {
                double grade;

                do {
                    grade = Double.parseDouble(IO.readln("Note : "));
                } while (!isValidGrade(grade));
                System.out.println("Note acceptée : " + grade);
            }
        }
        ```

    ```text
    Note : 7
    Note : 4.5
    Note acceptée : 4.5
    ```

    La ligne qui lit la note n'apparaît plus qu'une fois, ligne 10. `grade` est
    déclarée avant la boucle, ligne 7, pour exister encore à la ligne 11 et
    après. Le message _"Note invalide"_ a disparu : on ne peut pas l'afficher
    au premier tour, puisque la note n'a pas encore été vérifiée.

    Deux différences de syntaxe avec `while` :

    - le mot `do` ouvre la boucle, et la condition vient **après** l'accolade
      fermante ;
    - un `;` **termine** la ligne de la condition. Ici, il est obligatoire.
      Après un `while` ordinaire, il est un bug.

    Quand la condition est fausse dès le départ, la différence se voit :

    ```java title="Main.java" linenums="1" hl_lines="3 5-8"
    public class Main {
        public static void main(String[] args) {
            int i = 10;

            do {
                System.out.println(i);
                i++;
            } while (i <= 5);
            System.out.println("Fin");
        }
    }
    ```

    ```text
    10
    Fin
    ```

    Avec `while`, ce programme n'affichait que `Fin`. Avec `do-while`, le corps
    s'exécute une fois avant que la condition soit posée.

    `do-while` est rare dans du vrai code : la plupart des boucles s'écrivent
    plus clairement avec `for` ou `while`. Vous devez savoir la **lire**. La
    reconnaître dans un programme suffit.

## Résumé

| Boucle      | La condition est posée | Nombre minimum de tours | Quand l'utiliser                          |
| :---------- | :--------------------- | :---------------------: | :---------------------------------------- |
| `for`       | au début de chaque tour |            0            | Le nombre de tours est connu avant         |
| `while`     | au début de chaque tour |            0            | On sait seulement quand s'arrêter          |
| `do-while`  | à la fin de chaque tour |            1            | Il faut toujours faire un premier tour     |

- `for (situation initiale; condition; mise à jour)` : les trois ingrédients
  sur une ligne, séparés par des `;`.
- La mise à jour d'un `for` s'exécute à la fin du tour.
- La variable déclarée dans un `for` n'existe que dans la boucle.
- Un accumulateur se déclare avant la boucle, quelle qu'elle soit.

## Pour aller plus loin

- [The for Statement](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html) -
  tutoriel officiel de Java, en anglais. Sa deuxième partie, la boucle `for`
  améliorée sur un tableau, n'est pas au programme de ce cours.
- [The while and do-while Statements](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html) -
  même tutoriel.
- [Manipulez vos données](https://openclassrooms.com/fr/courses/8383791-apprenez-a-programmer-en-java/8439941-manipulez-vos-donnees) -
  le chapitre d'OpenClassrooms, qui présente aussi la boucle `for each`.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
