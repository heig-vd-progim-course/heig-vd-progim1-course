# Séance 04 - Du diagramme au code

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Notes pour l'équipe enseignante. Le support de cours de cette séance est
[ici](../01-seances/04-du-diagramme-au-code/index.md).

## Ce que la séance doit produire

**Chaque personne repart avec un programme qui lit deux notes et affiche leur
moyenne, construit à partir de son propre diagramme, et vérifié contre un
tableau de tests écrit avant le code.**

Le programme lui-même est trivial. Ce qui doit rester, c'est l'ordre : trois
colonnes, diagramme, tests, code. C'est la méthode du mini-projet.

## Avant la séance

| Quoi                                  | Détail                                                      |
| :------------------------------------ | :---------------------------------------------------------- |
| Exécuter les exemples avec un JDK 25  | Voir ci-dessous. Les sorties du support ont été obtenues sur JDK 21 |
| Tester `IO.readln` dans IntelliJ      | Sur Windows et macOS, console de l'IDE, avec un accent dans la saisie |
| Vérifier la liste de la séance 03     | Les personnes sans environnement fonctionnel doivent être réglées **avant** |
| Préparer le tableau                   | Trois colonnes vides pour la discussion de l'activité       |

### Les sorties ont été obtenues sur JDK 21

Lors de la rédaction, aucun JDK 25 n'était disponible. `java.lang.IO` n'existe
pas dans le JDK 21 : les exemples ont été exécutés avec une classe `IO` locale
reproduisant le comportement documenté (`readln(prompt)` écrit le prompt comme
`print`, puis lit une ligne).

Ce qui est sûr : la logique, les valeurs, les messages de première ligne des
exceptions, le message de compilation (le type de retour est le même).

Ce qui peut différer sur JDK 25 : les **numéros de ligne internes au JDK** dans
les traces de pile (`FloatingDecimal.java:2054`, `Formatter.java:4515`, etc.),
et l'affichage avec la locale `fr_CH` si les données CLDR ont changé. À
réexécuter, et à corriger dans le support si nécessaire.

### Pourquoi `IO.readln` et pas `Scanner`

Choix délibéré pour cette édition :

- pas d'`import`, pas de `new`, pas d'objet à expliquer en séance 04 ;
- `Scanner.nextDouble` suit la locale : sur une machine en `fr_CH`, il refuse
  `4.5` (`InputMismatchException`) et accepte `4,5`. Vérifié. Le même
  programme se comporte différemment selon la machine, ce qui est ingérable en
  salle ;
- `Double.parseDouble` n'accepte que le point, sur toutes les machines.

Le prix : les tutoriels en ligne utilisent presque tous `Scanner`. Le support
le nomme dans un bloc repliable, sans code, pour que les personnes ne soient
pas perdues quand elles le croisent.

## Rappel et cadrage

Corriger rapidement le devoir de la séance 03 (prénom, âge, taille). Montrer
une solution où les valeurs sont en dur, et poser la question : _"et si je veux
la taille de quelqu'un d'autre ?"_. C'est l'entrée en matière de la saisie
clavier.

## Pendant la théorie - Les opérations arithmétiques

Une révision de la séance 03 plus qu'une nouveauté : la division entière y a
déjà été vue. Ce qui est neuf, c'est l'ordre des opérations et `Math`.

- Le cas `grade1 + grade2 / 2` est celui qui reviendra dans l'atelier. Le
  faire prédire à la salle avant d'afficher la sortie.
- Le cas `9 / 5 * celsius` est plus fin : il combine priorité et division
  entière. C'est le bon moment pour faire le lien avec l'exemple de la
  température de l'activité qui suit.
- `2 ^ 10` qui vaut 8 surprend tout le monde. Ne pas expliquer le XOR : dire
  que c'est une opération sur les bits, hors sujet ici, et passer.
- Les raccourcis (`+=`, `++`) sont montrés pour être reconnus, pas exigés.

## Pendant l'activité - Poser le problème

Travail individuel, sur papier ou dans un fichier texte, suivi d'une
discussion en classe.

- Le problème 1 est trivial exprès. L'intérêt est dans les questions
  ouvertes : notes au dixième ou au demi-point, note hors de l'échelle,
  séparateur décimal, arrondi, nombre de notes. Si quelqu'un n'en trouve
  aucune, lui demander _"que fait le programme si je tape 7 ?"_.
- Le problème 3 (l'addition) est le plus riche : pourboire, centimes qui ne
  tombent pas juste, arrondi aux 5 centimes. Le garder pour la discussion.
- Pendant la discussion, demander ce que les personnes ont mis, et noter les
  réponses au tableau. Relever les colonnes floues : _"les notes"_ n'est pas
  une entrée ; _"deux nombres entre 1 et 6, au dixième"_ en est une.

### Ce qu'il faut faire émerger

Les questions ouvertes ne se résolvent pas aujourd'hui, et c'est le point :
elles s'écrivent. La liste des cas non couverts produite ici sert en séance 06.

## Pendant la théorie - Lire au clavier

### Ce qui rate habituellement

- **Taper dans l'éditeur au lieu de la console.** Le programme semble figé.
  C'est le blocage numéro un, et il est invisible depuis le pupitre.
- **Taper `4,5`.** Tout le monde le fera au moins une fois. Laisser arriver,
  puis lire le message ensemble : c'est la première `NumberFormatException` de
  leur vie, autant qu'elle serve.
- **Confondre les deux familles d'erreurs.** Faire dire à la salle si
  `double grade = IO.readln(...)` est une erreur de compilation ou d'exécution,
  puis la même question pour la saisie `quatre`. C'est le lien explicite avec la
  séance 03.

### Ce qu'il ne faut pas faire

Ne pas montrer de vérification de la saisie. La tentation est forte (_"il
suffit d'un `if`"_), mais les conditions arrivent en séance 06. On écrit
l'hypothèse, on ne la vérifie pas.

Ne pas introduire `try` / `catch`. Hors programme pour ProgIM1.

## Pendant la théorie - Afficher un résultat lisible

### Le cas 3.3 et 4.6

Il est réel et vérifié : `(3.3 + 4.6) / 2` vaut `3.9499999999999997`, et
`printf("%.1f")` affiche `3.9` au lieu de 4.0. Sur toutes les paires de notes
au dixième entre 1.0 et 6.0 (1326 paires), quatre tombent sur ce cas au seuil
de 4.0 : 2.3 et 5.6, 2.8 et 5.1, 3.3 et 4.6, 3.8 et 4.1.

`Math.round(average * 10) / 10.0` corrige ces quatre cas, mais pas tous :
52 paires sur 1326 sont mal arrondies par `printf`, ou par `Math.round`, ou
par les deux (exemple : 1.1 et 4.6, moyenne exacte 2.85, les deux donnent 2.8).
Seul le calcul en dixièmes entiers est exact sur toutes les paires. Il est dans
un bloc repliable : ne pas en faire le cœur de la séance.

Cela nuance la remarque de la séance 03 (_"`>=` ne bascule pas"_), qui reste
vraie pour la comparaison de la moyenne **non arrondie**. Ce qui bascule ici,
c'est l'arrondi au dixième. Le dire si quelqu'un fait le lien, et le garder en
tête pour la séance 06.

### Le point et la virgule

Vérifié sur JDK 21 : `printf("%.2f")` affiche `4,75` en `fr_CH` et `fr_FR`,
`4.75` en `de_CH` et `en_US`. `println` affiche toujours un point.

Les personnes sur une machine en français verront donc des virgules dans les
sorties de `printf`, alors que le support montre des points. Le dire en
démonstration avant qu'elles le découvrent seules. Ne pas montrer
`Locale` : une notion de plus pour un problème cosmétique.

### Ce qui se comprime

L'arrondi au demi-point et le bloc repliable. Ne jamais couper le cas 3.3 et
4.6 : c'est lui qui justifie d'arrondir la valeur.

## Pendant l'atelier

- **Le diagramme avant le code.** Passer dans les rangs dans les dix premières
  minutes et vérifier que les diagrammes existent. Les personnes qui codent
  d'abord et dessinent après produisent un diagramme recopié du code, qui n'a
  servi à rien.
- Le bogue `grade1 + grade2 / 2` apparaîtra malgré la théorie. Le tableau de
  tests le détecte : c'est sa raison d'être.
- **Le tableau de tests est la partie qu'on saute.** Exiger de le voir rempli,
  surtout la colonne _"attendue"_, avant de valider.
- Le cas 3.3 et 4.6 est dans le tableau exprès. Les personnes qui ont suivi la
  théorie arrondissent avec `Math.round` ; les autres découvrent le problème
  seules, ce qui vaut mieux qu'une explication de plus.
- Le cas `7` et `8` dans _"Essayer de le casser"_ doit produire un malaise :
  le programme affiche 7.5 sans broncher. C'est le meilleur teaser pour la
  séance 06.

### Les extensions

La pondération réutilise `final`, vu en séance 03. Le partage de l'addition
ramène la question des centimes et de l'arrondi aux 5 centimes, sans solution
propre aujourd'hui. C'est voulu.

## Discussion et clôture

Faire projeter deux ou trois programmes différents, idéalement un avec et un
sans arrondi. Demander à la classe de retrouver le diagramme dans le code.

Clore par la liste des cas non couverts : _"votre programme accepte 7.5 comme
moyenne. En séance 06, il saura refuser."_ Rappeler que la séance 05 commence
par ce programme.

## Si la séance déborde

| Ce qui se comprime                          | Ce qui ne se comprime jamais                  |
| :------------------------------------------ | :-------------------------------------------- |
| Les extensions de l'atelier                 | Le diagramme avant le code                    |
| L'arrondi au demi-point, le bloc repliable  | Le tableau de tests                           |
| Le problème 3 de l'activité                 | La lecture d'une `NumberFormatException`      |
| La discussion finale, réduite à un exemple  | Le cas 3.3 et 4.6                             |
| Les raccourcis et `Math`, survolés          | L'ordre des opérations                        |

## La contrainte de progression

À cette séance, les personnes n'ont vu **ni condition, ni boucle, ni tableau,
ni fonction autre que `main`, ni méthode de `String`**. Aucun exemple ne doit
en contenir, y compris au tableau.

Les deux pièges propres à cette séance : vérifier une saisie avec un `if`, et
rattraper une exception avec `try`. Les deux sont naturels à proposer, et les
deux sont hors programme aujourd'hui.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
