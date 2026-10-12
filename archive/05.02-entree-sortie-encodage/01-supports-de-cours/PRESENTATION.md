---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux & L. Delafontaine, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM1 Course - Entrée, sortie et encodage
description: Cours sur l'entrée, la sortie et l'encodage pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.02-entree-sortie-encodage/01-supports-de-cours/index.html
header: "**Entrée, sortie et encodage**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 6
math: mathjax
-->

# Entrée, sortie et encodage

<!--
_class: lead
_paginate: false
-->

<https://github.com/heig-vd-progim-course/heig-vd-progim1-course>

[Support de cours][cours] · [Présentation (web)][presentation-web] ·
[Présentation (PDF)][presentation-pdf]

<small>V. Guidoux & L. Delafontaine, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).</small>

<small>Ce travail est sous licence [CC BY-SA 4.0][license].</small>

![bg brightness:2 opacity:0.2][illustration-principale]

## _Retrouvez plus de détails dans le support de cours_

<!-- _class: lead -->

_Cette présentation est un résumé du support de cours. Pour plus de détails,
consultez le [support de cours][cours]._

## Objectifs (1/2)

À la fin de cette séance, vous devriez être capable de :

- Afficher du texte dans le terminal avec `System.out`
- Lire des données saisies par l'utilisatrice avec `Scanner`

![bg right:40%][illustration-objectifs]

## Objectifs (2/2)

À la fin de cette séance, vous devriez être capable de :

- Comprendre ce qu'est l'encodage des caractères (ASCII, UTF-8)
- Créer des programmes interactifs simples

![bg right:40%][illustration-objectifs]

## Qu'est-ce que l'entrée et la sortie ?

- **Sortie** : votre programme "parle" (affiche du texte)
- **Entrée** : votre programme "écoute" (lit ce que vous tapez)

Le terminal est comme une fenêtre de conversation entre vous et votre programme.

![bg right:40%][illustration-conversation]

## Afficher du texte

Deux façons d'afficher du texte :

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Bonjour");
        System.out.print(" le monde !");
        // Affiche : Bonjour le monde !
    }
}
```

`System.out.print()` : affiche sans aller à la ligne.

![bg right:40%][illustration-print]

## Afficher avec retour à la ligne

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour");
        System.out.println("le monde !");
        // Affiche :
        // Bonjour
        // le monde !
    }
}
```

`System.out.println()` : affiche et va à la ligne (`ln` = line).

![bg right:40%][illustration-println]

## Afficher plusieurs valeurs

```java
public class Main {
    public static void main(String[] args) {
        String name = "Ariel";
        int age = 25;

        System.out.println("Je m'appelle " + name +
                          " et j'ai " + age + " ans.");
        // Affiche : Je m'appelle Ariel et j'ai 25 ans.
    }
}
```

L'opérateur `+` combine du texte et des nombres.

## Lire des données avec Scanner

Pour "écouter" l'utilisatrice, on utilise `Scanner` :

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Votre code ici

        scanner.close();
    }
}
```

## Lire une ligne de texte

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Comment vous appelez-vous ? ");
        String name = scanner.nextLine();

        System.out.println("Bonjour " + name + " !");

        scanner.close();
    }
}
```

## Lire un nombre

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Quel âge avez-vous ? ");
        int age = scanner.nextInt();

        System.out.println("Vous avez " + age + " ans.");

        scanner.close();
    }
}
```

![bg right:40%][illustration-nextint]

## Méthodes du Scanner

| Méthode         | Type      | Description                 |
| --------------- | --------- | --------------------------- |
| `nextLine()`    | `String`  | Lit une ligne complète      |
| `next()`        | `String`  | Lit un mot                  |
| `nextInt()`     | `int`     | Lit un nombre entier        |
| `nextDouble()`  | `double`  | Lit un nombre décimal       |
| `nextBoolean()` | `boolean` | Lit un booléen (true/false) |

## Encodage des caractères

L'ordinateur ne comprend que des nombres (0 et 1). L'encodage transforme les
lettres en nombres :

- `A` → 65
- `a` → 97
- `é` → ?

Comment représenter tous les caractères du monde ?

## ASCII : l'ancêtre

ASCII = 128 caractères :

- Lettres A-Z, a-z
- Chiffres 0-9
- Ponctuation
- Caractères spéciaux

Créé en 1963 pour l'anglais uniquement. Ne peut pas représenter `é`, `à`, `ñ`,
etc.

![bg right:40%][illustration-ascii]

## Unicode et UTF-8

**Unicode** : tous les caractères de toutes les langues + emojis.

**UTF-8** : façon la plus courante d'encoder Unicode.

- Compatible avec ASCII
- Utilise 1 à 4 octets par caractère
- Standard actuel sur Internet

![bg right:40%][illustration-utf8]

## UTF-8 en détail

- 1 octet :
  - caractères ASCII (`A`, `b`, `5`)
- 2 octets :
  - caractères accentués (`é`, `à`, `ñ`)
- 3 octets :
  - autres alphabets (`中`, `日`, `本`)
- 4 octets : emojis

C'est le standard par défaut en Java.

![bg right:40%][illustration-utf8-detail]

## Pourquoi l'encodage est important

Mauvais encodage = caractères bizarres :

- `é` devient `Ã©`
- Texte illisible

Comme envoyer une lettre en français à une personne qui ne lit que l'anglais.

## Exemple complet : Programme de salutation

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Programme de salutation ===");
        System.out.print("Comment vous appelez-vous ? ");
        String name = scanner.nextLine();

        System.out.println("Bonjour " + name +
                          " ! Ravi de vous rencontrer.");

        scanner.close();
    }
}
```

![bg right:40%][illustration-example]

## Exemple : Calculatrice simple

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Calculatrice ===");
        System.out.print("Premier nombre : ");
        double num1 = scanner.nextDouble();
        System.out.print("Deuxième nombre : ");
        double num2 = scanner.nextDouble();

        System.out.println(num1 + " + " + num2 + " = " + (num1 + num2));

        scanner.close();
    }
}
```

## Bonnes pratiques (1/2)

- **Toujours fermer le Scanner** : `scanner.close()`
- **Instructions claires** : expliquez ce que l'utilisatrice doit faire
- **Utiliser println** : rend la sortie plus lisible

![bg right:40%][illustration-best-practices]

## Bonnes pratiques (2/2)

- **Noms de variables clairs** : `name` plutôt que `n`
- **Attention aux types** : `nextInt()` attend un nombre

![bg right:40%][illustration-best-practices]

## À vous de jouer !

- (Re)lire le support de cours.
- Explorer les exemples de code.
- Faire les exercices.
- Poser des questions si nécessaire.

**La programmation s'apprend par la pratique !** **N'hésitez pas à créer vos
propres exercices.**

![bg right:40%][illustration-a-vous-de-jouer]

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

## Sources

- [Java IOs](https://github.com/heig-vd-dai-course/heig-vd-dai-course/blob/main/02.01-java-ios/01-course-material/PRESENTATION.md)
  par L. Delafontaine sur
  [GitHub](https://github.com/heig-vd-dai-course/heig-vd-dai-course)
- [Illustration objectifs][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/j6brni7fpvs)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Nikita Kachanovsky](https://unsplash.com/@nkachanovskyyy) sur
  [Unsplash](https://unsplash.com/photos/FJFPuE1MAOM)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.02-entree-sortie-encodage/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.02-entree-sortie-encodage/01-supports-de-cours/05.02-entree-sortie-encodage-presentation.pdf
[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/05.02-entree-sortie-encodage/01-supports-de-cours
[exercices]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/05.02-entree-sortie-encodage/03-exercices
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]: ./images/home.jpg
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-conversation]:
	https://images.unsplash.com/photo-1543269865-cbf427effbad?fit=crop&h=720
[illustration-print]:
	https://images.unsplash.com/photo-1461988625982-7e46a099bf4f?fit=crop&h=720
[illustration-println]:
	https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?fit=crop&h=720
[illustration-concatenation]:
	https://images.unsplash.com/photo-1558618666-fcd25c85cd64?fit=crop&h=720
[illustration-scanner]:
	https://images.unsplash.com/photo-1434030216411-0b793f4b4173?fit=crop&h=720
[illustration-nextline]:
	https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&h=720
[illustration-nextint]:
	https://images.unsplash.com/photo-1509228468518-180dd4864904?fit=crop&h=720
[illustration-scanner-methods]:
	https://images.unsplash.com/photo-1555949963-aa79dcee981c?fit=crop&h=720
[illustration-encoding]:
	https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fit=crop&h=720
[illustration-ascii]:
	https://images.unsplash.com/photo-1550745165-9bc0b252726f?fit=crop&h=720
[illustration-utf8]:
	https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&h=720
[illustration-utf8-detail]:
	https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&h=720
[illustration-encoding-error]:
	https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?fit=crop&h=720
[illustration-example]:
	https://images.unsplash.com/photo-1522071820081-009f0129c71c?fit=crop&h=720
[illustration-calculator]:
	https://images.unsplash.com/photo-1587145820266-a5951ee6f620?fit=crop&h=720
[illustration-best-practices]:
	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
