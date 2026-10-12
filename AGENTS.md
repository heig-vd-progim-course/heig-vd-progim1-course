# Instructions pour les agents

Ce fichier décrit les conventions du dépôt du cours ProgIM1. Il s'adresse aux
assistants de rédaction (Claude, GitHub Copilot, etc.) et aux personnes qui
reprendraient ce cours.

Il décrit **comment** écrire dans ce dépôt. La procédure de préparation d'une
séance, elle, vit dans le skill Claude `preparer-une-seance-progim1`.

## Le cours

Programmation 1 (ProgIM1), HEIG-VD, filière Ingénierie des médias. Première
unité d'enseignement de programmation : le public n'a jamais programmé.

- Site publié :
  <https://heig-vd-progim-course.github.io/heig-vd-progim1-course/>
- Langue du cours : français. Langue du code : anglais.
- Langage enseigné : Java, avec un JDK 25 (LTS) et IntelliJ IDEA.
- Licence : CC BY-SA 4.0.

### Philosophie

Reprise de celle du cours DAI de L. Delafontaine
([référence](https://github.com/heig-vd-dai-course/heig-vd-dai-course/tree/main/99.99-resources-for-the-teaching-staff#philosophy-of-the-course))
:

- **Droit au but** : ne pas faire perdre de temps. Court, efficace, utile.
- **Ouvert** : tout le contenu est public, critiquable et modifiable.
- **Résilient** : une autre personne doit pouvoir reprendre ce travail.
- **Liberté** : les personnes travaillent sur ce qui les intéresse.
- **Shit happens** : se tromper est normal, et doit pouvoir se dire.

Deux conséquences concrètes sur la rédaction :

- on donne la canne à pêche, pas le poisson : renvoyer à la documentation
  officielle plutôt que recopier une réponse ;
- le support écrit est la référence, les présentations n'en sont qu'un résumé.

### Dépôts de référence

- [ProgServ1](https://github.com/heig-vd-progserv-course/heig-vd-progserv1-course) -
  le modèle de qualité et de ton à viser.
- [UPInfo](https://github.com/heig-vd-upinfo-course/heig-vd-upinfo-course) - le
  modèle de site, en Starlight là où nous utilisons Zensical.
- [DAI](https://github.com/heig-vd-dai-course/heig-vd-dai-course) - la
  philosophie et les contenus Java avancés.

## Règles de rédaction

1. **Français** pour tout le contenu, **anglais** pour les identifiants de code.
2. **Langage épicène** : _"la personne qui étudie"_, _"les personnes"_. Éviter
   _"l'étudiant"_ et les doublets lourds.
3. **Apostrophes simples** (`'`), jamais typographiques.
4. **Pas d'émojis**, nulle part, y compris dans le `README.md`.
5. **Prettier**, règle à 80 caractères, UTF-8, fins de ligne LF, tabulations.
6. **Vouvoiement** des personnes qui étudient. Ton direct, phrases courtes, pas
   de remplissage. On peut être sec, jamais méprisant.
7. **Pas de promesse creuse** : si une difficulté existe, on la nomme.

### Ce qu'on évite

- Les formules d'encouragement vides (_"c'est très simple !"_). Si c'est simple,
  ça se voit ; si ça ne l'est pas, le dire est plus utile.
- Les analogies filées sur plus de deux phrases.
- Les listes de plus de six éléments sans sous-titres.

## Structure du dépôt

```text
docs/                        contenu du site Zensical
  index.md                   accueil, objectifs généraux, programme
  00-organisation/           modalités, évaluation, mini-projet, outils
  01-seances/
    index.md                 programme détaillé des 12 séances
    NN-nom-de-la-seance/     séance développée : vue d'ensemble + sous-pages
    NN-nom-de-la-seance.md   séance encore à l'état d'esquisse
  99-ressources/
presentations/
  NN-nom-de-la-seance/
    PRESENTATION.md          source Marp
    images/
.marp/                       config.yaml et theme.css, ne pas modifier le thème
zensical.toml                configuration du site, dont la navigation
generate-presentations.sh    Marp vers docs/presentations/ (HTML et PDF)
generate-diagrams.sh         PlantUML vers SVG, à côté des sources
check-presentations.py       contrôle de débordement des diapositives
```

`docs/presentations/` et `site/` sont **générés** : ne rien y écrire à la main,
ils sont ignorés par Git.

### Dossiers hérités

Les dossiers `00.00-template/` à `12.01-recapitulatif-de-lunite-denseignement/`
sont l'ancienne structure, antérieure au passage à Zensical. Ils contiennent des
exercices et des exemples de code qui n'ont pas encore été repris.

**Ne rien y ajouter.** Ils seront déplacés dans `archive/` au fur et à mesure
que leur contenu est repris dans `docs/`.

## Anatomie d'une séance

Une séance fait **quatre périodes de 45 minutes, soit 180 minutes
d'enseignement, plus 30 minutes de pause**. Tout déroulé doit totaliser
exactement cela.

Une séance développée est un dossier :

```text
docs/01-seances/NN-nom-de-la-seance/
  index.md                   vue d'ensemble
  01-premier-sujet.md        théorie ou activité
  02-deuxieme-sujet.md
```

### L'`index.md` d'une séance

Dans cet ordre :

1. Titre `# Séance NN - Nom`, puis l'attribution et la licence.
2. `## Ressources annexes` : liens vers la présentation web et PDF, puis vers
   chaque sous-page.
3. `## Objectifs` : un paragraphe qui relie la séance à la précédente, puis _"À
   la fin de cette séance, vous devriez être capable de :"_ suivi d'une liste de
   verbes d'action.
4. `## Déroulé` : un tableau minuté, colonnes Temps, Durée, Contenu, avec les
   pauses. Suivi d'une `### Note sur la gestion du temps` qui dit ce qu'on coupe
   si la séance déborde, et ce qu'on ne coupe jamais.
5. `## Méthodes d'enseignement et d'apprentissage`.
6. `## Méthodes d'évaluation`.
7. `## À faire pour la semaine suivante`.

### Les sous-pages

Une sous-page par activité ou par bloc de théorie. Chacune commence par son
objectif en deux phrases, et les pages d'activité portent une règle unique
énoncée en gras.

**Les pages de séance ne contiennent rien qui s'adresse à l'enseignant.**
Matériel à préparer, pièges observés, ce qu'il faut faire émerger au débriefing,
ce qu'il ne faut pas donner tout de suite : tout cela vit dans
`docs/98-equipe-enseignante/NN-nom-de-la-seance.md`.

Une séance développée a donc deux pages de tête : son `index.md` dans
`01-seances/`, qui s'adresse aux personnes qui étudient, et sa page dans
`98-equipe-enseignante/`, qui s'adresse à qui donne le cours. La première
renvoie à la seconde par une ligne de ses _"Ressources annexes"_, et la seconde
renvoie à la première.

### La page pour l'équipe enseignante

`docs/98-equipe-enseignante/NN-nom-de-la-seance.md`, dans cet ordre :

1. Un renvoi vers le support de cours de la séance.
2. `## Ce que la séance doit produire` : l'intention réelle, en trois lignes. Ce
   que l'on veut qu'il reste si tout le reste est oublié.
3. `## Avant la séance` : matériel, tests à faire, courriels à envoyer. Sous
   forme de tableau quand il y a plus de trois éléments.
4. Une section par activité ou par phase : ce qu'il faut faire, ce qu'il ne faut
   pas faire, ce qui rate habituellement.
5. Ce qui se comprime et ce qui ne se comprime jamais si la séance déborde.

Ces pages sont publiques et dans la navigation. C'est assumé : quelqu'un doit
pouvoir reprendre ce cours sans deviner pourquoi les choses sont faites ainsi.
Une admonition sur la page d'accueil de la section prévient les personnes qui
étudient de ce qu'elles y trouveront.

### Les séances à l'état d'esquisse

Un fichier unique `NN-nom.md` contenant un bloc
`!!! warning "Contenu à rédiger"`, puis `## Intention`,
`## Objectifs pressentis` et `## Activité pressentie`. Cela permet au programme
d'être lisible avant que le contenu existe.

Quand une esquisse devient une séance développée, **supprimer le fichier
`NN-nom.md`** : un fichier hors navigation traîne sinon indéfiniment.

## Conventions Zensical

Le site utilise [Zensical](https://zensical.org/) et les extensions Markdown de
Material for MkDocs. Les admonitions GitHub (`> [!NOTE]`) **ne fonctionnent
pas** ici.

```markdown
!!! note "Titre facultatif"

    Corps de l'admonition, indenté de quatre espaces.

??? note "Bloc repliable"

    Pour ce qui est facultatif ou pour aller plus loin.

=== "Premier onglet"

    Contenu du premier onglet.

=== "Deuxième onglet"

    Contenu du deuxième onglet.
```

Types utilisés : `note`, `tip`, `warning`, `danger`. Avec parcimonie.

Les diagrammes sont en Mermaid dans un bloc ` ```mermaid `. Donner un libellé à
chaque nœud : un nœud vide casse le rendu.

### La navigation

Elle est définie à la main dans `zensical.toml`, clé `nav`. **Une table en ligne
TOML doit tenir sur une seule ligne** : ne jamais retourner à la ligne à
l'intérieur d'une accolade, le fichier ne se parse plus.

Toute page ajoutée doit être ajoutée à `nav`, et toute page retirée doit en être
retirée.

## Conventions Marp

Une présentation par séance, dans `presentations/NN-nom-de-la-seance/`.

### En-tête

```markdown
---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de Claude
title: HEIG-VD ProgIM1 Course - [Sujet]
description: [Description] pour l'unité d'enseignement ProgIM1 enseignée à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/NN-nom/
header: "**[Sujet]**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2026-2027](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->
```

### Règles

- `headingDivider: 2` découpe les diapositives sur les titres. **Ne jamais
  utiliser `---` pour séparer deux diapositives** : les seuls `---` autorisés
  sont ceux des lignes 1 et 3.
- Thème `custom-marp-theme`, jamais `default`. Ne pas ajouter de `<style>`.
- Ordre des diapositives : titre, _"Retrouvez plus de détails dans le support de
  cours"_, rappel de la séance précédente, objectifs, contenu, _"À vous de jouer
  !"_, questions.
- **Pas d'images** dans les présentations : ni illustration, ni fond
  (`![bg]`), ni diapositive de sources. Le texte et le code suffisent.

### Densité

Les lignes de code et les traces d'erreur longues débordent en largeur. Sur une
diapositive, citer la ligne utile en code en ligne et renvoyer au support pour
le message complet. Une diapositive trop chargée se découpe en `(1/2)` et
`(2/2)`.

**Avant de livrer, lancer le contrôle :**

```sh
python3 check-presentations.py
```

Il mesure chaque diapositive avec le thème du dépôt et signale ce qui dépasse.
Aucun débordement ne doit subsister.

## Exemples de code

- Java, identifiants en anglais, commentaires en français.
- **Exécuter chaque exemple avant de l'écrire dans le support**, et coller la
  sortie réelle. Ne jamais écrire de sortie de mémoire : les valeurs à virgule
  flottante et les messages d'erreur ne s'inventent pas.
- Un exemple ne doit utiliser **aucune notion non encore enseignée**. Pas de
  boucle avant la séance qui les introduit, pas de tableau, pas de saisie
  clavier. Cette règle est la plus facile à enfreindre sans s'en rendre compte.
- Les messages d'erreur sont donnés en entier, avec le nom du fichier et le
  numéro de ligne.

## Progression

L'ordre des notions est contraignant. Chaque séance ne peut s'appuyer que sur ce
qui précède.

| Séance | Notions disponibles à partir de là                        |
| -----: | :-------------------------------------------------------- |
|     01 | Séquence, sélection, itération, mais dessinées uniquement  |
|     02 | Programmation par blocs, événements                        |
|     03 | Variables, types primitifs, affichage console              |
|     04 | Saisie clavier, programme complet de bout en bout          |
|     05 | Fonctions, paramètres, valeur de retour, portée            |
|     06 | Conditions et opérateurs logiques                          |
|      — | Évaluation écrite (50 %), entre les séances 06 et 07       |
|     07 | Boucles                                                    |
|     08 | Tableaux. Lancement du mini-projet                         |
|     09 | Chaînes de caractères et formatage                         |
|     10 | Débogage et tests                                          |
|     11 | Git                                                        |
|     12 | Présentations orales                                       |
|      — | Évaluation finale, après le semestre                       |

Deux points qui surprennent et qui sont volontaires : **les fonctions arrivent
avant les conditions et les boucles**, selon l'ordre du cours Java
d'OpenClassrooms, et **il n'y a pas de pseudo-code** dans ce cours. On passe du
diagramme d'activité directement au Java.

Un **fil rouge** traverse les séances 04 à 09 : calculer la moyenne des notes
d'un groupe et dire qui a réussi. À chaque séance, il est repris avec l'outil du
jour et la version précédente est réécrite.

## Avant de livrer

1. Les liens internes résolvent, et toute nouvelle page est dans `nav`.
2. `python3 check-presentations.py` ne signale rien.
3. `zensical serve` démarre et le site s'affiche.
4. Les exemples de code ont été exécutés et leurs sorties sont celles obtenues.
5. Aucun fichier d'esquisse ne subsiste pour une séance développée.

## Attribution

Chaque page porte, juste sous le titre :

```markdown
V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].
```

avec, en fin de fichier :

```markdown
<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
```

Les cours et les outils dont ce dépôt s'inspire sont listés dans
`ATTRIBUTION.md`, selon la recommandation TASL de Creative Commons. Toute
nouvelle source y est ajoutée.

## Limites des outils distants

Les outils qui écrivent dans ce dépôt depuis une session Claude **ne peuvent
pas** écrire dans `.github/workflows/` ni dans `.devcontainer/`, ni supprimer de
fichier, ni lancer Git. Ces opérations restent manuelles : l'agent doit les
nommer explicitement plutôt que de les passer sous silence.
