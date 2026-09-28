# Phase 1 - Observer

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif de la phase

Lire un programme que vous n'avez pas écrit et prédire ce qu'il fait avant de
l'exécuter.

C'est l'activité la plus proche de ce que vous ferez réellement dans votre vie
professionnelle : la plupart du temps, on ne part pas d'une page blanche, on
arrive sur du code existant.

## La règle

**Vous ne lancez pas le jeu avant d'avoir écrit ce que vous pensez qu'il va
faire.**

Cette règle est tout l'exercice. Lancer d'abord et regarder ensuite ne vous
apprend rien, parce que vous reconstruirez l'explication après coup et vous
aurez l'impression d'avoir compris. Prédire d'abord vous dit exactement où
votre modèle mental est faux.

## Déroulé

1. Ouvrez le programme dont le lien vous est donné en classe.
2. **Sans rien lancer**, remplissez la grille d'observation ci-dessous.
3. Lancez le jeu et jouez-y deux minutes.
4. Reprenez votre grille et marquez en rouge ce que vous aviez faux.
5. Pour chaque erreur, retrouvez le bloc responsable.

L'étape 5 est celle qui compte. Une prédiction fausse dont on n'a pas trouvé la
cause est une prédiction fausse gardée pour plus tard.

## Grille d'observation

À remplir avant de lancer quoi que ce soit.

| Question                                                        | Ma prédiction |
| :-------------------------------------------------------------- | :------------ |
| Que voit-on à l'écran juste après le démarrage ?                 |               |
| Que se passe-t-il si je ne touche à rien pendant dix secondes ?  |               |
| Que se passe-t-il quand j'appuie sur le bouton A ?               |               |
| Qu'est-ce qui fait augmenter le score ?                          |               |
| Qu'est-ce qui fait perdre ?                                      |               |
| La partie peut-elle se terminer autrement qu'en perdant ?        |               |
| Quelle est la valeur de départ de chaque variable du programme ? |               |

## Retrouver les trois structures

En séance 01, nous avons vu que tout programme se construit avec trois
structures. Elles sont toutes les trois dans ce jeu. Retrouvez-les.

| Structure  | Sa forme en blocs                                    | Où dans ce jeu ? |
| :--------- | :--------------------------------------------------- | :--------------- |
| Séquence   | Des blocs empilés, exécutés de haut en bas            |                  |
| Sélection  | Un bloc `si ... alors` avec sa condition              |                  |
| Itération  | Un bloc `pour toujours` ou une boucle `répéter`       |                  |

Notez la correspondance : le losange que vous dessiniez en séance 01 est
devenu un bloc `si`, et la flèche qui remontait est devenue un bloc
`pour toujours`. Les blocs ne sont rien d'autre que votre diagramme, rendu
exécutable.

## Une quatrième forme : l'événement

Il y a dans ce programme des blocs qui ne ressemblent à aucune des trois
structures : ceux qui commencent par `quand`. Par exemple
`quand le bouton A est pressé`.

Ces blocs ne s'exécutent pas dans l'ordre. Ils attendent. Quelque chose de
l'extérieur du programme arrive — une touche pressée, deux sprites qui se
touchent — et le bloc s'exécute à ce moment-là, sans qu'aucune ligne du
programme ne l'ait appelé.

C'est un **événement**. Il faut le voir comme une instruction laissée à la
machine : _"si un jour ceci arrive, alors fais cela"_.

!!! note "Pourquoi c'est important maintenant"

    Un diagramme d'activité classique se lit du début à la fin. Un programme à
    événements n'a pas ce déroulé unique : plusieurs choses attendent en
    parallèle et se déclenchent dans un ordre que vous ne maîtrisez pas.

    Vous retrouverez exactement cette idée quand vous ferez des interfaces
    graphiques ou du web. Notez simplement, aujourd'hui, que cela existe et que
    cela se dessine mal.

## Questions à se poser en lisant

- Combien de variables ce programme utilise-t-il, et que représente chacune ?
- Où la valeur de chaque variable change-t-elle ?
- Y a-t-il un bloc qui n'est jamais exécuté ? Comment en être sûr ?
- Si je supprime ce bloc, qu'est-ce qui casse ? Ne le faites pas encore, notez
  votre réponse : vous la vérifierez en phase 2.

## Notes pour l'équipe enseignante

### Matériel à préparer

Deux ou trois programmes MakeCode partagés, de complexité croissante, dont les
liens sont distribués en classe. Critères pour un bon programme d'observation :

- il fonctionne, sans bogue visible ;
- il tient sur un écran de blocs, quitte à zoomer ;
- il contient exactement les trois structures et au moins deux événements ;
- il comporte au moins un comportement contre-intuitif, que la majorité de la
  classe prédira faux.

Le dernier point fait la valeur de la phase. Un programme dont tout le monde
prédit correctement le comportement n'enseigne rien.

### Pendant la phase

- Passer voir les grilles avant que les gens ne lancent le jeu. Certaines
  personnes lanceront d'abord ; le leur faire remarquer sans en faire une
  affaire.
- Relever deux ou trois prédictions fausses intéressantes pour le débriefing
  final.
- Ne pas répondre aux questions du type _"ça fait quoi ce bloc ?"_ par la
  réponse. Renvoyer à la [documentation des blocs](https://arcade.makecode.com/reference)
  ou à l'infobulle de l'éditeur. C'est la première occasion du semestre de
  faire chercher plutôt que de dire.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
