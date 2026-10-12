# Projet guidé - Puissance 4 - Exemples de code

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.02-projet-puissance-4/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.02-projet-puissance-4/01-supports-de-cours/10.02-projet-puissance-4-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Exemples de code

Ce dossier contient les 6 étapes de développement du jeu Puissance 4.

Ces exemples sont conçus pour être explorés dans l'ordre, chaque étape ajoutant
de nouvelles fonctionnalités à la précédente.

### Objectif

Vous familiariser avec le développement incrémental d'un projet complet en
découvrant comment :

- Décomposer un problème complexe
- Implémenter des fonctionnalités progressivement
- Tester et valider à chaque étape
- Organiser un code de plus en plus riche

### Utilisation

1. **Lisez le code** : Prenez le temps de comprendre chaque ligne
2. **Exécutez** : Compilez et testez chaque étape sur votre machine
3. **Expérimentez** : Modifiez le code pour voir les effets
4. **Comparez** : Observez les différences entre les étapes

### Les 6 étapes

#### Étape 1 : Affichage de la grille

**Dossier :** `01-affichage-grille/`

**Objectif :** Créer et afficher une grille vide de Puissance 4 (6×7).

**Concepts :**

- Tableaux à deux dimensions
- Boucles imbriquées pour le parcours
- Affichage formaté

**Fonctionnalités :**

- Création d'une grille vide
- Affichage de la grille avec bordures
- Numérotation des colonnes

#### Étape 2 : Placement d'un pion

**Dossier :** `02-placement-pion/`

**Objectif :** Permettre de placer un pion dans une colonne en respectant la
gravité.

**Concepts :**

- Entrée utilisatrice avec Scanner
- Validation des données
- Modification du tableau
- Parcours pour trouver la position libre

**Fonctionnalités :**

- Demande de colonne au joueur
- Validation de la colonne (1-7, non pleine)
- Placement du pion à la position la plus basse
- Affichage après placement

#### Étape 3 : Alternance des joueuses

**Dossier :** `03-alternance-joueurs/`

**Objectif :** Mettre en place le système de tour par tour entre X et O.

**Concepts :**

- Variables de contrôle
- Boucle de jeu
- Alternance conditionnelle

**Fonctionnalités :**

- Boucle de jeu (plusieurs coups possibles)
- Alternance automatique des joueuses
- Affichage de la joueuse courant
- Possibilité de quitter (colonne 0)

#### Étape 4 : Détection de victoire horizontale

**Dossier :** `04-detection-victoire-horizontale/`

**Objectif :** Détecter si un joueur a aligné 4 pions horizontalement.

**Concepts :**

- Algorithme de fenêtre glissante
- Détection de motifs dans un tableau
- Conditions multiples

**Fonctionnalités :**

- Fonction de détection horizontale
- Vérification après chaque coup
- Annonce du gagnant
- Fin de partie sur victoire

#### Étape 5 : Détection de victoire verticale et diagonale

**Dossier :** `05-detection-victoire-verticale-diagonale/`

**Objectif :** Compléter les détections avec vertical et les deux diagonales.

**Concepts :**

- Parcours dans différentes directions
- Gestion des limites du tableau
- Organisation en fonctions spécialisées

**Fonctionnalités :**

- Détection verticale
- Détection diagonale descendante (↘)
- Détection diagonale montante (↗)
- Fonction globale `hasWon()`

#### Étape 6 : Jeu complet

**Dossier :** `06-jeu-complet/`

**Objectif :** Version finale jouable avec toutes les fonctionnalités.

**Concepts :**

- Architecture logicielle complète
- Gestion des cas limites
- Code organisé et maintenable

**Fonctionnalités finales :**

- Toutes les détections de victoire
- Détection de match nul (grille pleine)
- Messages d'information clairs
- Code bien structuré avec constantes
- Commentaires et documentation

## Conseils d'exploration

1. **Prenez votre temps** : Ne vous précipitez pas, chaque étape mérite d'être
   comprise en profondeur.

2. **Testez chaque étape** : Exécutez le code, jouez avec, essayez de gagner de
   différentes manières.

3. **Comparez les versions** : Observez ce qui change d'une étape à l'autre.

4. **Modifiez et expérimentez** : Changez les dimensions, les symboles, ajoutez
   des messages.

5. **Utilisez le débogueur** : Placez des points d'arrêt pour observer l'état
   des variables.

6. **Lisez les commentaires** : Le code est commenté pour expliquer les parties
   importantes.

## Compilation et exécution

Pour chaque étape :

```bash
# Se placer dans le dossier de l'étape
cd 0X-nom-etape/

# Compiler
javac Main.java

# Exécuter
java Main
```

## Pour aller plus loin

Une fois toutes les étapes comprises, vous pouvez :

- Implémenter vos propres améliorations
- Créer une variante du jeu (dimensions différentes, règles modifiées)
- Ajouter une interface colorée
- Développer une intelligence artificielle

Le code de la dernière étape constitue une base solide pour toutes ces
extensions.

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
