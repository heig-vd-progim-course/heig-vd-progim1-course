# Séance 02 - Programmer sans écrire de code

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Notes pour l'équipe enseignante. Le support de cours de cette séance est
[ici](../01-seances/02-programmer-sans-ecrire-de-code/index.md).

## Ce que la séance doit produire

Deux choses, dans cet ordre :

1. La certitude que les trois structures de la séance 01 décrivent vraiment un
   programme qui tourne.
2. **La sensation que les blocs sont une impasse.** C'est le débriefing final
   qui porte la séance 03 tout entière : si les cinq limites ne sortent pas de
   la bouche des personnes, la séance suivante arrive sans motivation.

## Avant la séance

| Quoi                              | Détail                                                |
| :-------------------------------- | :---------------------------------------------------- |
| Deux ou trois programmes MakeCode | Partagés, liens distribués en classe                   |
| Test du réseau de la salle        | `arcade.makecode.com` avec vingt machines simultanées  |
| Décision sur les comptes          | Liens de partage anonymes par défaut, pas de compte Microsoft |

### Critères d'un bon programme d'observation

- il fonctionne, sans bogue visible ;
- il tient sur un écran de blocs, quitte à zoomer ;
- il contient exactement les trois structures et au moins deux événements ;
- il comporte **au moins un comportement contre-intuitif**, que la majorité de
  la classe prédira faux.

Le dernier point fait la valeur de la phase. Un programme dont tout le monde
prédit correctement le comportement n'enseigne rien.

### Le piège à planter volontairement

Préparer le programme avec **une valeur dupliquée à deux endroits**, pour que
la modification 1 ou 3 de la phase 2 échoue partiellement chez une partie de la
classe.

C'est le meilleur argument possible en faveur des constantes, il ne coûte rien
à mettre en place, et il sera rappelé en séance 03 au moment d'introduire
`final`.

### À vérifier chez MakeCode avant la séance

L'éditeur a intégré un explicateur d'erreurs par intelligence artificielle.
Regarder ce qu'il fait et décider quoi en dire, plutôt que de le découvrir en
direct devant la classe.

## Phase 1 - Observer

- Passer voir les grilles de prédiction **avant** que les gens ne lancent le
  jeu. Certaines personnes lanceront d'abord ; le leur faire remarquer sans en
  faire une affaire.
- Relever deux ou trois prédictions fausses intéressantes pour le débriefing
  final.
- Ne pas répondre aux questions du type _"ça fait quoi ce bloc ?"_ par la
  réponse. Renvoyer à la
  [documentation des blocs](https://arcade.makecode.com/reference) ou à
  l'infobulle de l'éditeur. C'est la première occasion du semestre de faire
  chercher plutôt que de dire.

## Phase 2 - Modifier

- La règle du changement unique ne sera pas respectée spontanément. La rappeler
  une fois collectivement à dix minutes, puis individuellement.
- Pour l'exercice d'échange, imposer que le bogue soit visible en jouant. Un
  bogue caché dans une branche jamais atteinte ne s'y prête pas.
- Personne ne finira les douze modifications. C'est prévu. Le dire d'emblée
  évite le sentiment d'échec.

## Phase 3 - Créer

### Validation des diagrammes

C'est le goulot d'étranglement : avec vingt personnes, il faut tenir une minute
par diagramme. Deux questions suffisent :

1. _"Montre-moi où la partie se termine."_
2. _"Qu'est-ce que ton programme doit retenir ?"_

Un diagramme sans fin ou sans variable identifiée repart pour deux minutes.

### Choix de sujets

Les sujets 4 et 5 sont plus difficiles qu'ils n'en ont l'air : le chronomètre
demande de manipuler le temps, la mémoire demande une liste. Les laisser
disponibles pour les personnes qui avancent vite, mais ne pas les recommander
d'emblée.

### Pendant la construction

- Circuler en regardant les écrans plutôt qu'en attendant les mains levées.
  Une personne bloquée depuis dix minutes ne lève pas la main.
- Résister à la tentation de prendre la souris. Décrire le bloc à chercher, ne
  pas le poser.
- Noter qui termine en avance : ces personnes animent la restitution croisée.

## Le débriefing final

Cinq minutes, sur une seule question : **qu'est-ce que les blocs vous ont
empêché de faire ?**

Les réponses attendues, à faire émerger plutôt qu'à énoncer :

- on ne peut pas chercher un mot dans son programme ;
- on ne peut pas copier une partie du programme dans un message pour demander
  de l'aide ;
- on ne peut pas voir ce qui a changé entre hier et aujourd'hui ;
- on ne peut pas travailler à deux sur le même programme ;
- au-delà d'un écran, on ne retrouve plus rien.

Ces cinq limites sont exactement les raisons pour lesquelles le code
professionnel est du texte. C'est la transition vers la séance 03 : **ne pas la
donner maintenant, l'annoncer**.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
