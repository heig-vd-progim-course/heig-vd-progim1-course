# Récapitulatif de l'unité d'enseignement - Support de cours

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/12.01-recapitulatif-de-lunite-denseignement/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/12.01-recapitulatif-de-lunite-denseignement/01-supports-de-cours/12.01-recapitulatif-de-lunite-denseignement-presentation.pdf)
- Résultats des formulaires de feedback et évaluations GAPS :
  [Lien vers le contenu](../02-resultats-des-formulaires-de-feedback/)

## Table des matières

- [Ressources annexes](#ressources-annexes)
- [Table des matières](#table-des-matières)
- [Objectifs](#objectifs)
- [Retrospective](#retrospective)
  - [Objectifs de l'unité d'enseignement](#objectifs-de-lunité-denseignement)
  - [Cours 01 - Modalités de l'unité d'enseignement & Introduction à la programmation et aux algorithmes](#cours-01---modalités-de-lunité-denseignement--introduction-à-la-programmation-et-aux-algorithmes)
  - [Cours 02 - Séquence, sélection et itération](#cours-02---séquence-sélection-et-itération)
  - [Cours 03 - Itération](#cours-03---itération)
  - [Cours 04 - Java & Variables & Constantes](#cours-04---java--variables--constantes)
  - [Cours 05 - Fonctions, Entrée/sortie/encodage & Bonnes pratiques](#cours-05---fonctions-entréesortieencodage--bonnes-pratiques)
  - [Cours 06 - Tableaux](#cours-06---tableaux)
  - [Cours 07 - Consolidation : Types, compilation et vocabulaire](#cours-07---consolidation--types-compilation-et-vocabulaire)
  - [Cours 08 - Bibliothèques et packages & Tableaux et fonctions avancés](#cours-08---bibliothèques-et-packages--tableaux-et-fonctions-avancés)
  - [Cours 09 - Méthodologies de résolution de problèmes](#cours-09---méthodologies-de-résolution-de-problèmes)
  - [Cours 10 - Projet libre](#cours-10---projet-libre)
  - [Cours 11 - Projet guidé : Puissance 4](#cours-11---projet-guidé--puissance-4)
- [Résultats des formulaires de feedback et évaluations GAPS](#résultats-des-formulaires-de-feedback-et-évaluations-gaps)
- [Préparation à l'évaluation](#préparation-à-lévaluation)
  - [Modalités de l'évaluation](#modalités-de-lévaluation)
  - [Critères d'évaluation](#critères-dévaluation)
  - [Comment se préparer ?](#comment-se-préparer-)
  - [Sanctions possibles en cas de tricherie](#sanctions-possibles-en-cas-de-tricherie)
- [Conclusion](#conclusion)
  - [Mes derniers conseils pour la suite](#mes-derniers-conseils-pour-la-suite)
- [Merci !](#merci-)

## Objectifs

- Récapituler les concepts clés appris tout au long du semestre.
- Identifier les compétences acquises durant l'unité d'enseignement.
- Préparer l'évaluation finale de manière structurée et efficace.
- Réfléchir sur son parcours d'apprentissage et les étapes futures.

## Retrospective

Jetons un coup d'œil sur ce que **vous** avez fait durant ce semestre.

### Objectifs de l'unité d'enseignement

> En résumé, vous devriez être capable de :
>
> - Analyser un problème simple et concevoir une solution à l'aide d'algorithmes
>   de base.
> - Identifier et appliquer les structures algorithmiques fondamentales :
>   séquence, sélection et itération.
> - Utiliser efficacement les variables, les constantes et les types de données
>   de base.
> - Définir et utiliser des procédures et des fonctions pour organiser le code.
> - Manipuler des tableaux et effectuer des opérations de base sur des
>   collections de données.
> - Mettre en œuvre des solutions structurées, lisibles et bien commentées à
>   l'aide d'un langage de programmation (Java).
> - Comprendre les principes de base de la compilation, de l'interprétation et
>   de l'exécution des programmes.

### Cours 01 - Modalités de l'unité d'enseignement & Introduction à la programmation et aux algorithmes

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../01.01-modalites-de-lunite-denseignement/)

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../01.02-introduction-a-la-programmation-et-aux-algorithmes/)

#### Éléments clés à retenir

- La programmation est l'art de donner des instructions précises à un ordinateur
  pour résoudre des problèmes.
- Un algorithme est une séquence d'instructions claire et précise pour accomplir
  une tâche.
- La pensée algorithmique permet de décomposer des problèmes complexes en étapes
  simples.
- Les structures de contrôle (séquence, sélection, itération) sont les
  fondements de tout algorithme.
- L'apprentissage de la programmation se fait par la pratique et
  l'expérimentation.

### Cours 02 - Séquence, sélection et itération

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../02.01-sequence-selection-iteration/)

#### Éléments clés à retenir

- La **séquence** exécute les instructions dans l'ordre, l'une après l'autre.
- La **sélection** permet de prendre des décisions avec `if`, `else if`, et
  `else`.
- L'**itération** répète des instructions avec des boucles comme `while` et
  `for`.
- Ces trois structures sont suffisantes pour créer n'importe quel algorithme.
- La maîtrise de ces structures est essentielle pour écrire des programmes
  efficaces.

### Cours 03 - Itération

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../03.01-iteration/)

#### Éléments clés à retenir

- Les boucles `for` sont idéales quand on connaît le nombre d'itérations à
  l'avance.
- Les boucles `while` sont utilisées quand la condition d'arrêt dépend d'un état
  dynamique.
- Les boucles `do-while` garantissent au moins une exécution du corps de la
  boucle.
- Attention aux boucles infinies : toujours s'assurer qu'une condition de sortie
  est possible.
- Les boucles imbriquées permettent de traiter des structures
  multidimensionnelles.

### Cours 04 - Java & Variables & Constantes

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../04.01-java/)

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../04.02-variables-constantes/)

#### Éléments clés à retenir

- Java est un langage orienté objet, compilé et fortement typé.
- Les variables stockent des valeurs qui peuvent changer durant l'exécution.
- Les constantes (`final`) contiennent des valeurs qui ne changent jamais.
- Java propose des types primitifs (`int`, `double`, `boolean`, etc.) et des
  types référence.
- Le typage fort de Java aide à détecter les erreurs dès la compilation.
- Bien nommer ses variables et constantes améliore la lisibilité du code.

### Cours 05 - Fonctions, Entrée/sortie/encodage & Bonnes pratiques

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../05.01-fonctions/)

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../05.02-entree-sortie-encodage/)

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../05.03-bonnes-pratiques/)

#### Éléments clés à retenir

- Les **fonctions** permettent de réutiliser du code et d'organiser les
  programmes en blocs logiques.
- Une fonction peut prendre des paramètres et retourner une valeur.
- Les fonctions facilitent la maintenance et la compréhension du code.
- L'encodage de caractères (UTF-8, ASCII) est crucial pour manipuler
  correctement du texte.
- Les bonnes pratiques incluent : nommage clair, commentaires pertinents,
  formatage cohérent.
- Un code propre est un code qui se lit comme un texte naturel.

### Cours 06 - Tableaux

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../06.01-tableaux/)

#### Éléments clés à retenir

- Les **tableaux** permettent de stocker plusieurs valeurs du même type dans une
  seule variable.
- L'indexation commence à 0 en Java.
- Les tableaux ont une taille fixe définie à leur création.
- On peut parcourir un tableau avec une boucle `for` ou un `for-each`.
- Les tableaux multidimensionnels permettent de représenter des matrices et des
  structures complexes.
- La longueur d'un tableau est accessible via `.length`.

### Cours 07 - Consolidation : Types, compilation et vocabulaire

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../07.01-consolidation-types-compilation-vocabulaire/)

#### Éléments clés à retenir

- Java distingue types primitifs (valeurs) et types référence (objets).
- La compilation traduit le code Java en bytecode exécutable par la JVM.
- Comprendre le processus de compilation aide à mieux diagnostiquer les erreurs.
- Le vocabulaire technique est essentiel pour communiquer efficacement avec
  d'autres développeuses et développeurs.
- La maîtrise des concepts fondamentaux facilite l'apprentissage de nouveaux
  langages.

### Cours 08 - Bibliothèques et packages & Tableaux et fonctions avancés

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../08.01-bibliotheques-et-packages/)

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../08.02-tableaux-fonctions-avances/)

#### Éléments clés à retenir

- Les **bibliothèques** fournissent du code préécrit pour éviter de réinventer
  la roue.
- Les **packages** organisent le code en modules logiques et évitent les
  conflits de noms.
- Java propose une bibliothèque standard riche (`java.util`, `java.io`, etc.).
- Passer des tableaux à des fonctions permet de manipuler des collections
  complexes.
- Les fonctions avancées peuvent retourner des tableaux et effectuer des
  opérations sophistiquées.

### Cours 09 - Méthodologies de résolution de problèmes

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../09.01-methodologies-de-resolution-de-problemes/)

#### Éléments clés à retenir

- Analyser un problème avant de coder évite de perdre du temps sur des solutions
  inappropriées.
- Décomposer un problème complexe en sous-problèmes simples facilite la
  résolution.
- L'approche itérative (essayer, tester, améliorer) est plus efficace que
  chercher la perfection immédiate.
- Le débogage systématique permet d'identifier et corriger les erreurs
  méthodiquement.
- Les algorithmes classiques (recherche, tri) sont des outils puissants à
  connaître.

### Cours 10 - Projet libre

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../10.01-projet-libre/)

#### Éléments clés à retenir

- Vous avez conçu et réalisé un projet de A à Z en appliquant tous les concepts
  appris.
- Vous avez fait des choix techniques et assumé vos décisions.
- Le projet libre vous a permis d'explorer ce qui vous intéresse vraiment.
- Vous avez développé votre autonomie et votre capacité à apprendre par
  vous-même.
- Vous pouvez être fier.es de ce que vous avez créé !

### Cours 11 - Projet guidé : Puissance 4

[Retrouvez ce cours sur le dépôt Git de l'unité d'enseignement](../../10.02-projet-puissance-4/)

#### Éléments clés à retenir

- Le projet Puissance 4 consolide la manipulation de tableaux
  multidimensionnels.
- Vous avez implémenté une logique de jeu complète avec détection de victoire.
- La gestion de l'état du jeu et des interactions utilisateur est essentielle.
- Structurer un projet plus complexe demande une planification rigoureuse.
- Même un jeu simple cache de nombreuses subtilités algorithmiques.

## Résultats des formulaires de feedback et évaluations GAPS

Discussions et retours sur l'unité d'enseignement.

Vous pourrez les retrouver sur le
[dépôt Git de l'unité d'enseignement](../02-resultats-des-formulaires-de-feedback/).

## Préparation à l'évaluation

### Modalités de l'évaluation

- **Type** : Épreuve écrite
- **Durée** : À confirmer
- **Matériel autorisé** : À confirmer
- **Support** : Ordinateur avec environnement de développement Java
- **Date** : À confirmer selon le calendrier académique

### Critères d'évaluation

L'évaluation portera sur votre capacité à :

- Analyser un problème et proposer une solution algorithmique appropriée
- Utiliser correctement les structures de contrôle (séquence, sélection,
  itération)
- Manipuler les variables, constantes et types de données
- Créer et utiliser des fonctions pour structurer votre code
- Travailler avec des tableaux et des collections de données
- Écrire un code lisible, bien commenté et respectant les bonnes pratiques
- Déboguer et tester votre code

### Comment se préparer ?

1. **Revisitez les exercices** : Refaites les exercices des différents modules
2. **Pratiquez** : La programmation s'apprend en pratiquant
3. **Comprenez les concepts** : Ne mémorisez pas, comprenez la logique
4. **Testez votre code** : Habituez-vous à vérifier que votre code fonctionne
5. **Relisez les supports de cours** : Assurez-vous de maîtriser les
   fondamentaux
6. **Posez des questions** : N'hésitez pas si quelque chose n'est pas clair

### Sanctions possibles en cas de tricherie

- La tricherie est sanctionnée conformément au règlement de la HEIG-VD
- Toute tentative de plagiat ou de collaboration non autorisée sera sévèrement
  sanctionnée
- L'intégrité académique est une valeur fondamentale de notre institution
- En cas de doute, demandez toujours à votre enseignant.e

## Conclusion

- Vous avez parcouru un long chemin depuis le début du semestre.
- De la découverte des algorithmes à la création de projets complets.
- Vous avez développé une compréhension solide des fondamentaux de la
  programmation.
- Ces bases vous serviront tout au long de votre parcours professionnel et
  académique.
- La programmation est une compétence qui s'améliore avec la pratique continue.
- Dans le monde professionnel et académique, vous continuerez à apprendre :
  1. De nouveaux langages et paradigmes de programmation
  2. Des outils et frameworks pour développer plus efficacement
  3. Des méthodologies de travail en équipe et de gestion de projet
  4. Des concepts avancés comme la programmation orientée objet, les bases de
     données, etc.
- L'important est de continuer à pratiquer et à rester curieux.se
- Les concepts que vous avez appris en ProgIM1 sont universels :
  - Variables, conditions, boucles existent dans tous les langages
  - La logique algorithmique reste la même
  - Les bonnes pratiques de code propre sont transversales
- Vous avez maintenant les outils pour apprendre n'importe quel autre langage
- La programmation est un outil puissant pour résoudre des problèmes réels

### Mes derniers conseils pour la suite

- Posez-vous toujours les bonnes questions : _"pourquoi ?"_, _"est-ce que je
  fais la bonne chose pour la bonne cause ?"_
- Faites toujours ce qui est bon pour vous : la santé, les relations, les ami.es
  sont plus important.es que le travail !
- Ayez toujours confiance en vous et en vos tripes : faites ce que vous pensez
  être juste !
- Aidez les autres : la coopération vaut mieux que la compétition !
- Restez critique : votre opinion compte et peut faire la différence (ne faites
  pas confiance à tout ce que vous lisez, ex. l'IA !).
- Continuez à expérimenter et à créer : c'est en pratiquant qu'on devient bon.ne
  !

## Merci !

Encore merci pour votre attention et votre engagement tout au long de cette
unité d'enseignement.

J'ai eu beaucoup de plaisir à enseigner cette matière et à travailler avec vous.

Je vous souhaite tout le meilleur pour la suite de votre parcours académique et
professionnel mais, surtout, que vous soyez heureux.ses !

Au plaisir de vous recroiser !

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
