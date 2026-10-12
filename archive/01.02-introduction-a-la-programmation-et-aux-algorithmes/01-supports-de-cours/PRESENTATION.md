---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM Course - Introduction à la programmation et aux algorithmes
description: Introduction à la programmation et aux algorithmes pour l'unité d'enseignement ProgIM enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/01.02-introduction-a-la-programmation-et-aux-algorithmes/01-supports-de-cours/index.html
header: "**Introduction à la programmation et aux algorithmes**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM 2025-2026](https://github.com/heig-vd-progserv-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 6
math: mathjax
-->

# Introduction à la programmation et aux algorithmes

<!--
_class: lead
_paginate: false
-->

[Lien vers le cours][cours]

<small>V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).</small>

<small>Ce travail est sous licence [CC BY-SA 4.0][license].</small>

![bg opacity:0.1][illustration-principale]

## _Retrouvez plus de détails dans le support de cours_

<!-- _class: lead -->

_Cette présentation est un résumé du support de cours. Pour plus de détails,
consultez le [support de cours][cours]._

## Objectifs (1/2)

- Expliquer ce qu'est la programmation à l'aide d'exemples du quotidien
- Comprendre la notion d'algorithme grâce à la métaphore de la recette

![bg right:40%][illustration-objectifs]

## Objectifs (2/2)

- Suivre et imaginer des instructions simples pour résoudre un problème
- Prendre conscience de l'importance de la précision dans les instructions

![bg right:40%][illustration-objectifs]

## Qu'est-ce que la programmation ?

La programmation, c'est donner des instructions précises à un ordinateur pour
qu'il réalise une tâche.

C'est comme expliquer à une personne comment faire quelque chose, étape par
étape.

![bg right:40%][illustration-exemples-de-code]

## Qu'est-ce qu'un algorithme ?

Un algorithme, c'est une suite d'instructions ordonnées qui permettent de :

- Résoudre un problème
- Atteindre un objectif

On retrouve des algorithmes partout dans la vie quotidienne !

![bg right:40%][illustration-bibliographie-et-ressources]

## La recette de cuisine : une métaphore

Une recette, c'est un algorithme du quotidien :

1. Prendre un saladier
2. Casser deux œufs dans le saladier
3. Ajouter 100g de sucre
4. Mélanger
5. Verser dans un moule
6. Cuire 30 minutes au four

## Comment présenter nos exemples

Dans ce cours, chaque concept sera illustré de 3 façons :

1. En français (explication ou pseudo-code)
2. En PlantUML (diagramme d'algorithme)
3. En Java (code source)

### En français

L'ordinateur choisit un nombre au hasard entre 1 et 100. L'utilisatrice doit
deviner ce nombre. Après chaque proposition, l'ordinateur indique si le nombre à
deviner est plus grand, plus petit ou égal à la proposition. Le jeu continue
jusqu'à ce que l'utilisatrice trouve le bon nombre.

### avec PlantUML

![PlantUML](./images/guess-number.png)

---

```java
public class GuessNumber {
    public static void main(String[] args) {
        Random rand = new Random();
        int secret = rand.nextInt(100) + 1;
        Scanner scanner = new Scanner(System.in);
        int guess = 0;

        System.out.println("Devine le nombre entre 1 et 100 :");
        while (guess != secret) {
            System.out.print("Ta proposition : ");
            guess = scanner.nextInt();
            if (guess < secret) {
                System.out.println("C'est plus grand.");
            } else if (guess > secret) {
                System.out.println("C'est plus petit.");
            } else {
                System.out.println("Bravo, tu as trouvé !");
            }
        }
    }
}
```

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

## À vous de jouer !

- (Re)lire le support de cours.
- Poser des questions si nécessaire.

➡️ [Lien vers le cours][cours]

**N'hésitez pas à vous entraidez si vous avez des difficultés !**

![bg right:40%][illustration-a-vous-de-jouer]

## Sources (1/3)

- [Illustration principale][illustration-principale] par
  [Richard Jacobs](https://unsplash.com/@rj2747) sur
  [Unsplash](https://unsplash.com/photos/grayscale-photo-of-elephants-drinking-water-8oenpCXktqQ)
- [Illustration][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/j6brni7fpvs)
- [Illustration][illustration-modalites-devaluation] par
  [Nguyen Dang Hoang Nhu](https://unsplash.com/@nguyendhn) sur
  [Unsplash](https://unsplash.com/photos/person-writing-on-white-paper-qDgTQOYk6B8)
- [Illustration][illustration-projet] par
  [Samantha Fortney](https://unsplash.com/@goldencoastgrams) sur
  [Unsplash](https://unsplash.com/photos/man-in-green-and-black-plaid-long-sleeve-shirt-holding-red-and-black-cordless-hand-drill-OGDyzpsTjyA)
- [Illustration][illustration-bibliographie-et-ressources] par
  [Tim van Cleef](https://unsplash.com/@_timvancleef) sur
  [Unsplash](https://unsplash.com/photos/wooden-ladder-by-bookshelves-1JBOZwuW7sI)
- [Illustration][illustration-exemples-de-code] par
  [Alec Favale](https://unsplash.com/@alecfavale) sur
  [Unsplash](https://unsplash.com/photos/man-wearing-gray-polo-shirt-beside-dry-erase-board-3V8xo5Gbusk)
- [Illustration][illustration-exercices] par
  [Samuel Girven](https://unsplash.com/@samuelgirven) sur
  [Unsplash](https://unsplash.com/photos/dumbbells-on-floor-VJ2s0c20qCo)
- [Illustration][illustration-a-vous-de-jouer] par
  [Nikita Kachanovsky](https://unsplash.com/@nkachanovskyyy) sur
  [Unsplash](https://unsplash.com/photos/white-sony-ps4-dualshock-controller-over-persons-palm-FJFPuE1MAOM)

<!-- URLs -->

[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/01.02-introduction-a-la-programmation-et-aux-algorithmes
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]:
	https://images.unsplash.com/photo-1517486430290-35657bdcef51?fit=crop&h=720
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-modalites-devaluation]:
	https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?fit=crop&h=720
[illustration-projet]:
	https://images.unsplash.com/photo-1608613304810-2d4dd52511a2?fit=crop&h=720
[illustration-bibliographie-et-ressources]:
	https://images.unsplash.com/photo-1554906493-4812e307243d?fit=crop&h=720
[illustration-exemples-de-code]:
	https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?fit=crop&h=720
[illustration-exercices]:
	https://images.unsplash.com/photo-1576678927484-cc907957088c?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
