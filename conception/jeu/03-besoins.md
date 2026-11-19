# Besoins

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Ce document dit ce que Thealivery doit faire, pour qui, et comment on vérifiera
qu'il le fait. Il découle du [cadrage](01-cadrage.md) et de l'entretien du 19
novembre 2026, et a été validé le même jour.

## Les personas

### Camille, qui découvre la programmation

19 ans, première année en Ingénierie des médias. N'a jamais programmé. Joue sur
son ordinateur pendant la séance, ou sur son téléphone dans le train du retour.
Se décourage vite devant un message qu'elle ne comprend pas, mais aime les défis
courts. Ne lit pas les consignes longues.

Ce qu'il lui faut : comprendre en quelques secondes ce qu'on attend d'elle, voir
pourquoi son programme échoue, et sentir qu'elle progresse.

### Vincent, qui écrit les niveaux

Enseignant du cours. Prépare ses séances dans le Markdown du site, souvent la
veille. Écrit déjà des quiz et des problèmes de Parsons de cette façon. Ne veut
pas toucher au code TypeScript pour ajouter un niveau.

Ce qu'il lui faut : écrire un niveau en quelques lignes lisibles, le voir tout
de suite dans `zensical serve`, et être prévenu clairement s'il s'est trompé.

### Alex, qui reprendra le cours

Reprend ProgIM1 dans trois ans. Connaît Java, un peu le web, pas TypeScript en
profondeur. N'a jamais parlé à Vincent.

Ce qu'il lui faut : comprendre pourquoi le jeu est construit ainsi, corriger une
règle sans tout casser, et reconstruire le jeu en suivant une recette écrite.

## Les règles du jeu, telles que décidées

1. Un niveau montre une **grille**, Théa sur une intersection, orientée, et des
   **cartes-icônes mélangées**.
2. On remet les cartes dans l'ordre, au doigt, à la souris ou au clavier.
3. On clique sur **Exécuter**. Théa suit les cartes une à une, la carte en cours
   mise en évidence, avec une animation sobre.
4. Théa **s'arrête dès qu'une carte est impossible**, et le dit à la première
   personne :
   - une flaque ou un trou sur l'intersection suivante : elle avance, tombe
     dedans, et dit « Plouf ! Je suis tombée dans une flaque. » ;
   - le bord de la grille : elle reste sur place et dit « Je ne peux pas sortir
     du quartier. » ;
   - ramasser sans rien par terre : « Je n'ai rien à ramasser. » ;
   - livrer sans thé : « Je n'ai pas de thé à livrer. » ;
   - livrer là où personne n'attend : « Personne n'attend de thé ici. »
5. Si toutes les cartes passent, on **vérifie l'objectif** du niveau. S'il n'est
   pas atteint, Théa le dit aussi : « Ma tournée n'est pas finie : il reste une
   maison à livrer. »
6. Chaque exécution est un **essai**, compté. Au-delà de trois essais ratés, un
   message suggère de relire la section de la page.
7. **Aide adaptative** : après trois essais ratés, une carte est placée à sa
   bonne position et verrouillée. Chaque nouvel échec en place une de plus.
8. Un niveau réussi est **mémorisé dans le navigateur**, avec des **étoiles** :
   - trois étoiles : réussi du premier coup ;
   - deux étoiles : réussi en trois essais au plus, sans aide ;
   - une étoile : réussi avec l'aide, ou après plus de trois essais.
9. Des **sons** courts accompagnent les actions et la réussite. Ils sont
   **désactivés par défaut** : une salle entière joue en même temps.

## Les récits utilisateur

Priorités selon la méthode MoSCoW : **M** indispensable à la première version,
**S** important, **C** agréable, **W** exclu pour l'instant.

### Jouer

| N°    | En tant que… | je veux…                                              | afin de…                                       | Prio. |
| :---- | :----------- | :---------------------------------------------------- | :--------------------------------------------- | :---: |
| US-01 | Camille      | remettre les cartes dans l'ordre au doigt             | jouer sur mon téléphone                        |   M   |
| US-02 | Camille      | tout faire au clavier                                 | jouer sans souris, ou avec un lecteur d'écran  |   M   |
| US-03 | Camille      | voir Théa exécuter carte après carte                  | comprendre ce que fait chaque carte            |   M   |
| US-04 | Camille      | comprendre en une phrase pourquoi elle s'arrête       | corriger mon programme                         |   M   |
| US-05 | Camille      | recommencer sans recharger la page                    | essayer une autre idée tout de suite           |   M   |
| US-06 | Camille      | ralentir ou suivre pas à pas l'exécution              | voir précisément où ça se passe mal            |   S   |
| US-07 | Camille      | couper le son                                         | jouer en classe ou dans le train               |   M   |
| US-08 | Camille      | que le même programme réussisse sur plusieurs grilles | sentir pourquoi conditions et boucles existent |   S   |

### Être aidée et progresser

| N°    | En tant que… | je veux…                                               | afin de…                | Prio. |
| :---- | :----------- | :----------------------------------------------------- | :---------------------- | :---: |
| US-10 | Camille      | qu'une carte se place seule après trois échecs         | ne pas rester bloquée   |   M   |
| US-11 | Camille      | une suggestion de relire la section après trois échecs | savoir où chercher      |   M   |
| US-12 | Camille      | voir mes étoiles en revenant sur la page               | savoir où j'en suis     |   S   |
| US-13 | Camille      | effacer ma progression                                 | rejouer depuis le début |   C   |
| US-14 | Camille      | un classement avec les autres                          | me comparer             |   W   |

### Écrire un niveau

| N°    | En tant que… | je veux…                                                  | afin de…                               | Prio. |
| :---- | :----------- | :-------------------------------------------------------- | :------------------------------------- | :---: |
| US-20 | Vincent      | écrire un niveau en quelques lignes de Markdown           | préparer une séance sans coder         |   M   |
| US-21 | Vincent      | écrire les cartes dans le bon ordre, mélangées par le jeu | ne pas mélanger à la main              |   M   |
| US-22 | Vincent      | ajouter des cartes pièges                                 | forcer la lecture de chaque carte      |   M   |
| US-23 | Vincent      | un message clair si mon niveau est invalide               | corriger sans chercher dans la console |   M   |
| US-24 | Vincent      | que le jeu vérifie que ma solution réussit                | ne jamais publier un niveau impossible |   S   |
| US-25 | Vincent      | mettre 4 ou 5 niveaux sur une même page                   | couvrir une notion en plusieurs étapes |   M   |
| US-26 | Vincent      | un éditeur visuel de niveaux                              | dessiner la grille à la souris         |   W   |

### Maintenir

| N°    | En tant que… | je veux…                                              | afin de…                             | Prio. |
| :---- | :----------- | :---------------------------------------------------- | :----------------------------------- | :---: |
| US-30 | Alex         | que chaque règle du moteur ait un test                | modifier sans casser                 |   M   |
| US-31 | Alex         | une recette de construction écrite                    | reconstruire le jeu sans aide        |   M   |
| US-32 | Alex         | les décisions consignées en ADR                       | comprendre pourquoi c'est fait ainsi |   M   |
| US-33 | Alex         | ajouter une nouvelle carte en un seul endroit du code | faire évoluer le jeu vers ProgIM2    |   S   |

### Critères d'acceptation des récits indispensables

Formulés « étant donné…, quand…, alors… », ils deviendront des tests.

- **US-03** : étant donné un niveau et des cartes en ordre, quand je clique sur
  Exécuter, alors chaque carte est mise en évidence pendant que Théa l'exécute,
  et une seule à la fois.
- **US-04** : étant donné une carte « avancer » face à une flaque, quand Théa
  l'exécute, alors elle tombe dans la flaque, l'exécution s'arrête, la carte
  fautive est signalée, et « Plouf ! Je suis tombée dans une flaque. »
  s'affiche.
- **US-05** : étant donné une exécution terminée ou arrêtée, quand je modifie
  l'ordre des cartes et clique sur Exécuter, alors Théa repart de sa position de
  départ.
- **US-10** : étant donné trois essais ratés, quand le troisième se termine,
  alors une carte rejoint sa bonne position, verrouillée, et ne peut plus être
  déplacée.
- **US-20** : étant donné un niveau écrit selon le format ci-dessous, quand la
  page s'affiche, alors le niveau est jouable, sans autre fichier à modifier.
- **US-23** : étant donné une grille sans Théa, quand la page s'affiche, alors
  le bloc affiche « Niveau invalide : la grille ne contient pas Théa (T). » à la
  place du jeu.

## Les exigences non fonctionnelles

| Domaine         | Exigence                                                                                                |
| :-------------- | :------------------------------------------------------------------------------------------------------ |
| Écrans          | Jouable dès 320 pixels de large, au doigt ; lisible sur un ordinateur portable                          |
| Accessibilité   | WCAG 2.2 niveau AA : clavier complet, focus visible, contrastes, alternative au glisser-déposer (2.5.7) |
| Lecteur d'écran | Chaque icône a un nom (« avancer ») ; chaque message de Théa est annoncé                                |
| Animation       | Sobre ; réduite au minimum si le système demande moins d'animations                                     |
| Son             | Désactivé par défaut ; activable en un clic, choix mémorisé                                             |
| Poids           | Code : 100 Ko compressés au plus ; images et sons chargés seulement s'il y a un niveau sur la page      |
| Rapidité        | Niveau jouable en moins de 2 secondes sur un téléphone moyen en 4G                                      |
| Navigateurs     | Deux dernières versions de Chrome, Firefox, Safari et Edge, sur ordinateur et mobile                    |
| Serveur         | Aucun : site statique sur GitHub Pages                                                                  |
| Mémoire         | Progression dans le stockage du navigateur ; le jeu marche aussi s'il est bloqué                        |
| Langue          | Textes en français ; identifiants du code en anglais                                                    |
| Licences        | Code et contenu sous CC BY-SA 4.0 ; images et sons sous CC0, MIT ou CC BY, crédités                     |
| Qualité         | TypeScript strict, Prettier, ESLint ; moteur testé sans navigateur                                      |

## Les illustrations et les sons

Pas de dessin original au départ : des ressources libres, cohérentes entre
elles.

- **Les icônes des cartes** : [Tabler Icons](https://tabler.io/icons), sous
  licence MIT, plus de 5000 icônes au même trait. Le jeu contient le nécessaire
  : `teapot`, `bike`, `cup`, `leaf`, `home`, `arrow-up`, `arrow-back-up`,
  `arrow-forward-up`, `hand-grab`, `repeat`, `star`, `volume`.
- **Le quartier, Théa et sa roulotte** : les packs de
  [Kenney](https://kenney.nl/), sous licence CC0, sans aucune condition. Licence
  de chaque pack à vérifier sur sa page au moment du choix. À défaut, un SVG
  très simple.
- **Les sons** : les packs d'interface de Kenney, CC0 également.

## Premier jet du format d'un niveau

Une proposition à affiner à l'étape de conception du jeu. Elle suit le modèle
des quiz et des problèmes de Parsons : un bloc `<div>`, une grille en texte, et
les cartes **dans le bon ordre**, que le jeu mélange.

````markdown
<div class="thealivery" markdown>

Livrez une tasse de thé à la maison.

```text
T> .  .  .
~  ~  .  ~
.  .  .  M
```

- avancer
- avancer
- tourner-droite
- avancer
- avancer
- tourner-gauche
- avancer
- livrer
- piège : ramasser

</div>
````

- La grille : une case par intersection, séparées par des espaces. `T>` Théa
  tournée vers la droite (`T<`, `T^`, `Tv` pour les autres directions), `.` une
  intersection libre, `~` une flaque ou un trou, `M` une maison qui attend du
  thé. Théa part avec son thé dans la roulotte : `ramasser` ne sert que s'il y a
  quelque chose par terre, ici c'est donc un piège.
- Les cartes : un mot par carte, côté enseignant ; une icône côté jeu. Le
  préfixe `piège :` marque un distracteur.
- L'objectif découle de la grille : toutes les maisons livrées.
- Plusieurs blocs `text` dans un même niveau : le même programme doit réussir
  sur chaque grille (US-08).

Les obstacles sont **sur les intersections** : des flaques ou des trous, selon
ce que proposent les illustrations retenues. C'est plus simple à écrire en texte
que des murs entre deux intersections.

## Décisions de l'entretien

| Point               | Décision                                                                |
| :------------------ | :---------------------------------------------------------------------- |
| Jouer en classe     | Chaque personne sur son ordinateur ou son téléphone                     |
| Programme faux      | Théa s'arrête à la carte impossible, le dit ; objectif vérifié à la fin |
| Essais              | Comptés ; suggestion de relire au-delà de trois                         |
| Aide adaptative     | Après trois échecs, une carte de plus placée à chaque échec             |
| Progression         | Dans le navigateur, avec trois, deux ou une étoile                      |
| Niveaux par séance  | 4 ou 5                                                                  |
| Son                 | Oui, désactivé par défaut                                               |
| Animation           | Sobre                                                                   |
| Illustrations       | Ressources libres (Tabler Icons, Kenney), sinon SVG très simple         |
| Orientation de Théa | `T>`, `T<`, `T^`, `Tv` dans la grille                                   |
| Obstacles           | Sur les intersections : flaques ou trous, Théa tombe dedans             |

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
