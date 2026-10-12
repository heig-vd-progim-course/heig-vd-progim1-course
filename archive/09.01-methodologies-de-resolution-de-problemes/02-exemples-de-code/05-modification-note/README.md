# Modification de note

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Description

Cette cinquième et dernière étape complète le programme en ajoutant la
possibilité de modifier une note après la saisie. Cela permet de corriger une
erreur sans devoir tout recommencer.

Le programme :

- Demande à l'utilisatrice combien de notes elle souhaite saisir
- Demande la saisie de chaque note
- Affiche les notes saisies
- Calcule et affiche le minimum, maximum et moyenne
- Propose à l'utilisatrice de modifier une note
- Si l'utilisatrice accepte, lui permet de choisir quelle note modifier
- Recalcule les statistiques après modification

Cette version montre comment permettre la modification de données dans un
tableau et comment mettre à jour les calculs en conséquence.

## Compilation et exécution

```bash
javac Main.java
java Main
```

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
