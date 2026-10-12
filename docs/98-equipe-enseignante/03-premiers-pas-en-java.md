# Séance 03 - Premiers pas en Java

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Notes pour l'équipe enseignante. Le support de cours de cette séance est
[ici](../01-seances/03-premiers-pas-en-java/index.md).

## Ce que la séance doit produire

**Un objectif non négociable : tout le monde repart avec IntelliJ qui
fonctionne et un Hello World qui s'exécute.** Une personne qui repart sans
environnement est bloquée pour cinq séances.

Tout le reste de la séance est compressible. Pas ça.

## Avant la séance

| Quoi                               | Détail                                                     |
| :--------------------------------- | :---------------------------------------------------------- |
| Test d'installation complet        | Une machine Windows, une machine macOS, **depuis le réseau de l'école**, téléchargement du JDK compris |
| Clé USB de secours                 | Installateurs IntelliJ Windows, macOS Intel, macOS Apple Silicon, et les JDK Temurin correspondants |
| Vérification des droits            | Les personnes doivent être administratrices de leur machine  |
| Courriel la veille                 | Demander de lancer le téléchargement d'IntelliJ avant d'arriver |

Le test réseau est le point critique : le téléchargement du JDK depuis IntelliJ
est l'étape qui tombe le plus souvent sur un pare-feu. Vingt téléchargements
simultanés saturent par ailleurs la salle, d'où la clé USB.

Les droits d'administration sont la cause de blocage la plus bête et la plus
fréquente.

## Pendant l'atelier d'installation

- Afficher la checklist de sortie au tableau dès le début.
- Faire lever la main aux personnes qui ont terminé et les envoyer aider les
  autres. C'est la seule manière de tenir cinquante minutes avec vingt machines
  différentes.
- Tenir la liste des personnes non validées en fin de séance et les
  recontacter dans la semaine. Ne pas attendre la séance 04 pour le découvrir.

### Ce qui a changé chez JetBrains

IntelliJ IDEA Community Edition n'existe plus en tant que produit distinct
depuis la version 2025.3 : un seul installateur, dont les fonctionnalités Java
sont gratuites.

Conséquence pratique : tous les tutoriels et toutes les captures d'écran qui
parlent de _"Community Edition"_ sont périmés. Le dire avant que la classe ne
tombe dessus.

### La licence étudiante

JetBrains propose une licence gratuite à usage éducatif donnant accès aux
fonctionnalités payantes. Elle n'est **pas nécessaire** pour ce cours, et elle
n'est pas présentée en séance pour ne pas ajouter une création de compte à un
atelier déjà chargé.

Elle est mentionnée dans le support pour celles et ceux qui la demandent :
[programmes éducatifs JetBrains](https://www.jetbrains.com/community/education/).

## Pendant la partie théorique

### Ce qui doit rester

La distinction entre erreur de compilation et erreur d'exécution. C'est la
notion qui servira toutes les semaines jusqu'à la fin du semestre, et celle
qu'on peut vérifier le plus facilement à l'oral.

### Ce qui se comprime

La partie sur les conversions de types. Elle sera de toute façon revue en
séance 05.

### Le piège de la virgule flottante

L'exemple `0.1 + 0.2` fonctionne à tous les coups et marque durablement.

Attention en revanche à ne pas promettre plus que ce qui se produit : sur des
moyennes de deux ou trois notes au dixième, la comparaison à un seuil avec
`>=` ne bascule pas. Ce qui casse réellement, c'est `==` et l'accumulation d'un
grand nombre d'additions. Le support est écrit dans ce sens ; ne pas le
contredire en inventant un cas de seuil raté.

## La contrainte de progression

À cette séance, les personnes n'ont vu **ni boucle, ni condition, ni tableau,
ni saisie clavier**. Aucun exemple ne doit en contenir, y compris les exemples
improvisés au tableau.

C'est la règle la plus facile à enfreindre sans s'en rendre compte, parce que
le code reste correct.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
