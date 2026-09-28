# Séance 03 - De l'instruction à la machine

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

!!! warning "Contenu à rédiger"

    Cette page est une esquisse. Elle fixe l'intention de la séance pour que le
    programme soit lisible dès maintenant, mais son contenu détaillé reste à
    écrire.

## Intention

En séance 02, vous avez programmé sans écrire une ligne de texte, et vous avez
buté sur cinq limites précises : on ne peut ni chercher, ni copier, ni comparer
deux versions, ni travailler à plusieurs, ni s'y retrouver au-delà d'un écran.

Cette séance répond à ces limites. Le code professionnel est du texte, et cette
séance explique ce qui lit ce texte et le transforme en actions.

Elle sert aussi de charnière : à partir d'ici, on ne fait plus des jeux, on
traite le problème fil rouge du semestre.

## Objectifs pressentis

À la fin de cette séance, la personne qui étudie devrait être capable de :

- expliquer pourquoi le code professionnel est textuel plutôt que graphique ;
- expliquer ce qu'est un langage de programmation ;
- distinguer la compilation de l'interprétation et donner un exemple de chaque ;
- décrire ce qui se passe entre l'enregistrement d'un fichier et l'exécution du
  programme ;
- traduire un diagramme d'activité en pseudo-code ;
- reconnaître qu'un message d'erreur est une information et non une punition.

## Activité pressentie

Par deux, sur papier. Une personne écrit un court programme en pseudo-code,
l'autre joue la machine et l'exécute littéralement, sans rien interpréter et
sans être serviable.

On compte le nombre d'allers-retours nécessaires avant que cela fonctionne. On
rejoue ensuite le même programme avec un interpréteur réel, pour comparer ce
qui est signalé, quand, et sous quelle forme.

Le débriefing porte sur deux points : ce qu'on fait quand on est bloqué, et la
différence entre une erreur détectée avant l'exécution et une erreur détectée
pendant. C'est la porte d'entrée vers la compilation.

## Le fil rouge démarre ici

Seconde partie de la séance. Le problème qui traversera les séances 03 à 09 est
posé :

> Calculer la moyenne des notes d'un groupe de personnes et dire qui a réussi.

La démarche est celle de la séance 01, appliquée à un problème qui n'est pas un
jeu : poser les entrées et la sortie, dessiner le diagramme d'activité,
identifier les cas limites que l'énoncé ne couvre pas, puis écrire le
pseudo-code.

## Point d'attention

**C'est la séance la plus dense du semestre.** Elle porte à la fois la théorie
sur la machine, l'activité codeur et interprète, et le lancement du fil rouge.
Trois issues possibles, à arbitrer avant de rédiger :

1. Garder les trois, en raccourcissant l'activité codeur et interprète à vingt
   minutes.
2. Déplacer le lancement du fil rouge en séance 04, où il servirait de support
   au premier programme Java, au prix d'une séance 04 déjà chargée par
   l'installation de l'environnement.
3. Accepter treize séances au lieu de douze, si le calendrier le permet.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
