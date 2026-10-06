# Séance 04 - Du problème au programme

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

!!! warning "Contenu à rédiger"

    Cette page est une esquisse. Elle fixe l'intention de la séance pour que le
    programme soit lisible dès maintenant, mais son contenu détaillé reste à
    écrire.

## Intention

Vous savez dessiner un enchaînement d'actions depuis la séance 01, et vous
savez déclarer une variable depuis la séance 03. Cette séance relie les deux :
comment passe-t-on d'un problème énoncé en français à un programme qui le
résout ?

C'est aussi la séance qui lance le problème fil rouge du semestre.

## Objectifs pressentis

À la fin de cette séance, la personne qui étudie devrait être capable de :

- poser un problème en termes d'entrées, de traitement et de sortie ;
- produire le diagramme d'activité d'une solution ;
- traduire ce diagramme en pseudo-code, puis le pseudo-code en Java ;
- identifier les cas limites que l'énoncé ne couvre pas ;
- lire une valeur saisie au clavier et afficher un résultat formaté.

## Le fil rouge démarre ici

> Calculer la moyenne des notes d'un groupe de personnes et dire qui a réussi.

Le problème est assez simple pour être posé maintenant, et assez riche pour
occuper successivement les conditions, les boucles, les fonctions et les
tableaux jusqu'à la séance 09.

À chaque séance, il est repris avec l'outil du jour et la solution précédente
est réécrite. C'est la manière la plus directe de rendre visible qu'un
programme n'est pas écrit une fois, mais réécrit.

Première version, ici : deux notes connues à l'avance, en dur dans le code,
une moyenne affichée, pas encore de décision. Les conditions arrivent en
séance 05.

## Activité pressentie

En groupe, poser le problème au tableau en trois colonnes : ce que le
programme reçoit, ce qu'il fait, ce qu'il produit. Puis chaque personne
dessine son diagramme et le traduit en pseudo-code avant d'ouvrir IntelliJ.

La comparaison des diagrammes produits sert à montrer qu'il existe plusieurs
solutions correctes au même problème.

## Point d'attention

C'est la première séance où les personnes écrivent du Java sur un problème qui
n'est pas un Hello World. Prévoir que le ratio soit inversé par rapport à
l'attente : beaucoup de temps sur la saisie clavier et le formatage de
l'affichage, peu sur le calcul lui-même.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
