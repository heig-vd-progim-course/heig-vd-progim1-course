# Consolidation : Types, compilation et vocabulaire - Supports de cours

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/07.01-consolidation-types-compilation-vocabulaire/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/07.01-consolidation-types-compilation-vocabulaire/01-supports-de-cours/07.01-consolidation-types-compilation-vocabulaire-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Table des matières

- [Ressources annexes](#ressources-annexes)
- [Table des matières](#table-des-matières)
- [Introduction](#introduction)
- [Objectifs](#objectifs)
- [Types primitifs en Java](#types-primitifs-en-java)
  - [Les huit types primitifs](#les-huit-types-primitifs)
  - [Types entiers](#types-entiers)
  - [Types à virgule flottante](#types-à-virgule-flottante)
  - [Type booléen](#type-booléen)
  - [Type caractère](#type-caractère)
  - [Conversions entre types (casting)](#conversions-entre-types-casting)
  - [Résumé des types primitifs](#résumé-des-types-primitifs)
- [Précision des nombres à virgule flottante](#précision-des-nombres-à-virgule-flottante)
  - [Le standard IEEE 754](#le-standard-ieee-754)
  - [Pourquoi 0.1 + 0.2 ≠ 0.3](#pourquoi-01--02--03)
  - [Comparaison de nombres flottants](#comparaison-de-nombres-flottants)
  - [Alternatives pour les calculs précis](#alternatives-pour-les-calculs-précis)
- [Compilation et exécution en ligne de commande](#compilation-et-exécution-en-ligne-de-commande)
  - [Le processus de compilation](#le-processus-de-compilation)
  - [Le compilateur javac](#le-compilateur-javac)
  - [La JVM (Java Virtual Machine)](#la-jvm-java-virtual-machine)
  - [Arguments de la ligne de commande](#arguments-de-la-ligne-de-commande)
  - [Le tableau String\[\] args](#le-tableau-string-args)
- [Structure minimale d'un programme Java](#structure-minimale-dun-programme-java)
  - [Anatomie d'un programme Java](#anatomie-dun-programme-java)
  - [La classe comme conteneur](#la-classe-comme-conteneur)
  - [Règle de nommage fichier-classe](#règle-de-nommage-fichier-classe)
  - [La méthode main](#la-méthode-main)
  - [Préparer le terrain pour les packages](#préparer-le-terrain-pour-les-packages)
- [Vocabulaire technique précis](#vocabulaire-technique-précis)
  - [Paramètre vs Argument](#paramètre-vs-argument)
  - [Fonction vs Méthode](#fonction-vs-méthode)
  - [Déclaration vs Définition vs Appel](#déclaration-vs-définition-vs-appel)
  - [Variable vs Constante](#variable-vs-constante)
  - [Type vs Valeur](#type-vs-valeur)
  - [Compilation vs Exécution](#compilation-vs-exécution)
  - [Instruction vs Expression](#instruction-vs-expression)
- [Le rôle des IDE](#le-rôle-des-ide)
  - [Qu'est-ce qu'un IDE ?](#quest-ce-quun-ide-)
  - [Ce que fait un IDE](#ce-que-fait-un-ide)
  - [Ce que l'IDE ne fait PAS](#ce-que-lide-ne-fait-pas)
  - [L'IDE comme facilitateur](#lide-comme-facilitateur)
- [Exemples de code](#exemples-de-code)
- [Exercices](#exercices)
- [Conclusion](#conclusion)
  - [Ce que vous avez appris](#ce-que-vous-avez-appris)
  - [Testez vos connaissances](#testez-vos-connaissances)

## Introduction

Après avoir exploré les fondamentaux de Java (variables, fonctions,
entrées/sorties), il est temps de consolider ces connaissances et de combler
quelques lacunes théoriques importantes.

Ce chapitre ne présente pas de nouveaux concepts algorithmiques, mais
approfondit votre compréhension de Java en répondant à des questions
essentielles :

- Quels sont **tous** les types primitifs en Java (et pas seulement les 4 que
  nous avons vus) ?
- Pourquoi `0.1 + 0.2` ne donne-t-il pas exactement `0.3` ?
- Que se passe-t-il **vraiment** quand on compile et exécute un programme Java ?
- Pourquoi doit-on écrire `public class Main` ? Qu'est-ce qu'une classe au
  minimum ?
- Comment utiliser Java sans IDE, directement en ligne de commande ?
- Quelles sont les différences précises entre paramètre/argument,
  fonction/méthode, etc. ?

Ces connaissances vous permettront de mieux comprendre les erreurs, de déboguer
plus efficacement et de préparer le terrain pour les concepts plus avancés
(tableaux, bibliothèques, packages) que nous verrons dans les prochains
chapitres.

## Objectifs

À la fin de cette séance, vous devriez être capable de :

- Distinguer et utiliser tous les types primitifs de Java (byte, short, int,
  long, float, double, boolean, char) et comprendre leurs différences.
- Expliquer les limites de la représentation des nombres à virgule flottante et
  pourquoi 0.1 + 0.2 ≠ 0.3.
- Compiler et exécuter un programme Java en ligne de commande avec des arguments
  passés à la méthode `main`.
- Comprendre le rôle de `public class Main` et la structure minimale d'un
  programme Java.
- Différencier le vocabulaire technique : paramètre vs argument, fonction vs
  méthode, déclaration vs appel, définition vs utilisation.
- Expliquer le rôle d'un IDE (VS Code, IntelliJ) comme interface facilitant le
  travail avec les fichiers sources.
- Comprendre le processus de compilation : de `.java` à `.class` et l'exécution
  par la JVM.

## Types primitifs en Java

### Les huit types primitifs

Java possède **huit types primitifs**. Jusqu'à présent, nous en avons
principalement utilisé quatre : `int`, `double`, `boolean` et `char`. Il est
temps de découvrir les quatre autres et de comprendre quand utiliser chacun.

> [!NOTE]
>
> Les types primitifs sont les briques de base du langage. Contrairement aux
> objets, ils ne sont pas créés avec `new` et sont stockés directement en
> mémoire.

Voici la liste complète des 8 types primitifs, organisés par catégorie :

| Catégorie             | Type      | Taille  | Plage de valeurs                                       |
| --------------------- | --------- | ------- | ------------------------------------------------------ |
| **Entiers**           | `byte`    | 8 bits  | -128 à 127                                             |
|                       | `short`   | 16 bits | -32 768 à 32 767                                       |
|                       | `int`     | 32 bits | -2 147 483 648 à 2 147 483 647                         |
|                       | `long`    | 64 bits | -9 223 372 036 854 775 808 à 9 223 372 036 854 775 807 |
| **Virgule flottante** | `float`   | 32 bits | ±3.4 × 10³⁸ (environ 7 chiffres de précision)          |
|                       | `double`  | 64 bits | ±1.7 × 10³⁰⁸ (environ 15 chiffres de précision)        |
| **Booléen**           | `boolean` | 1 bit   | `true` ou `false`                                      |
| **Caractère**         | `char`    | 16 bits | 0 à 65 535 (caractères Unicode)                        |

### Types entiers

Les types entiers permettent de stocker des nombres entiers (sans virgule). Java
en propose quatre, de tailles différentes.

#### byte

Le type `byte` est le plus petit type entier. Il occupe **8 bits** (1 octet) en
mémoire.

```java
byte age = 25;
byte temperature = -10;
byte maxValue = 127;  // Valeur maximale
byte minValue = -128; // Valeur minimale
```

**Quand l'utiliser ?**

- Pour économiser de la mémoire quand on manipule de grandes quantités de
  données (tableaux, fichiers).
- Quand on sait que les valeurs seront toujours entre -128 et 127.

> [!WARNING]
>
> Si vous dépassez la plage de valeurs, vous obtiendrez un débordement
> (_overflow_) sans erreur de compilation !

```java
byte value = 127;
value = (byte) (value + 1); // Résultat : -128 (débordement)
```

#### short

Le type `short` occupe **16 bits** (2 octets) en mémoire.

```java
short population = 32000;
short altitude = -500;
short maxValue = 32767;  // Valeur maximale
short minValue = -32768; // Valeur minimale
```

**Quand l'utiliser ?**

- Rarement utilisé en pratique.
- Utile pour économiser de la mémoire avec des valeurs entre -32 768 et 32 767.

#### int

Le type `int` est **le type entier par défaut** en Java. Il occupe **32 bits**
(4 octets).

```java
int studentCount = 150;
int distance = -5000;
int maxValue = 2147483647;  // Valeur maximale
int minValue = -2147483648; // Valeur minimale
```

**Quand l'utiliser ?**

- Par défaut, pour tous les nombres entiers.
- C'est le type le plus utilisé pour les calculs entiers.

> [!TIP]
>
> Vous pouvez utiliser des underscores (`_`) pour rendre les grands nombres plus
> lisibles :
>
> ```java
> int population = 8_000_000; // 8 millions
> ```

#### long

Le type `long` occupe **64 bits** (8 octets). Il peut stocker des très grands
nombres.

```java
long worldPopulation = 8000000000L; // Noter le 'L' à la fin
long distanceToMoon = 384_400_000L;
long maxValue = 9223372036854775807L;  // Valeur maximale
long minValue = -9223372036854775808L; // Valeur minimale
```

> [!IMPORTANT]
>
> Pour les littéraux `long`, on ajoute un `L` (ou `l`, mais `L` est préféré pour
> éviter la confusion avec `1`) à la fin du nombre.

**Quand l'utiliser ?**

- Quand les valeurs dépassent la plage de `int`.
- Pour les timestamps (millisecondes depuis 1970), identifiants uniques, etc.

### Types à virgule flottante

Les types à virgule flottante permettent de représenter des nombres décimaux.

#### float

Le type `float` occupe **32 bits** (4 octets) et offre environ **7 chiffres de
précision**.

```java
float price = 19.99f; // Noter le 'f' à la fin
float pi = 3.14159f;
float temperature = -5.5f;
```

> [!IMPORTANT]
>
> Pour les littéraux `float`, on ajoute un `f` (ou `F`) à la fin du nombre.

**Quand l'utiliser ?**

- Rarement utilisé en pratique.
- Utile pour économiser de la mémoire avec de grands tableaux de nombres
  décimaux (graphisme 3D, par exemple).

#### double

Le type `double` est **le type décimal par défaut** en Java. Il occupe **64
bits** (8 octets) et offre environ **15 chiffres de précision**.

```java
double price = 19.99;  // Pas de suffixe nécessaire
double pi = 3.141592653589793;
double distance = 1.5e10; // Notation scientifique : 1.5 × 10¹⁰
```

**Quand l'utiliser ?**

- Par défaut, pour tous les nombres décimaux.
- Quand la précision est importante (calculs scientifiques, financiers avec
  précautions).

> [!WARNING]
>
> Les nombres à virgule flottante ont une précision limitée. Voir la section
> dédiée ci-dessous.

### Type booléen

Le type `boolean` ne peut avoir que deux valeurs : `true` ou `false`.

```java
boolean isValid = true;
boolean hasErrors = false;
boolean isGreater = (5 > 3); // true
```

**Taille en mémoire :** Théoriquement 1 bit, mais en pratique, la JVM utilise
souvent un octet pour des raisons d'efficacité.

**Quand l'utiliser ?**

- Pour les conditions, les drapeaux (_flags_), les états binaires.
- Résultat des opérateurs de comparaison (`==`, `!=`, `<`, `>`, `<=`, `>=`).

### Type caractère

Le type `char` représente un **caractère Unicode** unique. Il occupe **16 bits**
(2 octets).

```java
char letter = 'A';
char digit = '7';
char symbol = '€';
char newline = '\n'; // Caractère spécial
char unicode = '\u0041'; // 'A' en Unicode
```

> [!NOTE]
>
> Les littéraux `char` utilisent des guillemets simples (`'`), contrairement aux
> `String` qui utilisent des guillemets doubles (`"`).

**Caractères spéciaux (échappement) :**

| Séquence | Signification           |
| -------- | ----------------------- |
| `\n`     | Nouvelle ligne          |
| `\t`     | Tabulation              |
| `\\`     | Backslash               |
| `\'`     | Guillemet simple        |
| `\"`     | Guillemet double        |
| `\uXXXX` | Caractère Unicode (hex) |

### Conversions entre types (casting)

Java distingue deux types de conversions :

#### Conversion implicite (élargissement)

Une conversion **sans perte de données** se fait automatiquement.

```java
int a = 10;
double b = a; // Conversion implicite int → double (OK)
System.out.println(b); // 10.0
```

**Règle :** On peut toujours convertir vers un type "plus grand" : `byte` →
`short` → `int` → `long` → `float` → `double`

#### Conversion explicite (rétrécissement)

Une conversion **avec risque de perte de données** nécessite un _cast_
explicite.

```java
double pi = 3.14159;
int approxPi = (int) pi; // Cast explicite double → int
System.out.println(approxPi); // 3 (partie décimale perdue)
```

> [!CAUTION]
>
> Le cast explicite peut entraîner une perte de données ou un débordement.
> Utilisez-le consciemment !

```java
int big = 300;
byte small = (byte) big; // Résultat : 44 (débordement)
```

### Résumé des types primitifs

- Java possède **8 types primitifs** : 4 entiers, 2 décimaux, 1 booléen, 1
  caractère.
- Par défaut, utilisez `int` pour les entiers et `double` pour les décimaux.
- Utilisez `long` pour les très grands nombres, `byte`/`short` pour économiser
  de la mémoire.
- Les conversions implicites (élargissement) sont automatiques.
- Les conversions explicites (rétrécissement) nécessitent un cast et peuvent
  perdre des données.

## Précision des nombres à virgule flottante

### Le standard IEEE 754

Les types `float` et `double` suivent le standard **IEEE 754**, qui définit
comment représenter les nombres décimaux en binaire.

**Problème fondamental :** En binaire, certains nombres décimaux simples (comme
0.1) ne peuvent pas être représentés exactement, tout comme 1/3 ne peut pas être
écrit exactement en décimal (0.333...).

### Pourquoi 0.1 + 0.2 ≠ 0.3

Voici une démonstration surprenante :

```java
double a = 0.1;
double b = 0.2;
double sum = a + b;

System.out.println(sum);        // Affiche : 0.30000000000000004
System.out.println(sum == 0.3); // Affiche : false
```

**Explication :** En mémoire, `0.1` et `0.2` sont stockés comme des
approximations binaires. Leur somme donne une approximation légèrement
différente de `0.3`.

> [!WARNING] > **Ne jamais** comparer des `double` ou `float` avec `==` !

### Comparaison de nombres flottants

Pour comparer des nombres flottants, utilisez une **tolérance** (epsilon) :

```java
double a = 0.1 + 0.2;
double b = 0.3;
double epsilon = 0.00001; // Tolérance de 0.00001

if (Math.abs(a - b) < epsilon) {
    System.out.println("Les nombres sont égaux (à epsilon près)");
}
```

**Explication :** On considère deux nombres égaux si leur différence absolue est
inférieure à une valeur très petite (epsilon).

### Alternatives pour les calculs précis

Pour les calculs financiers ou nécessitant une précision exacte, utilisez la
classe `BigDecimal` :

```java
import java.math.BigDecimal;

BigDecimal a = new BigDecimal("0.1");
BigDecimal b = new BigDecimal("0.2");
BigDecimal sum = a.add(b);

System.out.println(sum); // Affiche : 0.3 (exact!)
```

> [!TIP]
>
> Utilisez `BigDecimal` pour les montants d'argent, les calculs comptables ou
> toute situation nécessitant une précision décimale exacte.

## Compilation et exécution en ligne de commande

### Le processus de compilation

Quand vous écrivez du code Java, plusieurs étapes se produisent avant que votre
programme ne s'exécute :

```text
Code source     Compilation      Bytecode        Exécution
(.java)     →   (javac)      →   (.class)    →   (JVM)
```

### Le compilateur javac

Le compilateur `javac` transforme votre code source Java (`.java`) en
**bytecode** (`.class`).

**Exemple :**

```java
// Fichier: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Compilation :**

```bash
javac HelloWorld.java
```

Cette commande crée un fichier `HelloWorld.class` contenant le bytecode.

> [!NOTE]
>
> Le bytecode est un langage intermédiaire, ni du code source Java ni du code
> machine natif. C'est ce qui permet au Java d'être portable.

### La JVM (Java Virtual Machine)

La **JVM** (Java Virtual Machine) exécute le bytecode. C'est un programme qui
lit les fichiers `.class` et les exécute.

**Exécution :**

```bash
java HelloWorld
```

> [!IMPORTANT]
>
> On écrit `java HelloWorld` (pas `java HelloWorld.class`). La JVM cherche
> automatiquement le fichier `.class`.

**Pourquoi deux étapes ?**

1. **Portabilité** : Le bytecode (`.class`) fonctionne sur n'importe quelle
   plateforme ayant une JVM.
2. **Sécurité** : La JVM vérifie le bytecode avant de l'exécuter.
3. **Optimisation** : La JVM peut optimiser le code pendant l'exécution
   (_Just-In-Time compilation_).

```text
Développement → .java → javac → .class → JVM (Windows/Linux/Mac/...)
```

### Arguments de la ligne de commande

On peut passer des **arguments** à un programme Java lors de son exécution :

```bash
java HelloWorld Ariel Nox Amaru
```

Ces arguments sont accessibles via le tableau `String[] args` dans la méthode
`main`.

### Le tableau String[] args

Le paramètre `String[] args` de la méthode `main` contient les arguments passés
en ligne de commande.

**Exemple :**

```java
public class Greeting {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Aucun argument fourni.");
        } else {
            System.out.println("Bonjour " + args[0] + " !");
        }
    }
}
```

**Compilation et exécution :**

```bash
javac Greeting.java
java Greeting Ariel
```

**Sortie :**

```text
Bonjour Ariel !
```

> [!TIP] > `args.length` donne le nombre d'arguments. `args[0]` est le premier
> argument, `args[1]` le deuxième, etc.

**Exemple avec plusieurs arguments :**

```java
public class Calculator {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Usage: java Calculator <number1> <number2>");
            return;
        }

        int a = Integer.parseInt(args[0]);
        int b = Integer.parseInt(args[1]);

        System.out.println("Somme: " + (a + b));
    }
}
```

```bash
javac Calculator.java
java Calculator 10 20
```

**Sortie :**

```text
Somme: 30
```

## Structure minimale d'un programme Java

### Anatomie d'un programme Java

Jusqu'à présent, vous avez écrit des programmes qui commencent par :

```java
public class Main {
    public static void main(String[] args) {
        // Votre code ici
    }
}
```

Décomposons chaque élément :

```java
public class Main {              // 1. Déclaration de la classe
    public static void main(String[] args) {  // 2. Méthode main
        // 3. Instructions
    }
}
```

### La classe comme conteneur

En Java, **tout le code doit être dans une classe**. C'est une règle
fondamentale du langage.

Pour l'instant, considérez une classe comme un **conteneur** pour votre code.
Nous n'allons pas entrer dans les détails de la programmation orientée objet,
mais retenez :

- Une classe est définie avec le mot-clé `class`.
- Le mot-clé `public` signifie que la classe est accessible de partout.
- Le nom de la classe doit commencer par une majuscule (convention).

> [!NOTE]
>
> Une classe est un "moule" ou un "plan" qui contient des données et des
> comportements. Pour l'instant, nous l'utilisons simplement comme conteneur
> obligatoire.

### Règle de nommage fichier-classe

**Règle stricte :** Le nom du fichier `.java` **doit correspondre exactement**
au nom de la classe publique.

```java
// Fichier: Calculator.java
public class Calculator {
    public static void main(String[] args) {
        // ...
    }
}
```

> [!CAUTION]
>
> Si le fichier s'appelle `Calculator.java`, la classe doit s'appeler
> `Calculator`. Sinon, vous aurez une erreur de compilation.

### La méthode main

La méthode `main` est le **point d'entrée** du programme. C'est là que
l'exécution commence.

```java
public static void main(String[] args) {
    // Votre code s'exécute ici
}
```

**Décortiquons la signature :**

- `public` : La méthode est accessible de partout (la JVM doit pouvoir
  l'appeler).
- `static` : La méthode appartient à la classe, pas à une instance (pas besoin
  de créer un objet).
- `void` : La méthode ne retourne rien.
- `main` : Nom obligatoire reconnu par la JVM.
- `String[] args` : Tableau des arguments de la ligne de commande.

> [!IMPORTANT]
>
> La signature de la méthode `main` est **stricte**. Si vous changez un élément,
> la JVM ne la reconnaîtra pas comme point d'entrée.

### Préparer le terrain pour les packages

Dans les prochains chapitres, nous verrons les **packages**, qui permettent
d'organiser les classes dans des dossiers logiques.

Pour l'instant, retenez qu'une classe peut appartenir à un package :

```java
package com.example.myapp;

public class Calculator {
    // ...
}
```

Les packages évitent les conflits de noms et organisent le code de façon
modulaire.

## Vocabulaire technique précis

Utiliser le bon vocabulaire est essentiel pour communiquer efficacement et
comprendre la documentation.

### Paramètre vs Argument

**Paramètre** : Variable déclarée dans la signature d'une fonction/méthode.

**Argument** : Valeur concrète passée lors de l'appel de la fonction/méthode.

```java
public static int add(int a, int b) {  // a et b sont des PARAMÈTRES
    return a + b;
}

public static void main(String[] args) {
    int result = add(5, 3);  // 5 et 3 sont des ARGUMENTS
}
```

> [!TIP]
>
> Mnémotechnique : **P**aramètre = **P**laceholder (emplacement), **A**rgument =
> **A**ctual value (valeur réelle).

### Fonction vs Méthode

**Fonction** : Bloc de code autonome qui effectue une tâche.

**Méthode** : Fonction qui appartient à une classe (en programmation orientée
objet).

En Java, **toutes les méthodes sont des fonctions, mais pas toutes les fonctions
sont des méthodes**. Comme tout le code Java est dans des classes, nos fonctions
sont toujours des méthodes.

```java
public class MathUtils {
    // Ceci est une MÉTHODE (fonction dans une classe)
    public static int square(int n) {
        return n * n;
    }
}
```

> [!NOTE]
>
> On dira souvent "fonction" par habitude, mais techniquement, en Java, ce sont
> des méthodes.

### Déclaration vs Définition vs Appel

**Déclaration** : Annoncer l'existence d'une variable ou d'une méthode.

**Définition** : Fournir le code complet (corps de la méthode, valeur de la
variable).

**Appel** : Exécuter la méthode.

```java
// Déclaration ET définition d'une méthode
public static int multiply(int a, int b) {
    return a * b;
}

public static void main(String[] args) {
    int x;              // Déclaration de variable
    x = 10;             // Définition (affectation de valeur)

    int result = multiply(5, 3);  // Appel de méthode
}
```

### Variable vs Constante

**Variable** : Emplacement en mémoire dont la valeur peut changer.

**Constante** : Emplacement en mémoire dont la valeur ne peut **pas** changer
après initialisation.

```java
int age = 25;              // Variable
age = 26;                  // OK, on peut modifier

final double PI = 3.14159; // Constante (final)
// PI = 3.14;              // ERREUR de compilation
```

> [!IMPORTANT]
>
> En Java, on utilise le mot-clé `final` pour déclarer une constante.

### Type vs Valeur

**Type** : Catégorie de données (int, double, String, etc.).

**Valeur** : Donnée concrète stockée dans une variable.

```java
int age = 25;
//  ^    ^
// Type  Valeur
```

Le type détermine :

- La taille en mémoire.
- Les opérations possibles.
- La plage de valeurs autorisées.

### Compilation vs Exécution

**Compilation** : Transformation du code source (`.java`) en bytecode
(`.class`).

**Exécution** : Lancement du programme par la JVM.

```text
Compilation (javac)  →  Vérification syntaxique, génération .class
Exécution (java)     →  Lancement du programme
```

**Erreurs de compilation** : Erreurs de syntaxe, types incompatibles, etc.

**Erreurs d'exécution** : Division par zéro, débordement, fichier introuvable,
etc.

### Instruction vs Expression

**Expression** : Combinaison de valeurs, variables et opérateurs qui produit une
valeur.

**Instruction** : Commande complète qui effectue une action.

```java
int x = 5 + 3;
//      ^^^^^ Expression (produit la valeur 8)
// ^^^^^^^^^^^^ Instruction complète (affecte 8 à x)

System.out.println(x * 2);
//                 ^^^^^ Expression
// ^^^^^^^^^^^^^^^^^^^^^^^^ Instruction
```

> [!NOTE]
>
> Une instruction se termine souvent par un point-virgule (`;`).

## Le rôle des IDE

### Qu'est-ce qu'un IDE ?

Un **IDE** (Integrated Development Environment) est un logiciel qui facilite le
développement. Exemples : VS Code, IntelliJ IDEA, Eclipse, NetBeans.

Un IDE combine plusieurs outils :

- Éditeur de texte avec coloration syntaxique.
- Compilateur intégré.
- Débogueur.
- Gestionnaire de projets.
- Auto-complétion.

### Ce que fait un IDE

1. **Coloration syntaxique** : Différencie les mots-clés, variables,
   commentaires.
2. **Auto-complétion** : Suggère du code pendant la frappe.
3. **Détection d'erreurs en temps réel** : Souligne les erreurs avant la
   compilation.
4. **Refactoring** : Renomme des variables dans tout le projet automatiquement.
5. **Débogage** : Place des points d'arrêt, inspecte les variables.
6. **Intégration de Git** : Gère les commits, branches, etc.

### Ce que l'IDE ne fait PAS

> [!WARNING]
>
> L'IDE ne "fait pas tourner" votre code. C'est toujours `javac` et `java` qui
> travaillent en arrière-plan !

Un IDE est une **interface graphique** vers les outils en ligne de commande :

- Quand vous cliquez sur "Run", l'IDE exécute `javac` puis `java`.
- Quand vous cliquez sur "Debug", l'IDE lance `java` avec des options spéciales.
- L'IDE ne compile pas votre code lui-même, il appelle `javac`.

**Tout ce qu'un IDE fait peut être fait en ligne de commande.**

### L'IDE comme facilitateur

L'IDE est un **outil de productivité**, pas une béquille.

**Avantages :**

- Gain de temps (pas besoin de taper les commandes).
- Moins d'erreurs de frappe.
- Navigation rapide dans le code.

**Inconvénients :**

- Peut masquer ce qui se passe réellement.
- Rend dépendant de l'outil.
- Peut être lent sur de gros projets.

> [!TIP]
>
> Apprenez à compiler et exécuter en ligne de commande. Cela vous permet de :
>
> - Comprendre vraiment ce qui se passe.
> - Travailler sur des serveurs sans interface graphique.
> - Résoudre des problèmes que l'IDE ne peut pas gérer.

## Exemples de code

Nous vous invitons maintenant à explorer les exemples de code pour voir
concrètement :

- Les 8 types primitifs en action.
- Le problème de précision des virgules flottantes.
- L'utilisation des arguments de ligne de commande.
- La structure minimale d'un programme Java.

Vous trouverez les exemples de code ici :
[Lien vers le contenu](../02-exemples-de-code/).

## Exercices

Nous vous invitons également à réaliser les exercices de cette session pour
renforcer votre compréhension.

Vous trouverez les détails des exercices ici :
[Lien vers le contenu](../03-exercices/README.md).

## Conclusion

### Ce que vous avez appris

Dans ce chapitre, vous avez consolidé et élargi vos connaissances sur Java :

- Les **8 types primitifs** et leurs cas d'usage.
- Les limites de **précision des nombres flottants** (IEEE 754).
- Le **processus de compilation et d'exécution** (`javac` et `java`).
- L'utilisation des **arguments de ligne de commande**.
- La **structure minimale** d'un programme Java (classe et méthode main).
- Le **vocabulaire technique** précis (paramètre/argument, fonction/méthode,
  etc.).
- Le **rôle d'un IDE** et ses limites.

Ces connaissances sont essentielles pour comprendre les messages d'erreur,
déboguer efficacement et aborder les concepts plus avancés (tableaux, packages,
bibliothèques) des prochains chapitres.

### Testez vos connaissances

À ce stade, vous devriez pouvoir répondre aux questions suivantes :

- Quels sont les 8 types primitifs de Java ?
- Pourquoi `0.1 + 0.2` ne donne-t-il pas exactement `0.3` ?
- Que fait la commande `javac` ? Et la commande `java` ?
- Comment passer des arguments à un programme Java ?
- Quelle est la différence entre un paramètre et un argument ?
- Pourquoi le fichier `.java` doit-il avoir le même nom que la classe publique ?
- Qu'est-ce qu'un IDE et que fait-il réellement ?

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
