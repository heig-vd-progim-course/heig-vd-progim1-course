---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de GitHub Copilot
title: "HEIG-VD ProgIM1 Course - Consolidation : Types, compilation et vocabulaire"
description: Consolidation des connaissances sur les types, la compilation et le vocabulaire technique pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/07.01-consolidation-types-compilation-vocabulaire/01-supports-de-cours/index.html
header: "**Consolidation : Types, compilation et vocabulaire**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Consolidation : Types, compilation et vocabulaire

<!--
_class: lead
_paginate: false
-->

Révision et approfondissement des bases

<small>

V. Guidoux, avec l'aide de [GitHub Copilot](https://github.com/features/copilot)

Ce travail est sous licence [CC BY-SA 4.0][license]

</small>

[Présentation (web)][presentation-web] · [Présentation (PDF)][presentation-pdf]

<!-- _class: lead -->

Retrouvez plus de détails dans le [support de cours][cours].

Consultez également les [exercices][exercices].

## Objectifs (1/3)

À la fin de cette séance, vous devriez être capable de :

- Nommer et utiliser les 8 types primitifs de Java
- Expliquer pourquoi les nombres à virgule flottante ont une précision limitée

![bg right:40%][illustration-objectifs]

## Objectifs (2/3)

À la fin de cette séance, vous devriez être capable de :

- Compiler et exécuter un programme Java en ligne de commande
- Passer des arguments à un programme via la ligne de commande

![bg right:40%][illustration-objectifs]

## Objectifs (3/3)

À la fin de cette séance, vous devriez être capable de :

- Expliquer le rôle minimal d'une classe en Java
- Utiliser le vocabulaire technique précis
- Comprendre le rôle d'un IDE et ses limites

![bg right:40%][illustration-objectifs]

## Les huit types primitifs de Java (1/3)

Java propose **8 types primitifs** répartis en 4 catégories :

**Types entiers** (4 types)

- `byte` : -128 à 127 (8 bits)
- `short` : -32 768 à 32 767 (16 bits)
- `int` : -2 147 483 648 à 2 147 483 647 (32 bits) ← **le plus courant**
- `long` : très grand nombre (64 bits) ← nécessite suffixe `L`

## Les huit types primitifs de Java (2/3)

**Types à virgule flottante** (2 types)

- `float` : précision simple (32 bits) ← nécessite suffixe `f`
- `double` : précision double (64 bits) ← **le plus courant**

**Type booléen** (1 type)

- `boolean` : `true` ou `false`

## Les huit types primitifs de Java (3/3)

**Type caractère** (1 type)

- `char` : un caractère Unicode (16 bits)

## Exemple : tous les types en action

```java
public class AllPrimitiveTypes {
    public static void main(String[] args) {
        // Types entiers
        byte age = 25;                    // Petit entier
        short year = 2025;                // Année
        int population = 1_000_000;       // Nombre moyen
        long distanceInMeters = 149_600_000_000L; // Très grand nombre

        // Types à virgule flottante
        float pi = 3.14f;                 // Précision simple
        double preciseValue = 3.14159265358979; // Précision double

        // Type booléen
        boolean isValid = true;

        // Type caractère
        char grade = 'A';
        char euro = '€';
    }
}
```

## Quand utiliser quel type ? (1/3)

**Pour les nombres entiers :**

- `int` : **par défaut** pour tous les entiers courants
- `long` : pour les très grandes valeurs (temps en millisecondes, identifiants)
- `byte` et `short` : rarement utilisés (optimisation mémoire dans certains cas)

## Quand utiliser quel type ? (2/3)

**Pour les nombres décimaux :**

- `double` : **par défaut** pour les calculs scientifiques et courants
- `float` : rarement utilisé (économie mémoire dans certains contextes)

**Pour les autres :**

- `boolean` : pour les conditions (true/false)
- `char` : pour un seul caractère (préférer `String` pour du texte)

## Quand utiliser quel type ? (3/3)

**Conseil** : Utilisez `int` et `double` dans 95% des cas !

## Pourquoi 0.1 + 0.2 ≠ 0.3 ?

```java
public class FloatingPointProblem {
    public static void main(String[] args) {
        double result = 0.1 + 0.2;
        System.out.println(result);         // Affiche : 0.30000000000000004
        System.out.println(result == 0.3);  // Affiche : false
    }
}
```

**Pourquoi ?** : Les nombres à virgule flottante sont stockés en **base 2**
(binaire), pas en base 10. Certains nombres décimaux simples en base 10
deviennent des nombres infinis en base 2 ! C'est comme essayer d'écrire 1/3 en
décimal : 0.333333... (infini)

## Standard IEEE 754

Les types `float` et `double` suivent la **norme IEEE 754** :

- `float` : 32 bits (1 signe + 8 exposant + 23 mantisse)
- `double` : 64 bits (1 signe + 11 exposant + 52 mantisse)

**Conséquence** : Précision limitée !

- `float` : environ 7 chiffres significatifs
- `double` : environ 15 chiffres significatifs

## Comparaison des nombres à virgule flottante

**Leçon importante** : Ne jamais comparer des `double` avec `==` !

```java
// ❌ MAUVAIS
if (result == 0.3) { ... }

// ✅ BON
double epsilon = 0.0001;
if (Math.abs(result - 0.3) < epsilon) { ... }
```

## Solution pour les calculs financiers (exactes)

```java
import java.math.BigDecimal;

public class PreciseCalculation {
    public static void main(String[] args) {
        BigDecimal a = new BigDecimal("0.1");
        BigDecimal b = new BigDecimal("0.2");
        BigDecimal result = a.add(b);

        System.out.println(result);         // Affiche : 0.3
        System.out.println(result.equals(new BigDecimal("0.3"))); // true
    }
}
```

---

**Note** : Nous verrons `BigDecimal` plus en détail dans un cours futur.

## Compilation et exécution : vue d'ensemble

Quand vous travaillez avec Java, **deux étapes** sont nécessaires :

**1. Compilation** : `javac` transforme le code source en bytecode

```text
Main.java  ──javac──>  Main.class
(lisible)              (bytecode)
```

**2. Exécution** : `java` exécute le bytecode via la JVM

```text
Main.class  ──java──>  Résultat
(bytecode)             (à l'écran)
```

## Compilation et exécution : résumé (1/2)

**Important** : Votre IDE (VS Code, IntelliJ) fait ces étapes automatiquement !

Mais comprendre ce qu'il fait "sous le capot" est essentiel.

## Compiler en ligne de commande

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Bonjour depuis la ligne de commande !");
    }
}
```

**Compilation** :

```bash
javac Hello.java
```

Cela crée un fichier `Hello.class` (bytecode).

## Compilation et exécution : résumé (2/2)

**Exécution** :

```bash
java Hello
```

Affiche : `Bonjour depuis la ligne de commande !`

## Passer des arguments au programme (1/2)

La méthode `main` reçoit un tableau `String[] args` :

```java
public class Greeting {
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("Bonjour, " + args[0] + " !");
        } else {
            System.out.println("Bonjour, inconnu !");
        }
    }
}
```

## Passer des arguments au programme (2/2)

**Compilation** :

```bash
javac Greeting.java
```

**Exécution avec arguments** :

```bash
java Greeting Ariel    # Affiche : Bonjour, Ariel !
java Greeting Nox      # Affiche : Bonjour, Nox !
java Greeting          # Affiche : Bonjour, inconnu !
```

## Pourquoi `String[] args` ? (1/2)

Le tableau `args` contient **tous les arguments** passés au programme :

```java
public class ShowArgs {
    public static void main(String[] args) {
        System.out.println("Nombre d'arguments : " + args.length);

        for (int i = 0; i < args.length; i++) {
            System.out.println("Argument " + i + " : " + args[i]);
        }
    }
}
```

## Pourquoi `String[] args` ? (2/2)

**Exécution** :

```bash
java ShowArgs un deux trois
```

**Résultat** :

```text
Nombre d'arguments : 3
Argument 0 : un
Argument 1 : deux
Argument 2 : trois
```

## Structure minimale d'un programme Java (1/2)

Pourquoi écrit-on toujours `public class Main` ?

```java
public class Main {
    public static void main(String[] args) {
        // Code ici
    }
}
```

## Structure minimale d'un programme Java (2/2)

- `public` : la classe est accessible depuis l'extérieur
- `class` : définition d'une classe (conteneur de code)
- `Main` : nom de la classe (**doit correspondre au nom du fichier** :
  `Main.java`)
- `main` : **point d'entrée** du programme (méthode spéciale que la JVM cherche)
- `String[] args` : arguments passés au programme

---

**Important** : Le fichier `Main.java` doit contenir une classe
`public class Main`.

## Qu'est-ce qu'une classe ? (1/2)

Une **classe** est un **conteneur** qui regroupe :

- Des **variables** (données)
- Des **méthodes** (fonctions)

Pour l'instant, nous utilisons des classes simples avec juste une méthode
`main`.

## Qu'est-ce qu'une classe ? (2/2)

```java
public class Calculator {
    public static void main(String[] args) {
        // Point d'entrée
    }

    public static int add(int a, int b) {
        return a + b;
    }
}
```

Plus tard, nous verrons la **programmation orientée objet** en profondeur.
Retenez que `class` = conteneur de code.

## Le rôle d'un IDE (1/2)

**IDE** = Integrated Development Environment (Environnement de Développement
Intégré). Exemples : **VS Code**, **IntelliJ IDEA**, **Eclipse**

- Coloration syntaxique
- Auto-complétion
- Détection d'erreurs en temps réel
- Compilation et exécution en un clic
- Débogage visuel

## Le rôle d'un IDE (2/2)

**Ce qu'un IDE ne fait PAS** :

- Inventer de la magie
- Remplacer la compréhension du code

**L'IDE est une interface vers vos fichiers**, rien de plus !

## IDE vs Ligne de commande (1/3)

**Avec IDE (VS Code)** :

1. Vous écrivez `Main.java`
2. Vous cliquez sur "Run"
3. L'IDE exécute en coulisses : `javac Main.java && java Main`
4. Le résultat s'affiche dans le terminal intégré

## IDE vs Ligne de commande (2/3)

**Sans IDE (ligne de commande)** :

1. Vous écrivez `Main.java` avec un éditeur de texte (Notepad, Vim, etc.)
2. Vous exécutez manuellement : `javac Main.java && java Main`
3. Le résultat s'affiche dans le terminal

## IDE vs Ligne de commande (3/3)

**Conclusion** : L'IDE facilite la vie, mais tout est possible sans !

Comprendre la ligne de commande vous rend **autonome**.

## Vocabulaire : Paramètre vs Argument (1/2)

**Paramètre** : variable dans la **définition** d'une fonction  
**Argument** : valeur passée lors de l'**appel** de la fonction

```java
public class Vocabulary {
    // 'name' est un PARAMÈTRE
    public static void greet(String name) {
        System.out.println("Bonjour, " + name);
    }

    public static void main(String[] args) {
        // "Ariel" est un ARGUMENT
        greet("Ariel");
    }
}
```

## Vocabulaire : Fonction vs Méthode (1/2)

**Fonction** : bloc de code réutilisable (terme général)

**Méthode** : fonction définie **à l'intérieur d'une classe** (terme Java)

En Java, **toutes les méthodes sont des fonctions, mais pas toutes les fonctions
sont des méthodes**. Comme tout le code Java est dans une classe, nos fonctions
sont toujours des méthodes.

```java
public class Example {
    // Ceci est une MÉTHODE (car dans une classe)
    public static void sayHello() {
        System.out.println("Hello");
    }
}
```

## Vocabulaire : Fonction vs Méthode (2/2)

**Usage courant** :

- On dit souvent "fonction" par habitude
- Mais techniquement en Java, c'est une "méthode"

Les deux termes sont acceptables dans ce cours !

## Vocabulaire : Déclaration vs Définition vs Appel (1/3)

**Déclaration** : annoncer l'existence d'une variable

```java
int age;  // Déclaration
```

**Définition** : donner une valeur initiale (ou fournir le corps d'une méthode)

```java
int age = 25;  // Déclaration + Définition
```

## Vocabulaire : Déclaration vs Définition vs Appel (2/3)

**Appel** : exécuter une méthode

```java
greet("Ariel");  // Appel de la méthode greet
```

## Vocabulaire : Déclaration vs Définition vs Appel (3/3)

**Pour les méthodes** :

```java
// Déclaration + Définition
public static void greet(String name) {
    System.out.println("Bonjour, " + name);
}

// Appel
greet("Nox");
```

## Vocabulaire : Instruction vs Expression (1/3)

**Instruction** : ligne de code qui **fait** quelque chose

```java
System.out.println("Hello");  // Instruction
int x = 5;                    // Instruction
```

## Vocabulaire : Instruction vs Expression (2/3)

**Expression** : morceau de code qui **produit une valeur**

```java
2 + 3           // Expression (vaut 5)
x * 2           // Expression
isValid && x > 0  // Expression
```

## Vocabulaire : Instruction vs Expression (3/3)

**Distinction** :

- Instruction : se termine par `;`
- Expression : peut être utilisée dans une instruction

```java
int result = 2 + 3;  // '2 + 3' est une expression
                     // 'int result = 2 + 3;' est une instruction
```

## À vous de jouer !

- Lisez le support de cours complet pour tous les détails théoriques

- Complétez les exercices pour renforcer votre compréhension

![bg right:40%][illustration-a-vous-de-jouer]

<!-- _class: lead -->

Des questions ?

## Sources

Les illustrations et images utilisées dans cette présentation proviennent de :

- [Unsplash](https://unsplash.com) - Photos libres de droits
- Illustration principale : Photo par
  [Clément Hélardot](https://unsplash.com/@clemhlrdt) sur
  [Unsplash](https://unsplash.com/photos/95YRwf6CNw8)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/07.01-consolidation-types-compilation-vocabulaire/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/07.01-consolidation-types-compilation-vocabulaire/01-supports-de-cours/07.01-consolidation-types-compilation-vocabulaire-presentation.pdf
[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/07.01-consolidation-types-compilation-vocabulaire/01-supports-de-cours
[exercices]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/07.01-consolidation-types-compilation-vocabulaire/03-exercices
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
