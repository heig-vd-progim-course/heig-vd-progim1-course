# Séance 07 - Boucles

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Notes pour l'équipe enseignante. Le support de cours de cette séance est
[ici](../01-seances/07-boucles/index.md).

## Ce que la séance doit produire

**Chaque personne sait dérouler une boucle à la main, tour par tour, et sait
que la condition n'est posée qu'au début de chaque tour. Elle repart avec un
fil rouge qui redemande une note invalide et accepte autant de notes et de
personnes qu'il en faut.**

Si une seule chose reste : une boucle, c'est trois ingrédients, et un bug de
boucle est presque toujours l'un des trois.

## Pourquoi cette approche

| Choix                                                    | Raison                                                                                                                |
| :------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Ouvrir sur un `if` lu comme une boucle                   | L'idée fausse _IfIsLoop_ de la séance 06 devient la porte d'entrée : on change un mot, et le programme répète         |
| `while` d'abord, `for` ensuite                           | Les trois ingrédients sont sur trois lignes séparées dans un `while`. Le `for` n'est plus qu'un regroupement          |
| Nommer les trois ingrédients                             | Un vocabulaire commun pour la correction : _"quel ingrédient est faux ?"_ remplace _"ça marche pas"_                   |
| Le tableau de trace avant tout                           | Lire et tracer précède écrire (Lister et al., 2004). C'est la seule méthode qui marche quand une boucle surprend       |
| Une activité en mouvement, après la théorie              | Demande explicite, à titre d'essai. Elle vient après la théorie : on ne trace pas une boucle qu'on n'a jamais vue      |
| Des cartes qui ne diffèrent que d'un caractère           | La tâche cognitive, c'est de dérouler. Des cartes faciles à associer feraient de l'activité une chasse au vocabulaire  |
| Des problèmes de Parsons dans le support                 | Remettre des lignes dans l'ordre exerce la structure sans la charge de la syntaxe. Voir ci-dessous                    |
| `do-while` dans un bloc repliable, ouvert par défaut     | Demande explicite : il doit être vu, mais il n'est pas indispensable. Ouvert, il se lit ; replié, il ne gêne pas      |
| FizzBuzz                                                 | Demande explicite. Réunit boucle, `%` de la séance 04 et `else if` de la séance 06, avec le piège de l'ordre           |
| Le fil rouge : _"combien de notes ?"_ avant la sentinelle | Le nombre de tours connu à l'avance est la forme la plus simple. La valeur sentinelle est plus dure (Soloway et al., 1983) |

### Ce que fait OpenClassrooms

Le chapitre
[Manipulez vos données](https://openclassrooms.com/fr/courses/8383791-apprenez-a-programmer-en-java/8439941-manipulez-vos-donnees)
traite conditions **et** boucles. Pour les boucles, dans cet ordre :

- `while`, avec un compteur de 0 à 4 et la remarque qu'un compteur parti de 5
  ne fait aucun tour ;
- `do-while`, présenté comme la boucle qui fait au moins un tour ;
- `for`, de 1 à 10, présenté comme le regroupement des trois éléments ;
- `for each` sur une `List<String>`.

Écarts assumés :

- **`for` avant `do-while`** : `do-while` est rare, `for` est partout. Il vient
  en dernier, dans un bloc repliable ;
- **`for each` est repoussé** en séance 08 : il suppose un tableau ou une
  liste, et les `import` de `List` et `Arrays` ;
- **les trois ingrédients sont nommés** (situation initiale, condition, mise à
  jour) et servent de grille de lecture dans toute la séance. OpenClassrooms
  les cite, sans en faire un outil ;
- **le tableau de trace**, absent d'OpenClassrooms, est au centre de la séance.

### Ce que dit la recherche

Même critère qu'en séance 06 : publication évaluée par les pairs, résultat
reproduit par des équipes indépendantes. Ce qui suit est classé du plus solide
au moins solide, et dit ce qui est solide et ce qui ne l'est pas, y compris sur
l'activité en mouvement.

- **L'effet de test** et le **feedback immédiat** : voir la séance 06. Ils
  justifient les quiz, et la consigne de refaire quiz et problèmes de Parsons
  une semaine plus tard.
- **L'effet d'_enactment_** (Engelkamp ; Cohen, 1981). On retient mieux une
  consigne d'action qu'on a exécutée que celle qu'on a seulement entendue.
  C'est l'un des effets les plus reproduits de la psychologie de la mémoire.
  **Mais il porte sur la mémoire de l'action elle-même** (_"lever le bras"_),
  pas sur un concept abstrait. Il ne prouve pas qu'une boucle jouée sera mieux
  comprise.
- **Les styles d'apprentissage sont un mythe.** Il n'existe pas de personnes
  « kinesthésiques » qui apprendraient mieux en bougeant (Pashler et al.,
  2008). Ne pas justifier l'activité ainsi, ni devant la classe, ni ailleurs.
- **L'activité physique en classe** (méta-analyse de Norris et al., 2020).
  Elle augmente l'activité physique et l'attention en classe. Ses effets sur
  les résultats scolaires sont faibles et incertains, et les études portent
  surtout sur des enfants.
- **Les problèmes de Parsons** (Parsons et Haden, 2006). Ericson, Margulieux et
  Rick (2017) trouvent que les résoudre fait autant progresser qu'écrire ou
  corriger le même code, en nettement moins de temps. Un résultat sur un seul
  groupe, cohérent avec d'autres travaux de la même équipe : un appui, pas une
  preuve définitive.
- **Les activités « débranchées »** (_CS Unplugged_). Les comparaisons
  disponibles, par exemple Thies et Vahrenhold (2013), concluent à des
  résultats **comparables** à un enseignement classique, pas supérieurs.

Ce qui agit probablement dans l'activité des trios, c'est donc moins le fait
de se lever que **l'effort de récupération** (décider si sa carte va avec une
autre), et **l'explication entre pairs** (_"pourquoi tu penses qu'on va
ensemble ?"_). Le mouvement apporte de l'énergie au milieu d'une séance de
quatre périodes. C'est déjà quelque chose, à condition de ne pas lui prêter
plus.

**Le test pour ne pas faire de l'_activité-washing_** : cette activité vaudrait-elle
encore la peine, faite assis, sur papier ? Oui : associer énoncé, code et
sortie entre des cartes quasi identiques oblige à dérouler la boucle. Le
mouvement s'ajoute à une tâche qui tient seule.

### Les idées fausses visées

- **La condition surveillée en permanence.** La boucle s'arrêterait au moment
  précis où la condition devient fausse, au milieu du corps. C'est le quiz
  _"La condition n'est posée qu'au début du tour"_, la carte T04 de l'activité,
  et tout l'intérêt de la partie _Jouer une boucle_.
- **_IfIsLoop_** ([progmiscon.org](https://progmiscon.org/misconceptions/Java/IfIsLoop/)) :
  le corps d'un `if` se répéterait tant que sa condition est vraie. C'est le
  rappel d'ouverture.
- **Le compteur qui avance tout seul**, suggéré par le français _"pour
  chaque"_. D'où la mise à jour oubliée : carte T10, bug 1 de l'atelier.
- **Le tour de trop ou de moins** (_off-by-one_) : `<` ou `<=`, et _"de 0 à
  5"_ qui fait six tours. Cartes T01 à T04, bug 2, programme E.
- **L'initialisation dans la boucle**, qui remet l'accumulateur à zéro à chaque
  tour : bug 3.
- **Les difficultés de la valeur sentinelle** (Soloway, Bonar et Ehrlich,
  1983) : les débutants pensent _"je lis, puis je traite"_, alors que la
  boucle demande _"je lis, je teste, je traite, je relis"_. C'est pour cela
  que le fil rouge demande le nombre de notes au lieu d'attendre un signal de
  fin. La boucle de `readGrade`, qui lit avant et à la fin du corps, en est
  une version douce.

### Sources

- R. L. Cohen, _On the generality of some memory laws_, Scandinavian Journal
  of Psychology 22(1), 1981.
- J. Engelkamp, _Memory for actions_, Psychology Press, 1998. La synthèse sur
  les _subject-performed tasks_.
- H. Pashler, M. McDaniel, D. Rohrer et R. Bjork, _Learning styles: concepts
  and evidence_, Psychological Science in the Public Interest 9(3), 2008.
  [DOI](https://doi.org/10.1111/j.1539-6053.2009.01038.x).
- E. Norris, T. van Steen, A. Direito et E. Stamatakis, _Physically active
  lessons in schools and their impact on physical activity, educational,
  health and cognition outcomes: a systematic review and meta-analysis_,
  British Journal of Sports Medicine 54(14), 2020.
  [DOI](https://doi.org/10.1136/bjsports-2018-100502).
- D. Parsons et P. Haden, _Parson's programming puzzles: a fun and effective
  learning tool for first programming courses_, ACE 2006.
- B. Ericson, L. Margulieux et J. Rick, _Solving Parsons problems versus fixing
  and writing code_, Koli Calling 2017.
- R. Thies et J. Vahrenhold, _On plugging "unplugged" into CS classes_, SIGCSE
  2013.
- E. Soloway, J. Bonar et K. Ehrlich, _Cognitive strategies and looping
  constructs: an empirical study_, Communications of the ACM 26(11), 1983.
  [DOI](https://doi.org/10.1145/182.358436).
- B. du Boulay, _Some difficulties of learning to program_, Journal of
  Educational Computing Research 2(1), 1986.
- R. Lister et al., _A multi-national study of reading and tracing skills in
  novice programmers_, ITiCSE Working Group Reports, 2004.
- [Manipulez vos données](https://openclassrooms.com/fr/courses/8383791-apprenez-a-programmer-en-java/8439941-manipulez-vos-donnees),
  OpenClassrooms.

!!! warning "Références à vérifier avant citation publique"

    Les références ci-dessus ont été rassemblées de mémoire, sans
    consultation des articles. Les auteurs, les années et les conclusions
    sont fiables. Les DOI et le détail des titres doivent être vérifiés avant
    d'être cités ailleurs que dans cette page.

## Avant la séance

| Quoi                                     | Détail                                                                                                     |
| :--------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| Imprimer les cartes                      | [Le PDF des cartes](materiel/07-boucles-cartes.pdf), voir la section suivante. **En couleur**              |
| Trier les cartes                         | 36 cartes de trios, plus 8 cartes pour jouer la boucle. Une carte par page : aucune découpe              |
| Prévoir un objet pour l'exécution        | Une balle, une craie, un feutre géant : un objet qui se passe de main en main et se voit du fond de la salle |
| Prévoir deux feutres et une feuille blanche | Pour la personne `i`, qui efface et réécrit sa valeur                                                    |
| Libérer un espace devant le tableau      | Huit personnes debout, en ligne, face à la classe                                                          |
| Tester les quiz et les problèmes de Parsons | Sur le site publié, depuis le réseau de l'école : les confettis viennent d'un CDN                       |
| Récupérer deux ou trois fils rouges      | Ceux de la séance 06, version avec le ternaire. Ils servent de point de départ au premier atelier         |
| Avoir le diagramme des fiches au tableau | Celui de la séance 01, avec la flèche qui remonte. Il reste affiché pendant la première théorie            |

### Ce qu'il faut imprimer

Le PDF tient sur **45 pages A4**, à imprimer en **couleur**, recto seul. Une carte par page, en paysage, pour qu'elle se lise de loin.

| Pages | Contenu                                                 | Quantité          | Format                      |
| :---: | :------------------------------------------------------ | :---------------- | :-------------------------- |
|   1   | Solutions des trios, pour vous                          | 1 exemplaire      | A4 portrait                 |
| 2-13  | Cartes **Énoncé**, bandeau vert                         | 12 cartes         | A4 paysage                  |
| 14-25 | Cartes **Code**, bandeau bleu                           | 12 cartes         | A4 paysage                  |
| 26-37 | Cartes **Sortie**, bandeau gris                         | 12 cartes         | A4 paysage                  |
| 38-45 | Cartes de la boucle jouée                               | 8 cartes          | A4 paysage                  |

Le nombre exact de pages est indiqué en tête du PDF ; il fait foi si ce tableau
a pris du retard.

Les couleurs reprennent celles de la coloration syntaxique d'IntelliJ, en
thème clair : les **mots-clés** en bleu, les **chaînes de caractères** en vert,
les **nombres** en bleu vif, les **appels de méthode** en bleu-vert. Le code des
cartes est coloré comme dans l'éditeur, et le bandeau de chaque sorte de carte
en reprend la logique :

- **Énoncé**, en vert : c'est du texte en français, comme une chaîne ;
- **Code**, en bleu : la couleur des mots-clés ;
- **Sortie**, en gris foncé : la console.

Chaque carte de trio porte, en petit, un identifiant (T01 à T12) qui permet de
vérifier un trio d'un coup d'œil. Il est imprimé dans un coin du recto, en gris clair :
les personnes ne le cherchent pas si on ne leur en parle pas.

Le PDF se régénère depuis `materiel/07-boucles/generer-cartes.py`, à la racine
du dépôt. Toute modification d'une carte se fait là, pas dans le PDF.

### Les trios

Tous les codes ont été exécutés avec `eclipse-temurin:25-jdk`, dans un `main`.

| Trio | Énoncé                                      | Code (condition, mise à jour)       | Sortie            | Piège visé                               |
| :--: | :------------------------------------------ | :---------------------------------- | :---------------- | :--------------------------------------- |
| T01  | Afficher les nombres de 0 à 5               | `i = 0`, `i <= 5`, `i++` après      | `0 1 2 3 4 5`     | La référence                             |
| T02  | Afficher les nombres de 0 à 4               | `i = 0`, `i < 5`, `i++` après       | `0 1 2 3 4`       | `<` ou `<=`                              |
| T03  | Afficher les nombres de 1 à 5               | `i = 1`, `i <= 5`, `i++` après      | `1 2 3 4 5`       | La situation initiale                    |
| T04  | Afficher les nombres de 1 à 6               | `i = 0`, `i <= 5`, `i++` **avant**  | `1 2 3 4 5 6`     | La condition posée au début du tour      |
| T05  | Compter à rebours de 5 à 1                  | `i = 5`, `i >= 1`, `i--`            | `5 4 3 2 1`       | Compter vers le bas                      |
| T06  | Compter à rebours de 5 à 0                  | `i = 5`, `i >= 0`, `i--`            | `5 4 3 2 1 0`     | `>` ou `>=`, vers le bas                 |
| T07  | Afficher les nombres pairs de 0 à 8         | `i = 0`, `i <= 8`, `i += 2`         | `0 2 4 6 8`       | Une mise à jour qui n'est pas `+ 1`      |
| T08  | Afficher les nombres impairs de 1 à 9       | `i = 1`, `i <= 9`, `i += 2`         | `1 3 5 7 9`       | Idem, avec T07 comme jumeau               |
| T09  | Afficher les puissances de 2 jusqu'à 16     | `i = 1`, `i <= 16`, `i = i * 2`     | `1 2 4 8 16`      | Une mise à jour multiplicative           |
| T10  | Afficher 0, encore et encore, sans s'arrêter | `i = 0`, `i <= 5`, **pas** de mise à jour | `0 0 0 0 ...` | La mise à jour oubliée                |
| T11  | Ne rien afficher du tout                    | `i = 10`, `i <= 5`, `i++`           | _(rien)_          | Zéro tour                                |
| T12  | Additionner 1, 2, 3 et 4                    | `sum`, `i = 1`, `i <= 4`, `i++`     | `10`              | L'accumulateur                           |

Sur les cartes **Sortie**, les nombres sont affichés un par ligne, comme dans
la console. Celle de T10 montre six `0` suivis de points de suspension, et
celle de T11 un cadre de console vide.

### Combien de trios distribuer

Une personne, une carte. Avec 35 personnes : **11 trios** (33 cartes), et les
deux personnes restantes deviennent **arbitres** : elles reçoivent la page de
solutions et valident les trios formés. Elles joueront ensuite `i` et la
console dans la partie 2.

Si la salle est moins remplie, retirez les trios dans cet ordre, du premier à
retirer au dernier :

> T09, T08, T07, T12, T06, T05, T11, T10, T04, T03, T02, T01

T01 à T04 forment le cœur de l'activité : quatre codes presque identiques. Ne
descendez pas en dessous de six trios. En dessous de 18 personnes, gardez T01
à T04, T10 et T11.

Une alternative si la salle ne permet pas de circuler : une moitié de la classe
joue, l'autre moitié reçoit la liste des énoncés et prédit, sur papier, les
trios qui vont se former. Les rôles s'échangent pour la partie 2.

## Rappel - Un `if` ne se répète pas

Dix minutes. Projeter le programme du quiz, trente secondes de réflexion seule,
vote à main levée.

- Une partie de la salle répond `0 1 2 Fin`. C'est l'idée fausse _IfIsLoop_.
  Ne pas corriger tout de suite : demander _"et si on voulait vraiment que ça
  affiche 0 1 2 ?"_.
- Changer `if` en `while` en direct, dans IntelliJ, et exécuter. C'est
  l'ouverture de la théorie.
- Pointer la flèche qui remonte dans le diagramme des fiches de la séance 01,
  resté au tableau.

## Théorie - Répéter avec `while`

Vingt minutes. Le support est complet, la présentation ne garde que
l'essentiel.

### Ce qu'il faut faire

- **Poser les trois ingrédients au tableau**, en trois couleurs de craie ou de
  feutre, et les garder affichés toute la séance. Ils reviennent dans chaque
  correction.
- **Faire le tableau de trace de 0 à 5 avec la salle**, ligne par ligne. Faire
  compter : sept fois la condition, six tours. Beaucoup découvrent que _"de 0 à
  5"_ fait six nombres.
- **Faire voter le quiz _"La condition n'est posée qu'au début du tour"_.** Une
  bonne partie de la salle répond `1 2 Fin`. C'est l'idée fausse centrale de la
  séance : la laisser émerger, l'activité la traitera physiquement.
- **Lancer la boucle infinie en direct**, et l'arrêter avec le carré rouge.
  Certaines personnes paniquent la première fois que leur console défile :
  mieux vaut qu'elles l'aient vu faire.

### Ce qu'il ne faut pas faire

- Ne pas montrer `for` maintenant, même si la question vient. _"Après la
  pause."_ Deux syntaxes à la fois brouillent les trois ingrédients.
- Ne pas passer de temps sur `break` ou `continue`. Ils ne sont pas dans le
  support, volontairement : une boucle se lit par sa condition.

## Activité - Des boucles en chair et en os

Vingt-cinq minutes : douze pour les trios, huit pour la boucle jouée, cinq pour
le débriefing.

### Partie 1 - Les trios

1. **Avant de distribuer**, lire la règle à voix haute : on déroule sa boucle
   dans sa tête avant de bouger. Donner une minute de silence, cartes en main,
   pour cela. Sans cette minute, les gens se lèvent et cherchent au hasard.
2. **Distribuer au hasard**, faces cachées, en mélangeant les trois sortes.
3. **Lancer.** Les trios se forment en cinq à huit minutes. Circuler, ne pas
   valider : renvoyer aux arbitres.
4. **Les erreurs attendues** :
    - T01, T03 et T04 se disputent les sorties `1 2 3 4 5` et
      `1 2 3 4 5 6`. C'est voulu ;
    - T10 est souvent associée à l'énoncé de T11, _"ne rien afficher"_, parce
      que _"la boucle est cassée"_. Faire dérouler : elle affiche bien `0` ;
    - T05 et T06 se confondent sur `>=`.
5. **Clôture de la partie** : chaque trio lit son code à voix haute, en une
   phrase. Pour T04 et T10, demander à la salle si elle est d'accord avant de
   confirmer.

### Partie 2 - Jouer une boucle

Huit personnes devant la classe : six en ligne, dans l'ordre du programme,
tiennent chacune une carte de code ; les deux arbitres jouent `i` et la
console, un peu à l'écart.

| Carte                         | Ce que fait la personne quand elle a l'objet                                     |
| :---------------------------- | :------------------------------------------------------------------------------- |
| `int i = 0;`                  | Dit _"i vaut 0"_. La personne `i` écrit 0. Passe l'objet au `while`              |
| `while (i <= 2) {`            | Regarde la feuille de `i`, dit _"0 plus petit ou égal à 2 : vrai"_, passe l'objet à la ligne suivante. Si c'est faux, le passe directement à `Fin` |
| `System.out.println(i);`      | Lit la valeur de `i`, la dicte à la console, qui l'écrit au tableau              |
| `i++;`                        | Demande à `i` d'ajouter 1. `i` efface et réécrit                                 |
| `}`                           | Rend l'objet au `while`. Ne dit rien d'autre                                     |
| `System.out.println("Fin");`  | Dicte _"Fin"_ à la console                                                       |

Plus deux cartes portées autour du cou ou tenues en main : **`i`** et
**Console**.

Ce qu'il faut faire :

- **Jouer lentement.** L'intérêt est dans le moment où l'objet revient au
  `while`.
- **Au dernier tour, provoquer** : quand `i` vient de passer à 3, avant que
  l'objet n'arrive au `}`, demander à la salle : _"`i` vaut 3, la condition est
  fausse. Est-ce qu'on s'arrête ?"_. La personne `}` doit encore rendre l'objet
  au `while`. C'est le quiz de la théorie, joué.
- **Faire compter** combien de fois le `while` a parlé : quatre, pour trois
  tours.
- **Rejouer en retirant `i++`**, si le temps le permet : la personne s'assoit,
  et la salle voit la boucle tourner sans fin. Arrêter au troisième tour, sous
  les rires.

### Débriefing

Cinq minutes, jamais coupées : c'est là que se fixe ce que l'activité a fait
vivre. Les quatre questions du support, dans l'ordre. Faire dire, avec les
mots de la salle :

- la condition est une porte à l'entrée du tour ;
- la condition est posée une fois de plus qu'il n'y a de tours ;
- sans mise à jour, rien ne change, et la porte reste ouverte.

Puis demander : _"Qu'est-ce que ça vous a apporté de plus que de lire le
support ?"_. Noter les réponses : c'est le retour sur l'essai.

### Ce qui rate habituellement

- **Le bruit.** 35 personnes qui se cherchent, c'est bruyant. Annoncer un
  signal de fin (lever la main, les gens se taisent) avant de lancer.
- **Les trios formés par élimination**, en fin de partie, sans dérouler. Le
  dernier trio formé est souvent juste par défaut. Lui demander quand même de
  lire son code.
- **Personne ne veut venir devant** pour la partie 2. Les arbitres sont déjà
  désignés ; pour les six autres, prendre le trio T01, qui connaît déjà ce
  code, et trois volontaires.

## Pendant le premier atelier

### Dérouler

Exiger les tableaux de trace sur papier, avant toute exécution. Les quatre
programmes visent chacun une idée :

| Programme | Ce qu'il vise                                                              |
| :-------- | :------------------------------------------------------------------------- |
| A         | Une mise à jour multiplicative, et la valeur de `i` après la boucle         |
| B         | La sortie quand la variable n'est **plus** positive : on dépasse 0          |
| C         | Un accumulateur avec un pas de 2, et une sortie sur une valeur négative     |
| D         | Un compteur dans un `if`, qui relie aux conditions de la séance 06          |

B est le plus intéressant à débriefer : beaucoup répondent `0` ou `1`.

### Remettre dans l'ordre

Trois problèmes de Parsons, en ligne. Rapides pour la plupart, cinq minutes au
plus. Celles et ceux qui bloquent sur le troisième n'ont pas compris le rôle
de la deuxième lecture : c'est la mise à jour.

### Réparer

- **Le bug 1** (`i++` dans un compte à rebours) : le programme ne s'arrête
  pas. En toute rigueur, il s'arrêterait au bout de deux milliards de tours,
  quand `i` dépasse la plus grande valeur d'un `int` et devient négatif. Ne pas
  en parler, sauf question.
- **Le bug 3** (`count = 0;` dans la boucle) est le plus important : le
  programme compile, s'arrête, et donne un résultat faux mais plausible.
  Demander pourquoi c'est 1 et pas 0.
- **Le bug 4** : IntelliJ souligne le `;` après la condition. Montrer
  l'avertissement.

### Le fil rouge

- **L'étape 1** demande de supprimer le `if` et le `else` de `processPerson`.
  Beaucoup gardent les deux protections. Ce n'est pas faux, c'est redondant :
  demander _"une note invalide peut-elle encore arriver ici ?"_.
- **L'étape 2** est la plus longue. Le piège fréquent : déclarer `sum` dans la
  boucle. C'est l'exemple de la page de théorie, ils ont l'outil.
- **L'étape 3** (`NaN`) est une curiosité. Ne pas s'y attarder.

## Correction au tableau, en live coding

Quinze minutes, après la pause, à partir des questions de la salle. Si elles
ne viennent pas, cette suite, une étape par question :

1. Le programme B de _Dérouler_, tracé au tableau avec la salle.
2. Le bug 3 : demander à la salle de dérouler les tours 11 et 12.
3. L'étape 2 du fil rouge, écrite en direct à partir de la version de l'étape
   1. Nommer les trois ingrédients à voix haute avant d'écrire la boucle.

Ce qu'il faut faire émerger : chaque bug corrigé correspondait à **un**
ingrédient.

## Théorie - `for` et `do-while`

Vingt minutes.

- **Partir du `while` de 0 à 5, au tableau**, et entourer ses trois
  ingrédients avec les couleurs de la première théorie. Puis écrire le `for`
  en dessous et tirer une flèche de chaque ingrédient vers sa place entre les
  parenthèses.
- **Insister sur l'ordre d'exécution** : `i++` est écrit en haut et s'exécute
  en bas. Si une personne hésite, la réponse est toujours _"réécris-le en
  `while`"_.
- **La règle du choix** : _"est-ce que je sais combien de tours ?"_. Faire
  voter le quiz du mot de passe.
- **`do-while`** : cinq minutes au plus, à partir de `readGrade`. L'objectif est
  qu'elles et ils le **reconnaissent**. Le `;` obligatoire après la condition
  surprend, juste après avoir appris qu'il est un bug après un `while`.
  Le dire tel quel : c'est incohérent, et c'est Java.

## Pendant le second atelier

- **FizzBuzz** est le cœur de l'atelier. Ne pas donner le coup de pouce Parsons
  avant quinze minutes : il donne presque la solution.
- **Le piège de l'ordre** (15 testé en dernier) est attendu chez une bonne
  partie de la salle. Ne pas le signaler : le laisser apparaître au 15^e^ tour.
  Celles et ceux qui ont testé jusqu'à 10 ne le voient pas : c'est la règle des
  trois valeurs de la séance 06, appliquée aux boucles.
- **Le fil rouge, étape 2** : rappeler que le `i` de `main` et celui de
  `processPerson` ne se gênent pas. La question vient.

## Correction de FizzBuzz et clôture

Dix minutes. Écrire FizzBuzz en direct, avec le test de 15 **en dernier**,
exécuter, et laisser la salle trouver le bug. Puis corriger.

Terminer par la question : _"Le fil rouge oublie chaque note dès qu'il l'a
ajoutée à la somme. Comment afficher, à la fin, la liste des notes de
Camille ?"_. On ne sait pas : il faudrait **ranger** plusieurs valeurs dans une
seule variable. C'est la séance 08, les tableaux.

## Si la séance déborde

| Ce qui se comprime                                          | Ce qui ne se comprime jamais                      |
| :---------------------------------------------------------- | :------------------------------------------------ |
| La partie _Jouer une boucle_ de l'activité, réduite à un tour | Le débriefing de l'activité                      |
| La partie _Écrire_ du premier atelier, à finir à la maison   | La partie _Dérouler_ du premier atelier          |
| `do-while`, réduit à la lecture du bloc repliable            | FizzBuzz                                         |
| Les étapes 3 et 4 du fil rouge, dans le second atelier       | Le quiz de la condition posée au début du tour   |
| La correction finale en live coding                          | L'étape 1 du fil rouge : redemander la note      |

Si l'activité elle-même doit sauter, la remplacer par le même exercice sur
papier : la liste des énoncés, des codes et des sorties, à associer seul ou
seule en cinq minutes.

## La contrainte de progression

À cette séance, les personnes n'ont vu **ni tableau, ni méthode de `String`**.
Aucun exemple ne doit en contenir, y compris au tableau.

Les pièges propres à cette séance :

- **garder les notes pour les afficher à la fin** : cela demande un tableau.
  La réponse est _"en séance 08"_, et c'est la transition ;
- **`for each`** : il suppose un tableau. Si la question vient, _"en séance
  08"_ ;
- **`break` et `continue`** : absents volontairement. Une boucle qui sort par
  `break` se lit mal, et l'on ne veut pas que ce soit le premier réflexe ;
- **les boucles imbriquées** : elles ne sont pas au programme de la séance.
  Elles apparaîtront avec les tableaux. Une boucle qui appelle une fonction qui
  contient une boucle, comme `readGrade` dans `processPerson`, suffit ;
- **une boucle qui redemande tant que la réponse n'est pas `"o"`** :
  comparer des `String` demande `equals`, en séance 09. Utiliser un `switch`
  si nécessaire, comme en séance 06.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
