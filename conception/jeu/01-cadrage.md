# Cadrage

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Ce document dit quel problème le jeu résout, pour qui, et ce qu'il ne fera pas.
Les décisions prises sont résumées en fin de document.

## Le problème

Le public de ProgIM1 n'a jamais programmé. En séance 03, il découvre en même
temps trois choses difficiles :

1. **l'exécution** : un programme est une suite d'instructions exécutées une à
   une, dans l'ordre, par une machine qui ne devine rien ;
2. **l'état** : chaque instruction change quelque chose (une variable, une
   position), et la suivante part de ce nouvel état ;
3. **la syntaxe Java** : le cadre `public class Main`, les points-virgules, les
   accolades, les types.

La troisième masque souvent les deux premières : une personne qui se bat avec un
point-virgule ne regarde plus ce que fait son programme. Les séances 01 et 02
travaillent l'exécution sans syntaxe (diagrammes, blocs), mais ce travail
s'arrête quand le Java commence.

Le jeu prolonge ce travail tout au long du semestre : chaque notion Java est
aussi pratiquée **sans syntaxe**, avec des icônes, pour que l'exécution et
l'état restent visibles.

## La vision

> **Thealivery.** Théa, moine du thé, livre ses infusions à vélo-roulotte dans
> les rues d'un quartier en grille. On remet dans l'ordre les cartes de sa
> tournée, des icônes, puis on la regarde exécuter le programme, carte après
> carte.

Le jeu est une **machine notionnelle** (voir
l'[état de l'art](02-etat-de-l-art.md)) : une représentation simplifiée de ce
que fait l'ordinateur, qui sert à comprendre l'exécution. Théa se déplace sur
les intersections et le long des rues ; la carte en cours d'exécution est mise
en évidence, et l'on voit son effet avant de passer à la suivante.

## Le public et l'usage

- **Qui joue** : les personnes qui suivent ProgIM1, de la séance 01 à la séance
  09 environ. Plus tard, ProgIM2.
- **Quand** : en autonomie sur le site **et** en classe, projeté ou sur son
  téléphone. Le jeu doit donc être lisible de loin, et jouable au doigt sur un
  petit écran.
- **Où** : **dans les pages des séances**, à l'endroit où la notion est
  enseignée, comme les quiz et les problèmes de Parsons. Pas de page de jeu
  séparée.
- **Qui crée les niveaux** : l'enseignant, **dans le Markdown des pages**, comme
  les quiz. Écrire un niveau doit être aussi simple qu'écrire un quiz : c'est
  une exigence centrale, qui pèsera sur toute l'architecture.

## Les notions et ce que le jeu pourrait en montrer

Hypothèses de travail, à confirmer à l'étape de conception du jeu. L'ordre suit
la progression du cours, qui est contraignante : les fonctions arrivent avant
les conditions et les boucles.

| Séance | Notion                | Ce que Théa pourrait rendre visible                                      |
| -----: | :-------------------- | :----------------------------------------------------------------------- |
|     01 | Séquence              | Remettre en ordre avancer, tourner, livrer                               |
|     03 | Variables             | Un compteur de tasses livrées, affiché, qui change à chaque livraison    |
|     05 | Fonctions             | Une carte « tourner à droite » composée de trois « tourner à gauche »    |
|     06 | Conditions            | « Si la maison attend du thé, livrer » : le même programme, deux rues    |
|     07 | Boucles               | « Répéter jusqu'au bout de la rue » : un programme court, une longue rue |
|     08 | Tableaux              | Une rangée de maisons numérotées, chacune avec sa commande               |
|     09 | Chaînes de caractères | Des lettres sur les enseignes, qui forment un mot                        |

Représenter les variables, les conditions et les boucles **avec des icônes
seules** est la principale difficulté de conception : une carte qui en contient
d'autres, un emplacement pour une condition, un compteur visible. C'est l'objet
de l'étape de conception du jeu, et d'un prototype papier.

Une idée structurante : **le même niveau sur plusieurs grilles**. Un programme
qui ne marche que sur une grille précise peut être écrit sans condition ni
boucle ; s'il doit réussir sur trois grilles différentes, les conditions et les
boucles deviennent nécessaires. C'est ce qui fait sentir leur utilité, au lieu
de les présenter comme une règle.

## Les objectifs du projet

Critères de réussite, à préciser à l'étape des besoins :

- une personne qui n'a jamais programmé réussit le premier niveau sans aide, en
  moins de deux minutes ;
- le jeu fonctionne sur un téléphone, au doigt, et entièrement au clavier ;
- l'enseignant crée un nouveau niveau en moins de dix minutes, sans toucher au
  code du jeu ;
- une autre personne peut reprendre le code : moteur testé, documentation de
  conception, décisions consignées.

## Ce que le jeu ne fera pas (au moins dans la première version)

- **Pas de code tapé librement** : on assemble des lignes données. Écrire du
  Java reste le travail des ateliers, dans IntelliJ.
- **Pas de serveur** : ni compte, ni classement, ni sauvegarde en ligne. Le site
  reste statique, sur GitHub Pages.
- **Ni Java ni pseudo-code dans le jeu** : des icônes uniquement. Le lien avec
  le Java se fait dans la page de la séance, autour du jeu : même notion, au
  même endroit.
- **Pas de ProgIM2** tant que ProgIM1 n'est pas éprouvé en classe.
- **Pas de 3D ni de moteur de jeu lourd.**

## Les contraintes

- Site **Zensical** statique, publié sur **GitHub Pages**.
- **Progression du cours** : un niveau n'utilise que les notions déjà vues.
- **Langue** : textes en français, identifiants en anglais.
- **Accessibilité** : une alternative au glisser-déposer est obligatoire
  (critère WCAG 2.5.7) ; le composant Parsons actuel l'a déjà, au clavier.
- **Licences** : contenu sous CC BY-SA 4.0 ; toute dépendance doit avoir une
  licence permissive (MIT, Apache 2.0) et être figée dans le dépôt, comme TeaVM
  et CodeMirror sur la branche d'essai.
- **Maintenabilité** : la personne qui reprend le cours n'est peut-être pas
  développeuse web. Peu de dépendances, du code testé, une recette de
  construction écrite.

## Les risques

| Risque                                                | Parade                                         |
| :---------------------------------------------------- | :--------------------------------------------- |
| Le jeu devient un jouet, déconnecté du Java           | Dans les pages, à côté de la notion Java       |
| Des icônes ambiguës pour les boucles ou les variables | Prototype papier testé avant le code           |
| Le périmètre gonfle (éditeur de niveaux, ProgIM2...)  | Non-objectifs écrits, versions successives     |
| Une seule personne maintient le code                  | Moteur sans DOM et testé, ADR, documentation   |
| Le temps manque pendant le semestre                   | Un premier niveau jouable tôt, testé en classe |
| Le glisser-déposer marche mal au doigt ou au clavier  | Réutiliser le composant Parsons, déjà testé    |

## Décisions prises

| Question                       | Décision                                                 |
| :----------------------------- | :------------------------------------------------------- |
| Quand joue-t-on ?              | En autonomie et en classe                                |
| Qui écrit les niveaux, et où ? | L'enseignant, dans le Markdown des pages                 |
| Cartes                         | Des icônes uniquement, ni Java ni pseudo-code            |
| Langage                        | TypeScript, construit avec esbuild et figé dans le dépôt |
| Où vit le jeu ?                | Dans les pages des séances                               |
| Personnage                     | Théa, moine du thé à vélo-roulotte, personnage original  |
| Nom du jeu                     | Thealivery                                               |

### Pourquoi un personnage original

Théa est inspirée de Dex, la moine du thé de _Monk & Robot_ de Becky Chambers.
La [FAQ de l'autrice](https://www.otherscribbles.com/faq) accepte les créations
de fans et les projets scolaires à condition qu'ils ne rapportent pas d'argent.
Mais le cours est publié sous CC BY-SA 4.0, qui autorise toute réutilisation,
commerciale comprise : nous ne pouvons pas accorder ce droit sur un personnage
qui ne nous appartient pas.

Une moine du thé qui livre à vélo-roulotte est une idée, et une idée n'est pas
protégée. Théa a donc son nom, son apparence et son monde à elle, et tout le jeu
reste sous CC BY-SA. Les crédits saluent l'inspiration.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
