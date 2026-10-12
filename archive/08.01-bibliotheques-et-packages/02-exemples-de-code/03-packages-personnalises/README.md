# Exemple : Packages personnalisés avec fonctions statiques

Cet exemple illustre la création et l'utilisation de packages personnalisés dans
le contexte d'une bibliothèque d'outils communautaire avec :

- Déclaration de packages avec `package`.
- Organisation des fonctions dans un package `utils`.
- Import de fonctions depuis des packages personnalisés.
- Utilisation de **fonctions statiques uniquement** (pas de mot-clé `new`).
- Appel des fonctions via `NomClasse.nomFonction()`.
- Documentation des fonctions avec des commentaires.

**Important** : Cet exemple n'utilise aucune instanciation d'objet avec `new`.
Toutes les fonctions sont statiques et appelées directement sur les classes.

## Compilation et exécution

```bash
javac utils/*.java Main.java
java Main
```

Ou pour compiler et exécuter en une seule commande :

```bash
javac utils/*.java Main.java && java Main
```
