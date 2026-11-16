# Activité - Des boucles en chair et en os

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Lire une boucle assez précisément pour savoir, sans ordinateur, ce qu'elle
affiche. Puis jouer une boucle avec la classe, pour voir à quel moment
exactement la condition est posée.

**Règle de l'activité : avant de rejoindre qui que ce soit, déroulez votre
boucle dans votre tête, tour par tour.**

Pas de téléphone, pas d'ordinateur. Un crayon, si vous voulez faire un tableau
de trace au dos de votre carte.

## Partie 1 - Retrouver son trio

Chaque personne reçoit **une carte**. Il en existe trois sortes :

| Carte       | Ce qu'elle porte                                           |
| :---------- | :--------------------------------------------------------- |
| **Énoncé**  | Ce que le programme doit faire, en français                |
| **Code**    | Une boucle `while`, avec ses trois ingrédients              |
| **Sortie**  | Ce que la console affiche quand on exécute ce code         |

Votre but : retrouver les deux personnes qui complètent votre carte. Un trio,
c'est un énoncé, le code qui le réalise, et la sortie que ce code produit.

Par exemple, ce trio irait ensemble :

=== "Énoncé"

    Afficher les nombres de 0 à 2.

=== "Code"

    ```java
    int count = 0;
    while (count < 3) {
        System.out.println(count);
        count++;
    }
    ```

=== "Sortie"

    ```text
    0
    1
    2
    ```

!!! warning "Les cartes se ressemblent exprès"

    Plusieurs codes ne diffèrent que d'un caractère : `<` ou `<=`, `0` ou `1`,
    une ligne avant ou après une autre. Plusieurs sorties ne diffèrent que d'un
    nombre. Si vous trouvez votre trio en dix secondes, vérifiez-le une
    deuxième fois.

Quand vous pensez avoir trouvé votre trio, restez ensemble et vérifiez :

1. La personne qui a le **code** le lit à voix haute.
2. Les trois personnes déroulent la boucle ensemble, tour par tour, en disant
   la valeur de la variable à chaque fois que la condition est posée.
3. La sortie obtenue est-elle exactement celle de la carte **Sortie** ? Le
   code fait-il exactement ce que dit l'**Énoncé** ?

Si l'une des réponses est non, séparez-vous et cherchez encore.

## Partie 2 - Jouer une boucle

Quelques personnes viennent devant la classe. Chacune tient une ligne de ce
programme :

```java title="Main.java" linenums="1"
public class Main {
    public static void main(String[] args) {
        int i = 0;

        while (i <= 2) {
            System.out.println(i);
            i++;
        }
        System.out.println("Fin");
    }
}
```

Il y a aussi :

- une personne qui **est** la variable `i` : elle porte sa valeur sur une
  feuille, et c'est la seule à pouvoir la changer ;
- une personne qui **est** la console : elle écrit au tableau ce qu'on lui
  demande d'afficher, et rien d'autre ;
- un objet, qui représente **l'exécution**. Seule la personne qui le tient a
  le droit de parler. Elle exécute sa ligne, puis passe l'objet à la ligne
  suivante.

Le reste de la classe observe, et vérifie que personne ne triche : une ligne
qui n'a pas l'objet ne fait rien, même si elle sait ce qui va se passer.

## Partie 3 - Ce que l'on en retient

En fin d'activité, nous en parlons ensemble :

- Quelles cartes vous ont fait hésiter ? Entre quoi et quoi ?
- Quand la personne `while` a-t-elle parlé ? Combien de fois ?
- Combien de fois la condition a-t-elle été posée, pour combien de tours ?
- Qu'est-ce qui aurait changé si la personne `i++` s'était assise ?

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
