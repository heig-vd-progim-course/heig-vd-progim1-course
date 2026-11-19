# Thealivery, bac à sable

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

!!! warning "Page d'essai"

    Cette page sert à écrire et tester un niveau de Thealivery. Elle n'est pas
    une page du cours.

Écrivez un niveau dans l'éditeur : le jeu, en dessous, se met à jour après
chaque modification. Un niveau invalide affiche ses erreurs à la place du jeu.
Le texte reste dans votre navigateur, d'une visite à l'autre.

Le format, en bref :

- **la grille** : un bloc `text` par rue. `T>` `T<` `T^` `Tv` pour Théa et sa
  direction, `.` une intersection libre, `~` un obstacle, `M` une maison, `f`
  des feuilles ;
- **les cartes** : une liste, dans un ordre qui réussit. `avancer`,
  `tourner-gauche`, `tourner-droite`, `ramasser`, `livrer`, `aller`,
  `si-maison` ;
- **un piège** : le préfixe `piège :` ;
- **un saut** : la carte visée porte `{#nom}`, le saut la désigne avec
  `-> nom`.

Une fois le niveau au point, copiez le bloc entier dans une page de séance.

<div class="thealivery-sandbox"></div>

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
