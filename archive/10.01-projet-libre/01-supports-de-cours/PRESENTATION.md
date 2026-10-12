---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM1 Course - Projet libre
description: Projet libre pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.01-projet-libre/01-supports-de-cours/index.html
header: "**Projet libre**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Projet libre

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

## Objectifs

À la fin de ce projet, vous serez capable de :

- Concevoir un programme Java complet en autonomie
- Appliquer les méthodologies de résolution de problèmes
- Organiser votre code en fonctions réutilisables
- Tester et déboguer méthodiquement
- Présenter votre travail et expliquer vos choix

![bg right:40%][illustration-objectifs]

## Introduction

Depuis le début du semestre :

- Variables, conditions, boucles, fonctions, tableaux
- Méthodologies de résolution de problèmes
- Nombreux exercices et exemples de code

**Maintenant : projet libre**

Vous choisissez ce que vous voulez développer !

## Pourquoi un projet libre ?

- **Consolider** vos acquis dans un contexte qui vous intéresse
- **Exprimer** votre créativité
- **Développer** votre autonomie
- **Préparer** l'évaluation finale

**Important :** Projet **non noté** mais **obligatoire**

## Composition des groupes

Vous avez le choix :

- **Travailler seul.e**
- **Travailler en binôme**

**Pour les binômes :**

- Contribution équitable
- Comprendre l'intégralité du code
- Portée légèrement supérieure

**Annonce :** Document partagé en cours

## Validation de l'idée

Votre projet doit être **validé par l'enseignement**

Cela garantit que le projet est :

- Ni trop simple, ni trop complexe
- Réalisable dans le temps imparti
- Permet de mobiliser vos compétences

![bg right:40%][illustration-validation]

## Document de validation

**À envoyer avant la 2e séance**

Contenu (1 page max) :

- Nom(s) du groupe
- Titre du projet
- Description courte
- Fonctionnalités principales (3 à 5)
- Fonctionnalités optionnelles

## Contraintes techniques

- Programme écrit en **Java**
- Exécution en **mode console**
- Uniquement concepts **vus en cours**
- Bibliothèques standards autorisées

**Qualité :**

- Code bien organisé et lisible
- Programme fonctionnel
- Bonnes pratiques appliquées

## Contraintes de déroulement

- **Participer** aux points d'étapes
- **Expliquer** votre code en détail
- **Contribuer** équitablement (binômes)
- **Indiquer** vos sources
- **Comprendre** tout le code utilisé

**Le plagiat est strictement interdit**

## Évaluation

Projet **non noté** mais **obligatoire**

**Validation par :**

1. Présence et participation aux points d'étapes
2. Présentation finale (10-15 min)

**Présentation finale :**

- Démonstration live du programme
- Explications techniques
- Questions/réponses

## Critères de validation

Pour valider le projet :

- Respect des contraintes
- Programme fonctionnel
- Capacité à expliquer le code
- Participation active aux points d'étapes

## Rendu

**Date :** Communiquée en cours (environ 3-4 semaines)

**Format :** E-mail avec archive ZIP contenant :

- Fichiers `.java`
- `README.txt` avec :
  - Titre du projet
  - Instructions de compilation/exécution
  - Fonctionnalités implémentées
  - Sources utilisées

## Conseils

<!-- _class: lead -->

## Restez simple !

**Mieux vaut simple et bien fait que complexe et inachevé**

Approche recommandée :

1. Version minimale fonctionnelle (MVP)
2. Tester cette version
3. Ajouter des fonctionnalités une par une
4. Tester après chaque ajout

Ne soyez pas Numérobis ! 😉

## Organisez votre code

**Bonnes pratiques :**

- Une fonction = une responsabilité
- Noms explicites
- Constantes pour valeurs fixes
- Commentaires utiles

**Exemple :**

```java
public static final int MAX_TASKS = 50;

public static void displayMenu() { ... }
public static void addTask(...) { ... }
```

## Testez régulièrement

**Ne codez pas des heures sans tester !**

Approche :

1. Écrire une fonction
2. **Tester immédiatement**
3. Vérifier les cas limites
4. Passer à la suivante

**Astuce :** Utilisez `System.out.println()` pour déboguer

## Points d'étapes

**4 séances** avec point d'étape (5-10 min par groupe)

**Format :**

1. Vous présentez (2-3 min) :
   - Ce que vous avez fait
   - Difficultés rencontrées
   - Prochaines étapes
2. L'enseignement répond

**Préparez vos questions à l'avance !**

## Étape 1 : Choix du projet

**Première séance**

À faire :

- Choisir votre sujet (seul.e ou binôme)
- Identifier fonctionnalités principales
- Réfléchir à la structure

**Livrables :**

- Annonce du groupe
- Préparation document de validation

## Étape 2 : Validation et planification

**Deuxième séance**

À faire :

- Validation de l'idée
- Décomposition du problème
- Identification des fonctions
- Début du développement

**Livrables :**

- Document de validation envoyé
- Squelette de programme

## Étape 3 : Développement initial

**Troisième séance**

À faire :

- Implémenter fonctionnalités de base
- Programme exécutable
- Tests des premières fonctionnalités

**Livrables :**

- Programme compilable
- 2-3 fonctionnalités principales implémentées

## Étape 4 : Finalisation

**Quatrième séance**

À faire :

- Finaliser dernières fonctionnalités
- Tester l'ensemble
- Corriger les bugs
- Améliorer la qualité

**Livrables :**

- Programme complet et fonctionnel
- Code nettoyé et commenté
- README.txt préparé

## Idées de projets

<!-- _class: lead -->

_Besoin d'inspiration ?_

## Jeux

- Jeu du pendu
- Bataille navale
- Morpion (1 ou 2 joueurs)
- Mastermind
- Jeu de dés (Yam's simplifié)
- Plus ou moins
- Labyrinthe en mode texte

## Outils pratiques

- Gestionnaire de tâches
- Carnet d'adresses
- Gestionnaire de budget
- Gestionnaire de bibliothèque
- Calculateur d'empreinte carbone
- Convertisseur d'unités
- Générateur de mots de passe

## Simulations

- Simulateur de croissance de plantes
- Simulateur de tirelire avec intérêts
- Simulateur d'écosystème simplifié
- Calculateur de partage de frais
- Planificateur de covoiturage

## Défis algorithmiques

- Résolveur de sudoku
- Générateur de labyrinthes
- Chiffrement simple (César)
- Analyseur de texte
- Générateur de statistiques

## Choisissez ce qui vous motive !

Projet en lien avec vos intérêts = travail plus agréable

**N'hésitez pas à adapter les idées ou en proposer d'autres**

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

## Sources

- Cours
  [Programmation serveur 2 (ProgServ2)](https://github.com/heig-vd-progserv-course/heig-vd-progserv2-course)
  de L. Delafontaine
- [Illustration principale][illustration-principale] par
  [Richard Jacobs](https://unsplash.com/@rj2747) sur
  [Unsplash](https://unsplash.com/photos/grayscale-photo-of-elephants-drinking-water-8oenpCXktqQ)
- [Illustration][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/low-angle-view-of-ball-shoots-in-the-ring-j6brni7fpvs)
- [Illustration][illustration-validation] par
  [Nicole Baster](https://unsplash.com/@nicolebaster) sur
  [Unsplash](https://unsplash.com/photos/traffic-light-aGx-CFsM3fE)

<!-- URLs -->

[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/10.01-projet-libre/01-supports-de-cours
[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.01-projet-libre/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.01-projet-libre/01-supports-de-cours/10.01-projet-libre-presentation.pdf
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]:
	https://images.unsplash.com/photo-1517486430290-35657bdcef51?fit=crop&h=720
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-validation]:
	https://images.unsplash.com/photo-1543075137-5a97903aaa7a?fit=crop&h=720
