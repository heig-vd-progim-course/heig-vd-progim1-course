# Bonnes pratiques de programmation - Support de cours

<https://github.com/heig-vd-progim-course/heig-vd-progim1-course>

[Markdown][course-material]

V. Guidoux, avec l'aide de GitHub Copilot

Ce travail est sous licence [CC BY-SA 4.0][license].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.03-bonnes-pratiques/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.03-bonnes-pratiques/01-supports-de-cours/05.03-bonnes-pratiques-presentation.pdf)
- Exercices : [Lien vers le contenu](../02-exercices/README.md)

## Table des matières

- [Ressources annexes](#ressources-annexes)
- [Table des matières](#table-des-matières)
- [Objectifs](#objectifs)
- [Introduction](#introduction)
- [Pourquoi les bonnes pratiques sont importantes](#pourquoi-les-bonnes-pratiques-sont-importantes)
  - [Pour vous](#pour-vous)
  - [Pour votre équipe](#pour-votre-équipe)
  - [Pour votre avenir professionnel](#pour-votre-avenir-professionnel)
- [Conventions de nommage](#conventions-de-nommage)
  - [Qu'est-ce qu'une convention de nommage ?](#quest-ce-quune-convention-de-nommage-)
  - [Conventions courantes en Java](#conventions-courantes-en-java)
  - [L'important : la cohérence](#limportant--la-cohérence)
  - [Exemples de mauvais noms](#exemples-de-mauvais-noms)
  - [Exemples de bons noms](#exemples-de-bons-noms)
- [Formatage du code](#formatage-du-code)
  - [Pourquoi le formatage est important](#pourquoi-le-formatage-est-important)
  - [Éléments de formatage](#éléments-de-formatage)
  - [Exemple de code mal formaté](#exemple-de-code-mal-formaté)
  - [Exemple de code bien formaté](#exemple-de-code-bien-formaté)
- [Commentaires](#commentaires)
  - [Quand commenter](#quand-commenter)
  - [Quand ne pas commenter](#quand-ne-pas-commenter)
  - [Types de commentaires](#types-de-commentaires)
  - [Exemples de mauvais commentaires](#exemples-de-mauvais-commentaires)
  - [Exemples de bons commentaires](#exemples-de-bons-commentaires)
- [Configuration de VS Code](#configuration-de-vs-code)
  - [Le fichier `.prettierrc.yaml`](#le-fichier-prettierrcyaml)
  - [Le fichier `.vscode/settings.json`](#le-fichier-vscodesettingsjson)
  - [Le fichier `.vscode/extensions.json`](#le-fichier-vscodeextensionsjson)
  - [Configuration pas à pas](#configuration-pas-à-pas)
- [EditorConfig : pour les équipes avec différents éditeurs](#editorconfig--pour-les-équipes-avec-différents-éditeurs)
  - [Qu'est-ce qu'EditorConfig ?](#quest-ce-queditorconfig-)
  - [Le fichier `.editorconfig`](#le-fichier-editorconfig)
  - [Comment l'utiliser](#comment-lutiliser)
- [Règle d'or : rendre votre projet accessible](#règle-dor--rendre-votre-projet-accessible)
- [Conclusion](#conclusion)
- [Pour aller plus loin](#pour-aller-plus-loin)
  - [Outils d'analyse de code](#outils-danalyse-de-code)
  - [Tests automatisés](#tests-automatisés)
  - [Gestion de versions avec Git](#gestion-de-versions-avec-git)
  - [Intégration continue (CI/CD)](#intégration-continue-cicd)
  - [Documentation avancée](#documentation-avancée)
  - [Standards d'architecture](#standards-darchitecture)
- [Sources](#sources)

## Objectifs

À la fin de ce cours, vous devriez être capable de :

- Comprendre l'importance des bonnes pratiques de programmation
- Nommer vos variables, méthodes et classes de manière claire et cohérente
- Formater votre code de manière uniforme et lisible
- Écrire des commentaires utiles et pertinents
- Configurer VS Code pour maintenir automatiquement la qualité de votre code
- Utiliser EditorConfig pour assurer la cohérence dans une équipe

## Introduction

Écrire du code qui fonctionne, c'est bien. Écrire du code que les autres (et
vous-même dans 6 mois) peuvent comprendre et modifier facilement, c'est mieux !

Les bonnes pratiques de programmation sont comme les règles de politesse dans
une conversation : elles facilitent la communication et évitent les malentendus.

À la fin de cette séance, vous devriez être capable de :

- Comprendre l'importance des bonnes pratiques de programmation
- Nommer vos variables, méthodes et classes de manière claire et cohérente
- Formater votre code de manière uniforme et lisible
- Écrire des commentaires utiles et pertinents
- Configurer VS Code pour maintenir automatiquement la qualité de votre code
- Utiliser EditorConfig pour assurer la cohérence dans une équipe

## Pourquoi les bonnes pratiques sont importantes

### Pour vous

- Vous relirez votre code plus tard et vous remercierez d'avoir été clair
- Vous perdrez moins de temps à chercher des erreurs
- Vous apprendrez plus vite en écrivant du code structuré

### Pour votre équipe

- Vos collègues comprendront votre code sans avoir à vous poser 100 questions
- Le travail en groupe sera plus fluide
- Les projets pourront évoluer sans devenir un cauchemar

### Pour votre avenir professionnel

- Les entreprises recherchent des développeurs qui écrivent du code propre
- Vous pourrez contribuer à des projets open source
- Vous développerez de bonnes habitudes dès le début

## Conventions de nommage

### Qu'est-ce qu'une convention de nommage ?

Une convention de nommage est un ensemble de règles pour nommer vos variables,
méthodes, classes, etc. C'est comme choisir entre "tu" et "vous" : les deux
fonctionnent, mais il faut être cohérent !

### Conventions courantes en Java

En Java, les conventions les plus utilisées sont :

| Élément   | Convention  | Exemple                  |
| --------- | ----------- | ------------------------ |
| Variable  | camelCase   | `userName`, `totalPrice` |
| Constante | UPPER_SNAKE | `MAX_VALUE`, `PI`        |
| Méthode   | camelCase   | `calculateTotal()`       |

**Note importante** : Ces conventions sont les standards en Java, mais
l'essentiel est d'être **cohérent** dans tout votre projet.

### L'important : la cohérence

Vous pouvez préférer `snake_case` à `camelCase` pour vos variables. Ce n'est pas
un problème **si vous l'utilisez partout dans votre projet**.

Ce qui est problématique :

```java
public class Main {
    public static void main(String[] args) {
        String user_name = "Ariel";    // snake_case
        int TotalPoints = 100;         // PascalCase
        double average-score = 85.5;   // kebab-case (ne compile même pas!)
    }
}
```

Ce qui est cohérent :

```java
public class Main {
    public static void main(String[] args) {
        String userName = "Ariel";     // camelCase
        int totalPoints = 100;         // camelCase
        double averageScore = 85.5;    // camelCase
    }
}
```

### Exemples de mauvais noms

```java
public class Main {
    public static void main(String[] args) {
        // Trop court, pas clair
        int x = 25;
        String n = "Ariel";

        // Nom en français alors que le code est en anglais
        double prixTotal = 99.99;

        // Abréviation obscure
        int nbUsrActv = 10;

        // Nom trompeur
        int totalPrice = 1;  // Ce n'est pas un total !

        // Utilisation de mots réservés ou proche
        int class1 = 5;
    }
}
```

### Exemples de bons noms

```java
public class Main {
    public static void main(String[] args) {
        // Noms clairs et explicites
        int age = 25;
        String firstName = "Ariel";
        double totalPrice = 99.99;
        int activeUserCount = 10;

        // Noms descriptifs pour les booléens
        boolean isActive = true;
        boolean hasPermission = false;
        boolean canEdit = true;

        // Constantes bien nommées
        final double TAX_RATE = 0.2;
        final int MAX_ATTEMPTS = 3;
    }
}
```

## Formatage du code

### Pourquoi le formatage est important

Le formatage rend votre code plus lisible, comme les paragraphes et la
ponctuation rendent un texte plus facile à lire.

Imaginez lire un livre sans espaces ni retours à la ligne. C'est ce que ressent
une personne qui lit du code mal formaté !

### Éléments de formatage

Les principaux éléments de formatage incluent :

1. **Indentation** : décaler le code pour montrer la structure

   ```java
   public class Main {
       public static void main(String[] args) {
           if (true) {
               System.out.println("Bien indenté");
           }
       }
   }
   ```

2. **Espaces** : autour des opérateurs et après les virgules

   ```java
   int sum = a + b;              // Bien
   int sum=a+b;                  // Mal

   method(a, b, c);              // Bien
   method(a,b,c);                // Mal
   ```

3. **Lignes vides** : pour séparer les sections logiques

   ```java
   public class Main {
       public static void main(String[] args) {
           // Section 1 : saisie
           Scanner scanner = new Scanner(System.in);
           String name = scanner.nextLine();

           // Section 2 : traitement
           String greeting = "Hello " + name;

           // Section 3 : affichage
           System.out.println(greeting);

           scanner.close();
       }
   }
   ```

4. **Longueur des lignes** : généralement limitée à 80-120 caractères

   ```java
   // Trop long
   System.out.println("This is a very long line that goes on and on and makes it hard to read without scrolling horizontally which is annoying");

   // Mieux
   System.out.println("This is a long message split into " +
                     "multiple lines for better readability");
   ```

5. **Accolades** : placement cohérent

   ```java
   // Style Java standard (accolade ouvrante sur la même ligne)
   if (condition) {
       // code
   }

   // Style alternatif (accolade ouvrante sur la ligne suivante)
   if (condition)
   {
       // code
   }

   // L'important : choisir un style et s'y tenir !
   ```

### Exemple de code mal formaté

```java
import java.util.Scanner;
public class Main{
public static void main(String[]args){
Scanner sc=new Scanner(System.in);
System.out.print("Entrez votre nom : ");String n=sc.nextLine();
System.out.print("Entrez votre âge : ");
int a=sc.nextInt();
if(a>=18){System.out.println("Bonjour "+n+", vous êtes majeur.");}else{
System.out.println("Bonjour "+n+", vous êtes mineur.");}
sc.close();}}
```

Ce code fonctionne, mais il est très difficile à lire !

### Exemple de code bien formaté

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Entrez votre nom : ");
        String name = scanner.nextLine();

        System.out.print("Entrez votre âge : ");
        int age = scanner.nextInt();

        if (age >= 18) {
            System.out.println("Bonjour " + name + ", vous êtes majeur.");
        } else {
            System.out.println("Bonjour " + name + ", vous êtes mineur.");
        }

        scanner.close();
    }
}
```

Même code, mais tellement plus lisible !

## Commentaires

### Quand commenter

Les commentaires sont utiles pour :

- **Expliquer le "pourquoi"** : la raison d'une décision
- **Documenter des algorithmes complexes** : expliquer la logique
- **Avertir d'un comportement non évident** : quelque chose de surprenant
- **Marquer des sections** : organiser un long fichier

### Quand ne pas commenter

N'utilisez PAS de commentaires pour :

- **Expliquer du code évident** : les commentaires inutiles polluent le code
- **Commenter du mauvais code** : mieux vaut réécrire le code clairement
- **Laisser du code commenté** : supprimez-le (Git garde l'historique)

### Types de commentaires

Java supporte trois types de commentaires :

```java
// Commentaire sur une ligne

/*
 * Commentaire sur
 * plusieurs lignes
 */

/**
 * Commentaire de documentation (Javadoc)
 * Utilisé pour générer une documentation automatique
 */
```

### Exemples de mauvais commentaires

```java
public class Main {
    public static void main(String[] args) {
        // Déclaration d'une variable
        int age = 25;  // age est égal à 25

        // Affichage de age
        System.out.println(age);  // On affiche age

        // Calcul de x
        int x = age + 5;  // On ajoute 5 à age

        // Code commenté qu'on garde "au cas où"
        // int oldValue = 30;
        // System.out.println(oldValue);
    }
}
```

Ces commentaires n'apportent rien : ils répètent ce que le code dit déjà.

### Exemples de bons commentaires

```java
public class Main {
    public static void main(String[] args) {
        // La TVA suisse est de 8.1% (taux normal en 2025)
        final double TAX_RATE = 0.081;

        double priceBeforeTax = 100.0;
        double tax = priceBeforeTax * TAX_RATE;

        // On arrondit à 2 décimales pour correspondre
        // au format monétaire suisse
        double totalPrice = Math.round((priceBeforeTax + tax) * 100.0) / 100.0;

        System.out.println("Prix TTC : " + totalPrice + " CHF");
    }

    /**
     * Calcule le nième nombre de Fibonacci de manière récursive.
     * Attention : cette implémentation est inefficace pour n > 30
     * car elle recalcule les mêmes valeurs plusieurs fois.
     *
     * @param n l'index du nombre de Fibonacci à calculer
     * @return le nième nombre de Fibonacci
     */
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
```

Ces commentaires expliquent le "pourquoi" et ajoutent des informations utiles.

## Configuration de VS Code

VS Code peut vous aider à maintenir la qualité de votre code automatiquement.
C'est comme avoir un assistant qui corrige votre orthographe en temps réel !

### Le fichier `.prettierrc.yaml`

Avant de configurer VS Code, nous devons créer un fichier `.prettierrc.yaml` à
la **racine de votre projet**. Ce fichier indique à Prettier (l'outil de
formatage) comment formater votre code.

```yaml
charset: utf-8
endOfLine: lf
insertFinalNewline: true
printWidth: 80
proseWrap: always
tabWidth: 2
useTabs: true
```

**Explication de chaque propriété** :

| Propriété            | Rôle                                             |
| -------------------- | ------------------------------------------------ |
| `charset: utf-8`     | Utilise l'encodage UTF-8                         |
| `endOfLine: lf`      | Utilise les retours à la ligne Unix (`\n`)       |
| `insertFinalNewline` | Ajoute une ligne vide à la fin de chaque fichier |
| `printWidth: 80`     | Limite la longueur des lignes à 80 caractères    |
| `proseWrap: always`  | Coupe le texte automatiquement à 80 caractères   |
| `tabWidth: 2`        | Une tabulation = 2 espaces d'affichage           |
| `useTabs: true`      | Utilise des tabulations (pas des espaces)        |

**Sans ce fichier, Prettier ne saura pas comment formater votre code !**

### Le fichier `.vscode/settings.json`

Ce fichier contient la configuration de VS Code pour votre projet. Voici les
paramètres utiles :

```json
{
	"[java]": {
		"editor.defaultFormatter": "redhat.java"
	},
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"cSpell.language": "en,fr",
	"editor.formatOnPaste": true,
	"editor.formatOnSave": true,
	"editor.renderWhitespace": "all",
	"editor.rulers": [80],
	"files.encoding": "utf8",
	"files.eol": "\n",
	"files.insertFinalNewline": true
}
```

**Explication de chaque paramètre** :

| Paramètre                  | Rôle                                                              |
| -------------------------- | ----------------------------------------------------------------- |
| `"[java]"`                 | Configuration spécifique pour le langage Java                     |
| `editor.defaultFormatter`  | Définit le plugin `redhat.java` comme formateur par défaut        |
| `cSpell.language`          | Vérifie l'orthographe en anglais et français                      |
| `editor.defaultFormatter`  | Utilise Prettier pour formater automatiquement                    |
| `editor.formatOnPaste`     | Formate le code quand vous collez du texte                        |
| `editor.formatOnSave`      | Formate le code automatiquement quand vous sauvegardez            |
| `editor.renderWhitespace`  | Affiche les espaces et tabulations (aide à repérer les problèmes) |
| `editor.rulers`            | Affiche une ligne verticale à 80 caractères                       |
| `files.encoding`           | Utilise UTF-8 pour tous les fichiers                              |
| `files.eol`                | Utilise les retours à la ligne Unix (`\n`)                        |
| `files.insertFinalNewline` | Ajoute une ligne vide à la fin de chaque fichier                  |

### Le fichier `.vscode/extensions.json`

Ce fichier recommande les extensions VS Code utiles pour votre projet :

```json
{
	"recommendations": [
		"esbenp.prettier-vscode",
		"redhat.java",
		"streetsidesoftware.code-spell-checker",
		"streetsidesoftware.code-spell-checker-french"
	]
}
```

**Explication des extensions** :

| Extension                                      | Rôle                               |
| ---------------------------------------------- | ---------------------------------- |
| `esbenp.prettier-vscode`                       | Formate automatiquement votre code |
| `streetsidesoftware.code-spell-checker`        | Vérifie l'orthographe en anglais   |
| `streetsidesoftware.code-spell-checker-french` | Vérifie l'orthographe en français  |

### Configuration pas à pas

Voici comment configurer VS Code pour votre projet :

#### Étape 1 : Créer le fichier `.prettierrc.yaml`

À la **racine de votre projet**, créez un fichier nommé `.prettierrc.yaml` (avec
le point au début) :

```text
mon-projet/
├── .prettierrc.yaml  ← Créez ce fichier d'abord
├── src/
└── README.md
```

Contenu du fichier `.prettierrc.yaml` :

```yaml
charset: utf-8
endOfLine: lf
insertFinalNewline: true
printWidth: 80
proseWrap: always
tabWidth: 2
useTabs: true
```

#### Étape 2 : Créer le dossier `.vscode`

Toujours à la racine de votre projet, créez un dossier nommé `.vscode` (avec le
point au début).

```text
mon-projet/
├── .prettierrc.yaml
├── .vscode/          ← Créez ce dossier
├── src/
└── README.md
```

#### Étape 3 : Créer `settings.json`

Dans le dossier `.vscode`, créez un fichier `settings.json` avec ce contenu :

```json
{
	"cSpell.language": "en,fr",
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnPaste": true,
	"editor.formatOnSave": true,
	"editor.renderWhitespace": "all",
	"editor.rulers": [80],
	"files.encoding": "utf8",
	"files.eol": "\n",
	"files.insertFinalNewline": true
}
```

#### Étape 4 : Créer `extensions.json`

Dans le même dossier `.vscode`, créez un fichier `extensions.json` :

```json
{
	"recommendations": [
		"esbenp.prettier-vscode",
		"streetsidesoftware.code-spell-checker",
		"streetsidesoftware.code-spell-checker-french"
	]
}
```

#### Étape 5 : Installer les extensions recommandées

1. Ouvrez VS Code
2. Cliquez sur l'icône "Extensions" dans la barre latérale (ou `Ctrl+Shift+X`)
3. VS Code vous proposera d'installer les extensions recommandées
4. Cliquez sur "Installer" pour chaque extension

#### Étape 6 : Tester la configuration

1. Ouvrez un fichier Java
2. Écrivez du code mal formaté :

   ```java
   public class Main{public static void main(String[]args){System.out.println("Test");}}
   ```

3. Sauvegardez le fichier (`Ctrl+S`)
4. Le code devrait se formater automatiquement !

## EditorConfig : pour les équipes avec différents éditeurs

### Qu'est-ce qu'EditorConfig ?

EditorConfig est un standard qui permet de définir des règles de formatage qui
fonctionnent dans **tous les éditeurs de code** (VS Code, IntelliJ IDEA, Sublime
Text, etc.).

C'est particulièrement utile quand vous travaillez en équipe et que tout le
monde n'utilise pas le même éditeur.

### Le fichier `.editorconfig`

À la racine de votre projet, créez un fichier `.editorconfig` :

```ini
## editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = tab
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

**Explication de chaque propriété** :

| Propriété                  | Rôle                                       |
| -------------------------- | ------------------------------------------ |
| `root = true`              | Indique que c'est le fichier racine        |
| `[*]`                      | S'applique à tous les fichiers             |
| `charset = utf-8`          | Utilise l'encodage UTF-8                   |
| `end_of_line = lf`         | Utilise les retours à la ligne Unix (`\n`) |
| `indent_style = tab`       | Utilise des tabulations pour l'indentation |
| `indent_size = 2`          | Une tabulation = 2 espaces                 |
| `insert_final_newline`     | Ajoute une ligne vide à la fin du fichier  |
| `trim_trailing_whitespace` | Supprime les espaces en fin de ligne       |

### Comment l'utiliser

1. **Créez le fichier `.editorconfig`** à la racine de votre projet
2. **Installez le plugin EditorConfig** dans votre éditeur :
   - VS Code : extension "EditorConfig for VS Code"
   - IntelliJ IDEA : support intégré
   - Sublime Text : package "EditorConfig"
3. **Partagez le fichier** avec votre équipe via Git

Maintenant, peu importe l'éditeur utilisé, tout le monde aura le même formatage
!

## Règle d'or : rendre votre projet accessible

**Principe fondamental** : quand une personne utilise votre code, il doit :

1. **Pouvoir le faire fonctionner facilement**
2. **Avoir la même expérience de développement que vous**

C'est comme prêter un outil de la bibliothèque d'outils communautaire : vous le
laissez propre, en bon état et avec un mode d'emploi clair, pas dans un état
incompréhensible.

**En pratique, cela signifie** :

- Inclure un fichier `README.md` expliquant comment installer et utiliser le
  projet
- Partager votre configuration VS Code (`.vscode/`) et Prettier
  (`.prettierrc.yaml`) ou EditorConfig
- Documenter les prérequis (Java 21, extensions nécessaires, etc.)
- S'assurer que le code compile et fonctionne "out of the box"

**Exemple de bon README.md** :

```markdown
# Mon Projet

## Prérequis

- Java 21
- VS Code avec les extensions recommandées

## Installation

1. Clonez le projet
2. Ouvrez le projet dans VS Code
3. Installez les extensions recommandées

## Utilisation

java src/Main.java

## Configuration

Le projet utilise :

- `.prettierrc.yaml` pour les règles de formatage Prettier
- `.vscode/settings.json` pour la configuration VS Code
- `.editorconfig` pour les règles de formatage communes
```

## Conclusion

Les bonnes pratiques de programmation ne sont pas des règles strictes à suivre
aveuglément. Ce sont des **conventions qui facilitent la communication** entre
développeurs.

**Points clés à retenir** :

1. **La cohérence est plus importante que le choix spécifique** : camelCase ou
   snake_case ? Peu importe, tant que c'est cohérent !
2. **Le formatage rend le code lisible** : indentation, espaces, lignes vides
3. **Les commentaires expliquent le "pourquoi", pas le "quoi"** : le code dit ce
   qu'il fait, les commentaires expliquent pourquoi
4. **Automatisez ce qui peut l'être** : VS Code et EditorConfig peuvent formater
   automatiquement
5. **Pensez aux autres** : votre code sera lu bien plus souvent qu'il ne sera
   écrit

**Pour vos projets** :

- Commencez par configurer votre environnement (`.prettierrc.yaml`, `.vscode/`
  ou `.editorconfig`)
- Choisissez des conventions de nommage et tenez-vous-y
- Activez le formatage automatique
- Relisez votre code avant de le partager

**En équipe** :

- Discutez des conventions à adopter ensemble
- Partagez la configuration de l'éditeur
- Faites des revues de code entre vous
- Soyez indulgents : on apprend tous !

## Pour aller plus loin

Une fois que vous maîtrisez les bases, vous pouvez explorer :

### Outils d'analyse de code

- **Checkstyle** : vérifie que votre code Java respecte les conventions
- **SpotBugs** : détecte les bugs potentiels dans votre code
- **SonarLint** : extension VS Code qui analyse votre code en temps réel

### Tests automatisés

- **JUnit** : framework pour écrire des tests en Java
- Les tests garantissent que votre code fonctionne et ne régresse pas

### Gestion de versions avec Git

- Apprenez à utiliser Git pour suivre l'historique de votre code
- **Commits clairs** : chaque commit doit avoir un message explicite
- **Branches** : travaillez sur des fonctionnalités isolées

### Intégration continue (CI/CD)

- **GitHub Actions** : automatise les tests et le déploiement
- Vérifie automatiquement que le code compile et que les tests passent
- Formate automatiquement le code avant chaque commit

### Documentation avancée

- **Javadoc** : générez une documentation HTML à partir de vos commentaires
- **Markdown** : écrivez de la documentation claire et structurée
- **PlantUML** : créez des diagrammes pour expliquer votre architecture

### Standards d'architecture

- **Clean Code** (livre de Robert C. Martin)
- **Design Patterns** : solutions éprouvées à des problèmes courants
- **SOLID principles** : principes de conception orientée objet

Ces sujets seront abordés dans les cours suivants ou dans d'autres modules. Pour
l'instant, concentrez-vous sur les bases : nommage, formatage, commentaires et
configuration de l'éditeur.

## Sources

- [EditorConfig](https://editorconfig.org/)
- [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- [Oracle Java Code Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-contents.html)
- [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
  par Robert C. Martin

<!-- URLs -->

[course-material]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/05.03-bonnes-pratiques/01-supports-de-cours/README.md
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
