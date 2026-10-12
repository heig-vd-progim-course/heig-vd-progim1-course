---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM1 Course - Bibliothèques et packages
description: Cours sur les bibliothèques et packages pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.01-bibliotheques-et-packages/01-supports-de-cours/index.html
header: "**Bibliothèques et packages**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Bibliothèques et packages

<!--
_class: lead
_paginate: false
-->

<https://github.com/heig-vd-progim-course/heig-vd-progim1-course>

[Support de cours][cours] · [Présentation (web)][presentation-web] ·
[Présentation (PDF)][presentation-pdf]

<small>V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).</small>

<small>Ce travail est sous licence [CC BY-SA 4.0][license].</small>

![bg brightness:2 opacity:0.2][illustration-principale]

## _Retrouvez plus de détails dans le support de cours_

<!-- _class: lead -->

_Cette présentation est un résumé du support de cours. Pour plus de détails,
consultez le [support de cours][cours]._

## Objectifs (1/2)

À la fin de cette séance, vous devriez être capable de :

- Comprendre le concept de package et son utilité.
- Organiser son code en packages.
- Importer et utiliser des classes d'autres packages.

![bg right:40%][illustration-objectifs]

## Objectifs (2/2)

À la fin de cette séance, vous devriez être capable de :

- Utiliser les bibliothèques standard Java (java.util, java.time, java.io).
- Créer des packages personnalisés avec des fonctions utilitaires.
- Consulter la documentation Java pour explorer de nouvelles classes.

![bg right:40%][illustration-objectifs]

## Pourquoi les packages ?

Les packages organisent le code comme les dossiers organisent les fichiers. Avec
quelques avantages :

- **Organisation** : Regrouper les classes par fonctionnalité
- **Réutilisation** : Faciliter l'utilisation dans d'autres projets
- **Éviter les conflits** : Deux classes peuvent avoir le même nom si elles sont
  dans des packages différents
- **Contrôle d'accès** : Gérer la visibilité

**Analogie :** Une bibliothèque avec des livres classés par thème.

## Déclarer un package (1/2)

Le package est déclaré en première ligne du fichier :

```java
package models;

public class Student {
    // ... méthodes
}
```

## Déclarer un package (2/2)

**Convention de nommage :**

- Tout en minuscules : `models`, `utils`, `services`
- Structure hiérarchique : `ch.heigvd.project.models`
- Nom de domaine inversé : `ch.heigvd.bank.models`

## Structure de dossiers

Les packages correspondent à une structure de dossiers :

```text
src/
├── ch/
│   └── heigvd/
│       └── toolshare/
│           ├── models/
│           │   ├── Tool.java
│           ... └── Member.java
```

Le package `ch.heigvd.toolshare.models` correspond au dossier
`src/ch/heigvd/toolshare/models/`.

## Compiler et exécuter (1/2)

**Structure simple :**

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
java Main
```

## Compiler et exécuter (2/2)

**Structure hiérarchique :**

```bash
# Compilation depuis src/
javac ch/heigvd/toolshare/utils/*.java ch/heigvd/toolshare/Main.java

# Exécution avec le nom complet (points, pas slashes)
java ch.heigvd.toolshare.Main
```

**Astuce :** `javac **/*.java` compile tous les fichiers récursivement.

## Importer des classes

Pour utiliser une classe d'un autre package, il faut l'importer :

**Import spécifique (recommandé) :**

```java
import java.util.ArrayList;
import java.util.Scanner;
```

**Import avec wildcard (`*` = "tout") :**

```java
import java.util.*;  // Importe toutes les classes de java.util
```

Le symbole `*` (wildcard) signifie "tout" : ici, toutes les classes du package.

## Package java.lang

Le package `java.lang` est automatiquement importé. Il contient :

- `String` : Chaînes de caractères
- `System` : Système (entrées/sorties)
- `Math` : Fonctions mathématiques
- `Integer`, `Double`, `Boolean` : Wrappers
- `Object` : Classe mère de toutes les classes

**Pas besoin de les importer !**

## Bibliothèque java.util (1/2)

Package d'utilitaires essentiels :

**Scanner :**

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);

String name = scanner.nextLine();
int age = scanner.nextInt();
```

## Bibliothèque java.util (2/2)

**Random :**

```java
import java.util.Random;

Random random = new Random();
int dice = random.nextInt(6) + 1;
```

`+ 1` pour obtenir un nombre entre 1 et 6. Sans cela, on obtient un nombre entre
0 et 5.

## Bibliothèque java.time (1/4)

Gestion moderne des dates et heures (Java 8+) :

**LocalDate :**

```java
import java.time.LocalDate;

LocalDate today = LocalDate.now();
LocalDate birthDate = LocalDate.of(2000, 5, 15);

int age = today.getYear() - birthDate.getYear();
```

## Bibliothèque java.time (2/4)

**LocalTime :**

```java
import java.time.LocalTime;

LocalTime now = LocalTime.now();
LocalTime meeting = LocalTime.of(14, 30);  // 14h30
```

## Bibliothèque java.time (3/4)

**LocalDateTime :**

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

LocalDateTime now = LocalDateTime.now();

DateTimeFormatter formatter =
    DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
String formattedDate = now.format(formatter);
```

## Bibliothèque java.time (4/4)

**Period :**

```java
import java.time.Period;

Period period = Period.between(start, end);
System.out.println(period.getYears() + " ans");
```

## Bibliothèque java.math (1/2)

Calculs de haute précision :

**BigInteger (entiers très grands) :**

```java
import java.math.BigInteger;

BigInteger a = new BigInteger("123456789012345678901234567890");
BigInteger b = new BigInteger("987654321098765432109876543210");

BigInteger sum = a.add(b);
```

## Bibliothèque java.math (2/2)

**BigDecimal (décimaux précis) :**

```java
import java.math.BigDecimal;

BigDecimal price = new BigDecimal("19.99");
BigDecimal quantity = new BigDecimal("3");
BigDecimal total = price.multiply(quantity);
```

## Exemple : Packages personnalisés (1/3)

**Création d'un package utilitaire :**

Structure du projet :

```text
03-packages-personnalises/
├── Main.java
└── utils/
    ├── Calculator.java
    └── Formatter.java
```

Organisation simple et claire !

## Exemple : Packages personnalisés (2/3)

```java
// utils/Calculator.java
package utils;

public class Calculator {
    public static double average(double[] values) {
        if (values.length == 0) return 0;
        double sum = 0;
        for (double value : values) {
            sum += value;
        }
        return sum / values.length;
    }
    public static double max(double[] values) { /* ... */ }
    public static double min(double[] values) { /* ... */ }
}
```

## Exemple : Packages personnalisés (3/3)

```java
// Main.java
import utils.Calculator;
import utils.Formatter;

public class Main {
    public static void main(String[] args) {
        double[] data = {7.0, 14.0, 3.5, 21.0};

        double avg = Calculator.average(data);
        System.out.println("Moyenne : " + avg);
}   }
```

Voir l'exemple dans `02-exemples-de-code/03-packages-personnalises/`

## Documentation Java

**Consulter la documentation :**

Documentation officielle Java API : <https://docs.oracle.com/javase/8/docs/api/>

**Utilisation :**

1. Rechercher le package (ex: `java.util`)
2. Explorer les classes disponibles (ex: `ArrayList`)
3. Lire la description, constructeurs et méthodes
4. Consulter les exemples de code

**Développe votre autonomie en programmation !**

## À vous de jouer !

- Relire le support de cours.
- Explorer les exemples de code.
- Faire les exercices.
- Consulter dev.java pour découvrir de nouvelles classes.
- Poser des questions si nécessaire.

**La programmation s'apprend par la pratique !**

![bg right:40%][illustration-a-vous-de-jouer]

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

## Sources

- [Illustration objectifs][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/j6brni7fpvs)
- [Illustration conclusion][illustration-conclusion] par
  [Susan Q Yin](https://unsplash.com/@syinq) sur
  [Unsplash](https://unsplash.com/photos/2JIvboGLeho)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Nikita Kachanovsky](https://unsplash.com/@nkachanovskyyy) sur
  [Unsplash](https://unsplash.com/photos/FJFPuE1MAOM)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.01-bibliotheques-et-packages/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.01-bibliotheques-et-packages/01-supports-de-cours/08.01-bibliotheques-et-packages-presentation.pdf
[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/08.01-bibliotheques-et-packages/01-supports-de-cours
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]:
	https://images.unsplash.com/photo-1507842217343-583bb7270b66?fit=crop&h=720
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-conclusion]:
	https://images.unsplash.com/photo-1481627834876-b7833e8f5570?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
