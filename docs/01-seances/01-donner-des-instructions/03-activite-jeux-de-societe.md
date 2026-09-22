# Activité 2 - Les règles du jeu

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif de l'activité

Passer d'un texte écrit en langue naturelle, ambigu et incomplet, à un
diagramme d'activité exécutable.

Les règles d'un jeu de société sont un cas idéal : elles décrivent un tour de
jeu, donc une séquence d'actions ; elles contiennent des choix, donc des
décisions ; et elles se répètent jusqu'à une condition de fin, donc une
itération. C'est exactement la structure d'un programme, écrite par des
personnes qui ne pensaient pas faire de l'informatique.

## Principe

Chaque groupe de trois ou quatre personnes reçoit un jeu de société avec ses
règles. Il ne s'agit pas d'y jouer, mais de produire le **diagramme d'activité
d'un tour de jeu**.

Durée : 25 minutes de travail, puis 15 minutes de restitution.

## Consignes

1. Lisez les règles ensemble, une fois, en entier.
2. Répondez par écrit à trois questions avant de dessiner :
    - quand est-ce que la partie s'arrête ?
    - de quoi une personne a-t-elle besoin de savoir pour jouer son tour ?
    - quels choix a-t-elle pendant son tour ?
3. Dessinez le diagramme d'activité **d'un seul tour**, du moment où c'est à
   votre tour jusqu'au moment où c'est au tour de la personne suivante.
4. Entourez en rouge tout ce que les règles écrites ne disent pas et que vous
   avez dû deviner.

Le point 4 est le plus important de l'activité. Gardez-le pour la fin, mais
faites-le.

## Ce que vous allez rencontrer

### Ce qui n'est pas dit

Les règles disent _"piochez une carte"_. Elles ne disent pas ce qui se passe si
la pioche est vide. Elles disent _"le joueur le plus jeune commence"_ mais pas
ce qu'on fait en cas d'égalité.

Ces trous sont invisibles quand on joue entre humains : on tranche en trois
secondes et on continue. Une machine ne tranche pas. Elle s'arrête, ou pire,
elle fait quelque chose d'absurde sans le signaler.

### Ce qui est dit deux fois différemment

La plupart des livrets de règles contiennent au moins une contradiction entre
la section détaillée et le résumé de la dernière page.

### Ce qui dépend de l'état

_"Vous ne pouvez pas rejouer la même carte"_ suppose que quelqu'un se souvient
des cartes déjà jouées. Ce souvenir est un état que le programme devra
maintenir explicitement.

## Grille de restitution

Chaque groupe présente en deux minutes :

1. Le nom du jeu et sa condition de fin.
2. Son diagramme, montré à la classe.
3. **La chose la plus importante que les règles ne disaient pas.**

Le point 3 est celui sur lequel on s'arrête. Chaque groupe en aura trouvé au
moins une, et les trous trouvés se ressembleront d'un jeu à l'autre : cas
limites, égalités, épuisement d'une ressource, fin anticipée.

## Le lien avec la suite du cours

Ce que vous venez de faire porte un nom dans le métier : c'est une
**spécification**. Écrire un programme, c'est d'abord constater que l'énoncé
qu'on vous donne est incomplet, puis décider explicitement de ce qu'on fait
dans les cas qu'il ne couvre pas.

Vous referez cet exercice au jalon 2 du mini-projet, sur votre propre problème.
Ce sera plus difficile, parce que les trous d'un énoncé qu'on a écrit soi-même
sont beaucoup plus durs à voir.

## Notes pour l'équipe enseignante

### Choix des jeux

Privilégier des jeux dont un tour est court et clairement délimité, avec deux
ou trois décisions par tour au maximum. Éviter les jeux à pose d'ouvriers ou à
phases multiples, qui produisent des diagrammes illisibles en 25 minutes.

Quelques familles qui fonctionnent bien :

- jeux de cartes à tour simple, type Uno, 6 qui prend, Skyjo ;
- jeux de dés avec relance, type Yam's, Qwixx, Can't Stop ;
- petits jeux de plis ou de collection, type Saboteur, Love Letter.

Prévoir un jeu par groupe, et au moins deux jeux différents dans la salle pour
que la restitution ne soit pas répétitive.

### Déroulement

- Annoncer d'emblée qu'on ne joue pas. Sinon, la moitié des groupes joue une
  partie et ne produit rien.
- Passer dans les groupes à dix minutes pour vérifier qu'ils dessinent un
  **tour** et non une **partie**. C'est l'erreur de cadrage la plus fréquente
  et elle coûte toute l'activité.
- Photographier les diagrammes intéressants pour la séance 03, où l'on
  reprendra la même démarche sur le problème fil rouge.

### Prolongement possible

Contacter une ludothèque locale ou un éditeur pour un prêt de jeux. Une piste
évoquée pour cette édition : la ludothèque d'Yverdon-les-Bains et la boutique
Deck'lick.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
