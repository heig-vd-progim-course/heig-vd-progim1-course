# Phase 2 - Modifier

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif de la phase

Changer le comportement d'un programme existant sans le casser, et apprendre la
discipline qui rend cela possible.

Modifier est plus difficile qu'écrire, parce qu'il faut d'abord comprendre ce
qui est là. C'est pourtant ce que vous ferez le plus souvent.

## La règle

**Un changement à la fois. On teste après chaque changement.**

Cette règle a l'air d'une perte de temps. Elle est exactement l'inverse. Si
vous faites cinq modifications puis que le jeu ne marche plus, vous avez cinq
causes possibles et leurs combinaisons. Si vous en faites une et que le jeu ne
marche plus, vous avez une cause et vous la connaissez déjà.

Le réflexe de faire cinq changements d'un coup est celui qui coûtera le plus
cher cette année. C'est le moment de le perdre.

## Les modifications à réaliser

Prenez-les dans l'ordre. Elles sont classées par difficulté croissante, et
chacune suppose d'avoir compris la précédente.

### Niveau 1 - Changer une valeur

1. Rendre le personnage deux fois plus rapide.
2. Faire commencer la partie avec cinq vies au lieu de trois.
3. Changer le nombre de points gagnés par ramassage.

Ici, vous ne changez pas la structure : vous changez un nombre. Repérez d'abord
où ce nombre est écrit, et vérifiez qu'il n'est pas écrit à deux endroits.

### Niveau 2 - Changer une apparence

4. Dessiner un nouveau personnage dans l'éditeur d'images.
5. Changer la couleur du fond.
6. Ajouter un son au moment où le score augmente.

C'est la partie agréable. Elle a un vrai intérêt : vous allez découvrir que
modifier l'apparence ne change rien au fonctionnement, et que c'est une bonne
nouvelle. Ce qui est séparé peut être changé sans risque.

### Niveau 3 - Changer une condition

7. Faire perdre la partie quand le score descend sous zéro.
8. Faire apparaître un ennemi seulement après vingt points.
9. Empêcher le personnage de sortir de l'écran par le haut.

Ici, vous touchez à la logique. Chacune de ces modifications demande de
comprendre où la décision se prend, puis d'ajouter ou de changer une condition.

### Niveau 4 - Ajouter un comportement

10. Ajouter un bonus qui rend invincible pendant trois secondes.
11. Ajouter un deuxième niveau plus rapide, atteint à cinquante points.
12. Ajouter un écran de fin qui affiche le meilleur score de la session.

À ce niveau, vous n'avez plus de bloc à modifier : vous devez décider où
brancher quelque chose de nouveau. Dessinez-le avant de le construire, même
grossièrement.

## L'exercice le plus utile de la séance

Quand vous avez terminé au moins jusqu'au niveau 3 :

1. **Cassez volontairement le jeu.** Changez une chose, n'importe laquelle,
   pour que le jeu cesse de fonctionner correctement.
2. Échangez votre poste avec la personne à côté de vous.
3. **Trouvez ce qu'elle a cassé**, et réparez-le.

Vous venez de faire du débogage sur du code que vous n'avez pas écrit, avec un
bogue que vous n'avez pas introduit, sans message d'erreur pour vous aider.
C'est la situation normale du métier.

Notez le temps que cela vous a pris. Nous y reviendrons en séance 10.

## Ce que vous devriez remarquer

- Une modification qui a l'air petite peut demander de comprendre une grande
  partie du programme.
- Certaines modifications sont faciles parce que le programme a été bien
  découpé, d'autres sont pénibles parce qu'une même valeur est écrite à
  plusieurs endroits.
- Quand une valeur est écrite à trois endroits et que vous n'en changez que
  deux, le bogue qui en résulte est très difficile à voir.

Ce dernier point a un nom : c'est la raison d'être des **constantes**, que vous
verrez en séance 04.

## Notes pour l'équipe enseignante

### Matériel à préparer

Le même programme que la phase 1, en copie modifiable. Vérifier soi-même que
les douze modifications sont réalisables dans le programme choisi, et chronométrer
les niveaux 3 et 4 : c'est là que le temps part.

Préparer volontairement le programme avec **une valeur dupliquée à deux
endroits**, pour que la modification 1 ou 3 échoue partiellement chez une partie
de la classe. C'est le meilleur argument possible en faveur des constantes, et
il ne coûte rien à mettre en place.

### Pendant la phase

- La règle du changement unique ne sera pas respectée spontanément. Le rappeler
  une fois collectivement à dix minutes, puis individuellement.
- Pour l'exercice d'échange, imposer que le bogue soit visible en jouant. Un
  bogue caché dans une branche jamais atteinte ne s'y prête pas.
- Personne ne finira les douze modifications. C'est prévu. Le dire d'emblée
  évite le sentiment d'échec.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
