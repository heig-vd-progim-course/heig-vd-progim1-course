# Bibliothèques et packages - Exercices

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.01-bibliotheques-et-packages/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.01-bibliotheques-et-packages/01-supports-de-cours/08.01-bibliotheques-et-packages-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)

## Exercice 1 : Calculs statistiques avec `java.util.Arrays`

Créez un programme qui calcule des statistiques sur un tableau de températures
relevées pendant une semaine.

Le programme doit :

1. Déclarer un tableau de 7 températures (une par jour).
2. Utiliser `Arrays.sort()` pour trier les températures.
3. Calculer la température moyenne (sans utiliser de fonctions préexistantes).
4. Afficher la température minimale et maximale (premier et dernier élément
   après tri).
5. Utiliser `Arrays.toString()` pour afficher le tableau trié.

<details>
<summary>Solution - Approche 1 : Tout dans le main</summary>

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Statistiques de températures ===\n");

        // Températures de la semaine (en degrés Celsius)
        double[] temperatures = {18.5, 22.3, 19.8, 21.0, 17.5, 20.2, 23.1};

        System.out.println("Températures originales : " + Arrays.toString(temperatures));

        // Tri des températures
        Arrays.sort(temperatures);
        System.out.println("Températures triées : " + Arrays.toString(temperatures));

        // Calcul de la moyenne
        double sum = 0;
        for (int i = 0; i < temperatures.length; i++) {
            sum = sum + temperatures[i];
        }
        double average = sum / temperatures.length;

        // Affichage des statistiques
        System.out.println("\n--- Statistiques ---");
        System.out.println("Température minimale : " + temperatures[0] + "°C");
        System.out.println("Température maximale : " + temperatures[temperatures.length - 1] + "°C");
        System.out.println("Température moyenne : " + average + "°C");
    }
}
```

</details>

<details>
<summary>Solution - Approche 2 : Avec fonctions statiques</summary>

```java
import java.util.Arrays;

public class Main {

    public static void displayStatistics(double[] data) {
        System.out.println("Températures originales : " + Arrays.toString(data));

        // Tri des températures
        Arrays.sort(data);
        System.out.println("Températures triées : " + Arrays.toString(data));

        // Calcul et affichage des statistiques
        System.out.println("\n--- Statistiques ---");
        System.out.println("Température minimale : " + findMin(data) + "°C");
        System.out.println("Température maximale : " + findMax(data) + "°C");
        System.out.println("Température moyenne : " + calculateAverage(data) + "°C");
    }

    public static double findMin(double[] data) {
        return data[0];
    }

    public static double findMax(double[] data) {
        return data[data.length - 1];
    }

    public static double calculateAverage(double[] data) {
        double sum = 0;
        for (int i = 0; i < data.length; i++) {
            sum = sum + data[i];
        }
        return sum / data.length;
    }
    public static void main(String[] args) {
        System.out.println("=== Statistiques de températures ===\n");

        // Températures de la semaine (en degrés Celsius)
        double[] temperatures = {18.5, 22.3, 19.8, 21.0, 17.5, 20.2, 23.1};

        displayStatistics(temperatures);
    }

}
```

Cette approche organise mieux le code en séparant les responsabilités dans des
fonctions distinctes.

</details>

## Exercice 2 : Jeu de dés avec `java.util.Random`

Créez un jeu où deux joueurs lancent chacun deux dés. Le joueur avec le total le
plus élevé gagne.

Le programme doit :

1. Utiliser `Random` pour simuler les lancers de dés.
2. Calculer le total pour chaque joueur.
3. Déterminer le gagnant ou déclarer une égalité.
4. Afficher les résultats de manière claire.
5. Permettre de jouer plusieurs manches (par exemple 5 manches).

<details>
<summary>Solution - Approche 1 : Boucle simple</summary>

```java
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Jeu de dés ===\n");

        Random random = new Random();
        int wins1 = 0;
        int wins2 = 0;
        int rounds = 5;

        for (int round = 1; round <= rounds; round++) {
            System.out.println("--- Manche " + round + " ---");

            // Lancers pour le joueur 1
            int dice1Player1 = random.nextInt(6) + 1;
            int dice2Player1 = random.nextInt(6) + 1;
            int totalPlayer1 = dice1Player1 + dice2Player1;

            // Lancers pour le joueur 2
            int dice1Player2 = random.nextInt(6) + 1;
            int dice2Player2 = random.nextInt(6) + 1;
            int totalPlayer2 = dice1Player2 + dice2Player2;

            // Affichage des résultats
            System.out.println("Joueur 1 : " + dice1Player1 + " + " + dice2Player1 + " = " + totalPlayer1);
            System.out.println("Joueur 2 : " + dice1Player2 + " + " + dice2Player2 + " = " + totalPlayer2);

            // Détermination du gagnant
            if (totalPlayer1 > totalPlayer2) {
                System.out.println("Joueur 1 gagne !\n");
                wins1 = wins1 + 1;
            } else if (totalPlayer2 > totalPlayer1) {
                System.out.println("Joueur 2 gagne !\n");
                wins2 = wins2 + 1;
            } else {
                System.out.println("Égalité !\n");
            }
        }

        // Résultat final
        System.out.println("=== Résultat final ===");
        System.out.println("Joueur 1 : " + wins1 + " victoire(s)");
        System.out.println("Joueur 2 : " + wins2 + " victoire(s)");

        if (wins1 > wins2) {
            System.out.println("Joueur 1 remporte le match !");
        } else if (wins2 > wins1) {
            System.out.println("Joueur 2 remporte le match !");
        } else {
            System.out.println("Match nul !");
        }
    }
}
```

</details>

<details>
<summary>Solution - Approche 2 : Avec fonctions statiques</summary>

```java
import java.util.Random;

public class Main {

    public static int rollTwoDice(Random random) {
        int dice1 = random.nextInt(6) + 1;
        int dice2 = random.nextInt(6) + 1;
        return dice1 + dice2;
    }

    public static String determineWinner(int score1, int score2) {
        if (score1 > score2) {
            return "Joueur 1 gagne !";
        } else if (score2 > score1) {
            return "Joueur 2 gagne !";
        } else {
            return "Égalité !";
        }
    }

    public static void displayFinalResult(int wins1, int wins2) {
        System.out.println("=== Résultat final ===");
        System.out.println("Joueur 1 : " + wins1 + " victoire(s)");
        System.out.println("Joueur 2 : " + wins2 + " victoire(s)");

        if (wins1 > wins2) {
            System.out.println("Joueur 1 remporte le match !");
        } else if (wins2 > wins1) {
            System.out.println("Joueur 2 remporte le match !");
        } else {
            System.out.println("Match nul !");
        }
    }
    public static void main(String[] args) {
        System.out.println("=== Jeu de dés ===\n");

        Random random = new Random();
        int wins1 = 0;
        int wins2 = 0;
        int rounds = 5;

        for (int round = 1; round <= rounds; round++) {
            System.out.println("--- Manche " + round + " ---");

            int totalPlayer1 = rollTwoDice(random);
            int totalPlayer2 = rollTwoDice(random);

            System.out.println("Joueur 1 : " + totalPlayer1);
            System.out.println("Joueur 2 : " + totalPlayer2);

            String result = determineWinner(totalPlayer1, totalPlayer2);
            System.out.println(result + "\n");

            if (result.contains("Joueur 1")) {
                wins1 = wins1 + 1;
            } else if (result.contains("Joueur 2")) {
                wins2 = wins2 + 1;
            }
        }

        displayFinalResult(wins1, wins2);
    }

}
```

</details>

## Exercice 3 : Calcul d'âge avec `java.time.LocalDate`

Créez un programme qui calcule l'âge précis d'une personne à partir de sa date
de naissance.

Le programme doit :

1. Utiliser `LocalDate` pour représenter la date de naissance et la date
   actuelle.
2. Calculer l'âge en années.
3. Calculer également le nombre de jours depuis la naissance.
4. Indiquer dans combien de jours aura lieu le prochain anniversaire.

<details>
<summary>Solution - Approche 1 : Calculs directs</summary>

```java
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Calcul d'âge ===\n");

        // Date de naissance (exemple : 15 mars 2005)
        LocalDate birthDate = LocalDate.of(2005, 3, 15);
        LocalDate today = LocalDate.now();

        System.out.println("Date de naissance : " + birthDate);
        System.out.println("Date actuelle : " + today);
        System.out.println();

        // Calcul de l'âge en années
        int age = today.getYear() - birthDate.getYear();

        // Ajustement si l'anniversaire n'est pas encore passé cette année
        LocalDate birthdayThisYear = birthDate.withYear(today.getYear());
        if (today.isBefore(birthdayThisYear)) {
            age = age - 1;
        }

        // Calcul du nombre de jours depuis la naissance
        long daysSinceBirth = ChronoUnit.DAYS.between(birthDate, today);

        // Calcul du prochain anniversaire
        LocalDate nextBirthday;
        if (today.isBefore(birthdayThisYear)) {
            nextBirthday = birthdayThisYear;
        } else if (today.isEqual(birthdayThisYear)) {
            nextBirthday = birthdayThisYear;
        } else {
            nextBirthday = birthDate.withYear(today.getYear() + 1);
        }

        long daysUntilBirthday = ChronoUnit.DAYS.between(today, nextBirthday);

        // Affichage des résultats
        System.out.println("--- Résultats ---");
        System.out.println("Âge : " + age + " ans");
        System.out.println("Jours depuis la naissance : " + daysSinceBirth + " jours");

        if (daysUntilBirthday == 0) {
            System.out.println("Bon anniversaire !");
        } else {
            System.out.println("Prochain anniversaire dans : " + daysUntilBirthday + " jours");
        }
    }
}
```

</details>

<details>
<summary>Solution - Approche 2 : Avec fonctions statiques réutilisables</summary>

```java
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Main {

    public static void displayAgeStatistics(LocalDate birthDate, LocalDate referenceDate) {
        int age = calculateAge(birthDate, referenceDate);
        long daysSinceBirth = calculateDaysSinceBirth(birthDate, referenceDate);
        long daysUntilBirthday = calculateDaysUntilBirthday(birthDate, referenceDate);

        System.out.println("--- Résultats ---");
        System.out.println("Âge : " + age + " ans");
        System.out.println("Jours depuis la naissance : " + daysSinceBirth + " jours");

        if (daysUntilBirthday == 0) {
            System.out.println("Bon anniversaire !");
        } else {
            System.out.println("Prochain anniversaire dans : " + daysUntilBirthday + " jours");
        }
    }

    public static int calculateAge(LocalDate birthDate, LocalDate referenceDate) {
        int age = referenceDate.getYear() - birthDate.getYear();

        LocalDate birthdayThisYear = birthDate.withYear(referenceDate.getYear());
        if (referenceDate.isBefore(birthdayThisYear)) {
            age = age - 1;
        }

        return age;
    }

    public static long calculateDaysSinceBirth(LocalDate birthDate, LocalDate referenceDate) {
        return ChronoUnit.DAYS.between(birthDate, referenceDate);
    }

    public static long calculateDaysUntilBirthday(LocalDate birthDate, LocalDate referenceDate) {
        LocalDate birthdayThisYear = birthDate.withYear(referenceDate.getYear());

        LocalDate nextBirthday;
        if (referenceDate.isAfter(birthdayThisYear)) {
            nextBirthday = birthDate.withYear(referenceDate.getYear() + 1);
        } else {
            nextBirthday = birthdayThisYear;
        }

        return ChronoUnit.DAYS.between(referenceDate, nextBirthday);
    }
    public static void main(String[] args) {
        System.out.println("=== Calcul d'âge ===\n");

        // Date de naissance (exemple : 15 mars 2005)
        LocalDate birthDate = LocalDate.of(2005, 3, 15);
        LocalDate today = LocalDate.now();

        System.out.println("Date de naissance : " + birthDate);
        System.out.println("Date actuelle : " + today);
        System.out.println();

        displayAgeStatistics(birthDate, today);
    }

}
```

</details>

## Exercice 4 : Package utilitaire personnalisé

Créez votre propre package utilitaire avec des fonctions statiques pour des
calculs mathématiques.

Structure à créer :

```text
src/
├── utils/
│   └── MathHelper.java
└── Main.java
```

Le package `utils.MathHelper` doit contenir les fonctions statiques suivantes :

1. `isPrime(int n)` : vérifie si un nombre est premier
2. `factorial(int n)` : calcule la factorielle d'un nombre
3. `sumDigits(int n)` : calcule la somme des chiffres d'un nombre
4. `isPalindrome(int n)` : vérifie si un nombre est un palindrome

Le programme principal doit importer et utiliser ces fonctions.

<details>
<summary>Solution - Approche 1 : Algorithmes simples</summary>

**Fichier : `utils/MathHelper.java`**

```java
package utils;

public class MathHelper {

    public static boolean isPrime(int n) {
        if (n <= 1) {
            return false;
        }

        for (int i = 2; i < n; i++) {
            if (n % i == 0) {
                return false;
            }
        }

        return true;
    }

    public static int factorial(int n) {
        if (n < 0) {
            return -1;
        }

        int result = 1;
        for (int i = 2; i <= n; i++) {
            result = result * i;
        }

        return result;
    }

    public static int sumDigits(int n) {
        int sum = 0;
        int number = n;

        if (number < 0) {
            number = -number;
        }

        while (number > 0) {
            sum = sum + (number % 10);
            number = number / 10;
        }

        return sum;
    }

    public static boolean isPalindrome(int n) {
        int original = n;
        int reversed = 0;

        if (n < 0) {
            return false;
        }

        while (n > 0) {
            reversed = reversed * 10 + (n % 10);
            n = n / 10;
        }

        return original == reversed;
    }
}
```

**Fichier : `Main.java`**

```java
import utils.MathHelper;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Tests MathHelper ===\n");

        // Test isPrime
        System.out.println("--- Test isPrime ---");
        int[] numbersToTest = {2, 7, 10, 17, 20};
        for (int i = 0; i < numbersToTest.length; i++) {
            int num = numbersToTest[i];
            System.out.println(num + " est premier : " + MathHelper.isPrime(num));
        }

        // Test factorial
        System.out.println("\n--- Test factorial ---");
        for (int i = 0; i <= 6; i++) {
            System.out.println(i + "! = " + MathHelper.factorial(i));
        }

        // Test sumDigits
        System.out.println("\n--- Test sumDigits ---");
        int[] digitTests = {123, 456, 789, 1000};
        for (int i = 0; i < digitTests.length; i++) {
            int num = digitTests[i];
            System.out.println("Somme des chiffres de " + num + " = " + MathHelper.sumDigits(num));
        }

        // Test isPalindrome
        System.out.println("\n--- Test isPalindrome ---");
        int[] palindromeTests = {121, 123, 1221, 12321};
        for (int i = 0; i < palindromeTests.length; i++) {
            int num = palindromeTests[i];
            System.out.println(num + " est palindrome : " + MathHelper.isPalindrome(num));
        }
    }
}
```

**Compilation et exécution :**

```bash
javac utils/MathHelper.java Main.java
java Main
```

</details>

<details>
<summary>Solution - Approche 2 : Algorithmes optimisés</summary>

**Fichier : `utils/MathHelper.java`**

```java
package utils;

public class MathHelper {

    public static boolean isPrime(int n) {
        if (n <= 1) {
            return false;
        }
        if (n == 2) {
            return true;
        }
        if (n % 2 == 0) {
            return false;
        }

        // On teste seulement jusqu'à la racine carrée
        int limit = (int) Math.sqrt(n);
        for (int i = 3; i <= limit; i = i + 2) {
            if (n % i == 0) {
                return false;
            }
        }

        return true;
    }

    public static long factorial(int n) {
        if (n < 0) {
            return -1;
        }
        if (n == 0 || n == 1) {
            return 1;
        }

        long result = 1;
        for (int i = 2; i <= n; i++) {
            result = result * i;
        }

        return result;
    }

    public static int sumDigits(int n) {
        int number = Math.abs(n);
        int sum = 0;

        while (number > 0) {
            sum = sum + (number % 10);
            number = number / 10;
        }

        return sum;
    }

    public static boolean isPalindrome(int n) {
        if (n < 0) {
            return false;
        }

        // Conversion en chaîne pour comparer
        String str = String.valueOf(n);
        int length = str.length();

        for (int i = 0; i < length / 2; i++) {
            if (str.charAt(i) != str.charAt(length - 1 - i)) {
                return false;
            }
        }

        return true;
    }
}
```

**Fichier : `Main.java`** (identique à l'approche 1)

Cette approche optimise les algorithmes :

- `isPrime()` : Teste uniquement jusqu'à la racine carrée et ignore les nombres
  pairs
- `factorial()` : Utilise `long` pour éviter les dépassements et gère les cas de
  base
- `sumDigits()` : Utilise `Math.abs()` pour simplifier le traitement des nombres
  négatifs
- `isPalindrome()` : Utilise une comparaison de chaînes, plus lisible

</details>

## Exercice 5 : Simulation de bibliothèque d'outils

Créez un programme qui simule une bibliothèque d'outils communautaire en
utilisant des tableaux et des fonctions statiques dans un package personnalisé.

Structure à créer :

```text
src/
├── utils/
│   └── ToolStats.java
└── Main.java
```

Le package `utils.ToolStats` doit contenir :

1. `countAvailable(int[] quantities)` : compte le nombre d'outils disponibles
2. `calculateUsageRate(int borrowed, int total)` : calcule le taux d'utilisation
   en pourcentage
3. `findMostBorrowed(int[] borrowed)` : trouve l'indice de l'outil le plus
   emprunté

Le programme principal doit :

1. Gérer un tableau de noms d'outils
2. Gérer un tableau de quantités disponibles
3. Gérer un tableau de quantités empruntées
4. Afficher des statistiques en utilisant les fonctions de `ToolStats`

<details>
<summary>Solution - Approche 1 : Affichage simple</summary>

**Fichier : `utils/ToolStats.java`**

```java
package utils;

public class ToolStats {

    public static int countAvailable(int[] quantities) {
        int count = 0;
        for (int i = 0; i < quantities.length; i++) {
            count = count + quantities[i];
        }
        return count;
    }

    public static double calculateUsageRate(int borrowed, int total) {
        if (total == 0) {
            return 0.0;
        }
        return (borrowed * 100.0) / total;
    }

    public static int findMostBorrowed(int[] borrowed) {
        if (borrowed.length == 0) {
            return -1;
        }

        int maxIndex = 0;
        int maxValue = borrowed[0];

        for (int i = 1; i < borrowed.length; i++) {
            if (borrowed[i] > maxValue) {
                maxValue = borrowed[i];
                maxIndex = i;
            }
        }

        return maxIndex;
    }
}
```

**Fichier : `Main.java`**

```java
import utils.ToolStats;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Bibliothèque d'outils communautaire ===\n");

        // Données de la bibliothèque
        String[] toolNames = {"Perceuse", "Scie circulaire", "Ponceuse", "Marteau", "Tournevis"};
        int[] available = {3, 2, 4, 5, 6};
        int[] borrowed = {2, 3, 1, 2, 1};

        // Affichage de l'inventaire
        System.out.println("--- Inventaire ---");
        for (int i = 0; i < toolNames.length; i++) {
            int total = available[i] + borrowed[i];
            double usageRate = ToolStats.calculateUsageRate(borrowed[i], total);
            System.out.println(toolNames[i] + " : " + available[i] + " disponible(s), " +
                             borrowed[i] + " emprunté(s), taux d'utilisation : " +
                             usageRate + "%");
        }

        // Statistiques globales
        System.out.println("\n--- Statistiques globales ---");
        int totalAvailable = ToolStats.countAvailable(available);
        int totalBorrowed = ToolStats.countAvailable(borrowed);
        System.out.println("Total disponible : " + totalAvailable + " outil(s)");
        System.out.println("Total emprunté : " + totalBorrowed + " outil(s)");

        // Outil le plus populaire
        int mostBorrowedIndex = ToolStats.findMostBorrowed(borrowed);
        System.out.println("\nOutil le plus emprunté : " + toolNames[mostBorrowedIndex] +
                         " (" + borrowed[mostBorrowedIndex] + " emprunt(s))");
    }
}
```

**Compilation et exécution :**

```bash
javac utils/ToolStats.java Main.java
java Main
```

</details>

<details>
<summary>Solution - Approche 2 : Avec fonctions d'affichage réutilisables</summary>

**Fichier : `utils/ToolStats.java`** (identique à l'approche 1)

**Fichier : `Main.java`**

```java
import utils.ToolStats;

public class Main {

    public static void displayInventory(String[] names, int[] available, int[] borrowed) {
        System.out.println("--- Inventaire ---");
        for (int i = 0; i < names.length; i++) {
            int total = available[i] + borrowed[i];
            double usageRate = ToolStats.calculateUsageRate(borrowed[i], total);

            String formattedRate = String.format("%.1f", usageRate);
            System.out.println(names[i] + " : " + available[i] + " disponible(s), " +
                             borrowed[i] + " emprunté(s), taux : " + formattedRate + "%");
        }
    }

    public static void displayGlobalStatistics(int[] available, int[] borrowed) {
        System.out.println("\n--- Statistiques globales ---");

        int totalAvailable = ToolStats.countAvailable(available);
        int totalBorrowed = ToolStats.countAvailable(borrowed);
        int grandTotal = totalAvailable + totalBorrowed;

        double globalUsageRate = ToolStats.calculateUsageRate(totalBorrowed, grandTotal);
        String formattedRate = String.format("%.1f", globalUsageRate);

        System.out.println("Total disponible : " + totalAvailable + " outil(s)");
        System.out.println("Total emprunté : " + totalBorrowed + " outil(s)");
        System.out.println("Taux d'utilisation global : " + formattedRate + "%");
    }

    public static void displayMostBorrowed(String[] names, int[] borrowed) {
        int mostBorrowedIndex = ToolStats.findMostBorrowed(borrowed);

        if (mostBorrowedIndex >= 0) {
            System.out.println("\n--- Outil le plus populaire ---");
            System.out.println(names[mostBorrowedIndex] + " : " +
                             borrowed[mostBorrowedIndex] + " emprunt(s)");
        }
    }
    public static void main(String[] args) {
        System.out.println("=== Bibliothèque d'outils communautaire ===\n");

        // Données de la bibliothèque
        String[] toolNames = {"Perceuse", "Scie circulaire", "Ponceuse", "Marteau", "Tournevis"};
        int[] available = {3, 2, 4, 5, 6};
        int[] borrowed = {2, 3, 1, 2, 1};

        displayInventory(toolNames, available, borrowed);
        displayGlobalStatistics(available, borrowed);
        displayMostBorrowed(toolNames, borrowed);
    }

}
```

Cette approche organise l'affichage en fonctions séparées, ce qui rend le code
plus modulaire et plus facile à maintenir.

</details>

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
