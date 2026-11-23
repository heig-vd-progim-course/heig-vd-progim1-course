---
title: "[ProgIM1 2026-2027]"
subtitle: "Questionnaire de la séance 08 - Tableaux et code secret, étape 1"
lang: "fr"
geometry: "top=2cm, bottom=2cm, left=2cm, right=2cm"
fontsize: "11pt"
papersize: "a4"
header-includes: |
  \usepackage{fancyhdr}

  \newcommand{\institution}{HEIG-VD}
  \newcommand{\coursename}{Programmation 1 (ProgIM1)}
  \newcommand{\session}{À rendre au début de la séance 09}

  \pagestyle{fancy}
  \fancyhead[L]{\institution}
  \fancyhead[R]{Nom :\hspace{4cm}}
  \fancyfoot[LO,LE]{\coursename}
  \fancyfoot[CO,CE]{\thepage}
  \fancyfoot[RO,RE]{\session}
  \renewcommand{\footrulewidth}{0.4pt}

  \newcommand{\nametable}{%
    \begin{center}%
      \renewcommand{\arraystretch}{2}%
      \setlength{\tabcolsep}{10pt}%
      \begin{tabular}{ l p{8cm} }%
        Prénom : & \\%
        \hline%
        Nom : & \\%
        \hline%
      \end{tabular}%
    \end{center}%
  }

  \newcommand{\answerbox}[1]{%
    \begin{center}%
    \fbox{\parbox[t][#1][t]{0.97\textwidth}{~}}%
    \end{center}%
  }
---

<!--
Générer le PDF depuis la racine du dépôt :

```sh
./generate-evaluations.sh
```
-->

```{=latex}
\nametable
```

## Consignes

- Remplissez ce questionnaire **à la main**, chez vous, et rendez-le **au
  début de la séance 09**.
- Il ne s'agit pas de réciter le cours. Répondez avec vos mots, à partir de ce
  que vous avez programmé. Une réponse incomplète mais sincère vaut mieux
  qu'une réponse parfaite recopiée.
- Le questionnaire est **validé** s'il est rendu à temps et si chaque question
  a une réponse réfléchie. _"Je ne sais pas, voici ce que j'ai essayé"_ est une
  réponse valable. Il compte pour 2,5% de la note.
- Vous pouvez relire le support et votre code. Les questions de l'oral
  ressembleront à celles-ci, sans support : c'est aussi un entraînement.

## Partie 1 - Raisonner sur votre programme

### Question 1

Dans votre code secret, la personne qui joue tape `9` comme premier chiffre.
Que fait votre programme ? Est-ce ce que vous voulez qu'il fasse ? Si non,
que devrait-il faire ?

```{=latex}
\answerbox{4cm}
```

### Question 2

Le code secret est `1 2 3 4`. La personne propose `4 3 2 1`. Combien de
chiffres bien placés votre programme annonce-t-il ? Expliquez, case par case,
comment il arrive à ce nombre.

```{=latex}
\answerbox{4.5cm}
```

### Question 3

Une personne de votre classe a écrit sa boucle de lecture des quatre chiffres
avec `i <= guess.length` au lieu de `i < guess.length`. Que va-t-elle voir en
lançant son jeu, et à quel moment exactement ? Comment lui expliqueriez-vous
d'où vient le problème ?

```{=latex}
\answerbox{4.5cm}
```

### Question 4

En séance 07, le fil rouge calculait la moyenne des notes sans tableau. Pour
afficher les notes en dessous de la moyenne, il en a eu besoin d'un.
Expliquez pourquoi, avec vos mots, comme vous l'expliqueriez à quelqu'un qui
n'a pas suivi le cours.

```{=latex}
\answerbox{4.5cm}
```

## Partie 2 - Revenir sur votre manière de travailler

### Question 5

Décrivez un moment, pendant la séance ou en terminant l'étape 1, où vous
n'avanciez plus. Qu'avez-vous essayé, et dans quel ordre ? Qu'est-ce qui vous a
débloqué, ou qu'est-ce qui vous aurait aidé ?

```{=latex}
\answerbox{6cm}
```

### Question 6

Où en est votre code secret ?

- [ ] Partie 1 : ranger le code et la proposition
- [ ] Partie 2 : compter les bien placés
- [ ] Partie 3 : jouer jusqu'à trouver, au plus dix essais

Si une partie ne fonctionne pas encore, décrivez ce qui se passe quand vous
l'exécutez.

```{=latex}
\answerbox{3cm}
```

### Question 7

Écrivez une question précise que vous vous posez encore sur les tableaux.
_"Je n'ai rien compris"_ n'est pas une question précise ; _"pourquoi la
boucle part de 0 et pas de 1 ?"_ en est une.

```{=latex}
\answerbox{2.5cm}
```

### Question 8

Avez-vous utilisé une aide extérieure (une personne, un site, un outil
d'intelligence artificielle) pour l'étape 1 ou pour ce questionnaire ? Si oui :
quand, pour quoi faire, et comment. Si non, écrivez-le.

```{=latex}
\answerbox{2.5cm}
```
