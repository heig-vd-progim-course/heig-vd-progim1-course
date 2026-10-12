# Exemple : Validation robuste des entrées

Cet exemple illustre la validation des entrées utilisatrice avec :

- Vérification du type avec `hasNextInt()`
- Validation des valeurs dans une plage acceptable
- Boucles `while` pour redemander jusqu'à obtenir une valeur valide
- Gestion des erreurs avec messages explicites
- Consommation des entrées invalides avec `scanner.next()`

## Compilation et exécution

```bash
javac Main.java
java Main
```

## Comportement

Le programme vérifie toutes les entrées et redemande si nécessaire :

- Nombre de notes doit être un entier positif
- Chaque note doit être un entier entre 1 et 6
- L'index de modification doit être valide
- La nouvelle note doit être entre 1 et 6

Si l'utilisatrice entre une valeur incorrecte, le programme affiche un message
d'erreur et redemande.
