# Parcourir pour calculer

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Tirer une information d'un tableau en le parcourant une fois : un compte, un
minimum, un maximum. À la fin de cette page, vous saurez reconnaître ces
parcours, et vous saurez pourquoi un maximum ne doit pas partir de 0.

## Trois parcours, une même forme

Vous avez déjà écrit le premier : la somme, à la page
[Ranger dans un tableau](01-ranger-dans-un-tableau.md#etape-3-parcourir-le-tableau-avec-une-boucle).
Les autres ont la même forme :

1. une variable de résultat, déclarée **avant** la boucle ;
2. une boucle qui visite chaque case ;
3. dans la boucle, une mise à jour du résultat ;
4. après la boucle, le résultat est prêt.

C'est l'accumulateur de la séance 07, appliqué aux cases d'un tableau.

## Compter

Combien de notes sont suffisantes ? Un compteur part de 0 et augmente de 1
chaque fois qu'une case remplit la condition :

```java title="Main.java" linenums="1" hl_lines="4 6-10"
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 3.5, 4.5, 3};
        int passedCount = 0;

        for (int i = 0; i < grades.length; i++) {
            if (grades[i] >= 4) {
                passedCount++;
            }
        }
        System.out.println("Notes suffisantes : " + passedCount + " sur " + grades.length);
    }
}
```

```text
Notes suffisantes : 3 sur 5
```

## Le minimum et le maximum

Pour trouver la plus grande note, on garde la **meilleure valeur vue jusqu'ici**.
À chaque case, on se pose une question : _"cette note est-elle plus grande que
la meilleure vue jusqu'ici ?"_ Si oui, elle la remplace.

Reste à savoir d'où partir. La seule réponse sûre : de la **première case**.

```java title="Main.java" linenums="1" hl_lines="4-5 7-14"
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};
        double min = grades[0];
        double max = grades[0];

        for (int i = 1; i < grades.length; i++) {
            if (grades[i] < min) {
                min = grades[i];
            }
            if (grades[i] > max) {
                max = grades[i];
            }
        }
        System.out.println("Minimum : " + min);
        System.out.println("Maximum : " + max);
    }
}
```

```text
Minimum : 4.0
Maximum : 6.0
```

Puisque `min` et `max` partent de la case 0, la boucle commence à `i = 1` : la
case 0 a déjà été vue. Partir de `i = 0` ne serait pas faux, juste un tour
inutile.

| Condition posée | `i` | `grades[i]` | `min` en fin de tour | `max` en fin de tour |
| :-------------- | --: | ----------: | -------------------: | -------------------: |
| Avant la boucle |     |             |                  5.0 |                  5.0 |
| 1^re^ fois      |   1 |         6.0 |                  5.0 |                  6.0 |
| 2^e^ fois       |   2 |         4.0 |                  4.0 |                  6.0 |
| 3^e^ fois       |   3 |         4.5 |                  4.0 |                  6.0 |
| 4^e^ fois       |   4 |         5.5 |                  4.0 |                  6.0 |
| 5^e^ fois       |   5 |             |              on sort |                      |

Les deux `if` sont indépendants, sans `else` : une même note peut, en
principe, faire bouger les deux. C'est le cas de la première case, d'où l'on
part.

<div class="quiz" markdown>

Un programme cherche la température la plus haute de
`{-3, -8, -1, -5}`. Il part de `int max = 0;`. Qu'affiche-t-il ?

- [ ] `-1`
- [x] `0`
- [ ] `-8`
- [ ] Une erreur

<div class="quiz-explanation" markdown>

Aucune température n'est plus grande que 0 : `max` ne change jamais, et le
programme affiche une température qui n'est pas dans le tableau. Il compile,
s'exécute sans erreur, et donne une réponse fausse. Partir de la première case,
`int max = temperatures[0];`, règle le problème pour toutes les valeurs.

Vous retrouverez ce programme dans l'atelier.

</div>

</div>

## Le `String[] args` de `main`

Depuis la séance 03, vous écrivez `public static void main(String[] args)`
sans savoir ce que veut dire `String[] args`. Vous pouvez maintenant le lire :
`args` est un **tableau de `String`**, un paramètre de la fonction `main`.

```java title="Main.java" linenums="1" hl_lines="3"
public class Main {
    public static void main(String[] args) {
        System.out.println(args.length);
    }
}
```

```text
0
```

Ce tableau contient les mots tapés après le nom du programme quand on le lance
depuis un terminal, par exemple `java Main.java bonjour`. Depuis le bouton
_Run_ d'IntelliJ, on n'en tape aucun : le tableau a zéro case. Vous ne vous en
servirez pas dans ce cours, mais il n'y a plus de mot mystérieux dans votre
programme.

## Résumé

| Parcours | Avant la boucle         | Dans la boucle                                  |
| :------- | :---------------------- | :---------------------------------------------- |
| Somme    | `sum = 0`               | `sum = sum + values[i]`                         |
| Compte   | `count = 0`             | `if (condition) { count++; }`                   |
| Maximum  | `max = values[0]`       | `if (values[i] > max) { max = values[i]; }`     |
| Minimum  | `min = values[0]`       | `if (values[i] < min) { min = values[i]; }`     |

- Le résultat se déclare **avant** la boucle, et se lit **après**.
- Un minimum ou un maximum part de la première case, jamais d'une valeur
  inventée comme 0.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
