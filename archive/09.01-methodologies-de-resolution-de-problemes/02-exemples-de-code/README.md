# Méthodologies de résolution de problèmes - Exemples de code

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)

## Exemples de code progressifs

Ce dossier contient les 7 étapes du tutoriel sous forme de code exécutable.

Chaque exemple correspond à une étape de la résolution progressive du problème
de gestion de notes :

1. **01-notes-en-dur-variables** : Version initiale avec variables individuelles
   et calculs simples dans `main`
2. **02-notes-en-dur-tableau** : Introduction des tableaux avec taille fixe
3. **03-saisie-notes-nombre-fixe** : Ajout de la saisie utilisateur simple pour
   un nombre fixe de notes
4. **04-saisie-notes-nombre-dynamique** : Taille du tableau déterminée par la
   personne utilisatrice
5. **05-modification-note** : Fonctionnalité de modification d'une note
   existante
6. **06-validation-robuste** : Validation complète des entrées avec gestion des
   erreurs
7. **07-refactoring** (à venir) : Refactorisation avec des fonctions

> [!NOTE]
>
> Les étapes 3, 4 et 5 utilisent des validations minimales pour rester simples
> et focalisées sur la logique de base. L'étape 6 ajoute la robustesse complète.

Ces exemples sont conçus pour être étudiés dans l'ordre, en parallèle avec le
tutoriel dans les supports de cours. Chaque exemple peut être compilé et exécuté
indépendamment.

## Compilation et exécution

Pour chaque exemple :

```bash
cd XX-nom-de-lexemple/
javac Main.java
java Main
```

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
