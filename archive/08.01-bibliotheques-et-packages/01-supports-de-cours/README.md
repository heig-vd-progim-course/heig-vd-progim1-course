# Bibliothèques et packages - Supports de cours

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
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Table des matières

- [Ressources annexes](#ressources-annexes)
- [Table des matières](#table-des-matières)
- [Objectifs](#objectifs)
- [Introduction aux packages](#introduction-aux-packages)
- [Les packages en Java](#les-packages-en-java)
  - [Qu'est-ce qu'un package ?](#quest-ce-quun-package-)
  - [Déclarer un package](#déclarer-un-package)
  - [Convention de nommage](#convention-de-nommage)
  - [Structure de dossiers](#structure-de-dossiers)
  - [Compiler et exécuter des programmes avec packages](#compiler-et-exécuter-des-programmes-avec-packages)
- [Importer des classes](#importer-des-classes)
  - [Import spécifique](#import-spécifique)
  - [Import avec wildcard](#import-avec-wildcard)
  - [Package java.lang](#package-javalang)
- [Bibliothèques standard de Java](#bibliothèques-standard-de-java)
  - [java.util - Utilitaires](#javautil---utilitaires)
  - [java.time - Date et heure](#javatime---date-et-heure)
  - [java.math - Mathématiques avancées](#javamath---mathématiques-avancées)
- [Exemple concret : Fonctions utilitaires pour une bibliothèque d'outils](#exemple-concret--fonctions-utilitaires-pour-une-bibliothèque-doutils)
- [Consulter la documentation Java](#consulter-la-documentation-java)
- [Conclusion](#conclusion)
- [Sources et liens utiles](#sources-et-liens-utiles)

## Objectifs

À l'issue de ce cours, la personne qui étudie sera capable de :

- Comprendre le concept de package en Java et son utilité.
- Organiser son code en packages de manière cohérente.
- Importer et utiliser des classes provenant d'autres packages.
- Utiliser les principales bibliothèques standard de Java (java.util, java.time,
  java.io).
- Créer des programmes modulaires et réutilisables.
- Consulter la documentation Java pour explorer de nouvelles classes et
  méthodes.

## Introduction aux packages

Jusqu'à présent, nous avons écrit tous nos programmes dans des classes simples,
sans organisation particulière. Cependant, lorsque les projets deviennent plus
complexes avec de nombreuses classes, il devient nécessaire de les organiser de
manière structurée.

Les packages en Java sont des conteneurs qui permettent de regrouper des classes
et des interfaces liées entre elles. Ils servent plusieurs objectifs :

- **Organisation** : Regrouper logiquement les classes par fonctionnalité.
- **Réutilisation** : Faciliter l'utilisation de code dans différents projets.
- **Éviter les conflits** : Prévenir les collisions de noms entre classes.
- **Contrôle d'accès** : Gérer la visibilité des classes et de leurs membres.

Imaginons une bibliothèque physique : les livres sont organisés par catégories
(romans, sciences, histoire, etc.). De la même manière, les packages organisent
les classes par thématiques.

## Les packages en Java

### Qu'est-ce qu'un package ?

Un package est un espace de noms qui organise un ensemble de classes et
d'interfaces liées. Java lui-même est organisé en packages :

- `java.lang` : Classes fondamentales (String, Math, System, etc.)
- `java.util` : Utilitaires (collections, dates, random, etc.)
- `java.io` : Entrées/sorties (lecture/écriture de fichiers)
- `java.time` : Gestion moderne des dates et heures
- `java.math` : Mathématiques de précision (BigInteger, BigDecimal)

### Déclarer un package

Pour placer une classe dans un package, on utilise l'instruction `package` en
première ligne du fichier (avant toute import ou déclaration de classe) :

```java
package models;

public class Student {
    private String name;
    private int age;

    // ... constructeurs et méthodes
}
```

Cette classe `Student` appartient maintenant au package `models`.

### Convention de nommage

Par convention, les noms de packages suivent ces règles :

- **Tout en minuscules** : `utils`, `models`, `controllers`
- **Pas de majuscules ni de tirets** : éviter `Utils` ou `my-package`
- **Structure hiérarchique** avec points : `com.example.project.models`
- **Nom de domaine inversé** pour éviter les conflits :
  `ch.heigvd.progim.models`

Exemples de noms de packages :

```java
package ch.heigvd.bank.models;
package ch.heigvd.bank.services;
package ch.heigvd.bank.utils;
```

### Structure de dossiers

Les packages correspondent à une structure de dossiers sur le disque. Par
exemple :

```text
src/
├── ch/
│   └── heigvd/
│       └── toolshare/
│           ├── models/
│           │   ├── Tool.java
│           │   └── Member.java
│           ├── services/
│           │   └── LoanService.java
│           └── utils/
│               └── DateFormatter.java
```

> [!IMPORTANT]
>
> Le package `ch.heigvd.toolshare.models` doit correspondre exactement au chemin
> de dossiers `src/ch/heigvd/toolshare/models/`. Une erreur dans cette
> correspondance empêchera la compilation.

### Compiler et exécuter des programmes avec packages

Pour compiler un programme qui utilise des packages, il faut compiler toutes les
classes en respectant la structure des packages.

**Structure simple (un seul niveau de package) :**

```text
projet/
├── Main.java
└── utils/
    ├── Calculator.java
    └── Formatter.java
```

**Compilation :**

```bash
javac utils/*.java Main.java
```

Cette commande compile d'abord toutes les classes du package `utils`, puis la
classe `Main` qui les utilise.

**Exécution :**

```bash
java Main
```

**Structure hiérarchique (plusieurs niveaux) :**

```text
src/
└── ch/
    └── heigvd/
        └── toolshare/
            ├── Main.java
            └── utils/
                └── Calculator.java
```

**Compilation depuis le dossier `src/` :**

```bash
javac ch/heigvd/toolshare/utils/*.java ch/heigvd/toolshare/Main.java
```

**Exécution depuis le dossier `src/` :**

```bash
java ch.heigvd.toolshare.Main
```

> [!IMPORTANT]
>
> Lors de l'exécution, utilisez le nom complet de la classe avec son package
> (points, pas de slashes) : `java ch.heigvd.toolshare.Main`

> [!TIP]
>
> Pour faciliter la compilation de projets complexes, vous pouvez compiler tous
> les fichiers Java d'un coup :
>
> ```bash
> javac **/*.java
> ```
>
> Cette commande compile récursivement tous les fichiers `.java` dans tous les
> sous-dossiers.

## Importer des classes

Pour utiliser une classe d'un autre package, nous devons l'importer avec
l'instruction `import`.

### Import spécifique

L'import spécifique indique exactement quelle classe nous voulons utiliser :

```java
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        // ...
    }
}
```

C'est l'approche recommandée car elle rend le code plus explicite.

### Import avec wildcard

Le wildcard `*` (qui signifie "tout") importe toutes les classes d'un package :

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        HashMap<String, Integer> ages = new HashMap<>();
        // ...
    }
}
```

Le symbole `*` est appelé "wildcard" (joker) : il remplace n'importe quel nom de
classe du package.

> [!WARNING]
>
> L'import avec `*` n'importe que les classes du package spécifié, pas les
> sous-packages. Par exemple, `import java.util.*` n'importe pas les classes de
> `java.util.stream`.

### Package java.lang

Le package `java.lang` est automatiquement importé dans tous les programmes
Java. Il contient les classes fondamentales :

- `String` : Chaînes de caractères
- `System` : Système (entrées/sorties, etc.)
- `Math` : Fonctions mathématiques
- `Integer`, `Double`, `Boolean` : Wrappers des types primitifs
- `Object` : Classe mère de toutes les classes

> [!NOTE]
>
> Les classes du package `java.lang` sont toujours disponibles sans import.
> C'est pourquoi vous n'avez jamais eu besoin d'importer `String` ou `Math` dans
> vos programmes.

## Bibliothèques standard de Java

Java propose une vaste bibliothèque standard appelée Java API (Application
Programming Interface). Explorons les packages les plus utiles.

### java.util - Utilitaires

Ce package contient des utilitaires essentiels :

**Scanner :**

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
String name = scanner.nextLine();
int age = scanner.nextInt();
```

**Random :**

```java
import java.util.Random;

Random random = new Random();
int dice = random.nextInt(6) + 1;  // 1 à 6
double percentage = random.nextDouble();  // Entre 0.0 et 1.0
```

**Arrays (déjà vu) :**

```java
import java.util.Arrays;

int[] numbers = {3, 1, 4, 1, 5};
Arrays.sort(numbers);
System.out.println(Arrays.toString(numbers));
```

> [!TIP]
>
> Pour aller plus loin, le package `java.util` contient également des structures
> de données avancées comme `ArrayList`, `HashMap`, et `HashSet`. Ces
> collections seront étudiées dans un cours ultérieur.

### java.time - Date et heure

Ce package moderne gère les dates et heures (introduit en Java 8) :

**LocalDate :**

```java
import java.time.LocalDate;

LocalDate today = LocalDate.now();
LocalDate birthDate = LocalDate.of(2000, 5, 15);

int age = today.getYear() - birthDate.getYear();
System.out.println("Âge : " + age);
```

**LocalTime :**

```java
import java.time.LocalTime;

LocalTime now = LocalTime.now();
LocalTime meeting = LocalTime.of(14, 30);  // 14h30

System.out.println("Heure actuelle : " + now);
System.out.println("Réunion à : " + meeting);
```

**LocalDateTime :**

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

LocalDateTime now = LocalDateTime.now();

DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
String formattedDate = now.format(formatter);

System.out.println("Date et heure : " + formattedDate);
```

**Period et Duration :**

```java
import java.time.LocalDate;
import java.time.Period;

LocalDate start = LocalDate.of(2020, 1, 1);
LocalDate end = LocalDate.of(2025, 11, 3);

Period period = Period.between(start, end);
System.out.println(period.getYears() + " ans, " +
                   period.getMonths() + " mois, " +
                   period.getDays() + " jours");
```

> [!TIP]
>
> Pour aller plus loin, le package `java.io` permet de lire et écrire des
> fichiers. Ces concepts seront abordés dans un cours ultérieur sur les
> entrées/sorties.

### java.math - Mathématiques avancées

Ce package fournit des classes pour des calculs de haute précision :

**BigInteger :**

```java
import java.math.BigInteger;

BigInteger a = new BigInteger("123456789012345678901234567890");
BigInteger b = new BigInteger("987654321098765432109876543210");

BigInteger sum = a.add(b);
BigInteger product = a.multiply(b);

System.out.println("Somme : " + sum);
System.out.println("Produit : " + product);
```

**BigDecimal :**

```java
import java.math.BigDecimal;

BigDecimal price = new BigDecimal("19.99");
BigDecimal quantity = new BigDecimal("3");

BigDecimal total = price.multiply(quantity);
System.out.println("Total : " + total + " CHF");
```

## Exemple concret : Fonctions utilitaires pour une bibliothèque d'outils

Pour illustrer l'utilisation des packages dans un contexte réel, imaginons des
fonctions utilitaires pour gérer une bibliothèque d'outils communautaire. Ce
type d'initiative permet aux membres d'une communauté d'emprunter des outils
plutôt que de les acheter individuellement, favorisant ainsi le partage des
ressources et réduisant la consommation.

> [!NOTE]
>
> Les bibliothèques d'outils communautaires sont des initiatives locales qui
> encouragent le partage et l'économie circulaire. Elles permettent de réduire
> la production d'objets neufs et de renforcer les liens sociaux.

Notre application pourrait être organisée avec les packages suivants :

```text
src/
├── utils/
│   ├── Calculator.java     // Calculs statistiques
│   ├── Formatter.java      // Formatage de l'affichage
│   └── ToolHelper.java     // Fonctions d'aide pour les outils
└── Main.java               // Point d'entrée du programme
```

**Exemple du package utils avec des fonctions statiques :**

```java
package utils;

/**
 * Fonctions utilitaires pour les calculs.
 */
public class Calculator {
    /**
     * Calcule la moyenne d'un tableau de nombres.
     */
    public static double average(double[] numbers) {
        if (numbers.length == 0) {
            return 0;
        }
        double sum = 0;
        for (double num : numbers) {
            sum += num;
        }
        return sum / numbers.length;
    }

    /**
     * Trouve la valeur maximale dans un tableau.
     */
    public static double max(double[] numbers) {
        if (numbers.length == 0) {
            return 0;
        }
        double maximum = numbers[0];
        for (double num : numbers) {
            if (num > maximum) {
                maximum = num;
            }
        }
        return maximum;
    }
}
```

```java
package utils;

/**
 * Fonctions utilitaires pour le formatage.
 */
public class Formatter {
    /**
     * Crée un titre formaté.
     */
    public static String formatTitle(String title) {
        return \"=== \" + title + \" ===\";
    }

    /**
     * Crée une ligne de séparation.
     */
    public static String createSeparator(int length) {
        String separator = \"\";
        for (int i = 0; i < length; i++) {
            separator += \"-\";
        }
        return separator;
    }
}
```

**Programme principal utilisant ces fonctions :**

```java
import utils.Calculator;
import utils.Formatter;

public class Main {
    public static void main(String[] args) {
        System.out.println(Formatter.formatTitle(\"Bibliothèque d'outils communautaire\"));
        System.out.println();

        // Durées d'emprunt moyennes par catégorie (en jours)
        double[] durations = {7.5, 14.0, 3.5, 21.0, 10.0};

        System.out.println(\"Durées d'emprunt enregistrées :\");
        for (int i = 0; i < durations.length; i++) {
            System.out.println(\"  Emprunt \" + (i + 1) + \" : \" + durations[i] + \" jours\");
        }

        System.out.println();
        System.out.println(Formatter.createSeparator(50));
        System.out.println();

        // Calculs statistiques
        double avgDuration = Calculator.average(durations);
        double maxDuration = Calculator.max(durations);

        System.out.println(\"Durée moyenne d'emprunt : \" + avgDuration + \" jours\");
        System.out.println(\"Durée maximale d'emprunt : \" + maxDuration + \" jours\");
    }
}
```

> [!IMPORTANT]
>
> Remarquez que nous utilisons les fonctions avec la syntaxe
> `Calculator.average()` et `Formatter.formatTitle()` sans utiliser le mot-clé
> `new`. Ce sont des **fonctions statiques** qui peuvent être appelées
> directement sur le nom de la classe.

> [!TIP]
>
> En organisant vos fonctions dans des packages, vous facilitez leur
> réutilisation. Par exemple, le package `utils` pourrait être utilisé dans
> d'autres projets nécessitant des calculs ou du formatage.

## Consulter la documentation Java

Pour explorer les packages et classes disponibles en Java, vous pouvez consulter
la documentation officielle Java API sur
<https://docs.oracle.com/javase/8/docs/api/> ou la plateforme moderne
[dev.java](https://dev.java/learn/packages/).

> [!IMPORTANT]
>
> La documentation Java est votre meilleure alliée pour découvrir de nouvelles
> classes et comprendre comment les utiliser. Prenez l'habitude de la consulter
> régulièrement.

La plateforme dev.java propose :

- **Tutoriels guidés** : Apprentissage progressif des concepts Java
- **Documentation des packages** : Description détaillée de chaque classe
- **Exemples de code** : Illustrations pratiques d'utilisation
- **API Reference** : Documentation technique complète

Pour trouver une classe spécifique :

1. Visitez <https://docs.oracle.com/javase/8/docs/api/>
2. Recherchez le package concerné (par exemple, `java.util`)
3. Consultez la liste des classes disponibles
4. Lisez la description, les constructeurs et les méthodes

Par exemple, pour en savoir plus sur `ArrayList` :

- Cherchez "ArrayList" dans la documentation
- Lisez la description générale de la classe
- Consultez les constructeurs disponibles
- Explorez les méthodes principales : `add()`, `get()`, `remove()`, `size()`,
  etc.

> [!TIP]
>
> Lorsque vous rencontrez une nouvelle classe dans un programme, consultez sa
> documentation pour comprendre son rôle et ses capacités. Cela développe votre
> autonomie en programmation.

## Conclusion

Les packages et bibliothèques sont essentiels pour écrire du code Java
professionnel et maintenable. Ils permettent :

- D'organiser le code de manière logique et structurée.
- De réutiliser du code existant (bibliothèques standard).
- D'éviter les conflits de noms entre classes.
- De faciliter la collaboration et le partage de code.

Points clés à retenir :

- Un package est déclaré avec `package` en début de fichier.
- Les fonctions d'autres packages sont importées avec `import`.
- Les fonctions statiques s'appellent avec `NomClasse.nomFonction()` sans
  utiliser `new`.
- Java fournit de nombreuses bibliothèques standard (`java.util`, `java.time`,
  `java.math`, etc.).
- La documentation sur dev.java est une ressource précieuse pour explorer l'API
  Java.
- Organiser ses fonctions en packages favorise la modularité et la
  réutilisation.

Dans les prochains cours, nous continuerons à utiliser ces bibliothèques pour
créer des programmes plus sophistiqués.

## Sources et liens utiles

- <https://dev.java/learn/packages/>
- <https://www.w3schools.com/java/java_packages.asp>

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
