# Exemple : Détection de victoire horizontale

Cet exemple illustre la première forme de détection de victoire avec :

- Algorithme de fenêtre glissante pour détecter 4 pions alignés horizontalement
- Vérification après chaque coup
- Annonce du gagnant et fin de la partie
- Boucle de jeu complète jusqu'à la victoire

## Compilation et exécution

```bash
javac Main.java
java Main
```

## Exemple d'utilisation

Le jeu se termine dès qu'un joueur aligne 4 pions horizontalement :

```text
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
|X|X|X|X| | | |
 1 2 3 4 5 6 7

Le joueur X a gagné horizontalement !
```
