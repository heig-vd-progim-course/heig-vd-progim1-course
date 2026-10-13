# Atelier - Du diagramme au code

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Écrire le premier programme du fil rouge en partant de votre propre diagramme
d'activité, et vérifier qu'il fait ce que vous aviez prévu. C'est la méthode qui
servira pour tous les programmes du semestre, mini-projet compris.

**Règle de l'atelier : le diagramme d'abord, sur papier. IntelliJ ne s'ouvre
qu'après l'avoir montré à la personne à côté de vous.**

## 1. Le diagramme

Reprenez les trois colonnes du problème 1 de l'
[activité](01-activite-poser-le-probleme.md) : la moyenne de deux notes.

Dessinez le diagramme d'activité du programme, à la main. Rappel des règles de
la [séance 01](../01-donner-des-instructions/02-diagrammes-dactivite.md) :

- un verbe à l'infinitif par action ;
- une seule action par rectangle ;
- un nœud initial, un nœud final.

Il n'y a aucune décision dans ce programme, et aucune répétition. C'est une
séquence, et c'est tout.

Montrez votre diagramme à la personne à côté de vous. S'il est différent du
sien, ce n'est pas un problème. S'il ne permet pas de savoir dans quel ordre
faire les choses, c'en est un.

## 2. Le tableau de tests

Avant d'écrire le code, écrivez ce que le programme **devra** afficher.
Complétez ce tableau sur papier, en calculant à la main :

| Première note | Deuxième note | Moyenne affichée attendue |
| ------------: | ------------: | :------------------------ |
|             4 |             5 |                           |
|           4.5 |             5 |                           |
|             6 |             6 |                           |
|             1 |             6 |                           |
|           3.3 |           4.6 |                           |

Ajoutez deux lignes de votre choix.

Ce tableau est votre définition de _"le programme fonctionne"_. Sans lui, vous
ne pouvez pas savoir si un résultat est juste : vous pouvez seulement savoir
s'il est plausible.

## 3. Le code

Créez un nouveau projet `fil-rouge` dans IntelliJ, comme en séance 03.

Traduisez votre diagramme **action par action**. Pour chaque rectangle, une ou
deux lignes de code. Mettez en commentaire, au-dessus de chaque groupe de
lignes, le texte du rectangle correspondant :

```java
public class Main {
    public static void main(String[] args) {
        // Lire la première note

        // Lire la deuxième note

        // ...
    }
}
```

Si une action de votre diagramme ne se traduit pas, c'est qu'elle est trop
vague. Corrigez le diagramme, pas seulement le code.

## 4. Vérifier

Lancez le programme une fois par ligne du tableau de tests. Pour chaque ligne,
le résultat affiché est-il celui que vous aviez écrit ?

Si non, il y a trois possibilités, et il faut savoir laquelle :

- votre calcul à la main est faux ;
- votre code ne fait pas ce que dit votre diagramme ;
- votre diagramme ne fait pas ce que dit l'énoncé.

Rappelez-vous : sur un ordinateur réglé en français, `printf` peut afficher une
virgule là où votre tableau a un point. Ce n'est pas une différence de résultat.

## 5. Essayer de le casser

Lancez le programme et tapez ce que personne ne devrait taper :

- `4,5` ;
- rien du tout ;
- `quatre` ;
- `7` et `8`.

Pour chacun : que se passe-t-il ? Est-ce une erreur de compilation, une erreur à
l'exécution, ou pas d'erreur du tout ?

Le dernier cas est le plus inquiétant. Ajoutez-le à votre liste des cas non
couverts : vous saurez le traiter en séance 06.

## Extensions

Pour celles et ceux qui ont terminé. Pour chaque extension, le même ordre :
trois colonnes, diagramme, tableau de tests, code.

1. **Trois notes.** La moyenne de trois notes au lieu de deux.
2. **Le nom.** Le programme demande aussi le nom de la personne et affiche une
   phrase complète.
3. **La pondération.** L'évaluation écrite et le mini-projet comptent chacun
   pour 50 % de la note de ce cours. Écrivez le programme qui calcule la note
   finale à partir des deux. Les poids sont des constantes `final`.
4. **Le demi-point.** Affichez aussi la moyenne arrondie au demi-point.
5. **Les problèmes 2 et 3** de l'activité : le trajet à pied et le partage de
   l'addition.

## Comparaison

En fin d'atelier, échangez votre code avec celui d'une autre personne.

- Est-ce que vous retrouvez son diagramme en lisant son code ?
- Avez-vous fait les mêmes choix de types, de noms de variables, d'arrondi ?
- Lequel des deux programmes est le plus facile à lire ? Pourquoi ?

??? note "Une solution possible, à ouvrir après avoir écrit la vôtre"

    ```mermaid
    flowchart TD
        debut((Début)) --> a[Lire la première note]
        a --> b[Lire la deuxième note]
        b --> c[Calculer la moyenne]
        c --> d[Arrondir la moyenne au dixième]
        d --> e[Afficher la moyenne]
        e --> fin(((Fin)))
    ```

    ```java
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

    ```text
    Première note : 3.3
    Deuxième note : 4.6
    Moyenne : 4.0
    ```

    Ce n'est pas _la_ solution. La vôtre peut avoir une action de plus ou de
    moins, d'autres noms, et être tout aussi juste. Vérifiez-la avec votre
    tableau de tests, pas en la comparant à celle-ci.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
