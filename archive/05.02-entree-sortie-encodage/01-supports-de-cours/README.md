# Cours 05.02 - Entrée, sortie et encodage

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.02-entree-sortie-encodage/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.02-entree-sortie-encodage/01-supports-de-cours/05.02-entree-sortie-encodage-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Table des matières

- [Ressources annexes](#ressources-annexes)
- [Table des matières](#table-des-matières)
- [Objectifs](#objectifs)
- [Qu'est-ce que l'entrée et la sortie ?](#quest-ce-que-lentrée-et-la-sortie-)
- [Afficher du texte avec System.out](#afficher-du-texte-avec-systemout)

## Objectifs

À la fin de cette séance, vous devriez être capable de :

- Afficher du texte dans le terminal avec `System.out`
- Lire des données saisies par l'utilisatrice avec `Scanner`
- Comprendre ce qu'est l'encodage des caractères (ASCII, UTF-8)
- Créer des programmes interactifs simples
  - [System.out.print vs System.out.println](#systemoutprint-vs-systemoutprintln)
  - [Afficher plusieurs valeurs](#afficher-plusieurs-valeurs)

- [Lire des données avec Scanner](#lire-des-données-avec-scanner)
  - [Créer un Scanner](#créer-un-scanner)
  - [Lire différents types de données](#lire-différents-types-de-données)
  - [Fermer le Scanner](#fermer-le-scanner)
- [Comprendre l'encodage des caractères](#comprendre-lencodage-des-caractères)
  - [ASCII : l'ancêtre](#ascii--lancêtre)
  - [Unicode et UTF-8](#unicode-et-utf-8)
  - [Pourquoi l'encodage est important](#pourquoi-lencodage-est-important)
- [Exemples complets](#exemples-complets)
  - [Programme simple avec entrée et sortie](#programme-simple-avec-entrée-et-sortie)
  - [Calculatrice interactive](#calculatrice-interactive)
- [Bonnes pratiques](#bonnes-pratiques)
- [Conclusion](#conclusion)
- [Exercices](#exercices)

## Objectifs

Dans ce cours, vous allez apprendre à communiquer avec l'utilisatrice de votre
programme. Jusqu'à présent, vos programmes affichaient des résultats, mais vous
ne pouviez pas vraiment interagir avec eux. Maintenant, vous allez pouvoir créer
des programmes qui posent des questions et répondent en fonction des réponses de
l'utilisatrice.

De façon plus concise, vous devriez être capables de :

- Afficher du texte dans le terminal avec `System.out`
- Lire des données saisies par l'utilisatrice avec `Scanner`
- Comprendre ce qu'est l'encodage des caractères (ASCII, UTF-8)
- Créer des programmes interactifs simples

## Qu'est-ce que l'entrée et la sortie ?

Imaginez que vous discutez avec une personne. Quand vous parlez, c'est une
**sortie** (vous envoyez de l'information). Quand vous écoutez, c'est une
**entrée** (vous recevez de l'information).

En programmation, c'est la même chose :

- **Sortie** : votre programme affiche quelque chose à l'écran (comme un
  message, un résultat, une question)
- **Entrée** : votre programme reçoit quelque chose de l'utilisatrice (comme une
  réponse, un nombre, du texte)

Le terminal (ou console) est comme une fenêtre de conversation entre vous et
votre programme.

## Afficher du texte avec System.out

Pour afficher du texte dans le terminal, Java met à disposition `System.out`.
C'est comme si votre programme pouvait "parler" à l'écran.

### System.out.print vs System.out.println

Il existe deux façons principales d'afficher du texte :

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Bonjour");
        System.out.print(" le monde !");
        // Affiche : Bonjour le monde !
    }
}
```

`System.out.print()` affiche le texte sans aller à la ligne. Si vous appelez
plusieurs fois `print()`, tout s'affiche sur la même ligne.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour");
        System.out.println("le monde !");
        // Affiche :
        // Bonjour
        // le monde !
    }
}
```

`System.out.println()` affiche le texte et **va à la ligne** après. Le `ln`
signifie "line" (ligne en anglais).

### Afficher plusieurs valeurs

Vous pouvez afficher plusieurs choses en même temps en utilisant l'opérateur `+`
:

```java
public class Main {
    public static void main(String[] args) {
        String name = "Ariel";
        int age = 25;

        System.out.println("Je m'appelle " + name + " et j'ai " + age + " ans.");
        // Affiche : Je m'appelle Ariel et j'ai 25 ans.
    }
}
```

Java convertit automatiquement les nombres en texte quand vous les combinez avec
des chaînes de caractères.

## Lire des données avec Scanner

Pour lire ce que l'utilisatrice tape au clavier, on utilise la classe `Scanner`.
C'est comme avoir une "oreille" pour écouter ce que dit l'utilisatrice.

### Créer un Scanner

Pour utiliser un Scanner, vous devez d'abord l'importer et le créer :

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Votre code ici

        scanner.close();
    }
}
```

Le `System.in` signifie que le Scanner va lire depuis le clavier (l'entrée
standard).

### Lire différents types de données

Le Scanner peut lire différents types de données selon ce que vous attendez de
l'utilisatrice :

**Lire une ligne de texte complète :**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Comment vous appelez-vous ? ");
        String name = scanner.nextLine();

        System.out.println("Bonjour " + name + " !");

        scanner.close();
    }
}
```

**Lire un nombre entier :**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Quel âge avez-vous ? ");
        int age = scanner.nextInt();

        System.out.println("Vous avez " + age + " ans.");

        scanner.close();
    }
}
```

**Lire un nombre décimal :**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Quelle est votre taille en mètres ? ");
        double height = scanner.nextDouble();

        System.out.println("Vous mesurez " + height + " m.");

        scanner.close();
    }
}
```

Voici un tableau récapitulatif des méthodes principales :

| Méthode         | Type retourné | Description                     |
| --------------- | ------------- | ------------------------------- |
| `nextLine()`    | `String`      | Lit une ligne complète de texte |
| `next()`        | `String`      | Lit un mot (jusqu'à l'espace)   |
| `nextInt()`     | `int`         | Lit un nombre entier            |
| `nextDouble()`  | `double`      | Lit un nombre décimal           |
| `nextBoolean()` | `boolean`     | Lit un booléen (true/false)     |

### Fermer le Scanner

Il est important de fermer le Scanner quand vous avez fini de l'utiliser avec
`scanner.close()`. C'est comme fermer une porte après être passé : c'est une
bonne pratique pour libérer les ressources.

## Comprendre l'encodage des caractères

Quand vous tapez une lettre sur votre clavier, l'ordinateur ne comprend que des
nombres (des 0 et des 1). L'encodage des caractères est la façon dont on
transforme les lettres en nombres et vice-versa.

### ASCII : l'ancêtre

ASCII (American Standard Code for Information Interchange) est un des premiers
systèmes d'encodage. Il utilise 128 valeurs différentes pour représenter :

- Les lettres majuscules (A-Z)
- Les lettres minuscules (a-z)
- Les chiffres (0-9)
- Les signes de ponctuation (., !, ?, etc.)
- Des caractères spéciaux

Par exemple :

- La lettre `A` est représentée par le nombre 65
- La lettre `a` est représentée par le nombre 97
- Le chiffre `0` est représenté par le nombre 48

ASCII a été créé en 1963 pour l'anglais uniquement. Il ne peut pas représenter
les caractères accentués comme `é`, `à`, `ü`, etc.

### Unicode et UTF-8

Unicode a été créé pour résoudre les limitations d'ASCII. Il peut représenter
tous les caractères de toutes les langues du monde, ainsi que les emojis.

UTF-8 est la façon la plus courante d'encoder les caractères Unicode. Il est
compatible avec ASCII, ce qui signifie que tout texte ASCII est aussi valide en
UTF-8.

UTF-8 utilise entre 1 et 4 octets (bytes) pour encoder un caractère :

- Les caractères ASCII (comme `A`, `b`, `5`) utilisent 1 octet
- Les caractères accentués (comme `é`, `à`, `ñ`) utilisent 2 octets
- Les caractères d'autres alphabets (comme `中`, `日`, `本`) utilisent 3 octets
- Les emojis utilisent 4 octets

### Pourquoi l'encodage est important

Imaginez que vous envoyez une lettre à une personne, mais que cette personne ne
comprend pas la langue dans laquelle vous avez écrit. Elle verra les mots, mais
ne pourra pas les comprendre.

C'est la même chose avec l'encodage : si un programme essaie de lire un fichier
avec le mauvais encodage, il affichera des caractères bizarres à la place des
vrais caractères.

Par exemple, le caractère `é` encodé en UTF-8 pourrait s'afficher comme `Ã©` si
on essaie de le lire avec un autre encodage.

En Java, quand vous utilisez `System.out` et `Scanner`, l'encodage UTF-8 est
généralement utilisé par défaut, ce qui est une bonne chose car c'est le
standard actuel.

## Exemples complets

### Programme simple avec entrée et sortie

Voici un programme complet qui demande le nom de l'utilisatrice et le salue :

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Programme de salutation ===");
        System.out.print("Comment vous appelez-vous ? ");
        String name = scanner.nextLine();

        System.out.println("Bonjour " + name + " ! Ravi de vous rencontrer.");

        scanner.close();
    }
}
```

### Calculatrice interactive

Voici un exemple plus complexe d'une calculatrice simple :

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Calculatrice simple ===");

        System.out.print("Entrez le premier nombre : ");
        double number1 = scanner.nextDouble();

        System.out.print("Entrez le deuxième nombre : ");
        double number2 = scanner.nextDouble();

        double sum = number1 + number2;
        double difference = number1 - number2;
        double product = number1 * number2;
        double quotient = number1 / number2;

        System.out.println("\nRésultats :");
        System.out.println(number1 + " + " + number2 + " = " + sum);
        System.out.println(number1 + " - " + number2 + " = " + difference);
        System.out.println(number1 + " × " + number2 + " = " + product);
        System.out.println(number1 + " ÷ " + number2 + " = " + quotient);

        scanner.close();
    }
}
```

## Bonnes pratiques

Voici quelques bonnes pratiques à suivre :

1. **Toujours fermer le Scanner** : utilisez `scanner.close()` quand vous avez
   fini.

2. **Donner des instructions claires** : expliquez à l'utilisatrice ce qu'il
   doit faire.

   ```java
   // Bon
   System.out.print("Entrez votre âge (en années) : ");

   // Moins bon
   System.out.print("Âge : ");
   ```

3. **Utiliser println pour les messages** : cela rend la sortie plus lisible.

4. **Nommer vos variables clairement** : `name` est mieux que `n`, `age` est
   mieux que `a`.

5. **Attention aux types** : si vous demandez un nombre avec `nextInt()`,
   l'utilisatrice doit taper un nombre, sinon le programme plantera.

## Conclusion

Vous savez maintenant comment créer des programmes interactifs en Java. Vous
pouvez :

- Afficher des messages avec `System.out.print()` et `System.out.println()`
- Lire des données de l'utilisatrice avec `Scanner`
- Comprendre comment les caractères sont encodés (ASCII, UTF-8)

Ces compétences sont essentielles pour créer des programmes utiles qui peuvent
communiquer avec l'utilisatrice. Dans les prochains cours, vous allez combiner
ces techniques avec ce que vous avez appris sur les structures de contrôle (if,
for, while) et les méthodes pour créer des programmes encore plus intéressants.

## Exercices

Nous vous invitons à réaliser les exercices de ce cours pour renforcer votre
compréhension des concepts vus en classe.

Vous trouverez les détails des exercices ici :
[Exercices](../03-exercices/README.md).
