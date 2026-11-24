# Activité - Des tableaux en quatuor

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Suivre, case par case, ce qu'une boucle fait à un tableau, sans ordinateur. Et
relier quatre façons de voir le même programme : le code, le diagramme
d'activité, ce que la console affiche, et ce que devient le tableau.

**Règle de l'activité : un quatuor, ce sont quatre cartes qui décrivent le même
programme.**

Pas de téléphone, pas d'ordinateur. Un crayon pour annoter le dos de votre
carte.

## Retrouver son quatuor

Chaque personne reçoit **une carte**. Il en existe quatre sortes :

| Carte         | Ce qu'elle porte                                              |
| :------------ | :------------------------------------------------------------ |
| **Code**      | Un programme qui part du tableau `{3, 8, 2, 7, 5}`            |
| **Diagramme** | Le diagramme d'activité du même programme                     |
| **Sortie**    | Ce que la console affiche quand on exécute ce programme       |
| **Tableau**   | Le tableau au début du programme, et le même tableau à la fin |

Votre but : retrouver les trois personnes qui complètent votre carte. Un
quatuor, c'est un code, le diagramme qui le dessine, la sortie qu'il produit et
l'état dans lequel il laisse le tableau.

!!! warning "Les cartes se ressemblent exprès"

    Tous les programmes partent du même tableau. La moitié ont une boucle,
    l'autre moitié n'en ont pas. Plusieurs codes ne diffèrent que d'un
    caractère, `i = 0` ou `i = 1`, `i + 1` ou `i - 1`, ou par l'ordre de deux
    lignes.
    Deux programmes peuvent afficher la même chose et laisser des tableaux
    différents ; deux autres peuvent laisser le même tableau et afficher
    autre chose. Il faut les deux cartes pour être sûr.

    Une carte **Sortie** peut porter un message d'erreur : c'est que le
    programme s'est arrêté en route. Sa carte **Tableau** montre alors l'état
    du tableau au moment de l'arrêt.

## Vérifier

Quand vous pensez avoir trouvé votre quatuor, restez ensemble et vérifiez :

1. La personne qui a le **code** déroule la boucle à voix haute : à chaque tour,
   la valeur de `i`, et la case qui change.
2. La personne qui a le **diagramme** suit le même chemin, losange par losange.
3. La personne qui a le **tableau** vérifie, case par case, que la rangée _À la
   fin_ est bien ce que vous obtenez.
4. La personne qui a la **sortie** vérifie que la dernière ligne du programme
   affiche exactement sa carte.

Si l'une des réponses est non, séparez-vous et cherchez encore.

## Ce que l'on en retient

En fin d'activité, nous en parlons ensemble :

- Quelles cartes vous ont fait hésiter ? Entre quoi et quoi ?
- Deux quatuors laissent le même tableau. Comment les avez-vous départagés ?
- Quel programme échange deux cases, et lequel croit le faire sans y arriver ?
  Pourquoi faut-il une troisième variable ?
- Un programme s'arrête avec une erreur. À quel tour, et quelle case a-t-il
  essayé de lire ?

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
