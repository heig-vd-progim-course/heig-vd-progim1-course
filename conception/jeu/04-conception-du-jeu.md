# Conception du jeu

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Ce document décrit le jeu lui-même : son monde, ses cartes, la façon dont chaque
notion du cours s'y représente, le format exact d'un niveau, et les niveaux de
la séance 01. Il s'appuie sur les [besoins](03-besoins.md) validés. Les
maquettes et l'architecture en découleront.

## Le monde

Un quartier vu de dessus, en grille. Théa circule à vélo-roulotte d'une
intersection à l'autre, le long des rues.

| Symbole             | Élément                              | Rendu pressenti                |
| :------------------ | :----------------------------------- | :----------------------------- |
| `T>` `T<` `T^` `Tv` | Théa et la direction où elle regarde | Théa et sa roulotte, de dessus |
| `.`                 | Une intersection libre               | Un carrefour                   |
| `~`                 | Une flaque ou un trou                | Une flaque (icône `droplet`)   |
| `M`                 | Une maison qui attend du thé         | Une maison (icône `home`)      |
| `f`                 | Des feuilles de thé à ramasser       | Des feuilles (icône `leaf`)    |

Théa part avec assez de thé dans sa roulotte. L'**objectif** d'un niveau découle
de la grille : toutes les maisons livrées et toutes les feuilles ramassées.

## Le déroulement d'un niveau

1. **Préparation** : les cartes sont mélangées. On les déplace, on les remet
   dans l'ordre. Les cartes pièges sont mêlées aux autres.
2. **Exécution** : un clic sur _Exécuter_. Théa repart de sa position de départ
   et exécute les cartes une à une. La carte en cours est mise en évidence ; la
   vitesse est réglable, et l'on peut avancer pas à pas.
3. **Arrêt** : à la première carte impossible, Théa s'arrête, la carte est
   signalée, et Théa dit pourquoi.
4. **Vérification** : si toutes les cartes passent, on vérifie l'objectif.
5. **Résultat** : réussite (étoiles, son si activé), ou échec (essai compté,
   aide éventuelle). On revient à la préparation sans recharger la page.

Ce déroulement est une machine à états. Il sera dessiné en UML (diagramme
d'états) à l'étape d'architecture.

## Les cartes de la première version

| Mot (Markdown)   | Icône Tabler      | Effet                                  | Si impossible                               |
| :--------------- | :---------------- | :------------------------------------- | :------------------------------------------ |
| `avancer`        | `arrow-up`        | Une intersection en avant              | « Je ne peux pas sortir du quartier. »      |
|                  |                   | Tombe dans une flaque                  | « Plouf ! Je suis tombée dans une flaque. » |
| `tourner-gauche` | `corner-up-left`  | Quart de tour à gauche, sur place      | Toujours possible                           |
| `tourner-droite` | `corner-up-right` | Quart de tour à droite, sur place      | Toujours possible                           |
| `ramasser`       | `hand-grab`       | Ramasse les feuilles de l'intersection | « Je n'ai rien à ramasser. »                |
| `livrer`         | `cup`             | Livre la maison de l'intersection      | « Personne n'attend de thé ici. »           |

Chaque carte porte aussi son nom en texte caché, lu par les lecteurs d'écran et
affiché au survol : l'icône seule ne suffit pas à tout le monde.

## Une décision clé : la réussite se juge à l'exécution

Un problème de Parsons classique compare l'ordre proposé à l'ordre de la
solution. Ici, **un programme est juste s'il atteint l'objectif**, quel que soit
l'ordre.

La vérification des niveaux de la séance 01 le montre : sur les niveaux 04 et
05, **deux ordres différents** réussissent. Refuser l'un des deux serait faux,
et la personne ne comprendrait pas pourquoi. L'ordre écrit par l'enseignant
reste utile pour deux choses :

- l'**aide adaptative**, qui place les cartes selon cet ordre ;
- la **vérification du niveau** à l'affichage : si l'ordre de l'enseignant
  n'atteint pas l'objectif, le niveau est signalé comme invalide (US-24).

## Représenter chaque notion avec des icônes

C'est la principale difficulté de conception. Propositions, à tester sur
prototype papier avant toute maquette.

### Séquence (séance 01)

Les cartes de base, dans l'ordre. Rien de plus : c'est la première version.

### Boucles (séance 07)

Une **carte qui en contient d'autres** :

- « répéter » (icône `repeat`) avec un nombre, par exemple 3 ;
- plus tard, « répéter tant que » avec un capteur (voir les conditions).

Dans le Markdown, le contenu de la boucle s'écrit en **liste imbriquée**. À
l'écran, la carte entoure ses cartes, comme les blocs de Scratch vus en
séance 02. On remet alors en ordre **et** on emboîte : c'est un problème de
Parsons à deux dimensions, une variante étudiée (Ihantola et Karavirta, 2011).

Une boucle n'a d'intérêt que si elle raccourcit le programme. Les niveaux
limitent donc le nombre de cartes, ou proposent **plusieurs grilles** : une rue
de 3, puis de 6 intersections, avec le même programme.

### Conditions (séance 06)

Une carte « si » (icône `arrows-split`) avec un **capteur** dans son
emplacement, et les cartes à exécuter dedans :

| Capteur         | Icône     | Vrai quand…                            |
| :-------------- | :-------- | :------------------------------------- |
| `flaque-devant` | `droplet` | l'intersection suivante est une flaque |
| `maison-ici`    | `home`    | une maison attend sur l'intersection   |
| `feuilles-ici`  | `leaf`    | il y a des feuilles sur l'intersection |

Les conditions n'ont de sens qu'avec **plusieurs grilles** : le même programme
doit réussir là où il y a une flaque et là où il n'y en a pas. Sur une seule
grille, on sait d'avance ce qui s'y trouve, et le « si » est inutile.

### Fonctions (séance 05)

Une **deuxième rangée** sous le programme principal, comme dans Lightbot : la
définition d'une routine (icône `package`). Dans le programme principal, la
carte de la routine l'appelle.

L'exemple canonique de Karel : dans ces niveaux, Théa ne sait tourner qu'à
gauche, et la routine « tourner à droite » se compose de trois « tourner à
gauche ». La routine devient nécessaire quand le programme principal a moins de
places que de cartes.

Les paramètres et les valeurs de retour ne s'y prêtent pas bien en icônes : ils
restent hors de la première version des fonctions.

### Variables (séance 03)

Une **ardoise** à côté de la grille, qui affiche les tasses dans la roulotte et
change à chaque carte. Les maisons affichent le nombre de tasses voulues.

- « remplir » (icône `teapot`) : la roulotte contient exactement 3 tasses ;
- « livrer » retire les tasses livrées.

L'idée fausse visée : confondre « mettre à 3 » et « ajouter 3 ». C'est la plus
difficile à rendre en icônes : prototype papier indispensable.

### Plus tard

Tableaux (une rue de maisons numérotées, chacune sa commande) et chaînes de
caractères (des lettres sur les enseignes) : à concevoir après les premières
versions, quand le moteur aura fait ses preuves.

## Le plan de livraison

Une version par mécanique, chacune utilisable en classe avant la suivante.

| Version | Contenu                                                               | Séances |
| ------: | :-------------------------------------------------------------------- | :------ |
|       1 | Séquence. Moteur, grille, cartes, format, essais, aide, étoiles, sons | 01      |
|       2 | Boucles et plusieurs grilles par niveau, cartes imbriquées            | 07      |
|       3 | Conditions et capteurs                                                | 06      |
|       4 | Fonctions, deuxième rangée                                            | 05      |
|       5 | Variables, ardoise                                                    | 03      |

L'ordre suit la difficulté technique, pas celui des séances : les boucles
apportent les cartes imbriquées et les grilles multiples, dont les conditions
ont ensuite besoin. Chaque version reste utilisable seule.

### Comparaison avec Brilliant

Le cours [Thinking in Code](https://brilliant.org/courses/thinking-in-code/) de
Brilliant (9 niveaux, 48 leçons) suit presque le même ordre, d'après les titres
de ses leçons :

| Brilliant                                    | Thealivery             |
| :------------------------------------------- | :--------------------- |
| Niveau 1 : séquence, puis déjà des boucles   | Version 1 : séquence   |
| Niveaux 1 et 2 : boucles, boucles imbriquées | Version 2 : boucles    |
| Niveaux 3 et 4 : `if`, `if-else`, logique    | Version 3 : conditions |
| Niveau 6 : variables                         | Version 5 : variables  |
| Niveau 7 : listes                            | Plus tard : tableaux   |
| Niveau 9 : « Building Helpers »              | Version 4 : fonctions  |

Deux enseignements :

- **les boucles avant les conditions** : Brilliant fait le même choix, et
  introduit même une boucle dès son premier niveau ;
- **les fonctions** : Brilliant les place en dernier, nous avant les variables.
  Ce n'est pas gênant : nos fonctions sont de simples routines sans paramètre,
  plus proches d'une séquence nommée que d'une notion avancée.

## Le format d'un niveau

Spécification de la première version.

````markdown
<div class="thealivery" data-id="s01-premiere-livraison" markdown>

Livrez le thé à la maison.

```text
T> .  .  M
```

- avancer
- avancer
- avancer
- livrer

</div>
````

### Les règles

- **`data-id` obligatoire et unique sur le site** : c'est la clé sous laquelle
  la progression est mémorisée. La changer efface les étoiles du niveau.
  Convention : `sNN-nom-du-niveau`.
- **La consigne** : le premier paragraphe, une phrase courte.
- **La grille** : un bloc `text`. Une case par intersection, séparées par des
  espaces, toutes les lignes de même longueur. Exactement une Théa.
- **Les cartes** : une liste, **dans un ordre qui réussit**, que le jeu mélange.
  Un mot par carte, parmi ceux du catalogue.
- **Les pièges** : une carte préfixée `piège :`. Elle est mélangée aux autres,
  et le programme doit réussir sans elle.
- **Plusieurs grilles** (version 2) : plusieurs blocs `text` ; le même programme
  doit réussir sur chacune.

### Les erreurs signalées à la place du niveau

| Cas                                    | Message                                                            |
| :------------------------------------- | :----------------------------------------------------------------- |
| Pas de `data-id`                       | « Niveau invalide : il manque data-id. »                           |
| `data-id` déjà utilisé sur la page     | « Niveau invalide : data-id s01-x est déjà utilisé. »              |
| Pas de Théa, ou deux                   | « Niveau invalide : la grille doit contenir exactement une Théa. » |
| Lignes de longueurs différentes        | « Niveau invalide : la ligne 2 a 3 cases au lieu de 4. »           |
| Symbole inconnu                        | « Niveau invalide : symbole inconnu x, ligne 1. »                  |
| Carte inconnue                         | « Niveau invalide : carte inconnue sauter. »                       |
| L'ordre écrit n'atteint pas l'objectif | « Niveau invalide : la solution échoue à la carte 3 (flaque). »    |

Le message s'affiche dans la page elle-même, et aussi dans la console du
navigateur : l'enseignant le voit dans `zensical serve` sans rien ouvrir.

## Les niveaux de la séance 01

Cinq niveaux, du plus simple au plus long. Chaque solution a été **vérifiée par
simulation** ; le nombre d'ordres gagnants est donné à titre indicatif.

|  N° | Nom                   | Ce qu'il introduit                     | Cartes | Ordres gagnants |
| --: | :-------------------- | :------------------------------------- | -----: | --------------: |
|  01 | Première livraison    | Avancer, livrer                        |      4 |               1 |
|  02 | Le coin de la rue     | Tourner ; un premier piège             |  6 + 1 |               1 |
|  03 | Attention aux flaques | Contourner un obstacle                 |  8 + 1 |               1 |
|  04 | Deux maisons          | Deux livraisons dans un seul programme | 10 + 1 |               2 |
|  05 | Les feuilles sauvages | Ramasser, puis livrer                  | 10 + 1 |               2 |

```text
01 Première livraison        02 Le coin de la rue
T> .  .  M                   T> .  .
                             .  .  .
                             .  .  M

03 Attention aux flaques     04 Deux maisons          05 Les feuilles sauvages
T> .  .  .                   T> .  M                  Tv ~  M
~  ~  .  ~                   ~  ~  .                  .  ~  .
.  .  .  M                   M  .  .                  f  .  .
```

Les cartes de chaque niveau, dans l'ordre de la solution :

- **01** : avancer, avancer, avancer, livrer.
- **02** : avancer, avancer, tourner-droite, avancer, avancer, livrer ; piège :
  tourner-gauche.
- **03** : avancer, avancer, tourner-droite, avancer, avancer, tourner-gauche,
  avancer, livrer ; piège : ramasser.
- **04** : avancer, avancer, livrer, tourner-droite, avancer, avancer,
  tourner-droite, avancer, avancer, livrer ; piège : tourner-gauche.
- **05** : avancer, avancer, ramasser, tourner-gauche, avancer, avancer,
  tourner-gauche, avancer, avancer, livrer ; piège : tourner-droite.

## Les messages et les sons

| Événement             | Message de Théa                             | Son                |
| :-------------------- | :------------------------------------------ | :----------------- |
| Avance                | -                                           | Petit roulement    |
| Tourne                | -                                           | Clic léger         |
| Ramasse               | -                                           | Froissement        |
| Livre                 | « Votre thé ! »                             | Tintement de tasse |
| Tombe dans une flaque | « Plouf ! Je suis tombée dans une flaque. » | Plouf              |
| Bord du quartier      | « Je ne peux pas sortir du quartier. »      | Bruit sourd        |
| Rien à ramasser       | « Je n'ai rien à ramasser. »                | Bruit sourd        |
| Personne à livrer     | « Personne n'attend de thé ici. »           | Bruit sourd        |
| Objectif non atteint  | « Ma tournée n'est pas finie. »             | Note descendante   |
| Réussite              | « Tournée terminée ! »                      | Petite mélodie     |
| Trois essais ratés    | « Relisez la section juste au-dessus. »     | -                  |

Les sons sont désactivés par défaut, et tirés des packs CC0 de Kenney.

## Pas de prototype papier

Un prototype papier aurait permis de tester les icônes avant de les dessiner.
**Décision : on passe directement à une maquette interactive**, qui joue ce
rôle. Elle reste jetable : son code ne sera pas celui du jeu, qui sera conçu à
l'étape d'architecture.

## Décisions

| Question          | Décision                                            |
| :---------------- | :-------------------------------------------------- |
| Plan de livraison | Séquence, boucles, conditions, fonctions, variables |
| Prototype papier  | Non : directement une maquette interactive, jetable |
| Icônes des cartes | Validées sur la maquette interactive                |

## Retours sur la maquette v1

Retours de Vincent après avoir joué à la
[maquette v1](maquettes/maquette-v1.html), le 19 novembre 2026.

| Point               | Maquette v1                      | Décision pour la suite                                                                           |
| :------------------ | :------------------------------- | :----------------------------------------------------------------------------------------------- |
| Plateau de jeu      | Icônes au trait (Tabler)         | **Pixel art libre** (CC0)                                                                        |
| Disposition         | Grille à gauche, cartes à droite | **Plateau en haut, actions en bas**, sur tous les écrans                                         |
| Cartes              | Icône seule, en ligne            | **Liste verticale**, chaque carte avec **icône et phrase**                                       |
| Composer la tournée | Réserve, puis tournée            | **Une seule liste à remettre en ordre**, glisser-déposer, comme les problèmes de Parsons du site |
| Pièges              | Dès le niveau 02                 | **Aucun dans les premiers niveaux**                                                              |
| Numéros des cartes  | Affichés                         | **Gardés** : ils servent aux sauts                                                               |

Les icônes de Tabler restent utiles hors du plateau : boutons, cartes. Le
plateau, lui, passe en pixel art.

### Des sauts, à la manière de l'assembleur

Proposition de Vincent : puisque chaque carte a un numéro, les conditions et les
boucles peuvent s'écrire comme en assembleur, avec des **sauts** :

```text
1. Avancer
2. Si flaque devant, aller à 5
3. Avancer
4. Aller à 2
5. Livrer
```

**Ce que dit la littérature.**

- **Le compteur de programme est au cœur de la machine notionnelle.** Pour du
  Boulay, la machine notionnelle d'un langage impératif se compose des variables
  et d'un compteur de programme qui fixe l'ordre d'exécution. Des cartes
  numérotées et des sauts rendent ce compteur visible : on voit quelle carte
  s'exécute, et pourquoi la suivante est celle-là.
- **C'est le langage des diagrammes d'activité de la séance 01.** Une flèche qui
  revient en arrière est une boucle, une flèche qui saute par-dessus des actions
  est une condition. Les sauts prolongent directement ce que les personnes ont
  dessiné.
- **Des jeux le font avec succès** : _Human Resource Machine_ (Tomorrow
  Corporation, 2015) fait programmer en pseudo-assembleur avec des sauts, et les
  jeux de Zachtronics (_TIS-100_) poussent l'idée plus loin. Je n'ai pas trouvé
  d'étude qui évalue précisément l'apprentissage des sauts avec ces jeux. Des
  travaux récents enseignent l'assembleur par une machine notionnelle
  (ASEE 2024) ou par des blocs (Worister et Knobelsdorf, 2025), avec des
  résultats encourageants mais sur de petits effectifs.
- **La tension à connaître** : Java n'a pas de saut, et Dijkstra (1968) a
  justement plaidé pour les remplacer par des boucles et des conditions
  structurées. Le jeu montre la mécanique, la page de la séance fait le lien : «
  un saut en arrière, c'est un `while` », « un saut par-dessus, c'est un `if` ».

**Ce que les sauts changent à la conception.**

- **Plus de cartes imbriquées** : la tournée reste une liste plate, numérotée.
  Le glisser-déposer reste celui des problèmes de Parsons, à une dimension.
  C'est une simplification importante, pour le jeu comme pour le code.
- **Une boucle infinie devient possible** : le moteur arrête Théa après un
  nombre maximal de cartes exécutées, et elle le dit : « Je tourne en rond ! ».
- **Un saut désigne une carte** : par son numéro, ou par une flèche qui la suit
  quand on la déplace. À trancher sur maquette.
- **Le plan de livraison change** : les versions 2 (boucles) et 3 (conditions)
  deviennent une seule mécanique, les sauts, avec des capteurs.

### Des phrases et des icônes

Chaque carte porte une icône et une phrase courte en français : « Avancer », «
Tourner à gauche », « Si flaque devant, aller à 5 ». Les phrases décrivent une
action du jeu, sans syntaxe : ce ne sont pas des lignes de pseudo-code à
recopier en Java. La limite reste à surveiller, puisque le cours n'a pas de
pseudo-code.

### Le pixel art

Candidats sous licence CC0, sans aucune condition, à départager en les voyant :

| Pack                                                                    | Contenu                                                         | Taille |
| :---------------------------------------------------------------------- | :-------------------------------------------------------------- | :----- |
| [Kenney Tiny Town](https://kenney.nl/assets/tiny-town)                  | 130 tuiles de 16 × 16 : un village vu de dessus                 | Petit  |
| [Kenney 1-Bit Pack](https://kenney.nl/assets/1-bit-pack)                | Tuiles de 16 × 16 en une couleur, très variées                  | Moyen  |
| [Ninja Adventure](https://pixel-boy.itch.io/ninja-adventure-asset-pack) | Personnages, décors, animations, sons et musiques, vu de dessus | 82 Mo  |

Aucun ne contient sans doute une moine à vélo-roulotte. Il faudra composer Théa
(un personnage et une charrette), ou la dessiner en pixel art simple.

### Décisions après la maquette v1

| Question        | Décision                                                                                                              |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Pixel art       | [Kenney 1-Bit Pack](https://kenney.nl/assets/1-bit-pack), version 1.1, CC0                                            |
| Cible d'un saut | Une flèche qui relie le saut à sa carte, comme dans _Human Resource Machine_ ; elle suit la carte quand on la déplace |
| Pièges          | Dans les derniers niveaux de chaque séance seulement                                                                  |

Pour la séance 01, les niveaux 01 à 03 n'ont donc plus de piège ; les niveaux 04
et 05 gardent le leur.

### Ce que la maquette v2 a appris

La [maquette v2](maquettes/maquette-v2.html) applique ces décisions et ajoute un
niveau bonus à sauts, joué sur deux rues. Deux enseignements :

- **Une carte inutile passe inaperçue.** Juger à l'exécution a une limite : une
  carte piège laissée à la fin de la tournée (« Tourner à gauche » après la
  dernière livraison) ne gêne rien, et l'objectif est atteint. Proposition **[à
  valider]** : dans un niveau avec piège, la tournée doit compter exactement le
  nombre de cartes de la solution. Sinon : « Ma tournée est faite, mais une
  carte est en trop : mettez-la de côté. »
- **La police en pixel art rend les chiffres ambigus** : « 02 » se lit « 08 ».
  Elle reste pour les titres ; les numéros des cartes, essentiels pour les
  sauts, prennent la police du texte, Atkinson Hyperlegible.

## Après la maquette v2

Décisions du 19 novembre 2026 :

| Point             | Décision                                                                                                                         |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Personnage        | Théa devient une **ninja du thé**                                                                                                |
| Pixel art         | [Ninja Adventure](https://pixel-boy.itch.io/ninja-adventure-asset-pack) (Pixel-boy et AAA), CC0, à la place du 1-Bit Pack        |
| Taille d'une case | Une intersection ou une rue occupe **3 × 3 tuiles** de 16 pixels : de la place pour dessiner, et pour la charrette derrière Théa |
| Étape suivante    | Pas de nouvelle maquette jouable : des **images fixes** des six niveaux                                                          |
| Sauts             | La présentation des sauts du niveau 06 plaît : on la garde                                                                       |

Le pack contient une feuille de thé (`Items/Food/TeaLeaf.png`), une vingtaine de
ninjas animés dans les quatre directions, et deux charrettes dans
`TilesetElement`. Il n'a pas de véhicule à pédales : Théa tire une charrette.

Les planches de propositions numérotées sont dans
[`propositions/`](propositions/), une par élément : Théa, routes, maisons,
flaques, feuilles, charrette, décor. Vincent choisit un numéro par élément avant
la génération des images.

## Images fixes des six niveaux

Choix de Vincent sur les [planches de propositions](propositions/), le 19
novembre 2026 :

| Élément    | Choix                                                                                            |
| :--------- | :----------------------------------------------------------------------------------------------- |
| Personnage | `Cavegirl`, qui incarne **Théa, la livreuse de thé**, en double taille (32 × 32)                 |
| Routes     | Terre sur herbe foncée                                                                           |
| Maisons    | Au hasard parmi la boutique, la maison de pierre et le pignon orange                             |
| Obstacles  | Au hasard : une mare, où Théa tombe et nage, ou un trou, où elle tombe                           |
| Feuilles   | `TeaLeaf`                                                                                        |
| Charrette  | **Abandonnée** : le pack ne la dessine que d'un seul côté                                        |
| Décor      | Au hasard : quatre arbres, une souche, et fleurs et herbes hautes tuile par tuile ; sans rochers |

Les images sont dans [`niveaux/`](niveaux/), produites par
[`niveaux/generer.py`](niveaux/generer.py) à partir du pack. Les rues font trois
tuiles de large, toute leur case ; les pâtés d'herbe entre elles reçoivent le
décor. Les choix au hasard dépendent du nom du niveau : une image se régénère à
l'identique.

Règles de dessin :

- **une intersection qui porte un obstacle reste en herbe** : les rues qui y
  mènent finissent avant lui, par un bout de chemin arrondi, et le trou ou la
  mare est posé sur l'herbe. Une rue entre deux obstacles ne mène nulle part :
  elle disparaît ;
- **deux tirages au hasard séparés**, un pour les objets (maisons, obstacles),
  un pour le décor : modifier le décor ne change plus les obstacles.

Deux ajustements techniques :

- **la mare** n'existe dans le pack que sur herbe claire : sa bordure reçoit la
  palette de l'herbe foncée, déduite des deux versions du même dessin dans
  `TilesetFloor` ;
- **les coins intérieurs** des rues utilisent les quatre tuiles prévues par le
  pack, pour que l'herbe des pâtés ait des bords nets.

Décisions qui suivent les images :

- **Personnage** : Vincent a d'abord pensé à Circé et ses potions, puis est
  revenu à **Théa, la livreuse de thé**. Le nom du jeu, Thealivery, reste. Le
  sprite reste celui de `Cavegirl`.
- **Taille** : Théa est dessinée en double taille, 32 × 32 pixels, centrée dans
  sa case de 48 × 48. Le mélange d'échelles est assumé, pour la lisibilité.
- **Nage** : `Cavegirl` n'a pas d'animation de nage. Quand elle tombe dans une
  mare, on ne montrera que sa tête, avec les ondulations animées du pack
  (`Backgrounds/Animated/Water Ripples`). Dans un trou, elle tombe.

## Sources

- Ihantola, P. et Karavirta, V., _Two-Dimensional Parson's Puzzles: The Concept,
  Tools, and First Observations_, Journal of Information Technology Education:
  Innovations in Practice, 10, 2011.
- Brilliant,
  [Thinking in Code](https://brilliant.org/courses/thinking-in-code/), plan du
  cours consulté le 19 novembre 2026.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
