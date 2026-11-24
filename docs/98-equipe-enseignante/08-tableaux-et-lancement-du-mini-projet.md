# Séance 08 - Tableaux et lancement du mini-projet

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Notes pour l'équipe enseignante. Le support de cours de cette séance est
[ici](../01-seances/08-tableaux-et-lancement-du-mini-projet/index.md).

## Ce que la séance doit produire

**Chaque personne sait suivre, case par case, ce qu'une boucle fait à un
tableau, et sait que la dernière case a l'indice `length - 1`. Elle repart avec
l'étape 1 du code secret, qui compare deux tableaux et compte les bien placés,
et avec le premier questionnaire à rendre.**

Si une seule chose reste : un tableau, c'est des cases numérotées à partir de 0,
et l'indice de trop ne se voit qu'à l'exécution.

## Pourquoi cette approche

| Choix                                                  | Raison                                                                                                                                                                         |
| :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Partir de cinq variables `grade1` à `grade5`           | Le tableau répond à une gêne vécue : trois endroits à modifier pour une note de plus, cinq `if` pour les comparer                                                              |
| La théorie en tutoriel, un programme réécrit huit fois | Repris de l'archive de l'édition précédente (`archive/09.01-methodologies-de-resolution-de-problemes/`), qui avait bien fonctionné                                             |
| Le besoin du second parcours comme fil conducteur      | _"Afficher les notes en dessous de la moyenne"_ est impossible sans garder les notes. Sans ce besoin, le tableau ne sert à rien dans le fil rouge, qui additionne déjà au vol  |
| Une étape sur les crochets, avant la boucle            | Demande explicite : lire et écrire une case avec `[]` d'abord, sans boucle. La somme case par case montre ensuite ce que la boucle automatise                                  |
| L'indice de trop montré, exécuté, lu                   | C'est l'erreur de la séance. Mieux vaut l'avoir vue avec son message complet que la découvrir seul dans le mini-projet                                                         |
| Pas de tableau en paramètre de fonction                | Demande explicite : il arrive en séance 09. Le `main` du code secret grandit exprès, pour motiver le découpage                                                                 |
| Pas de `for each`                                      | Retiré du programme. Une boucle de plus à choisir, pour un gain faible                                                                                                         |
| Une carte **Tableau** dans les quatuors                | Demande explicite : l'état du tableau au début et à la fin oblige à dérouler la boucle case par case                                                                           |
| Six quatuors sans boucle                               | Demande explicite : lire et écrire une case avec `[]` est une compétence à part. Mélangés aux boucles, ces quatuors ne sont pas un niveau facile mais un autre piège           |
| Le fil rouge s'arrête ici                              | Deux fils (le fil rouge et le mini-projet) dans la même séance chargeraient trop. Le code secret prend le relais                                                               |
| Un mini-projet guidé, le même pour tout le monde       | Sur le modèle du mini-projet de ProgServ1 de L. Delafontaine. Un projet libre, choisi en séance 08 à quatre séances de la fin, est trop risqué pour des personnes qui débutent |

### Le mini-projet guidé de ProgServ1

Le dispositif s'inspire de deux cours de L. Delafontaine :

- **ProgServ1** : un mini-projet guidé, le même pour toute la classe, construit
  séance par séance avec un corrigé publié. Il n'y est pas noté : il prépare
  l'examen pratique.
- **ProgServ3** : un oral en session, avec une question tirée au sort parmi des
  _"questions d'évaluation"_ publiées à la fin de chaque séance, 8 minutes de
  préparation et 8 minutes de présentation.

Écarts assumés : ici, l'oral pose **deux** questions, et il n'y a pas de partie
libre dans le projet. Les questionnaires remplacent les jalons de l'ancienne
version du cours.

### Ce que dit la recherche sur les questionnaires

| Source                                        | Ce qu'elle établit                                                                                                         | Ce qu'on en tire                                                                                                 |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| Murphy, Fitzgerald, Lister et McCauley (2012) | Chez les novices, savoir expliquer du code avec ses mots va de pair avec savoir l'écrire                                   | Les questions 1 à 4 font expliquer, pas réciter                                                                  |
| Loksa et al. (2016)                           | Guider explicitement la réflexion sur sa manière de résoudre un problème améliore la productivité et la confiance en soi   | La question 5 demande ce qui a été essayé, dans quel ordre, et ce qui a débloqué                                 |
| Soicher et Gurung (2017)                      | Des questionnaires de réflexion après examen, utilisés dans un seul cours, n'ont amélioré ni les notes ni la métacognition | Demander _"quelles difficultés ?"_ ne suffit pas. Il faut des questions précises, et un retour                   |
| Agarwal, Nunes et Blunt (2021)                | Se remémorer sans notes a un effet moyen à grand dans 57% des expériences en classe                                        | Les questionnaires sont remplis à la maison, avec le support : cet effet-là est perdu. C'est l'oral qui le porte |

Le choix de faire remplir les questionnaires à la maison est assumé : il ne
prend pas de temps de séance. L'écriture à la main garde une part de réflexion,
même si une partie des réponses vient d'une aide extérieure.

## Avant la séance

| Quoi                              | Détail                                                                                                         |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| Imprimer les cartes               | [Le PDF des cartes](materiel/08-tableaux-cartes.pdf), 49 pages, **en couleur**, recto seul                     |
| Imprimer les questionnaires       | [Le questionnaire 08](../00-organisation/questionnaire-08.pdf), 5 pages, un par personne, recto verso          |
| Tester les quiz                   | Sur le site publié, depuis le réseau de l'école : les confettis viennent d'un CDN                              |
| Exécuter l'étape 1 du code secret | Les trois solutions de la page, avec le JDK du cours, pour avoir le jeu prêt à montrer                         |
| Préparer Classroom50              | Pas pour cette séance, mais le rendu de la séance 12 en dépend : créer la classe et le dépôt modèle à l'avance |

### Ce qu'il faut imprimer

| Pages | Contenu                              | Quantité     |
| :---: | :----------------------------------- | :----------- |
|   1   | Solutions des quatuors, pour vous    | 1 exemplaire |
| 2-13  | Cartes **Code**, bandeau bleu        | 12 cartes    |
| 14-25 | Cartes **Diagramme**, bandeau violet | 12 cartes    |
| 26-37 | Cartes **Sortie**, bandeau gris      | 12 cartes    |
| 38-49 | Cartes **Tableau**, bandeau orange   | 12 cartes    |

Aucune carte ne porte d'identifiant : un numéro de quatuor en bas de page
donnerait la réponse. Dans chaque série, les cartes sont imprimées dans l'ordre
A01 à A12 de la page de solutions. Les trier par série dès l'impression, avant
de les mélanger.

Avec moins de 48 personnes, retirer des quatuors dans l'ordre indiqué sur la
page de solutions. **Retirer les paires ensemble** : A03 et A04 laissent le même
tableau, A05 et A06 affichent la même chose, A09 et A10 aussi. Un jumeau sans
l'autre perd son intérêt.

## Rappel - Le fil rouge oublie les notes

Projeter le fil rouge de la séance 07 et poser la question : _"comment afficher
les notes en dessous de la moyenne ?"_ Laisser chercher deux minutes. La réponse
attendue n'est pas une solution, mais le constat : au moment où la moyenne est
connue, les notes ont disparu.

## Théorie - Ranger dans un tableau

### Ce qu'il faut faire

- Coder les étapes en direct, dans IntelliJ, plutôt que de projeter la page.
  L'étape 1 doit durer : faire ajouter une sixième note par la classe, et
  oublier volontairement le `5` de la division.
- À l'étape 3, rester sur les crochets sans boucle : lire une case, puis en
  écrire une. Demander oralement _"que vaut `grades[1]` ?"_ : qui répond `5.0`
  compte à partir de 1. Finir sur la ligne 5 de la somme, où seul l'indice
  change : c'est elle qui amène la boucle.
- À l'étape 5, **exécuter** la version avec `<=` et lire le message ensemble,
  morceau par morceau. C'est le moment de la séance.
- Dessiner le tableau au tableau blanc : une rangée de cases, les indices
  au-dessus. Le garder affiché pendant l'activité.

### Ce qu'il ne faut pas faire

- Parler de mémoire, de références ou de tas. `[D@2b2fa4f7` est _"une sorte
  d'adresse"_, et cela suffit pour cette séance.
- Introduire `for each`, `Arrays.sort` ou les tableaux à deux dimensions. Les
  deux derniers viennent en séances 09 et 11.

## Activité - Des tableaux en quatuor

### Déroulement

1. Distribuer une carte par personne, face cachée, mélangées.
2. Lancer la recherche des quatuors : 12 minutes. Pas de consigne sur la manière
   de s'y prendre : les personnes s'organisent.
3. Vérification par quatuor, avec la page de solutions : 3 minutes.
4. Débriefing : 5 minutes.

### Débriefing

Ce qu'il faut faire émerger :

- **A09 et A10** : échanger deux cases demande une troisième variable. Sans
  elle, la première affectation écrase la valeur qu'on voulait déplacer.
- **A03 et A04** : le même tableau à la fin, mais A04 s'arrête avec une
  exception. Demander à quel tour, et quelle case il a essayé de lire
  (`values[5]`, au cinquième tour, quand `i` vaut 4).
- **A05 et A06** : décaler vers la droite oblige à parcourir **à l'envers**.
  Dans l'autre sens, la première valeur se recopie partout.
- **A02** : la boucle qui part de 1 saute la case 0, et c'est la case affichée.
- **A07 et A08** : les mêmes lignes dans un autre ordre donnent un autre
  tableau. Une affectation lit les cases **au moment où elle s'exécute**.
- **A11 et A12** : `values[i + 1]` à gauche du `=` écrit dans la case 3, à
  droite il la lit. C'est le corps des boucles de A03 et A05, sans la boucle.

### Ce qui rate habituellement

- Les personnes cherchent leur quatuor par la sortie seule, et se trompent de
  jumeau. Le rappeler : il faut deux cartes concordantes.
- Sur A04, certaines personnes pensent que le tableau reste au début, puisque le
  programme plante. Les quatre premiers tours ont bien eu lieu.

## Théorie - Parcourir pour calculer

Aller vite sur la somme et le compte, déjà vus en séance 07 sous forme
d'accumulateur. Passer le temps sur le maximum : dérouler le tableau de trace.
Sur la diapositive _Un minimum qui part de 0_, demander ce que le programme
affiche **avant** de lire la sortie. Le programme D de l'atelier fait la même
erreur avec un maximum et des températures : ne pas le montrer ici. La section
`String[] args` se fait en deux minutes, ou se lit.

## Pendant l'atelier

- La partie _Prédire_ est la plus courte. Si le temps manque, passer directement
  à _Réparer_.
- Pour le programme D, ne pas donner la correction : demander _"quel tableau
  ferait que ce programme marche ?"_. Un tableau qui contient au moins une
  valeur positive. C'est ce qui rend le bug sournois.
- Le fil rouge se termine à la maison si nécessaire.

## Lancement du mini-projet

En 15 minutes, avec la page
[Mini-projet - Code secret](../00-organisation/02-mini-projet.md) projetée :

1. **Le jeu** : jouer une partie au tableau, avec la classe, sur un code choisi
   par une personne volontaire. Faire dire les bien placés et les mal placés.
2. **Les étapes** : une par séance, chacune avec la notion du jour. Pas de
   partie libre.
3. **Les questionnaires** : distribués en fin de séance, rendus remplis à la
   main au début de la suivante, validés ou non, 2,5% chacun. Ils sont rendus
   annotés la séance d'après.
4. **L'oral** : deux questions tirées au sort, en session. Les questions des
   questionnaires y ressemblent.
5. **L'intelligence artificielle** : permise pour le projet et pour les
   questionnaires, à condition de la déclarer (question 8). Interdite à l'oral,
   où se voit ce qui a été appris.

## Pendant l'étape 1 du code secret

### Ce qui rate habituellement

- **Lire les quatre chiffres d'un coup.** La personne tape `1234`, qui devient
  le nombre mille deux cent trente-quatre dans `guess[0]`. Montrer que la page
  demande un chiffre par question.
- **`guess` de taille 4 écrite en dur.** Ce n'est pas faux, mais renvoyer au
  coup de pouce : `new int[secret.length]`.
- **Le compteur qui ne repart pas de 0.** La page le montre en détail ; le
  laisser découvrir avant de renvoyer à la section.
- **La condition du `while`** avec `||` au lieu de `&&`. La partie ne s'arrête
  alors qu'avec quatre bien placés **et** dix essais. Faire lire la condition à
  voix haute : _"tant que pas trouvé **et** il reste des essais"_.
- **Le secret affiché** pour tester, puis oublié. C'est sans importance jusqu'en
  séance 11.

### Ce qu'il ne faut pas donner tout de suite

Les mal placés. La partie 4 de l'étape les pose comme question, sans code :
elles sont l'objet de l'étape 2, avec le tableau en paramètre. Si une personne a
fini en avance, la laisser chercher, et lui demander ce que répond sa méthode
pour `3 3 3 3`.

## Bilan et questionnaire

Dans les 10 dernières minutes :

1. Demander à main levée qui a terminé chaque partie de l'étape 1. Ce qui n'est
   pas fini se termine à la maison : la séance 09 part de la partie 3.
2. Distribuer le questionnaire, et lire les consignes à voix haute. Insister sur
   deux points : on ne demande pas des réponses justes, mais réfléchies ; et la
   question 8 est obligatoire, même pour répondre _"aucune aide"_.
3. Rappeler que le PDF est en ligne, pour les personnes absentes.

## Corriger les questionnaires

Un questionnaire est **validé** s'il est rendu au début de la séance 09 et si
chaque question a une réponse qui montre une réflexion. On ne note pas la
justesse.

| Question | Ce qui montre une réflexion                                                             | Ce qui n'en montre pas                             |
| :------- | :-------------------------------------------------------------------------------------- | :------------------------------------------------- |
| 1        | La personne a essayé de taper 9, ou a lu son code pour le savoir, et dit si c'est voulu | _"Ça marche"_                                      |
| 2        | Les quatre comparaisons sont décrites, une par case                                     | Le nombre seul                                     |
| 3        | Le moment est situé (au cinquième chiffre demandé, ou à la lecture de `guess[4]`)       | _"Ça plante"_                                      |
| 4        | L'explication parle de la moyenne connue trop tard                                      | Une définition du tableau recopiée                 |
| 5        | Un moment précis, au moins deux choses essayées                                         | _"Je n'ai pas eu de difficulté"_ sans rien d'autre |
| 6        | Les cases cochées, et une description si une partie ne marche pas                       | Rien                                               |
| 7        | Une question qu'on pourrait poser en classe                                             | _"Rien"_                                           |
| 8        | Une réponse, même _"aucune"_                                                            | Vide                                               |

Annoter brièvement, rendre les feuilles en séance 10. Relever deux ou trois
réponses à la question 7, anonymisées, et y répondre en début de séance 09 :
c'est le retour qui donne du sens au questionnaire.

## Si la séance déborde

Ce qui se comprime, dans cet ordre :

1. La section `String[] args` : elle se lit.
2. La partie _Prédire_ de l'atelier.
3. L'étape 2 du fil rouge, qui se termine à la maison.
4. Le lancement du mini-projet, réduit à 10 minutes : le jeu et les
   questionnaires, le reste se lit.

Ce qui ne se comprime jamais :

- l'étape 5 de la théorie, l'indice de trop exécuté et lu ;
- l'activité en quatuor et son débriefing ;
- les parties 1 et 2 de l'étape 1 du code secret, en classe : sans elles, la
  séance 09 commence en retard pour tout le monde.

## Points ouverts

- **Les modalités de l'oral** : durée de préparation, durée de passage,
  ressources autorisées, grille. La page _Évaluation_ les annonce comme _"à
  préciser"_.
- **Le lien Classroom50** pour le rendu de la séance 12.
- **Le rôle du dépôt rendu en séance 12** : il n'est pas noté. Dire s'il sert de
  base aux questions de l'oral, ou s'il est seulement une condition.

## Sources

- Agarwal, P. K., Nunes, L. D. et Blunt, J. R. (2021). _Retrieval practice
  consistently benefits student learning: a systematic review of applied
  research in schools and classrooms_. Educational Psychology Review, 33,
  1409-1453.
- Loksa, D., Ko, A. J., Jernigan, W., Oleson, A., Mendez, C. J. et Burnett, M.
  M. (2016). _Programming, problem solving, and self-awareness: effects of
  explicit guidance_. CHI 2016, 1449-1461.
- Murphy, L., Fitzgerald, S., Lister, R. et McCauley, R. (2012). _Ability to
  "explain in plain English" linked to proficiency in computer-based
  programming_. ICER 2012, 111-118.
- Soicher, R. N. et Gurung, R. A. R. (2017). _Do exam wrappers increase
  metacognition and performance? A single course intervention_. Psychology
  Learning & Teaching, 16(1).
- L. Delafontaine,
  [ProgServ1](https://github.com/heig-vd-progserv-course/heig-vd-progserv1-course)
  et
  [ProgServ3](https://github.com/heig-vd-progserv-course/heig-vd-progserv3-course),
  HEIG-VD, CC BY-SA 4.0.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
