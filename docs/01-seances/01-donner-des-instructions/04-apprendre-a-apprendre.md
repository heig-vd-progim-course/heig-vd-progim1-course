# Apprendre à apprendre

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Pourquoi cette page existe

La programmation est l'une des rares matières où le travail régulier n'est pas
un conseil moral mais une contrainte technique. Vous ne pouvez pas apprendre à
déboguer la veille, parce que déboguer suppose d'avoir déjà écrit des bogues et
de les avoir cherchés.

Cette page ne parle donc pas de motivation. Elle parle de méthode, et elle est
volontairement courte.

## Trois choses qui fonctionnent

### 1. Se tester plutôt que relire

Relire ses notes donne une sensation de maîtrise qui ne correspond à rien. Le
texte est familier, donc on croit le connaître. C'est ce que l'on appelle
l'illusion de compétence, et c'est la cause principale des mauvaises surprises
en évaluation.

Ce qui fonctionne : fermer le support, écrire ce dont on se souvient, puis
vérifier. C'est inconfortable, et c'est le signe que ça marche.

Appliqué à ce cours : après chaque séance, fermez tout et réécrivez le
diagramme du jour de mémoire. Dix minutes.

### 2. Espacer plutôt que grouper

Trois fois vingt minutes réparties sur la semaine valent mieux qu'une heure
d'affilée le dimanche soir. Pas parce que c'est plus agréable, mais parce
qu'oublier un peu puis récupérer est ce qui fixe la mémoire.

Appliqué à ce cours : vingt minutes le soir du cours, vingt minutes deux jours
plus tard, vingt minutes la veille de la séance suivante.

### 3. Écrire soi-même le code, même mauvais

Lire une solution et la comprendre n'apprend pas à en produire une. Ce sont
deux compétences différentes. Recopier un exemple sans le fermer d'abord
n'apprend rien non plus.

Appliqué à ce cours : chaque exemple de code doit être retapé à la main, sans
copier-coller, puis modifié pour faire autre chose que ce qu'il fait.

## Une chose qui ne fonctionne pas

Travailler avec le téléphone à côté, même retourné, même silencieux.

Le coût réel d'une notification n'est pas le temps qu'elle occupe : c'est le
temps qu'il faut pour reconstruire l'état mental qu'on avait avant. En
programmation, cet état est exactement ce qui vous permet de tenir en tête où
en est votre variable. Le reconstruire prend plusieurs minutes.

Ce n'est pas une question de volonté. Ces applications sont conçues par des
équipes dont le métier est de capter votre attention, et elles sont très
compétentes. Perdre contre elles n'est pas un défaut de caractère. En
revanche, continuer à jouer à armes inégales alors qu'on peut changer les
règles, oui.

## Atelier - reprendre la main

Vingt minutes, maintenant, en classe. L'objectif est que vous repartiez avec
au moins un outil actif sur le téléphone et un sur l'ordinateur.

### Sur le téléphone

| Outil                | Plateformes      | Ce qu'il fait                               |
| :------------------- | :--------------- | :------------------------------------------ |
| [ScreenZen](https://screenzen.co/) | iOS, Android | Intercale un délai et une question avant d'ouvrir une application |
| [Olauncher](https://github.com/tanujnotes/Olauncher) | Android | Lanceur minimaliste en texte, sans icônes ni fil d'actualité. Logiciel libre |
| Mode Concentration   | iOS              | Filtre les notifications par contexte, intégré au système |
| Bien-être numérique  | Android          | Minuteurs par application, intégré au système |

Le plus efficace des quatre n'est aucun des quatre : c'est de désactiver les
notifications de tout ce qui n'est pas un appel ou un message direct. Faites-le
en premier, cela prend trois minutes.

### Sur l'ordinateur

| Outil                | Plateformes      | Ce qu'il fait                               |
| :------------------- | :--------------- | :------------------------------------------ |
| [LeechBlock NG](https://github.com/proginosko/LeechBlockNG) | Firefox, Chrome | Bloque des sites selon des plages horaires et des quotas. Logiciel libre |
| [SelfControl](https://github.com/SelfControlApp/selfcontrol) | macOS | Bloque des sites pour une durée décidée, sans possibilité d'annuler. Logiciel libre |
| [Cold Turkey](https://getcoldturkey.com/) | Windows, macOS | Bloque sites et applications, version gratuite suffisante |
| `/etc/hosts`         | Linux, macOS     | Redirige des domaines vers l'adresse locale. Gratuit et déjà installé |

Le fichier `hosts` est l'option la plus brutale et la plus instructive : vous
verrez en séance 04 pourquoi une ligne dans un fichier texte peut empêcher tout
un système d'atteindre un site.

!!! warning "Ces outils ne sont pas une solution définitive"

    Un blocage se contourne en trente secondes quand on le veut vraiment. Leur
    utilité n'est pas d'empêcher : elle est d'introduire une friction juste
    suffisante pour que le geste automatique redevienne un choix.

    Si vous constatez que vous passez votre temps à les contourner, le
    problème n'est pas l'outil. Venez en parler.

## Planifier son semestre

Ouvrez votre agenda maintenant et bloquez trois créneaux hebdomadaires de vingt
minutes pour ce cours, jusqu'à la fin du semestre. Pas une heure : vingt
minutes. Un créneau court est tenu, un créneau long est déplacé puis annulé.

Ces soixante minutes hebdomadaires, plus les quatre périodes de cours, suffisent
à réussir cette unité d'enseignement. Sans elles, les quatre périodes ne
suffisent pas.

## Sources et pour aller plus loin

- Science étonnante, [_Mieux apprendre & étudier : les (vraies) techniques
  scientifiques_](https://www.youtube.com/watch?v=RVB3PBPxMWg). La répétition
  espacée et l'autoévaluation expliquées et justifiées.
- Science étonnante, [_Les cartes mentales (mind map) : écrire et prendre ses
  notes autrement_](https://www.youtube.com/watch?v=8ueBiBOTs9E).
- Case, N., [_Comment se souvenir de tout pour (quasiment) toujours_](https://ncase.me/remember/fr.html).
  Court essai interactif sur la répétition espacée, à faire soi-même en dix
  minutes.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
