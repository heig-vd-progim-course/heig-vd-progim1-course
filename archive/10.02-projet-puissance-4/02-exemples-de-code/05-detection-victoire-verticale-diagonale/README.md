# Exemple : Détection de victoire verticale et diagonale

Cet exemple complète les détections de victoire avec :

- Détection verticale (4 pions alignés dans une colonne)
- Détection diagonale descendante ↘ (de haut-gauche vers bas-droite)
- Détection diagonale montante ↗ (de bas-gauche vers haut-droite)
- Fonction globale `hasWon()` qui combine toutes les détections

## Compilation et exécution

```bash
javac Main.java
java Main
```

## Exemples de victoire

**Victoire verticale :**

```text
| | | | | | | |
| | | | | | | |
| | |X| | | | |
| | |X| | | | |
| | |X| | | | |
|O|O|X|O| | | |
 1 2 3 4 5 6 7
```

**Victoire diagonale ↘ :**

```text
| | | | | | | |
| | | | | | | |
|X| | | | | | |
|O|X| | | | | |
|O|O|X| | | | |
|X|O|O|X| | | |
 1 2 3 4 5 6 7
```

**Victoire diagonale ↗ :**

```text
| | | | | | | |
| | | | | | | |
| | | |X| | | |
| | |X|O| | | |
| |X|O|O| | | |
|X|O|O|X| | | |
 1 2 3 4 5 6 7
```
