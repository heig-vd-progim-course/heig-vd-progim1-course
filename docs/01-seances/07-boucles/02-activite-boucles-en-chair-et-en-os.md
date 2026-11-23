# Activité - Des boucles en chair et en os

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Lire une boucle assez précisément pour savoir, sans ordinateur, ce qu'elle
affiche. Et relier trois façons de dire la même chose : en français, en
diagramme d'activité et en Java.

**Règle de l'activité : avant de rejoindre qui que ce soit, déroulez votre
boucle dans votre tête, tour par tour.**

Pas de téléphone, pas d'ordinateur. Un crayon, si vous voulez faire un tableau
de trace au dos de votre carte.

## Retrouver son quatuor

Chaque personne reçoit **une carte**. Il en existe quatre sortes :

| Carte         | Ce qu'elle porte                                                  |
| :------------ | :------------------------------------------------------------------ |
| **Énoncé**    | Ce que le programme doit faire, en français                        |
| **Diagramme** | Le diagramme d'activité de la boucle, avec sa flèche qui remonte   |
| **Code**      | Une boucle `while`, avec ses trois ingrédients                     |
| **Sortie**    | Ce que la console affiche quand on exécute ce code                 |

Votre but : retrouver les trois personnes qui complètent votre carte. Un
quatuor, c'est un énoncé, le diagramme qui le dessine, le code qui le réalise,
et la sortie que ce code produit.

Par exemple, ce quatuor irait ensemble :

=== "Énoncé"

    Afficher les nombres de 0 à 2.

=== "Diagramme"

    ```mermaid
    flowchart TD
        debut((Début)) --> init[count vaut 0]
        init --> m((Fusion))
        m --> d{count plus petit que 3 ?}
        d -->|oui| a[Afficher count]
        a --> b[Ajouter 1 à count]
        b --> m
        d -->|non| fin(((Fin)))
    ```

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
    nombre. Si vous trouvez votre quatuor en dix secondes, vérifiez-le une
    deuxième fois.

## Vérifier

Quand vous pensez avoir trouvé votre quatuor, restez ensemble et vérifiez :

1. La personne qui a le **diagramme** suit le chemin à voix haute, en disant
   la valeur de `i` à chaque fois que la condition est posée.
2. La personne qui a le **code** fait de même, ligne par ligne : arrive-t-elle
   au même endroit ?
3. La sortie obtenue est-elle exactement celle de la carte **Sortie** ? Le
   code fait-il exactement ce que dit l'**Énoncé** ?

Si l'une des réponses est non, séparez-vous et cherchez encore.

## Ce que l'on en retient

En fin d'activité, nous en parlons ensemble :

- Quelles cartes vous ont fait hésiter ? Entre quoi et quoi ?
- Sur le diagramme, à quel endroit la condition est-elle posée ? Une fois, ou
  à chaque tour ?
- Que montre le diagramme quand la mise à jour manque ?

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
