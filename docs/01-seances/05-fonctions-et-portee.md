# Séance 05 - Fonctions et portée des variables

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

!!! warning "Contenu à rédiger"

    Cette page est une esquisse. Elle fixe l'intention de la séance pour que le
    programme soit lisible dès maintenant, mais son contenu détaillé reste à
    écrire.

## Intention

Découper un programme en morceaux nommés. Une fonction est une boîte à qui on
donne quelque chose et qui rend quelque chose : paramètres, traitement,
résultat.

Les fonctions arrivent ici, avant les conditions et les boucles, pour que tout
ce qui suit s'écrive dans des fonctions plutôt que dans un `main` qui
s'allonge.

## Objectifs pressentis

À la fin de cette séance, la personne qui étudie devrait être capable de :

- expliquer ce qu'est un paramètre et ce qu'est une valeur de retour ;
- écrire une fonction qui prend des paramètres et rend un résultat ;
- appeler une fonction depuis une autre ;
- expliquer où une variable existe et où elle n'existe pas ;
- diagnostiquer une erreur de portée à partir du message du compilateur.

## Le fil rouge à cette séance

La moyenne devient une fonction. Le `main` se réduit à lire les notes, appeler
la fonction et afficher son résultat.

## Activité pressentie

Reprendre le programme de la séance 04 et en extraire une fonction, à deux.
Puis échanger les copies et appeler la fonction de l'autre binôme sans voir son
contenu : c'est la démonstration qu'une fonction est une boîte.

## Point d'attention

La portée est la notion la plus abstraite du semestre. Elle se montre mieux par
l'erreur que par la définition : faire écrire un programme qui utilise une
variable hors de sa portée, lire le message du compilateur ensemble, et seulement
ensuite donner la règle.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
