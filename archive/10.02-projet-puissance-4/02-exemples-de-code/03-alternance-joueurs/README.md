# Exemple : Alternance des joueuses

Cet exemple illustre le système de tour par tour avec :

- Boucle de jeu permettant de placer plusieurs pions
- Alternance automatique entre X et O
- Affichage de la joueuse courant
- Possibilité de quitter en tapant 0

## Compilation et exécution

```bash
javac Main.java
java Main
```

## Exemple d'utilisation

```text
=== Puissance 4 - Étape 3 : Alternance des joueuses ===

| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
 1 2 3 4 5 6 7

Joueur X - Choisissez une colonne (1-7, 0 pour quitter) : 4

| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | |X| | | | |
 1 2 3 4 5 6 7

Joueur O - Choisissez une colonne (1-7, 0 pour quitter) : 5

| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | |X|O| | | |
 1 2 3 4 5 6 7
```
