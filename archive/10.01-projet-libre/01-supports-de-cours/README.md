# Projet libre - Support de cours

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.01-projet-libre/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.01-projet-libre/01-supports-de-cours/10.01-projet-libre-presentation.pdf)

## Table des matières

- [Ressources annexes](#ressources-annexes)
- [Table des matières](#table-des-matières)
- [Introduction](#introduction)
- [Objectifs](#objectifs)
- [Validation de l'idée](#validation-de-lidée)
  - [Ajustements possibles](#ajustements-possibles)
- [Contraintes](#contraintes)
  - [Contraintes techniques](#contraintes-techniques)
  - [Contraintes de qualité](#contraintes-de-qualité)
  - [Contraintes de déroulement](#contraintes-de-déroulement)
  - [Intégrité académique](#intégrité-académique)
- [Évaluation](#évaluation)
- [Rendu](#rendu)
  - [Restez simple](#restez-simple)
  - [Organisez votre code](#organisez-votre-code)
  - [Testez régulièrement](#testez-régulièrement)
  - [Outils collaboratifs](#outils-collaboratifs)
- [Points d'étapes](#points-détapes)
  - [Étape 1 : Choix et démarrage du projet](#étape-1--choix-et-démarrage-du-projet)
  - [Étape 2 : Finalisation](#étape-2--finalisation)
- [Idées de projets](#idées-de-projets)
  - [Jeux](#jeux)
  - [Outils pratiques](#outils-pratiques)
  - [Simulations](#simulations)
  - [Défis algorithmiques](#défis-algorithmiques)
- [Exemples de contraintes selon le type de projet](#exemples-de-contraintes-selon-le-type-de-projet)
  - [Jeux](#jeux-1)
  - [Gestionnaires (tâches, contacts, budget, etc.)](#gestionnaires-tâches-contacts-budget-etc)
  - [Simulateurs](#simulateurs)
  - [Outils de calcul](#outils-de-calcul)

## Introduction

Depuis le début du semestre, vous avez découvert les fondamentaux de la
programmation : variables, conditions, boucles, fonctions, tableaux. Vous avez
également travaillé sur des méthodologies de résolution de problèmes pour
décomposer et analyser des problèmes complexes.

Il est maintenant temps de mettre toutes ces compétences en pratique dans un
**projet libre** : vous choisissez vous-même le programme que vous souhaitez
développer.

Ce projet est l'occasion de :

- **Consolider vos acquis** en les mobilisant dans un contexte que vous avez
  choisi
- **Exprimer votre créativité** en développant quelque chose qui vous intéresse
- **Développer votre autonomie** en gérant un projet de A à Z
- **Vous préparer à l'évaluation finale** en appliquant l'ensemble des
  compétences vues en cours

Le projet est **non noté** mais **obligatoire** : il fait partie intégrante de
votre apprentissage et sera présenté en fin de séquence.

## Objectifs

À travers ce projet, vous allez :

- Concevoir et réaliser un programme Java complet en autonomie.
- Appliquer les méthodologies de résolution de problèmes vues au cours 09.
- Organiser votre code en fonctions réutilisables et bien structurées.
- Utiliser les structures de données appropriées (tableaux, variables, etc.).
- Présenter votre travail et expliquer vos choix de conception.

Ce projet se réalise **individuellement**. Chaque personne travaille sur son
propre projet.

## Validation de l'idée

Votre idée de projet doit être **validée par l'enseignement** avant de commencer
le développement.

Cette validation permet de s'assurer que :

- Le projet n'est **ni trop simple** (peut être réalisé en moins d'une heure),
  ni **trop complexe** (nécessiterait des concepts non vus en cours).
- Le projet permet de **mobiliser les compétences** acquises durant le semestre.
- Le projet est **réalisable** dans le temps imparti (environ 6 à 8 heures de
  travail personnel).

### Ajustements possibles

L'enseignement peut vous demander de :

- **Réduire la portée** si le projet est trop ambitieux
- **Ajouter des contraintes** si le projet est trop simple
- **Réorienter** si le projet nécessite des concepts non vus en cours

Ces ajustements sont faits pour votre bénéfice : ils garantissent que vous
pourrez mener à bien votre projet dans les meilleures conditions.

## Contraintes

Votre projet doit respecter les contraintes suivantes :

### Contraintes techniques

- Le programme est écrit **entièrement en Java**.
- Le programme s'exécute en **mode console** (pas d'interface graphique).
- Vous pouvez utiliser les bibliothèques standards de Java (`Scanner`,
  `java.util.Arrays`, etc.) vues en cours.

### Contraintes de qualité

- Le code est **bien organisé** : fonctions claires avec responsabilités bien
  définies.
- Le code est **lisible** : noms de variables explicites, indentation correcte,
  commentaires utiles.
- Le code est **fonctionnel** : le programme compile sans erreur et s'exécute
  correctement.
- Les **bonnes pratiques** vues en cours sont appliquées (validation des
  entrées, gestion des erreurs, etc.).

### Contraintes de déroulement

- Vous devez **participer aux points d'étapes** prévus en cours (voir
  [Points d'étapes](#points-détapes)).
- Vous devez pouvoir **expliquer votre code** en détail si on vous le demande.

### Intégrité académique

- Vous devez **indiquer vos sources** si vous utilisez du code trouvé sur
  Internet ou généré par une IA.
- Vous devez **comprendre et être capable d'expliquer** tout le code que vous
  utilisez.

## Évaluation

Ce projet **n'est pas noté** mais il fait partie intégrante de votre formation.

## Rendu

Il n'y a pas de rendu formel à faire.

### Restez simple

La tentation est grande de vouloir créer un programme ambitieux avec de
nombreuses fonctionnalités. **Résistez à cette tentation !**

Mieux vaut un programme **simple mais bien fait** qu'un programme complexe
inachevé ou plein de bugs.

**Approche recommandée :**

1. Commencez par une **version minimale fonctionnelle** (MVP - Minimum Viable
   Product)
2. Testez que cette version fonctionne correctement
3. Ajoutez des fonctionnalités **une par une**, en testant après chaque ajout
4. Ne passez pas à la fonctionnalité suivante tant que la précédente n'est pas
   terminée

**Exemple - Gestionnaire de tâches :**

- **Version minimale** : Ajouter une tâche, afficher les tâches
- **Ajout 1** : Marquer une tâche comme terminée
- **Ajout 2** : Supprimer une tâche
- **Ajout 3** : Trier les tâches par priorité

Ne soyez pas Numérobis du film _Astérix et Obélix : Mission Cléopâtre_ qui veut
tout faire en même temps et se retrouve débordé !

### Organisez votre code

Un code bien organisé est plus facile à comprendre, à tester et à faire évoluer.

**Bonnes pratiques d'organisation :**

- **Une fonction = une responsabilité** : Chaque fonction fait une chose précise
  et la fait bien
- **Noms explicites** : `calculateAverage()` plutôt que `calc()`
- **Constantes pour les valeurs fixes** :
  `public static final int MAX_ITEMS = 100;`
- **Commentaires utiles** : Expliquez le "pourquoi", pas le "quoi"

**Exemple de structure claire :**

```java
public class TaskManager {
    // Constantes
    public static final int MAX_TASKS = 50;

    // Fonction d'affichage du menu
    public static void displayMenu() { ... }

    // Fonction d'ajout d'une tâche
    public static void addTask(String[] tasks, int taskCount) { ... }

    // Fonction d'affichage des tâches
    public static void displayTasks(String[] tasks, int taskCount) { ... }

    // Programme principal
    public static void main(String[] args) { ... }
}
```

### Testez régulièrement

Ne codez pas pendant des heures sans tester ! Testez **très fréquemment** pour
détecter les problèmes tôt.

**Approche recommandée :**

1. Écrivez une nouvelle fonction
2. **Testez immédiatement** cette fonction avec des exemples simples
3. Vérifiez les cas limites (valeurs vides, valeurs maximales, etc.)
4. Passez à la fonction suivante seulement si celle-ci fonctionne

**Technique du "print debugging" :**

Utilisez `System.out.println()` pour afficher les valeurs intermédiaires et
comprendre ce qui se passe dans votre code :

```java
public static int findTask(String[] tasks, int count, String searchTerm) {
    System.out.println("Recherche de : " + searchTerm); // Debug
    System.out.println("Nombre de tâches : " + count);  // Debug

    for (int i = 0; i < count; i++) {
        System.out.println("Tâche " + i + " : " + tasks[i]); // Debug
        if (tasks[i].contains(searchTerm)) {
            return i;
        }
    }
    return -1;
}
```

Une fois que la fonction marche, vous pouvez retirer les `println` de debug.

### Outils collaboratifs

Si vous souhaitez travailler avec une autre personne pour vous entraider ou
partager vos connaissances, vous pouvez utiliser des outils de programmation
collaborative en temps réel. Ces outils permettent de coder ensemble sur le même
fichier, même à distance.

**Outils recommandés :**

- **VS Code Live Share** : Extension pour Visual Studio Code permettant de
  partager votre session de codage en temps réel
  - [VS Code Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
  - Gratuit et facile à utiliser
  - Permet le partage d'écran, le chat et la collaboration sur le code

- **IntelliJ Code With Me** : Outil pour IntelliJ IDEA et autres IDE JetBrains
  - [Code With Me](https://www.jetbrains.com/help/idea/code-with-me.html)
  - Idéal si vous utilisez IntelliJ IDEA
  - Collaboration en temps réel avec plusieurs personnes

## Points d'étapes

Le projet se déroule sur **2 séances** en classe. À chaque séance, nous ferons
un point d'étape rapide (5-10 minutes par personne) pour :

- Vérifier l'avancement de votre projet
- Répondre à vos questions
- Vous débloquer si nécessaire
- Vous donner des conseils adaptés

**Format du point d'étape :**

1. **Vous présentez** (2-3 minutes) :
   - Ce que vous avez fait depuis la dernière fois
   - Les difficultés rencontrées
   - Ce que vous prévoyez de faire ensuite
2. **L'enseignement répond** :
   - Validation de l'avancement
   - Conseils techniques ou méthodologiques
   - Réponses aux questions

**Conseil :** Préparez vos questions à l'avance pour profiter au maximum de ces
moments d'échange.

### Étape 1 : Choix et démarrage du projet

**Date :** Première séance du projet

**Objectifs :**

- Choisir votre sujet de projet
- Identifier les fonctionnalités principales
- Valider l'idée avec l'enseignement
- Décomposer le problème et commencer le développement

**Livrables :**

- Annonce du projet dans le document partagé
- Squelette de programme avec la structure principale

**Questions à se poser :**

- Qu'est-ce qui m'intéresse ? Qu'est-ce que j'aimerais créer ?
- Quelles sont les 3-4 fonctionnalités essentielles ?
- De quelles structures de données ai-je besoin ? (tableaux, variables, etc.)

### Étape 2 : Finalisation

**Date :** Deuxième séance du projet

**Objectifs :**

- Finaliser les fonctionnalités principales
- Tester l'ensemble du programme
- Corriger les bugs
- Améliorer la qualité du code (nommage, commentaires, organisation)

**Livrables :**

- Programme complet et fonctionnel
- Code nettoyé et commenté
- Fichier README.txt préparé

**Point d'étape :**

- Démonstration de l'avancement
- Discussion sur les difficultés rencontrées
- Conseils pour la finalisation
- Préparation de la présentation finale

## Idées de projets

Si vous manquez d'inspiration, voici quelques idées classées par catégorie.
N'hésitez pas à les adapter ou à en proposer d'autres !

### Jeux

- **Jeu du pendu** : Deviner un mot lettre par lettre avec un nombre limité
  d'essais
- **Bataille navale** : Placer des bateaux et tirer sur la grille adverse
- **Morpion (Tic-tac-toe)** : Version 1 ou 2 joueurs avec détection de victoire
- **Mastermind** : Deviner une combinaison de couleurs avec des indices
- **Jeu de dés (Yam's simplifié)** : Lancer des dés et calculer des scores
- **Jeu du plus ou moins** : Deviner un nombre avec des indices "plus grand" ou
  "plus petit"
- **Labyrinthe en mode texte** : Se déplacer dans un labyrinthe représenté par
  un tableau 2D
- **Récit interactif** : Histoire où la personne qui joue fait des choix qui
  influencent le déroulement ([exemple](https://book.onivers.com/book/nc))

### Outils pratiques

- **Gestionnaire de tâches** : Ajouter, afficher, marquer comme terminé,
  supprimer des tâches
- **Carnet d'adresses** : Gérer des contacts (nom, téléphone, email)
- **Gestionnaire de budget** : Suivre des revenus et dépenses, calculer le solde
- **Gestionnaire de bibliothèque** : Gérer une collection de livres (titre,
  auteur, année)
- **Calculateur d'empreinte carbone** : Calculer l'empreinte d'un trajet, d'une
  alimentation, etc.
- **Convertisseur d'unités** : Convertir températures, distances, poids, etc.
- **Générateur de mots de passe** : Créer des mots de passe sécurisés selon des
  critères

### Simulations

- **Simulateur de croissance de plantes** : Simuler la croissance en fonction de
  paramètres (eau, lumière)
- **Simulateur de tirelire** : Suivre des économies avec intérêts
- **Simulateur d'écosystème simplifié** : Population d'animaux évoluant selon
  des règles
- **Calculateur de partage de frais** : Répartir des dépenses entre plusieurs
  personnes
- **Planificateur de covoiturage** : Calculer distances, coûts partagés,
  émissions évitées

### Défis algorithmiques

- **Résolveur de sudoku** : Vérifier ou compléter une grille de sudoku
- **Générateur de labyrinthes** : Créer des labyrinthes aléatoires
- **Algorithme de chiffrement simple** : Chiffrer/déchiffrer des messages
  (César, substitution)
- **Analyseur de texte** : Compter les mots, lettres, phrases, trouver les mots
  les plus fréquents
- **Générateur de statistiques** : Analyser un ensemble de nombres (moyenne,
  médiane, écart-type)

**Conseil :** Choisissez un projet qui vous **motive** et qui est en lien avec
vos intérêts personnels. Vous serez plus engagé.e et le travail sera plus
agréable !

## Exemples de contraintes selon le type de projet

Pour vous aider à dimensionner votre projet, voici des exemples de contraintes
minimales selon le type :

### Jeux

- Au moins **3 fonctionnalités de jeu** distinctes (affichage, saisie joueur,
  vérification victoire/défaite, etc.)
- **Validation des entrées** utilisateur (gestion des erreurs de saisie)
- **Boucle de jeu** permettant de rejouer ou de quitter
- Pour les jeux à 2 joueurs : **alternance des joueurs** gérée correctement

### Gestionnaires (tâches, contacts, budget, etc.)

- Au moins **4 opérations CRUD** : Create (ajouter), Read (afficher), Update
  (modifier), Delete (supprimer)
- **Menu interactif** permettant de choisir l'opération
- Gestion d'au moins **20 entrées** maximum (utilisation de tableaux)
- **Recherche ou tri** des données

### Simulateurs

- Au moins **3 paramètres** influençant la simulation
- **Affichage de l'évolution** étape par étape ou résumé final
- **Calculs réalistes** (formules, conditions logiques)
- Possibilité de **relancer** la simulation avec d'autres paramètres

### Outils de calcul

- Au moins **3 types de calculs** différents
- **Validation des entrées** (valeurs correctes, plages acceptables)
- **Affichage clair** des résultats avec unités ou explications
- **Menu ou choix** permettant de sélectionner le type de calcul

Ces contraintes sont données à titre indicatif. L'enseignement pourra les
ajuster selon la complexité de votre projet.

---

**Bon courage pour votre projet libre !** N'hésitez pas à poser des questions
pendant les points d'étapes ou par e-mail. Ce projet est une occasion unique de
créer quelque chose qui vous ressemble. Profitez-en ! 🚀

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
