# Tableaux - Exercices

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

Ce document contient les exercices pour le cours sur les tableaux. Chaque
exercice est suivi de sa solution, cachée par défaut.

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/06.01-tableaux/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/06.01-tableaux/01-supports-de-cours/06.01-tableaux-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Objectifs

- Créer et manipuler des tableaux simples.
- Parcourir des tableaux avec différentes boucles.
- Utiliser la classe `Arrays` pour manipuler les tableaux.
- Travailler avec des tableaux multidimensionnels.
- Résoudre des problèmes pratiques avec des tableaux.

## Exercice 1 : Calcul de statistiques

Écrivez un programme qui calcule des statistiques sur un tableau de notes.

**Consignes :**

1. Créez un tableau de notes (type `double`) contenant au moins 8 valeurs entre
   1.0 et 6.0.
2. Calculez et affichez :
   - La note minimale
   - La note maximale
   - La note moyenne
   - Le nombre de notes supérieures ou égales à 4.0
3. Utilisez des boucles pour parcourir le tableau.

**Exemple de sortie :**

```text
Notes : [5.5, 3.5, 4.0, 5.0, 4.5, 3.0, 6.0, 5.5]
Note minimale : 3.0
Note maximale : 6.0
Note moyenne : 4.625
Nombre de notes >= 4.0 : 6
```

<details>
<summary>Solution</summary>

```java
/**
 * Solution de l'exercice 1 : Calcul de statistiques.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Exercice 1 : Calcul de statistiques ===\n");

        // Tableau de notes
        double[] grades = {5.5, 3.5, 4.0, 5.0, 4.5, 3.0, 6.0, 5.5};

        // Affichage du tableau
        System.out.print("Notes : [");
        for (int i = 0; i < grades.length; i++) {
            System.out.print(grades[i]);
            if (i < grades.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");

        // Calcul de la note minimale
        double min = grades[0];
        for (double grade : grades) {
            if (grade < min) {
                min = grade;
            }
        }
        System.out.println("Note minimale : " + min);

        // Calcul de la note maximale
        double max = grades[0];
        for (double grade : grades) {
            if (grade > max) {
                max = grade;
            }
        }
        System.out.println("Note maximale : " + max);

        // Calcul de la moyenne
        double sum = 0;
        for (double grade : grades) {
            sum += grade;
        }
        double average = sum / grades.length;
        System.out.println("Note moyenne : " + average);

        // Comptage des notes >= 4.0
        int countPassing = 0;
        for (double grade : grades) {
            if (grade >= 4.0) {
                countPassing++;
            }
        }
        System.out.println("Nombre de notes >= 4.0 : " + countPassing);

        System.out.println("\n=== Fin de l'exercice ===");
    }
}
```

</details>

## Exercice 2 : Inversion d'un tableau

Écrivez un programme qui inverse l'ordre des éléments d'un tableau.

**Consignes :**

1. Créez un tableau d'entiers avec au moins 6 valeurs.
2. Affichez le tableau original.
3. Inversez l'ordre des éléments (le premier devient le dernier, etc.).
4. Affichez le tableau inversé.
5. Ne créez pas de nouveau tableau, modifiez le tableau original.

**Exemple de sortie :**

```text
Tableau original : [10, 20, 30, 40, 50, 60]
Tableau inversé : [60, 50, 40, 30, 20, 10]
```

**Astuce :** Utilisez une boucle qui échange les éléments par paires (premier
avec dernier, deuxième avec avant-dernier, etc.).

<details>
<summary>Solution</summary>

```java
import java.util.Arrays;

/**
 * Solution de l'exercice 2 : Inversion d'un tableau.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Exercice 2 : Inversion d'un tableau ===\n");

        // Tableau d'entiers
        int[] numbers = {10, 20, 30, 40, 50, 60};

        // Affichage du tableau original
        System.out.println("Tableau original : " + Arrays.toString(numbers));

        // Inversion du tableau
        // On échange les éléments par paires : premier avec dernier, etc.
        for (int i = 0; i < numbers.length / 2; i++) {
            // Position de l'élément à échanger avec numbers[i]
            int oppositeIndex = numbers.length - 1 - i;

            // Échange des éléments avec une variable temporaire
            int temp = numbers[i];
            numbers[i] = numbers[oppositeIndex];
            numbers[oppositeIndex] = temp;
        }

        // Affichage du tableau inversé
        System.out.println("Tableau inversé : " + Arrays.toString(numbers));

        System.out.println("\n=== Fin de l'exercice ===");
    }
}
```

</details>

## Exercice 3 : Recherche dans un tableau

Écrivez un programme qui recherche un élément dans un tableau et affiche toutes
ses positions.

**Consignes :**

1. Créez un tableau de chaînes de caractères représentant des fruits.
2. Recherchez un fruit spécifique dans le tableau.
3. Parcourez le tableau et affichez toutes les positions où ce fruit apparaît.
4. Si le fruit n'est pas trouvé, affichez un message approprié.

**Exemple de sortie :**

```text
Fruits : [pomme, banane, orange, pomme, kiwi, pomme]
Recherche : pomme
Trouvé aux positions : 0, 3, 5

Recherche : fraise
Fruit non trouvé
```

<details>
<summary>Solution</summary>

```java
import java.util.Arrays;

/**
 * Solution de l'exercice 3 : Recherche dans un tableau.
 */
public class Main {

    /**
     * Recherche un fruit dans le tableau et affiche toutes ses positions.
     *
     * @param fruits le tableau de fruits
     * @param searchTerm le fruit à rechercher
     */
    public static void searchAndDisplay(String[] fruits, String searchTerm) {
        int foundCount = 0;

        for (int i = 0; i < fruits.length; i++) {
            if (fruits[i].equals(searchTerm)) {
                if (foundCount == 0) {
                    System.out.print("Trouvé aux positions : ");
                }

                System.out.print(i);
                foundCount++;

                // Vérifier s'il y a d'autres occurrences après
                boolean hasMore = false;
                for (int j = i + 1; j < fruits.length; j++) {
                    if (fruits[j].equals(searchTerm)) {
                        hasMore = true;
                        break;
                    }
                }
                if (hasMore) {
                    System.out.print(", ");
                }
            }
        }

        if (foundCount == 0) {
            System.out.println("Fruit non trouvé");
        } else {
            System.out.println();
        }
    }
    public static void main(String[] args) {
        System.out.println("=== Exercice 3 : Recherche dans un tableau ===\n");

        // Tableau de fruits
        String[] fruits = {"pomme", "banane", "orange", "pomme", "kiwi", "pomme"};

        // Affichage du tableau
        System.out.println("Fruits : " + Arrays.toString(fruits));

        // Première recherche : pomme
        System.out.println("\nRecherche : pomme");
        searchAndDisplay(fruits, "pomme");

        // Deuxième recherche : fraise
        System.out.println("\nRecherche : fraise");
        searchAndDisplay(fruits, "fraise");

        // Troisième recherche : banane
        System.out.println("\nRecherche : banane");
        searchAndDisplay(fruits, "banane");

        System.out.println("\n=== Fin de l'exercice ===");
    }

}
```

</details>

## Exercice 4 : Tableau de multiplication

Écrivez un programme qui crée et affiche une table de multiplication sous forme
de tableau 2D.

**Consignes :**

1. Créez un tableau 2D de taille 10x10.
2. Remplissez-le avec les tables de multiplication (de 1 à 10).
3. Affichez le tableau de manière lisible avec un formatage approprié.

**Exemple de sortie (partiel) :**

```text
Table de multiplication :
    1   2   3   4   5   6   7   8   9  10
    2   4   6   8  10  12  14  16  18  20
    3   6   9  12  15  18  21  24  27  30
    ...
```

<details>
<summary>Solution</summary>

```java
/**
 * Solution de l'exercice 4 : Tableau de multiplication.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Exercice 4 : Tableau de multiplication ===\n");

        // Création d'un tableau 10x10
        int[][] table = new int[10][10];

        // Remplissage du tableau avec les tables de multiplication
        for (int row = 0; row < table.length; row++) {
            for (int col = 0; col < table[row].length; col++) {
                table[row][col] = (row + 1) * (col + 1);
            }
        }

        // Affichage de la table
        System.out.println("Table de multiplication :");
        for (int row = 0; row < table.length; row++) {
            for (int col = 0; col < table[row].length; col++) {
                System.out.print(String.format("%4d", table[row][col]));
            }
            System.out.println();
        }

        System.out.println("\n=== Fin de l'exercice ===");
    }
}
```

</details>

## Exercice 5 : Gestion d'une classe

Écrivez un programme qui gère les notes d'une classe d'étudiants.

**Consignes :**

1. Créez trois tableaux parallèles :
   - `names` : noms des étudiants (au moins 5)
   - `grades` : notes des étudiants
   - `passed` : booléen indiquant si l'étudiant a réussi (note >= 4.0)
2. Remplissez les tableaux `names` et `grades`.
3. Calculez et remplissez automatiquement le tableau `passed`.
4. Affichez un bulletin avec le nom, la note et le statut de chaque étudiant.
5. Calculez et affichez le taux de réussite de la classe.

**Exemple de sortie :**

```text
Bulletin de la classe :
Ariel : 5.5 - Réussi
Nox : 3.5 - Échoué
Amaru : 4.0 - Réussi
Ayo : 5.0 - Réussi
Ren : 3.0 - Échoué

Taux de réussite : 60.0%
```

<details>
<summary>Solution</summary>

```java
/**
 * Solution de l'exercice 5 : Gestion d'une classe.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Exercice 5 : Gestion d'une classe ===\n");

        // Tableaux parallèles
        String[] names = {"Ariel", "Nox", "Amaru", "Ayo", "Ren"};
        double[] grades = {5.5, 3.5, 4.0, 5.0, 3.0};
        boolean[] passed = new boolean[names.length];

        // Calcul du statut de réussite
        for (int i = 0; i < grades.length; i++) {
            passed[i] = grades[i] >= 4.0;
        }

        // Affichage du bulletin
        System.out.println("Bulletin de la classe :");
        for (int i = 0; i < names.length; i++) {
            String status;
            if (passed[i]) {
                status = "Réussi";
            } else {
                status = "Échoué";
            }
            System.out.println(names[i] + " : " + grades[i] + " - " + status);
        }

        // Calcul du taux de réussite
        int successCount = 0;
        for (boolean pass : passed) {
            if (pass) {
                successCount++;
            }
        }
        double successRate = (double) successCount / names.length * 100;

        System.out.println("\nTaux de réussite : " + successRate + "%");

        System.out.println("\n=== Fin de l'exercice ===");
    }
}
```

</details>

## Exercice 6 : Rotation de matrice

Écrivez un programme qui effectue une rotation de 90 degrés d'une matrice
carrée.

**Consignes :**

1. Créez une matrice carrée 3x3 avec des valeurs numériques.
2. Affichez la matrice originale.
3. Créez une nouvelle matrice qui est la rotation à 90 degrés dans le sens
   horaire de la matrice originale.
4. Affichez la matrice pivotée.

**Exemple :**

```text
Matrice originale :
1 2 3
4 5 6
7 8 9

Matrice après rotation (90° horaire) :
7 4 1
8 5 2
9 6 3
```

**Astuce :** Pour une rotation de 90° dans le sens horaire, l'élément à la
position `[i][j]` dans la matrice originale se retrouve à la position
`[j][n-1-i]` dans la nouvelle matrice, où `n` est la taille de la matrice.

<details>
<summary>Solution</summary>

```java
/**
 * Solution de l'exercice 6 : Rotation de matrice.
 */
public class Main {

    /**
     * Affiche une matrice de manière lisible.
     *
     * @param matrix la matrice à afficher
     */
    public static void displayMatrix(int[][] matrix) {
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                System.out.print(matrix[row][col] + " ");
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
        System.out.println("=== Exercice 6 : Rotation de matrice ===\n");

        // Matrice originale 3x3
        int[][] original = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // Affichage de la matrice originale
        System.out.println("Matrice originale :");
        displayMatrix(original);

        // Création de la matrice pivotée
        int n = original.length;
        int[][] rotated = new int[n][n];

        // Rotation de 90° dans le sens horaire
        // Formule : rotated[j][n-1-i] = original[i][j]
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rotated[j][n - 1 - i] = original[i][j];
            }
        }

        // Affichage de la matrice pivotée
        System.out.println("\nMatrice après rotation (90° horaire) :");
        displayMatrix(rotated);

        System.out.println("\n=== Fin de l'exercice ===");
    }

}
```

</details>

## Pour aller plus loin

Maintenant que vous maîtrisez les tableaux, essayez de créer vos propres
programmes :

- Un gestionnaire de scores pour un jeu (tri, recherche du meilleur score).
- Un programme qui fusionne deux tableaux triés.
- Une simulation de bataille navale avec une grille 2D.
- Un calculateur de moyenne pondérée avec des coefficients.
- Un programme qui trouve tous les doublons dans un tableau.

N'oubliez pas de :

- Utiliser des noms de variables explicites en anglais.
- Commenter votre code pour expliquer la logique.
- Tester votre programme avec différentes valeurs.
- Gérer les cas particuliers (tableaux vides, valeurs nulles, etc.).

**La programmation s'apprend par la pratique. Plus vous coderez, plus ce sera
facile !**

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
