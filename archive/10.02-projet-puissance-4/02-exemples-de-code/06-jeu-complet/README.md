# Exemple : Jeu complet

Cet exemple représente la version finale jouable du Puissance 4 avec :

- Toutes les détections de victoire (horizontal, vertical, diagonales)
- Détection de match nul (grille pleine)
- Validation robuste des entrées
- Messages d'information clairs
- Code bien structuré avec constantes
- Commentaires et documentation complète

## Compilation et exécution

```bash
javac Main.java
java Main
```

## Fonctionnalités

- **Grille 6×7** : Dimensions standard du Puissance 4
- **2 joueurs** : X (rouge) et O (jaune) alternent
- **Gravité** : Les pions tombent à la position la plus basse
- **Victoires** : Détection de 4 pions alignés (H/V/D)
- **Match nul** : Détection de grille pleine
- **Validation** : Vérification des colonnes valides et non pleines
- **Quitter** : Possibilité de quitter avec 0

## Exemple de partie

```text
=== Puissance 4 - Jeu complet ===

| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
 1 2 3 4 5 6 7

Joueur X - Choisissez une colonne (1-7, 0 pour quitter) : 4

...

| | | | | | | |
| | | | | | | |
| | |O| | | | |
| | |X|O| | | |
| |O|X|X|O| | |
|X|X|O|X|O|X| |
 1 2 3 4 5 6 7

Le joueur X a gagné !
```

## Extensions possibles

Une fois le jeu maîtrisé, vous pouvez ajouter :

- Interface colorée (codes ANSI)
- Rejou (recommencer une partie)
- Compteur de scores
- Grille personnalisable
- Intelligence artificielle
- Sauvegarde de partie
