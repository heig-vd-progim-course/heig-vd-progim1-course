---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM1 Course - Bonnes pratiques de programmation
description: Cours sur les bonnes pratiques de programmation pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.03-bonnes-pratiques/01-supports-de-cours/index.html
header: "**Bonnes pratiques de programmation**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 6
math: mathjax
-->

# Bonnes pratiques de programmation

<!--
_class: lead
_paginate: false
-->

<https://github.com/heig-vd-progim-course/heig-vd-progim1-course>

[Support de cours][cours] · [Présentation (web)][presentation-web] ·
[Présentation (PDF)][presentation-pdf]

<small>V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).</small>

<small>Ce travail est sous licence [CC BY-SA 4.0][license].</small>

![bg brightness:2 opacity:0.2][illustration-principale]

## _Retrouvez plus de détails dans le support de cours_

<!-- _class: lead -->

_Cette présentation est un résumé du support de cours. Pour plus de détails,
consultez le [support de cours][cours]._

## Objectifs (1/2)

À la fin de cette séance, vous devriez être capable de :

- Comprendre l'importance des bonnes pratiques
- Nommer vos variables et méthodes de manière claire
- Formater votre code de manière uniforme

![bg right:40%][illustration-objectifs]

## Objectifs (2/2)

À la fin de cette séance, vous devriez être capable de :

- Écrire des commentaires utiles
- Configurer VS Code pour automatiser la qualité

![bg right:40%][illustration-objectifs]

## Pourquoi les bonnes pratiques ?

Écrire du code qui **fonctionne**, c'est bien.

Écrire du code que les **autres comprennent**, c'est mieux !

Les bonnes pratiques sont comme les règles de politesse : elles facilitent la
communication.

![bg right:40%][illustration-communication]

## Pour qui ?

**Pour vous** : vous relirez votre code dans 6 mois

**Pour votre équipe** : vos collègues doivent comprendre sans 100 questions

**Pour votre carrière** : les entreprises recherchent du code propre

![bg right:40%][illustration-equipe]

## Conventions de nommage

Des règles pour nommer variables, méthodes, classes...

Comme choisir entre "tu" et "vous" : les deux marchent, mais soyez cohérent !

![bg right:40%][illustration-nommage]

## Conventions courantes en Java

| Élément   | Convention  | Exemple                  |
| --------- | ----------- | ------------------------ |
| Variable  | camelCase   | `userName`, `totalPrice` |
| Constante | UPPER_SNAKE | `MAX_VALUE`, `PI`        |
| Méthode   | camelCase   | `calculateTotal()`       |
| Classe    | PascalCase  | `Person`, `BankAccount`  |

**Important** : la cohérence > le choix spécifique

## L'important : la cohérence

Vous préférez `snake_case` ? Pas de problème !

**Tant que vous l'utilisez partout.**

![bg right:40%][illustration-coherence]

## Mauvais exemple de cohérence

```java
public class Main {
    public static void main(String[] args) {
        String user_name = "Ariel";    // snake_case
        int TotalPoints = 100;         // PascalCase
        double averageScore = 85.5;    // camelCase
    }
}
```

Trois styles différents = confusion

## Bon exemple de cohérence

```java
public class Main {
    public static void main(String[] args) {
        String userName = "Ariel";     // camelCase
        int totalPoints = 100;         // camelCase
        double averageScore = 85.5;    // camelCase
    }
}
```

Un seul style = clarté

## Mauvais noms de variables

```java
// Trop court, pas clair
int x = 25;
String n = "Ariel";

// Abréviation obscure
int nbUsrActv = 10;

// Nom trompeur
int totalPrice = 1;  // Ce n'est pas un total !
```

![bg right:40%][illustration-mauvais-noms]

## Bons noms de variables

```java
// Noms clairs et explicites
int age = 25;
String firstName = "Ariel";
int activeUserCount = 10;

// Noms descriptifs pour les booléens
boolean isActive = true;
boolean hasPermission = false;
```

![bg right:40%][illustration-bons-noms]

## Formatage du code

Le formatage rend le code lisible.

Comme les paragraphes et la ponctuation dans un texte.

Sans formatage = livre sans espaces ni retours à la ligne

![bg right:40%][illustration-formatage]

## Éléments de formatage

1. **Indentation** : décaler le code pour montrer la structure
2. **Espaces** : autour des opérateurs (`a + b` pas `a+b`)
3. **Lignes vides** : pour séparer les sections logiques
4. **Longueur des lignes** : limitée à 80-120 caractères
5. **Accolades** : placement cohérent

![bg right:40%][illustration-elements-formatage]

## Code mal formaté

```java
import java.util.Scanner;
public class Main{
public static void main(String[]args){
Scanner sc=new Scanner(System.in);
System.out.print("Nom : ");String n=sc.nextLine();
if(n.length()>0){System.out.println("Bonjour "+n);}
sc.close();}}
```

Ça fonctionne, mais c'est illisible !

## Code bien formaté

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nom : ");
        String name = scanner.nextLine();

        if (name.length() > 0) {
            System.out.println("Bonjour " + name);
        }

        scanner.close();
    }
}
```

![bg right:40%][illustration-bien-formate]

## Commentaires

Les commentaires expliquent le **"pourquoi"**, pas le **"quoi"**.

Le code dit ce qu'il fait, les commentaires expliquent pourquoi.

![bg right:40%][illustration-commentaires]

## Quand commenter

✅ Expliquer la raison d'une décision

✅ Documenter des algorithmes complexes

✅ Avertir d'un comportement non évident

✅ Marquer des sections dans un long fichier

![bg right:40%][illustration-quand-commenter]

## Quand ne PAS commenter

❌ Expliquer du code évident

❌ Commenter du mauvais code (réécrivez-le !)

❌ Laisser du code commenté (supprimez-le)

![bg right:40%][illustration-quand-pas-commenter]

## Mauvais commentaires

```java
// Déclaration d'une variable
int age = 25;  // age est égal à 25

// Affichage de age
System.out.println(age);

// Code commenté "au cas où"
// int oldValue = 30;
```

Ces commentaires n'apportent rien.

![bg right:40%][illustration-mauvais-commentaires]

## Bons commentaires

```java
// La TVA suisse est de 8.1% (taux normal en 2025)
final double TAX_RATE = 0.081;

// On arrondit à 2 décimales pour correspondre
// au format monétaire suisse
double total = Math.round(price * 100.0) / 100.0;
```

Ces commentaires expliquent le "pourquoi".

![bg right:40%][illustration-bons-commentaires]

## Configuration de VS Code

VS Code peut formater automatiquement votre code !

Comme un correcteur orthographique en temps réel.

![bg right:40%][illustration-vscode]

## Le fichier `.vscode/settings.json`

Configure VS Code pour votre projet :

- Formatage automatique à la sauvegarde
- Vérification orthographique
- Affichage des espaces
- Ligne verticale à 80 caractères
- Encodage UTF-8

![bg right:40%][illustration-settings]

## Le fichier `.vscode/extensions.json`

Recommande les extensions utiles :

- **Prettier** : formate automatiquement
- **Code Spell Checker** : vérifie l'orthographe en anglais
- **Code Spell Checker French** : vérifie l'orthographe en français

![bg right:40%][illustration-extensions]

## EditorConfig

Pour les équipes avec différents éditeurs (VS Code, IntelliJ, Sublime Text...).

Un fichier `.editorconfig` à la racine du projet définit les règles pour tous.

![bg right:40%][illustration-editorconfig]

## Contenu du `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = tab
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

![bg right:40%][illustration-editorconfig-contenu]

## Règle d'or

**Rendre votre projet accessible**

Quand une personne utilise votre code :

1. Elle doit pouvoir le faire fonctionner facilement
2. Elle doit avoir la même expérience de développement que vous

![bg right:40%][illustration-regle-or]

## En pratique

- Inclure un `README.md` avec les instructions
- Partager la configuration (`.vscode/` ou `.editorconfig`)
- Documenter les prérequis
- S'assurer que le code compile "out of the box"

![bg right:40%][illustration-pratique]

## À vous de jouer !

- (Re)lire le support de cours.
- Explorer les exemples de code.
- Faire les exercices.
- Poser des questions si nécessaire.

**La qualité du code s'apprend par la pratique !**

![bg right:40%][illustration-a-vous-de-jouer]

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

## Sources

- [Illustration objectifs][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/j6brni7fpvs)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Nikita Kachanovsky](https://unsplash.com/@nkachanovskyyy) sur
  [Unsplash](https://unsplash.com/photos/FJFPuE1MAOM)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.03-bonnes-pratiques/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.03-bonnes-pratiques/01-supports-de-cours/05.03-bonnes-pratiques-presentation.pdf
[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/05.03-bonnes-pratiques/01-supports-de-cours
[exercices]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/05.03-bonnes-pratiques/02-exercices
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]: ./images/home.jpg
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-communication]:
	https://images.unsplash.com/photo-1543269865-cbf427effbad?fit=crop&h=720
[illustration-equipe]:
	https://images.unsplash.com/photo-1522071820081-009f0129c71c?fit=crop&h=720
[illustration-nommage]:
	https://images.unsplash.com/photo-1434030216411-0b793f4b4173?fit=crop&h=720
[illustration-conventions]:
	https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?fit=crop&h=720
[illustration-coherence]:
	https://images.unsplash.com/photo-1558618666-fcd25c85cd64?fit=crop&h=720
[illustration-mauvais-exemple]:
	https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?fit=crop&h=720
[illustration-bon-exemple]:
	https://images.unsplash.com/photo-1461988625982-7e46a099bf4f?fit=crop&h=720
[illustration-mauvais-noms]:
	https://images.unsplash.com/photo-1509228468518-180dd4864904?fit=crop&h=720
[illustration-bons-noms]:
	https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&h=720
[illustration-formatage]:
	https://images.unsplash.com/photo-1455390582262-044cdead277a?fit=crop&h=720
[illustration-elements-formatage]:
	https://images.unsplash.com/photo-1555949963-aa79dcee981c?fit=crop&h=720
[illustration-mal-formate]:
	https://images.unsplash.com/photo-1550745165-9bc0b252726f?fit=crop&h=720
[illustration-bien-formate]:
	https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&h=720
[illustration-commentaires]:
	https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?fit=crop&h=720
[illustration-quand-commenter]:
	https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&h=720
[illustration-quand-pas-commenter]:
	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&h=720
[illustration-mauvais-commentaires]:
	https://images.unsplash.com/photo-1587145820266-a5951ee6f620?fit=crop&h=720
[illustration-bons-commentaires]:
	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?fit=crop&h=720
[illustration-vscode]:
	https://images.unsplash.com/photo-1461988625982-7e46a099bf4f?fit=crop&h=720
[illustration-settings]:
	https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?fit=crop&h=720
[illustration-extensions]:
	https://images.unsplash.com/photo-1592659762303-90081d34b277?fit=crop&h=720
[illustration-editorconfig]:
	https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&h=720
[illustration-editorconfig-contenu]:
	https://images.unsplash.com/photo-1504639725590-34d0984388bd?fit=crop&h=720
[illustration-regle-or]:
	https://images.unsplash.com/photo-1552664730-d307ca884978?fit=crop&h=720
[illustration-pratique]:
	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&h=720
[illustration-recapitulatif]:
	https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
