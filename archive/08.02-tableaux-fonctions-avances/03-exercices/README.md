# Tableaux et fonctions avancés - Exercices

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.02-tableaux-fonctions-avances/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.02-tableaux-fonctions-avances/01-supports-de-cours/08.02-tableaux-fonctions-avances-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Exercices

### Exercice 1 : Analyse de collecte sélective

Un quartier organise une collecte de déchets recyclables. Les données de
collecte (en kg) sont enregistrées pour chaque foyer, alternant entre déchets
organiques (indices pairs) et recyclables (indices impairs).

Créez un programme qui :

1. Affiche la collecte totale de déchets organiques (indices pairs uniquement)
2. Affiche la collecte totale de recyclables (indices impairs uniquement)
3. Calcule et affiche la moyenne pour chaque catégorie
4. Détermine quelle catégorie a la collecte la plus importante

Utilisez un tableau : `{12.5, 8.3, 15.2, 9.1, 11.8, 7.5, 14.3, 8.9}`

<details>
<summary>Solution</summary>

**Approche 1 : Solution simple dans `main`**

```java
public class WasteCollection {
    public static void main(String[] args) {
        double[] collection = {12.5, 8.3, 15.2, 9.1, 11.8, 7.5, 14.3, 8.9};

        // Calcul des totaux
        double organicTotal = 0;
        double recyclableTotal = 0;
        int organicCount = 0;
        int recyclableCount = 0;

        // Parcours avec saut pour les organiques (indices pairs)
        for (int i = 0; i < collection.length; i += 2) {
            organicTotal += collection[i];
            organicCount++;
        }

        // Parcours avec saut pour les recyclables (indices impairs)
        for (int i = 1; i < collection.length; i += 2) {
            recyclableTotal += collection[i];
            recyclableCount++;
        }

        // Calcul des moyennes
        double organicAverage = organicTotal / organicCount;
        double recyclableAverage = recyclableTotal / recyclableCount;

        // Affichage des résultats
        System.out.println("=== Analyse de la collecte sélective ===\n");
        System.out.println(String.format("Déchets organiques : %.2f kg (moyenne : %.2f kg)",
                                       organicTotal, organicAverage));
        System.out.println(String.format("Déchets recyclables : %.2f kg (moyenne : %.2f kg)",
                                       recyclableTotal, recyclableAverage));

        // Détermination de la catégorie la plus importante
        String category;
        if (organicTotal > recyclableTotal) {
            category = "organiques";
        } else {
            category = "recyclables";
        }

        System.out.println(String.format("\nCatégorie la plus importante : %s", category));
    }
}
```

**Approche 2 : Solution organisée avec fonctions**

```java
public class WasteCollection {

    /**
     * Analyse complète de la collecte de déchets.
     */
    public static void analyzeCollection(double[] collection) {
        double organicTotal = sumEvenIndices(collection);
        double recyclableTotal = sumOddIndices(collection);

        int organicCount = countEvenIndices(collection);
        int recyclableCount = countOddIndices(collection);

        double organicAverage = organicTotal / organicCount;
        double recyclableAverage = recyclableTotal / recyclableCount;

        displayResults(organicTotal, organicAverage, recyclableTotal, recyclableAverage);
    }

    /**
     * Calcule la somme des éléments aux indices pairs.
     */
    public static double sumEvenIndices(double[] array) {
        double sum = 0;
        for (int i = 0; i < array.length; i += 2) {
            sum += array[i];
        }
        return sum;
    }

    /**
     * Calcule la somme des éléments aux indices impairs.
     */
    public static double sumOddIndices(double[] array) {
        double sum = 0;
        for (int i = 1; i < array.length; i += 2) {
            sum += array[i];
        }
        return sum;
    }

    /**
     * Compte le nombre d'indices pairs.
     */
    public static int countEvenIndices(double[] array) {
        return (array.length + 1) / 2;
    }

    /**
     * Compte le nombre d'indices impairs.
     */
    public static int countOddIndices(double[] array) {
        return array.length / 2;
    }

    /**
     * Affiche les résultats de l'analyse.
     */
    public static void displayResults(double organicTotal, double organicAverage,
                                       double recyclableTotal, double recyclableAverage) {
        System.out.println(String.format("Déchets organiques : %.2f kg (moyenne : %.2f kg)",
                                       organicTotal, organicAverage));
        System.out.println(String.format("Déchets recyclables : %.2f kg (moyenne : %.2f kg)",
                                       recyclableTotal, recyclableAverage));

        String category;
        if (organicTotal > recyclableTotal) {
            category = "organiques";
        } else {
            category = "recyclables";
        }

        System.out.println(String.format("\nCatégorie la plus importante : %s", category));
    }
    public static void main(String[] args) {
        double[] collection = {12.5, 8.3, 15.2, 9.1, 11.8, 7.5, 14.3, 8.9};

        System.out.println("=== Analyse de la collecte sélective ===\n");
        analyzeCollection(collection);
    }

}
```

</details>

### Exercice 2 : Température stable dans une serre

Dans une serre communautaire, un système mesure la température toutes les
heures. Pour calculer la température "stable" du jour, on ignore les mesures du
matin et du soir (premières et dernières valeurs).

Créez un programme qui :

1. Affiche toutes les températures mesurées
2. Calcule et affiche la température moyenne en excluant la première et la
   dernière mesure
3. Trouve la température la plus élevée parmi les mesures "stables"
4. Trouve la température la plus basse parmi les mesures "stables"

Utilisez un tableau : `{8.5, 15.2, 18.3, 19.5, 20.1, 18.9, 17.2, 14.5, 11.3}`

<details>
<summary>Solution</summary>

**Approche 1 : Solution simple dans `main`**

```java
public class GreenhouseTemperature {
    public static void main(String[] args) {
        double[] temperatures = {8.5, 15.2, 18.3, 19.5, 20.1, 18.9, 17.2, 14.5, 11.3};

        System.out.println("=== Analyse de température dans la serre ===\n");

        // Affichage de toutes les températures
        System.out.println("Températures mesurées :");
        for (int i = 0; i < temperatures.length; i++) {
            System.out.println(String.format("Heure %d : %.1f°C", i + 1, temperatures[i]));
        }

        // Vérification qu'il y a assez de données
        if (temperatures.length < 3) {
            System.out.println("Pas assez de données pour l'analyse.");
            return;
        }

        // Calcul de la moyenne sans les bornes
        double sum = 0;
        int count = 0;
        for (int i = 1; i < temperatures.length - 1; i++) {
            sum += temperatures[i];
            count++;
        }
        double average = sum / count;

        // Recherche du min et max sans les bornes
        double min = temperatures[1];
        double max = temperatures[1];

        for (int i = 2; i < temperatures.length - 1; i++) {
            if (temperatures[i] < min) {
                min = temperatures[i];
            }
            if (temperatures[i] > max) {
                max = temperatures[i];
            }
        }

        // Affichage des résultats
        System.out.println(String.format("\nTempérature moyenne stable : %.2f°C", average));
        System.out.println(String.format("Température minimale stable : %.1f°C", min));
        System.out.println(String.format("Température maximale stable : %.1f°C", max));
        System.out.println(String.format("Variation : %.1f°C", max - min));
    }
}
```

**Approche 2 : Solution organisée avec fonctions**

```java
public class GreenhouseTemperature {

    /**
     * Affiche toutes les températures mesurées.
     */
    public static void displayAllTemperatures(double[] temperatures) {
        System.out.println("Températures mesurées :");
        for (int i = 0; i < temperatures.length; i++) {
            System.out.println(String.format("Heure %d : %.1f°C", i + 1, temperatures[i]));
        }
    }

    /**
     * Analyse les températures stables (sans premières/dernières mesures).
     */
    public static void analyzeStableTemperatures(double[] temperatures) {
        if (temperatures.length < 3) {
            System.out.println("\nPas assez de données pour l'analyse.");
            return;
        }

        double average = calculateAverageWithoutBounds(temperatures);
        double min = findMinWithoutBounds(temperatures);
        double max = findMaxWithoutBounds(temperatures);

        System.out.println(String.format("\nTempérature moyenne stable : %.2f°C", average));
        System.out.println(String.format("Température minimale stable : %.1f°C", min));
        System.out.println(String.format("Température maximale stable : %.1f°C", max));
        System.out.println(String.format("Variation : %.1f°C", max - min));
    }

    /**
     * Calcule la moyenne en excluant les bornes.
     */
    public static double calculateAverageWithoutBounds(double[] array) {
        double sum = 0;
        int count = 0;

        for (int i = 1; i < array.length - 1; i++) {
            sum += array[i];
            count++;
        }

        return sum / count;
    }

    /**
     * Trouve le minimum en excluant les bornes.
     */
    public static double findMinWithoutBounds(double[] array) {
        double min = array[1];

        for (int i = 2; i < array.length - 1; i++) {
            if (array[i] < min) {
                min = array[i];
            }
        }

        return min;
    }

    /**
     * Trouve le maximum en excluant les bornes.
     */
    public static double findMaxWithoutBounds(double[] array) {
        double max = array[1];

        for (int i = 2; i < array.length - 1; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }

        return max;
    }
    public static void main(String[] args) {
        double[] temperatures = {8.5, 15.2, 18.3, 19.5, 20.1, 18.9, 17.2, 14.5, 11.3};

        System.out.println("=== Analyse de température dans la serre ===\n");

        displayAllTemperatures(temperatures);
        analyzeStableTemperatures(temperatures);
    }

}
```

</details>

### Exercice 3 : Inventaire d'outils partagés

Un atelier de réparation communautaire dispose d'un système d'inventaire des
outils. Chaque outil a un code numérique unique.

Créez un programme qui :

1. Recherche si un outil spécifique est disponible (par son code)
2. Compte combien de fois un outil particulier apparaît dans l'inventaire
   (nombre d'exemplaires)
3. Affiche tous les outils qui apparaissent plus d'une fois (outils en double)

Utilisez un tableau : `{101, 203, 101, 405, 203, 607, 101, 203, 809}`

Codes à rechercher : `101` (tournevis), `405` (marteau), `999` (clé)

<details>
<summary>Solution</summary>

**Approche 1 : Solution simple dans `main`**

```java
public class ToolInventory {
    public static void main(String[] args) {
        int[] inventory = {101, 203, 101, 405, 203, 607, 101, 203, 809};
        int[] searchCodes = {101, 405, 999};
        String[] toolNames = {"tournevis", "marteau", "clé"};

        System.out.println("=== Inventaire d'outils partagés ===\n");

        // Recherche d'outils spécifiques
        System.out.println("--- Recherche d'outils ---");
        for (int i = 0; i < searchCodes.length; i++) {
            int code = searchCodes[i];
            String name = toolNames[i];

            // Recherche
            boolean found = false;
            for (int j = 0; j < inventory.length; j++) {
                if (inventory[j] == code) {
                    found = true;
                    break;
                }
            }

            if (found) {
                System.out.println(String.format("%s (code %d) : Disponible", name, code));
            } else {
                System.out.println(String.format("%s (code %d) : Non disponible", name, code));
            }
        }

        // Comptage d'exemplaires
        System.out.println("\n--- Nombre d'exemplaires ---");
        for (int i = 0; i < searchCodes.length; i++) {
            int code = searchCodes[i];
            String name = toolNames[i];

            // Comptage
            int count = 0;
            for (int j = 0; j < inventory.length; j++) {
                if (inventory[j] == code) {
                    count++;
                }
            }

            if (count > 0) {
                System.out.println(String.format("%s (code %d) : %d exemplaire(s)",
                                                name, code, count));
            }
        }

        // Outils en double
        System.out.println("\n--- Outils en double ---");
        int[] uniqueCodes = {101, 203, 405, 607, 809};

        for (int i = 0; i < uniqueCodes.length; i++) {
            int code = uniqueCodes[i];

            int count = 0;
            for (int j = 0; j < inventory.length; j++) {
                if (inventory[j] == code) {
                    count++;
                }
            }

            if (count > 1) {
                System.out.println(String.format("Code %d : %d exemplaires", code, count));
            }
        }
    }
}
```

**Approche 2 : Solution organisée avec fonctions**

```java
public class ToolInventory {

    /**
     * Recherche des outils spécifiques dans l'inventaire.
     */
    public static void searchTools(int[] inventory, int[] searchCodes, String[] toolNames) {
        System.out.println("--- Recherche d'outils ---");

        for (int i = 0; i < searchCodes.length; i++) {
            int code = searchCodes[i];
            String name = toolNames[i];
            boolean found = linearSearch(inventory, code);

            String status;
            if (found) {
                status = "Disponible";
            } else {
                status = "Non disponible";
            }

            System.out.println(String.format("%s (code %d) : %s", name, code, status));
        }
    }

    /**
     * Compte les exemplaires de chaque outil.
     */
    public static void countExamples(int[] inventory, int[] searchCodes, String[] toolNames) {
        System.out.println("\n--- Nombre d'exemplaires ---");

        for (int i = 0; i < searchCodes.length; i++) {
            int code = searchCodes[i];
            String name = toolNames[i];
            int count = countOccurrences(inventory, code);

            if (count > 0) {
                System.out.println(String.format("%s (code %d) : %d exemplaire(s)",
                                                name, code, count));
            }
        }
    }

    /**
     * Trouve tous les outils présents en plusieurs exemplaires.
     */
    public static void findDuplicates(int[] inventory) {
        System.out.println("\n--- Outils en double ---");

        int[] uniqueCodes = {101, 203, 405, 607, 809};

        for (int i = 0; i < uniqueCodes.length; i++) {
            int code = uniqueCodes[i];
            int count = countOccurrences(inventory, code);

            if (count > 1) {
                System.out.println(String.format("Code %d : %d exemplaires", code, count));
            }
        }
    }

    /**
     * Recherche linéaire d'une valeur dans un tableau.
     */
    public static boolean linearSearch(int[] array, int target) {
        for (int i = 0; i < array.length; i++) {
            if (array[i] == target) {
                return true;
            }
        }
        return false;
    }

    /**
     * Compte les occurrences d'une valeur dans un tableau.
     */
    public static int countOccurrences(int[] array, int value) {
        int count = 0;

        for (int element : array) {
            if (element == value) {
                count++;
            }
        }

        return count;
    }
    public static void main(String[] args) {
        int[] inventory = {101, 203, 101, 405, 203, 607, 101, 203, 809};
        int[] searchCodes = {101, 405, 999};
        String[] toolNames = {"tournevis", "marteau", "clé"};

        System.out.println("=== Inventaire d'outils partagés ===\n");

        searchTools(inventory, searchCodes, toolNames);
        countExamples(inventory, searchCodes, toolNames);
        findDuplicates(inventory);
    }

}
```

</details>

### Exercice 4 : Suivi de participation à un atelier

Un atelier de permaculture enregistre le nombre de participantes par session sur
une année. On souhaite analyser les tendances de participation.

Créez un programme qui :

1. Trouve le nombre minimum de participantes sur l'année
2. Trouve le nombre maximum de participantes sur l'année
3. Calcule la participation moyenne annuelle
4. Identifie combien de sessions ont dépassé la moyenne

Utilisez un tableau : `{12, 18, 15, 22, 19, 25, 28, 24, 20, 16, 14, 11}`

<details>
<summary>Solution</summary>

**Approche 1 : Solution simple dans `main`**

```java
public class WorkshopParticipation {
    public static void main(String[] args) {
        int[] participation = {12, 18, 15, 22, 19, 25, 28, 24, 20, 16, 14, 11};
        String[] months = {"Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"};

        System.out.println("=== Suivi de participation à l'atelier ===\n");

        // Recherche du minimum
        int min = participation[0];
        int minMonth = 0;
        for (int i = 1; i < participation.length; i++) {
            if (participation[i] < min) {
                min = participation[i];
                minMonth = i;
            }
        }

        // Recherche du maximum
        int max = participation[0];
        int maxMonth = 0;
        for (int i = 1; i < participation.length; i++) {
            if (participation[i] > max) {
                max = participation[i];
                maxMonth = i;
            }
        }

        // Calcul de la moyenne
        int sum = 0;
        for (int i = 0; i < participation.length; i++) {
            sum += participation[i];
        }
        double average = (double) sum / participation.length;

        // Comptage des sessions au-dessus de la moyenne
        int aboveAverage = 0;
        for (int i = 0; i < participation.length; i++) {
            if (participation[i] > average) {
                aboveAverage++;
            }
        }

        // Affichage des résultats
        System.out.println(String.format("Participation minimale : %d (%s)",
                                       min, months[minMonth]));
        System.out.println(String.format("Participation maximale : %d (%s)",
                                       max, months[maxMonth]));
        System.out.println(String.format("Participation moyenne : %.1f", average));
        System.out.println(String.format("Sessions au-dessus de la moyenne : %d sur %d",
                                       aboveAverage, participation.length));
    }
}
```

**Approche 2 : Solution organisée avec fonctions**

```java
public class WorkshopParticipation {

    /**
     * Analyse complète de la participation.
     */
    public static void analyzeParticipation(int[] participation, String[] months) {
        int min = findMin(participation);
        int max = findMax(participation);
        int minIndex = findIndex(participation, min);
        int maxIndex = findIndex(participation, max);
        double average = calculateAverage(participation);
        int aboveAverage = countAboveAverage(participation, average);

        displayResults(min, max, minIndex, maxIndex, average, aboveAverage,
                      participation.length, months);
    }

    /**
     * Trouve la valeur minimale dans un tableau.
     */
    public static int findMin(int[] array) {
        int min = array[0];

        for (int i = 1; i < array.length; i++) {
            if (array[i] < min) {
                min = array[i];
            }
        }

        return min;
    }

    /**
     * Trouve la valeur maximale dans un tableau.
     */
    public static int findMax(int[] array) {
        int max = array[0];

        for (int i = 1; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }

        return max;
    }

    /**
     * Trouve l'indice d'une valeur donnée.
     */
    public static int findIndex(int[] array, int value) {
        for (int i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Calcule la moyenne des valeurs d'un tableau.
     */
    public static double calculateAverage(int[] array) {
        int sum = 0;

        for (int value : array) {
            sum += value;
        }

        return (double) sum / array.length;
    }

    /**
     * Compte combien de valeurs dépassent une limite donnée.
     */
    public static int countAboveAverage(int[] array, double threshold) {
        int count = 0;

        for (int value : array) {
            if (value > threshold) {
                count++;
            }
        }

        return count;
    }

    /**
     * Affiche les résultats de l'analyse.
     */
    public static void displayResults(int min, int max, int minIndex, int maxIndex,
                                       double average, int aboveAverage, int total,
                                       String[] months) {
        System.out.println(String.format("Participation minimale : %d (%s)",
                                       min, months[minIndex]));
        System.out.println(String.format("Participation maximale : %d (%s)",
                                       max, months[maxIndex]));
        System.out.println(String.format("Participation moyenne : %.1f", average));
        System.out.println(String.format("Sessions au-dessus de la moyenne : %d sur %d",
                                       aboveAverage, total));
    }
    public static void main(String[] args) {
        int[] participation = {12, 18, 15, 22, 19, 25, 28, 24, 20, 16, 14, 11};
        String[] months = {"Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"};

        System.out.println("=== Suivi de participation à l'atelier ===\n");

        analyzeParticipation(participation, months);
    }

}
```

</details>

### Exercice 5 : Factorielle et Fibonacci

Créez un programme qui démontre la récursivité avec deux exemples classiques :

1. Implémentez une fonction récursive `factorial` qui calcule la factorielle
   d'un nombre
2. Implémentez une fonction récursive `fibonacci` qui calcule le n-ième terme de
   la suite de Fibonacci
3. Implémentez les versions itératives de ces deux fonctions
4. Comparez les résultats pour vérifier qu'ils sont identiques

Testez avec : factorielle de 6 et Fibonacci de 8

<details>
<summary>Solution</summary>

**Approche 1 : Solution simple dans `main`**

```java
public class RecursionExamples {

    // Factorielle récursive
    public static long factorialRecursive(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorialRecursive(n - 1);
    }

    // Factorielle itérative
    public static long factorialIterative(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Fibonacci récursif
    public static int fibonacciRecursive(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }

    // Fibonacci itératif
    public static int fibonacciIterative(int n) {
        if (n <= 1) {
            return n;
        }

        int previous = 0;
        int current = 1;

        for (int i = 2; i <= n; i++) {
            int next = previous + current;
            previous = current;
            current = next;
        }

        return current;
    }
    public static void main(String[] args) {
        int n = 6;
        int fibN = 8;

        System.out.println("=== Exemples de récursivité ===\n");

        // Factorielle
        System.out.println("--- Factorielle de " + n + " ---");
        long factRecursive = factorialRecursive(n);
        long factIterative = factorialIterative(n);
        System.out.println("Récursif : " + factRecursive);
        System.out.println("Itératif : " + factIterative);

        String factMatch;
        if (factRecursive == factIterative) {
            factMatch = "✓ Les résultats correspondent";
        } else {
            factMatch = "✗ Les résultats diffèrent";
        }
        System.out.println(factMatch);

        // Fibonacci
        System.out.println("\n--- Fibonacci de " + fibN + " ---");
        int fibRecursive = fibonacciRecursive(fibN);
        int fibIterative = fibonacciIterative(fibN);
        System.out.println("Récursif : " + fibRecursive);
        System.out.println("Itératif : " + fibIterative);

        String fibMatch;
        if (fibRecursive == fibIterative) {
            fibMatch = "✓ Les résultats correspondent";
        } else {
            fibMatch = "✗ Les résultats diffèrent";
        }
        System.out.println(fibMatch);
    }

}
```

**Approche 2 : Solution organisée avec fonctions**

```java
public class RecursionExamples {

    /**
     * Démontre le calcul de factorielle (récursif et itératif).
     */
    public static void demonstrateFactorial(int n) {
        System.out.println("--- Factorielle de " + n + " ---");

        long factRecursive = factorialRecursive(n);
        long factIterative = factorialIterative(n);

        System.out.println("Récursif : " + factRecursive);
        System.out.println("Itératif : " + factIterative);

        verifyMatch(factRecursive == factIterative);
    }

    /**
     * Démontre le calcul de Fibonacci (récursif et itératif).
     */
    public static void demonstrateFibonacci(int n) {
        System.out.println("\n--- Fibonacci de " + n + " ---");

        int fibRecursive = fibonacciRecursive(n);
        int fibIterative = fibonacciIterative(n);

        System.out.println("Récursif : " + fibRecursive);
        System.out.println("Itératif : " + fibIterative);

        verifyMatch(fibRecursive == fibIterative);
    }

    /**
     * Vérifie et affiche si les résultats correspondent.
     */
    public static void verifyMatch(boolean match) {
        String message;
        if (match) {
            message = "✓ Les résultats correspondent";
        } else {
            message = "✗ Les résultats diffèrent";
        }
        System.out.println(message);
    }

    /**
     * Calcule la factorielle de manière récursive.
     */
    public static long factorialRecursive(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorialRecursive(n - 1);
    }

    /**
     * Calcule la factorielle de manière itérative.
     */
    public static long factorialIterative(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    /**
     * Calcule le n-ième terme de Fibonacci de manière récursive.
     */
    public static int fibonacciRecursive(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }

    /**
     * Calcule le n-ième terme de Fibonacci de manière itérative.
     */
    public static int fibonacciIterative(int n) {
        if (n <= 1) {
            return n;
        }

        int previous = 0;
        int current = 1;

        for (int i = 2; i <= n; i++) {
            int next = previous + current;
            previous = current;
            current = next;
        }

        return current;
    }
    public static void main(String[] args) {
        int n = 6;
        int fibN = 8;

        System.out.println("=== Exemples de récursivité ===\n");

        demonstrateFactorial(n);
        demonstrateFibonacci(fibN);
    }

}
```

</details>

### Exercice 6 : Compteur récursif de valeurs

Créez un programme qui utilise la récursivité pour compter les éléments d'un
tableau qui sont supérieurs à une valeur seuil.

Implémentez :

1. Une fonction récursive `countAboveThreshold` qui compte récursivement les
   éléments supérieurs à un seuil
2. Une fonction itérative équivalente pour comparaison
3. Testez avec un tableau de scores d'un jeu coopératif

Utilisez le tableau : `{45, 78, 52, 89, 63, 71, 58, 82, 67}` avec un seuil de
`65`

<details>
<summary>Solution</summary>

**Approche 1 : Solution simple dans `main`**

```java
public class RecursiveCounter {

    // Comptage récursif
    public static int countAboveThresholdRecursive(int[] array, int threshold, int index) {
        // Cas de base : fin du tableau
        if (index >= array.length) {
            return 0;
        }

        // Compte 1 si l'élément dépasse le seuil, sinon 0
        int current;
        if (array[index] > threshold) {
            current = 1;
        } else {
            current = 0;
        }

        // Cas récursif : élément courant + comptage du reste
        return current + countAboveThresholdRecursive(array, threshold, index + 1);
    }

    // Comptage itératif
    public static int countAboveThresholdIterative(int[] array, int threshold) {
        int count = 0;

        for (int value : array) {
            if (value > threshold) {
                count++;
            }
        }

        return count;
    }
    public static void main(String[] args) {
        int[] scores = {45, 78, 52, 89, 63, 71, 58, 82, 67};
        int threshold = 65;

        System.out.println("=== Compteur récursif de valeurs ===\n");

        System.out.println("Scores : ");
        for (int i = 0; i < scores.length; i++) {
            System.out.println("Joueur " + (i + 1) + " : " + scores[i]);
        }

        System.out.println("\nSeuil de réussite : " + threshold);

        // Version récursive
        int countRecursive = countAboveThresholdRecursive(scores, threshold, 0);
        System.out.println("\nRésultat récursif : " + countRecursive + " joueurs au-dessus du seuil");

        // Version itérative
        int countIterative = countAboveThresholdIterative(scores, threshold);
        System.out.println("Résultat itératif : " + countIterative + " joueurs au-dessus du seuil");

        // Vérification
        String match;
        if (countRecursive == countIterative) {
            match = "✓ Les résultats correspondent";
        } else {
            match = "✗ Les résultats diffèrent";
        }
        System.out.println("\n" + match);
    }

}
```

**Approche 2 : Solution organisée avec fonctions**

```java
public class RecursiveCounter {

    /**
     * Affiche tous les scores.
     */
    public static void displayScores(int[] scores) {
        System.out.println("Scores : ");
        for (int i = 0; i < scores.length; i++) {
            System.out.println("Joueur " + (i + 1) + " : " + scores[i]);
        }
    }

    /**
     * Compare les méthodes récursive et itérative.
     */
    public static void compareCountingMethods(int[] scores, int threshold) {
        int countRecursive = countAboveThresholdRecursive(scores, threshold, 0);
        int countIterative = countAboveThresholdIterative(scores, threshold);

        displayResults(countRecursive, countIterative);
        verifyMatch(countRecursive == countIterative);
    }

    /**
     * Affiche les résultats du comptage.
     */
    public static void displayResults(int recursive, int iterative) {
        System.out.println("\nRésultat récursif : " + recursive + " joueurs au-dessus du seuil");
        System.out.println("Résultat itératif : " + iterative + " joueurs au-dessus du seuil");
    }

    /**
     * Vérifie et affiche si les résultats correspondent.
     */
    public static void verifyMatch(boolean match) {
        String message;
        if (match) {
            message = "✓ Les résultats correspondent";
        } else {
            message = "✗ Les résultats diffèrent";
        }
        System.out.println("\n" + message);
    }

    /**
     * Compte récursivement les éléments supérieurs à un seuil.
     */
    public static int countAboveThresholdRecursive(int[] array, int threshold, int index) {
        // Cas de base : fin du tableau
        if (index >= array.length) {
            return 0;
        }

        // Compte 1 si l'élément dépasse le seuil, sinon 0
        int current;
        if (array[index] > threshold) {
            current = 1;
        } else {
            current = 0;
        }

        // Cas récursif : élément courant + comptage du reste
        return current + countAboveThresholdRecursive(array, threshold, index + 1);
    }

    /**
     * Compte itérativement les éléments supérieurs à un seuil.
     */
    public static int countAboveThresholdIterative(int[] array, int threshold) {
        int count = 0;

        for (int value : array) {
            if (value > threshold) {
                count++;
            }
        }

        return count;
    }
    public static void main(String[] args) {
        int[] scores = {45, 78, 52, 89, 63, 71, 58, 82, 67};
        int threshold = 65;

        System.out.println("=== Compteur récursif de valeurs ===\n");

        displayScores(scores);
        System.out.println("\nSeuil de réussite : " + threshold);

        compareCountingMethods(scores, threshold);
    }

}
```

</details>

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
