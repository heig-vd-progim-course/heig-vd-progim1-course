# Code secret - Étape 1

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Poser les fondations du jeu : ranger le code secret et la proposition dans deux
tableaux, puis les comparer case par case. À la fin de cette étape, votre jeu se
joue déjà, mais il ne répond encore que les chiffres bien placés.

**Règle de l'étape : exécutez votre programme après chaque partie, avant
d'écrire la suivante.**

Les règles complètes du jeu et la suite du projet sont sur la page
[Mini-projet - Code secret](../../00-organisation/02-mini-projet.md).

## Ce que vous construisez aujourd'hui

À la fin de la séance, une partie ressemble à ceci :

```text
Chiffre 1 : 1
Chiffre 2 : 1
Chiffre 3 : 1
Chiffre 4 : 1
[1, 1, 1, 1] : 1 bien placé(s)
Chiffre 1 : 5
Chiffre 2 : 6
Chiffre 3 : 3
Chiffre 4 : 4
[5, 6, 3, 4] : 2 bien placé(s)
Chiffre 1 : 1
Chiffre 2 : 2
Chiffre 3 : 3
Chiffre 4 : 4
[1, 2, 3, 4] : 4 bien placé(s)
Trouvé en 3 essai(s) !
```

Pour l'instant, le code secret est écrit dans le programme, et il vaut
`1 2 3 4`. Ce n'est pas très secret : il sera tiré au hasard en séance 11.

Créez un nouveau projet IntelliJ, `code-secret`, comme en séance 03. Tout le jeu
tient dans `Main.java`.

## 1. Ranger le code et la proposition

Déclarez un tableau `secret` qui contient `1, 2, 3, 4`, et un tableau `guess` de
même taille, vide. Demandez quatre chiffres à la personne qui joue, un par un,
et rangez-les dans `guess`. Affichez ensuite les deux tableaux.

```text
Chiffre 1 : 1
Chiffre 2 : 3
Chiffre 3 : 2
Chiffre 4 : 4
Secret : [1, 2, 3, 4]
Proposition : [1, 3, 2, 4]
```

??? tip "Coup de pouce"

    La taille de `guess` ne s'écrit pas en dur : `new int[secret.length]`. Si
    le code passe un jour à cinq chiffres, une seule ligne changera.

    La lecture des quatre chiffres est la boucle de l'étape 7 de la page
    [Ranger dans un tableau](01-ranger-dans-un-tableau.md#etape-7-creer-un-tableau-vide-puis-le-remplir),
    avec `Integer.parseInt` au lieu de `Double.parseDouble`.

??? note "Une solution possible"

    ```java title="Main.java" linenums="1" hl_lines="5-6 8-10"
    import java.util.Arrays;

    public class Main {
        public static void main(String[] args) {
            int[] secret = {1, 2, 3, 4};
            int[] guess = new int[secret.length];

            for (int i = 0; i < guess.length; i++) {
                guess[i] = Integer.parseInt(IO.readln("Chiffre " + (i + 1) + " : "));
            }
            System.out.println("Secret : " + Arrays.toString(secret));
            System.out.println("Proposition : " + Arrays.toString(guess));
        }
    }
    ```

## 2. Compter les bien placés

Un chiffre est **bien placé** quand il est égal au chiffre du secret **dans la
même case**. Comptez-les, et remplacez l'affichage des deux tableaux par une
seule ligne :

```text
Chiffre 1 : 1
Chiffre 2 : 3
Chiffre 3 : 2
Chiffre 4 : 4
[1, 3, 2, 4] : 2 bien placé(s)
```

Vérifiez à la main : avec le secret `1 2 3 4`, la proposition `1 3 2 4` a deux
chiffres bien placés, le `1` et le `4`.

??? tip "Coup de pouce"

    C'est un compteur, comme à la page
    [Parcourir pour calculer](03-parcourir-pour-calculer.md#compter). La
    condition compare deux tableaux à la même case : `guess[i] == secret[i]`.

??? note "Une solution possible"

    ```java title="Main.java" linenums="1" hl_lines="7 13-18"
    import java.util.Arrays;

    public class Main {
        public static void main(String[] args) {
            int[] secret = {1, 2, 3, 4};
            int[] guess = new int[secret.length];
            int wellPlaced = 0;

            for (int i = 0; i < guess.length; i++) {
                guess[i] = Integer.parseInt(IO.readln("Chiffre " + (i + 1) + " : "));
            }

            for (int i = 0; i < secret.length; i++) {
                if (guess[i] == secret[i]) {
                    wellPlaced++;
                }
            }
            System.out.println(Arrays.toString(guess) + " : " + wellPlaced + " bien placé(s)");
        }
    }
    ```

## 3. Jouer jusqu'à trouver

Faites rejouer la personne tant qu'elle n'a pas trouvé les quatre chiffres, avec
au plus dix essais. À la fin, affichez `Trouvé en 3 essai(s) !`, ou, après dix
essais ratés, `Perdu. Le code était [1, 2, 3, 4]`.

Testez les deux fins : une partie gagnée, et une partie perdue où vous tapez `6`
à chaque fois.

??? tip "Coup de pouce"

    Une question avant d'écrire la boucle, comme en séance 07 : savez-vous
    combien de tours elle va faire ? Non : la partie peut s'arrêter au premier
    essai comme au dixième. C'est donc un `while`, avec deux conditions
    reliées par `&&`.

??? note "Une solution possible"

    ```java title="Main.java" linenums="1" hl_lines="8 10-16 23 25-29"
    import java.util.Arrays;

    public class Main {
        public static void main(String[] args) {
            int[] secret = {1, 2, 3, 4};
            int[] guess = new int[secret.length];
            int wellPlaced = 0;
            int attempts = 0;

            while ((wellPlaced < secret.length) && (attempts < 10)) {
                for (int i = 0; i < guess.length; i++) {
                    guess[i] = Integer.parseInt(IO.readln("Chiffre " + (i + 1) + " : "));
                }
                attempts++;

                wellPlaced = 0;
                for (int i = 0; i < secret.length; i++) {
                    if (guess[i] == secret[i]) {
                        wellPlaced++;
                    }
                }
                System.out.println(Arrays.toString(guess) + " : " + wellPlaced + " bien placé(s)");
            }

            if (wellPlaced == secret.length) {
                System.out.println("Trouvé en " + attempts + " essai(s) !");
            } else {
                System.out.println("Perdu. Le code était " + Arrays.toString(secret));
            }
        }
    }
    ```

    ```text
    Chiffre 1 : 1
    Chiffre 2 : 1
    Chiffre 3 : 1
    Chiffre 4 : 1
    [1, 1, 1, 1] : 1 bien placé(s)
    Chiffre 1 : 5
    Chiffre 2 : 6
    Chiffre 3 : 3
    Chiffre 4 : 4
    [5, 6, 3, 4] : 2 bien placé(s)
    Chiffre 1 : 1
    Chiffre 2 : 2
    Chiffre 3 : 3
    Chiffre 4 : 4
    [1, 2, 3, 4] : 4 bien placé(s)
    Trouvé en 3 essai(s) !
    ```

    La lecture et le comptage de la partie 2 sont maintenant **dans** la boucle
    de jeu, lignes 10 à 23. Après la boucle, un `if` dit pourquoi elle s'est
    arrêtée : quatre bien placés, ou dix essais.

    `wellPlaced` est déclaré avant la boucle, ligne 7, parce que la condition
    de la ligne 10 en a besoin dès le premier tour.

### Le piège du compteur qui ne repart pas de 0

La ligne 16, `wellPlaced = 0;`, remet le compteur à zéro au début de chaque
comptage. Sans elle, le programme compile, et voici ce qu'il fait avec les mêmes
propositions :

```text
Chiffre 1 : 1
Chiffre 2 : 1
Chiffre 3 : 1
Chiffre 4 : 1
[1, 1, 1, 1] : 1 bien placé(s)
Chiffre 1 : 5
Chiffre 2 : 6
Chiffre 3 : 3
Chiffre 4 : 4
[5, 6, 3, 4] : 3 bien placé(s)
Chiffre 1 : 1
Chiffre 2 : 2
Chiffre 3 : 3
Chiffre 4 : 4
[1, 2, 3, 4] : 7 bien placé(s)
Perdu. Le code était [1, 2, 3, 4]
```

Les bien placés de chaque essai s'ajoutent à ceux du précédent : 1, puis 1 + 2,
puis 3 + 4. Et la personne a trouvé le code, mais le jeu lui dit qu'elle a perdu
: 7 n'est pas égal à 4. Un compteur se remet à zéro au début de ce qu'il compte.

## 4. Pour aller plus loin : les mal placés

Un chiffre est **mal placé** quand il fait partie du code secret, mais pas à
cette place. Avec le secret `1 2 3 4`, la proposition `1 3 5 6` a un bien placé
(le `1`) et un mal placé (le `3`).

Ne cherchez pas encore à l'écrire. Sur papier, répondez à ces questions :

- Pour savoir si `guess[1]` est mal placé, quelles cases de `secret` faut-il
  regarder ?
- Que devrait répondre le jeu pour la proposition `3 3 3 3` ? Et votre méthode,
  que répond-elle ?

Les mal placés sont l'objet de l'étape 2, en séance 09.

## Ce qui vous attend en séance 09

Votre `main` fait déjà près de trente lignes, et il va encore grandir. En séance
09, vous apprendrez à passer un tableau à une fonction : le comptage des bien
placés deviendra une fonction `countWellPlaced`, et le jeu gardera l'historique
de tous les essais dans un tableau à deux dimensions.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
