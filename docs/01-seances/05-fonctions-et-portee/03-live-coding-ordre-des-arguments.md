# Live coding - L'ordre des arguments

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Revoir, étape par étape, la démonstration faite en classe sur la fonction
`walkingMinutes`. Chaque étape réécrit le programme précédent sans changer ce
qu'il affiche, jusqu'à montrer que les noms des variables ne jouent aucun rôle
dans un appel.

**Règle de ce live coding : Java associe chaque argument au paramètre qui
occupe la même position, jamais à celui qui porte le même nom.**

## La vidéo

<video controls preload="metadata" width="100%">
  <source src="../videos/live-coding-ordre-des-arguments.mp4" type="video/mp4">
  Votre navigateur ne lit pas la vidéo.
  <a href="../videos/live-coding-ordre-des-arguments.mp4">Téléchargez-la</a>.
</video>

La vidéo dure six minutes et n'a **pas de son** : les explications sont sur
cette page. Repères approximatifs :

| Moment | Étape                                                               |
| :----- | :------------------------------------------------------------------ |
| 0:00   | [1. Les valeurs écrites dans l'appel](#1-les-valeurs-ecrites-dans-lappel) |
| 0:40   | [2. Le résultat dans une variable](#2-le-resultat-dans-une-variable)     |
| 3:20   | [3. Les arguments dans des variables](#3-les-arguments-dans-des-variables) |
| 4:10   | [4. Les mêmes noms que les paramètres](#4-les-memes-noms-que-les-parametres) |

Chaque programme ci-dessous est complet : copiez-le dans `Main.java` et
exécutez-le. Les quatre affichent exactement la même chose.

## Ce que vous voyez dans IntelliJ, et qui n'est pas du code

Dans la vidéo, les appels ressemblent à ceci :

```text
walkingMinutes( distanceKm: 10,  speedKmh: 5)
```

Les mentions `distanceKm:` et `speedKmh:`, sur fond gris, **ne sont pas
tapées**. IntelliJ les affiche pour rappeler à quel paramètre va chaque
argument. Ce sont des _inlay hints_, des indications d'affichage : elles ne sont
pas dans le fichier.

Java n'a pas d'arguments nommés. Si vous tapez ces mentions vous-même, le
programme ne compile pas :

```java title="Main.java" linenums="1" hl_lines="7"
public class Main {
    public static double walkingMinutes(double distanceKm, double speedKmh) {
        return (distanceKm / speedKmh) * 60;
    }

    public static void main(String[] args) {
        System.out.println(walkingMinutes(distanceKm: 10, speedKmh: 5));
    }
}
```

```text
Main.java:7: error: ')' or ',' expected
        System.out.println(walkingMinutes(distanceKm: 10, speedKmh: 5));
                                                    ^
Main.java:7: error: not a statement
        System.out.println(walkingMinutes(distanceKm: 10, speedKmh: 5));
                                                                    ^
Main.java:7: error: ';' expected
        System.out.println(walkingMinutes(distanceKm: 10, speedKmh: 5));
                                                                     ^
3 errors
```

Ces indications sont d'ailleurs la meilleure illustration de la règle : elles
suivent la **position** de l'argument. À l'étape 3, IntelliJ écrit
`distanceKm:` devant `velo`, simplement parce que `velo` est en première
position.

## 1. Les valeurs écrites dans l'appel

Le point de départ est le programme de la page
[Les fonctions et la portée des variables](01-fonctions-et-portee.md#lordre-compte-les-noms-non).

```java title="Main.java" linenums="1" hl_lines="7 8"
public class Main {
    public static double walkingMinutes(double distanceKm, double speedKmh) {
        return (distanceKm / speedKmh) * 60;
    }

    public static void main(String[] args) {
        System.out.println(walkingMinutes(10, 5));
        System.out.println(walkingMinutes(5, 10));
    }
}
```

```text
120.0
30.0
```

Ligne 7 : `10` est en première position, il va dans `distanceKm` ; `5` est en
deuxième position, il va dans `speedKmh`. Dix kilomètres à 5 km/h : 120
minutes.

Ligne 8 : les mêmes nombres, dans l'autre ordre. Cinq kilomètres à 10 km/h : 30
minutes.

## 2. Le résultat dans une variable

L'appel est sorti du `println` et son résultat est rangé dans une variable.

=== "Avant"

    ```java title="Main.java" linenums="1" hl_lines="7 8"
    public class Main {
        public static double walkingMinutes(double distanceKm, double speedKmh) {
            return (distanceKm / speedKmh) * 60;
        }

        public static void main(String[] args) {
            System.out.println(walkingMinutes(10, 5));
            System.out.println(walkingMinutes(5, 10));
        }
    }
    ```

=== "Après"

    ```java title="Main.java" linenums="1" hl_lines="7 8 10 11"
    public class Main {
        public static double walkingMinutes(double distanceKm, double speedKmh) {
            return (distanceKm / speedKmh) * 60;
        }

        public static void main(String[] args) {
            double result1 = walkingMinutes(10, 5);
            double result2 = walkingMinutes(5, 10);

            System.out.println(result1);
            System.out.println(result2);
        }
    }
    ```

```text
120.0
30.0
```

Les lignes 7 et 8 font l'appel, les lignes 10 et 11 affichent. Rien n'a changé
dans le calcul : Java remplace `walkingMinutes(10, 5)` par sa valeur, `120.0`,
qu'il range dans `result1`, puis `println(result1)` affiche cette valeur.
C'est la règle _"Un appel aussi est remplacé par sa valeur"_ du
[support](01-fonctions-et-portee.md#un-appel-aussi-est-remplace-par-sa-valeur).

## 3. Les arguments dans des variables

Les nombres `10` et `5` sont maintenant rangés dans des variables, avec des noms
choisis exprès pour ne rien vouloir dire.

=== "Avant"

    ```java title="Main.java" linenums="1" hl_lines="7 8"
    public class Main {
        public static double walkingMinutes(double distanceKm, double speedKmh) {
            return (distanceKm / speedKmh) * 60;
        }

        public static void main(String[] args) {
            double result1 = walkingMinutes(10, 5);
            double result2 = walkingMinutes(5, 10);

            System.out.println(result1);
            System.out.println(result2);
        }
    }
    ```

=== "Après"

    ```java title="Main.java" linenums="1" hl_lines="7 8 10 11"
    public class Main {
        public static double walkingMinutes(double distanceKm, double speedKmh) {
            return (distanceKm / speedKmh) * 60;
        }

        public static void main(String[] args) {
            double coucou = 10;
            double velo = 5;

            double result1 = walkingMinutes(coucou, velo);
            double result2 = walkingMinutes(velo, coucou);

            System.out.println(result1);
            System.out.println(result2);
        }
    }
    ```

```text
120.0
30.0
```

Les lignes 7 et 8 sont nouvelles. Aux lignes 10 et 11, les nombres sont
remplacés par les variables qui les contiennent.

Java remplace chaque variable par sa valeur avant l'appel :

| Ce qui est écrit               | Ce que Java calcule     | `distanceKm` | `speedKmh` | Résultat |
| :----------------------------- | :---------------------- | -----------: | ---------: | -------: |
| `walkingMinutes(coucou, velo)` | `walkingMinutes(10, 5)` |           10 |          5 |    120.0 |
| `walkingMinutes(velo, coucou)` | `walkingMinutes(5, 10)` |            5 |         10 |     30.0 |

La fonction ne sait pas que ses valeurs s'appelaient `coucou` et `velo` dans
`main`. Elle ne reçoit que `10` et `5`, dans cet ordre.

## 4. Les mêmes noms que les paramètres

Dernière étape : les variables de `main` sont renommées `distanceKm` et
`speedKmh`, exactement comme les paramètres de la fonction.

=== "Avant"

    ```java title="Main.java" linenums="1" hl_lines="7 8 10 11"
    public class Main {
        public static double walkingMinutes(double distanceKm, double speedKmh) {
            return (distanceKm / speedKmh) * 60;
        }

        public static void main(String[] args) {
            double coucou = 10;
            double velo = 5;

            double result1 = walkingMinutes(coucou, velo);
            double result2 = walkingMinutes(velo, coucou);

            System.out.println(result1);
            System.out.println(result2);
        }
    }
    ```

=== "Après"

    ```java title="Main.java" linenums="1" hl_lines="7 8 10 11"
    public class Main {
        public static double walkingMinutes(double distanceKm, double speedKmh) {
            return (distanceKm / speedKmh) * 60;
        }

        public static void main(String[] args) {
            double distanceKm = 10;
            double speedKmh = 5;

            double result1 = walkingMinutes(distanceKm, speedKmh);
            double result2 = walkingMinutes(speedKmh, distanceKm);

            System.out.println(result1);
            System.out.println(result2);
        }
    }
    ```

```text
120.0
30.0
```

`coucou` devient `distanceKm` et `velo` devient `speedKmh`, partout dans
`main`. Rien d'autre ne change, et l'affichage non plus.

Regardez la ligne 11 : `walkingMinutes(speedKmh, distanceKm)`. La variable
nommée `speedKmh` est passée en premier, donc sa valeur, `5`, arrive dans le
paramètre `distanceKm`. **Le nom identique ne la fait pas aller dans le
paramètre `speedKmh`.** Le résultat est `30.0`, comme à l'étape 3.

Il y a donc deux variables `distanceKm` dans ce programme : celle de `main`
(ligne 7) et le paramètre de `walkingMinutes` (ligne 2). Elles portent le même
nom mais ne sont pas la même variable, comme le montre la section
[Le même nom, deux variables](01-fonctions-et-portee.md#le-meme-nom-deux-variables).

## Ce qu'il faut retenir

Les quatre programmes font exactement les mêmes appels :

| Étape | Premier appel                          | Deuxième appel                         |
| ----: | :------------------------------------- | :------------------------------------- |
|     1 | `walkingMinutes(10, 5)`                | `walkingMinutes(5, 10)`                |
|     2 | `walkingMinutes(10, 5)`                | `walkingMinutes(5, 10)`                |
|     3 | `walkingMinutes(coucou, velo)`         | `walkingMinutes(velo, coucou)`         |
|     4 | `walkingMinutes(distanceKm, speedKmh)` | `walkingMinutes(speedKmh, distanceKm)` |
|       | **120.0**                              | **30.0**                               |

- Un argument peut être une valeur écrite directement, une variable, ou un
  calcul : Java le remplace par sa valeur avant l'appel.
- Le premier argument va dans le premier paramètre, le deuxième dans le
  deuxième. Le nom de la variable passée en argument ne compte pas.
- Inverser deux arguments du même type compile et s'exécute sans erreur. Seul
  le résultat est faux : c'est à vous de vérifier l'ordre.
- Donner aux variables de `main` le même nom que les paramètres est permis, et
  souvent pratique pour la lecture. Mais cela ne dispense pas de respecter
  l'ordre.

## Pour aller plus loin

- [Gérez différents types de passage de paramètre](https://openclassrooms.com/fr/courses/6173501-apprenez-a-programmer-en-java/6458826-gerez-differents-types-de-passage-de-parametre) -
  chapitre de l'ancienne version du cours Java d'OpenClassrooms, en français. Il
  le dit en une phrase : _"Chaque valeur est affectée à un paramètre dans
  l'ordre de leur définition."_ Il montre aussi que la valeur de l'argument est
  **recopiée** dans le paramètre, avec un argument et un paramètre qui ne
  portent pas le même nom. La fin du chapitre, sur les types référence et les
  objets, dépasse ce cours.
- [Passing Information to a Method](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html) -
  tutoriel officiel de Java, en anglais. La note en haut de page dit la même
  chose : les arguments doivent correspondre aux paramètres _"in type and
  order"_, en type et en ordre.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
