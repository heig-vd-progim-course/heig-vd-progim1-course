---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: L.Delafontaine & V. Guidoux, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM1 Course - Fonctions
description: Cours sur les fonctions pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.01-fonctions/01-supports-de-cours/index.html
header: "**Fonctions**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 6
math: mathjax
-->

# Fonctions

<!--
_class: lead
_paginate: false
-->

<https://github.com/heig-vd-progim-course/heig-vd-progim1-course>

[Support de cours][cours] · [Présentation (web)][presentation-web] ·
[Présentation (PDF)][presentation-pdf]

<small>L.Delafontaine & V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).</small>

<small>Ce travail est sous licence [CC BY-SA 4.0][license].</small>

![bg brightness:2 opacity:0.2][illustration-principale]

## _Retrouvez plus de détails dans le support de cours_

<!-- _class: lead -->

_Cette présentation est un résumé du support de cours. Pour plus de détails,
consultez le [support de cours][cours]._

## Objectifs (1/2)

À la fin de cette séance, vous devriez être capable de :

- Décrire ce qu'est une méthode en programmation
- Déclarer et appeler une méthode en Java
- Passer des paramètres et utiliser des valeurs de retour

![bg right:40%][illustration-objectifs]

## Objectifs (2/2)

À la fin de cette séance, vous devriez être capable de :

- Expliquer la portée des variables
- Utiliser des méthodes prédéfinies en Java

![bg right:40%][illustration-objectifs]

## Qu'est-ce qu'une méthode ?

Une méthode est un ensemble d'instructions qui effectue une tâche spécifique.

Comme une recette de cuisine :

- Prend des ingrédients (paramètres)
- Suit des étapes (instructions)
- Produit un résultat (valeur de retour)

Exemple mathématique : $f(x) = x^2$

## Déclarer une méthode

```java
public class Main {
    public static void sayHello() {
        System.out.println("Bonjour le monde !");
    }
}
```

- `public static` : modificateurs
- `void` : type de retour (rien ici)
- `sayHello` : nom de la méthode
- `()` : paramètres (aucun ici)
- `{}` : corps de la méthode

![bg right:40%][illustration-declaration]

## Appeler une méthode

```java
public class Main {
    public static void sayHello() {
        System.out.println("Bonjour le monde !");
    }

    public static void main(String[] args) {
        sayHello(); // Appel de la méthode
        sayHello(); // On peut l'appeler plusieurs fois
        sayHello();
    }
}
```

![bg right:40%][illustration-appel]

## Passer des paramètres

```java
public class Main {
    public static void sayHello(String name) {
        System.out.println("Bonjour " + name + " !");
    }

    public static void main(String[] args) {
        sayHello("Ariel"); // Affiche "Bonjour Ariel !"
        sayHello("Nox");   // Affiche "Bonjour Nox !"
    }
}
```

Les paramètres permettent de personnaliser le comportement de la méthode.

![bg right:40%][illustration-parametres]

## Retourner une valeur

```java
public class Main {
    public static int square(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        int result = square(3);
        System.out.println(result); // Affiche 9
    }
}
```

Le mot-clé `return` permet de renvoyer une valeur.

![bg right:40%][illustration-retour]

## Plusieurs paramètres

```java
public class Main {
    public static int add(int x, int y) {
        return x + y;
    }

    public static void main(String[] args) {
        int result = add(3, 5);
        System.out.println(result); // Affiche 8
    }
}
```

Les paramètres sont séparés par des virgules.

![bg right:40%][illustration-plusieurs-parametres]

## Portée des variables

Les variables déclarées dans une méthode sont **locales**.

```java
public class Main {
    public static int square(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        System.out.println(x); // Erreur : x n'existe pas ici
    }
}

// Comme une boîte à outils : les outils ne sont accessibles que lorsque la boîte
// est ouverte.
```

## Méthodes prédéfinies - Math (1/2)

```java
public class Main {
    public static void main(String[] args) {
        double result = Math.sqrt(16);
        System.out.println(result); // Affiche 4.0
    }
}
```

La classe `Math` contient de nombreuses méthodes mathématiques : `abs`, `round`,
`min`, `max`, `random`, etc.

## Méthodes prédéfinies - Math (2/2)

Documentation : <https://docs.oracle.com/en/java/javase/21/docs/api/>

![bg right:40%][illustration-math]

## Méthodes prédéfinies - String

```java
public class Main {
    public static void main(String[] args) {
        String text = "bonjour";
        String result = text.toUpperCase();
        System.out.println(result); // Affiche "BONJOUR"
    }
}
```

La classe `String` contient de nombreuses méthodes : `toLowerCase`, `length`,
`substring`, `replace`, etc.

![bg right:40%][illustration-string]

## Réutiliser du code

```java
public class Main {
    public static int square(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        System.out.println(square(3));  // Affiche 9
        System.out.println(square(5));  // Affiche 25
        System.out.println(square(10)); // Affiche 100
    }
}
```

Les méthodes évitent la duplication de code et facilitent la maintenance.

![bg right:40%][illustration-reutilisation]

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

- [Fonctions](https://github.com/heig-vd-progserv-course/heig-vd-progserv1-course/blob/main/02-fonctions/01-theorie/PRESENTATION.md)
  par L. Delafontaine sur
  [GitHub](https://github.com/heig-vd-progserv-course/heig-vd-progserv1-course)
- [Illustration objectifs][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/j6brni7fpvs)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Nikita Kachanovsky](https://unsplash.com/@nkachanovskyyy) sur
  [Unsplash](https://unsplash.com/photos/FJFPuE1MAOM)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.01-fonctions/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.01-fonctions/01-supports-de-cours/05.01-fonctions-presentation.pdf
[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/05.01-fonctions/01-supports-de-cours
[exercices]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/05.01-fonctions/03-exercices
[plantuml-editor]: https://plantuml.nortalle.ch
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]: ./images/home.jpg
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-methode]:
	https://images.unsplash.com/photo-1556910103-1c02745aae4d?fit=crop&h=720
[illustration-declaration]:
	https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?fit=crop&h=720
[illustration-appel]:
	https://images.unsplash.com/photo-1533749047139-189de3cf06d3?fit=crop&h=720
[illustration-parametres]:
	https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&h=720
[illustration-retour]:
	https://images.unsplash.com/photo-1557804506-669a67965ba0?fit=crop&h=720
[illustration-plusieurs-parametres]:
	https://images.unsplash.com/photo-1522071820081-009f0129c71c?fit=crop&h=720
[illustration-portee]:
	https://images.unsplash.com/photo-1553877522-43269d4ea984?fit=crop&h=720
[illustration-variables-classe]:
	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&h=720
[illustration-math]:
	https://images.unsplash.com/photo-1509228468518-180dd4864904?fit=crop&h=720
[illustration-string]:
	https://images.unsplash.com/photo-1456324504439-367cee3b3c32?fit=crop&h=720
[illustration-reutilisation]:
	https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
