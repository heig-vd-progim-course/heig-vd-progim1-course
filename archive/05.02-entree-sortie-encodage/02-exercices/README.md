# Exercices : Entrée, sortie et encodage

Ce document contient les exercices pour le cours sur l'entrée, la sortie et
l'encodage. Chaque exercice est suivi de sa solution, cachée par défaut.

## Ressources

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.02-entree-sortie-encodage/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.02-entree-sortie-encodage/01-supports-de-cours/05.02-entree-sortie-encodage-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Objectifs

- Pratiquer l'utilisation de `System.out.print()` et `System.out.println()`
- Utiliser `Scanner` pour lire différents types de données
- Créer des programmes interactifs simples
- Comprendre l'importance de l'encodage

## Exercice 1 : Affichage simple

Écrivez un programme qui affiche votre nom et votre âge sur deux lignes
séparées.

Exemple de sortie :

```text
Je m'appelle Ariel
J'ai 25 ans
```

<details>
<summary>Solution</summary>

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Je m'appelle Ariel");
        System.out.println("J'ai 25 ans");
    }
}
```

</details>

## Exercice 2 : Affichage sur une ligne

Écrivez un programme qui affiche "Bonjour le monde !" sur une seule ligne en
utilisant plusieurs appels à `System.out.print()`.

Exemple de sortie :

```text
Bonjour le monde !
```

<details>
<summary>Solution</summary>

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Bonjour ");
        System.out.print("le ");
        System.out.print("monde ");
        System.out.println("!");
    }
}
```

</details>

## Exercice 3 : Concaténation

Écrivez un programme qui utilise deux variables (votre prénom et votre ville) et
affiche "Je m'appelle [prénom] et j'habite à [ville]".

Exemple de sortie :

```text
Je m'appelle Ariel et j'habite à Lausanne
```

<details>
<summary>Solution</summary>

```java
public class Main {
    public static void main(String[] args) {
        String firstName = "Ariel";
        String city = "Lausanne";

        System.out.println("Je m'appelle " + firstName +
                          " et j'habite à " + city);
    }
}
```

</details>

## Exercice 4 : Première lecture

Écrivez un programme qui demande le nom de l'utilisatrice et affiche un message
de bienvenue personnalisé.

Exemple d'interaction :

```text
Comment vous appelez-vous ? Ariel
Bienvenue Ariel !
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Comment vous appelez-vous ? ");
        String name = scanner.nextLine();

        System.out.println("Bienvenue " + name + " !");

        scanner.close();
    }
}
```

</details>

## Exercice 5 : Calcul d'âge

Écrivez un programme qui demande l'année de naissance de l'utilisatrice et
affiche son âge approximatif (en supposant que nous sommes en 2025).

Exemple d'interaction :

```text
Quelle est votre année de naissance ? 2000
Vous avez environ 25 ans.
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Quelle est votre année de naissance ? ");
        int birthYear = scanner.nextInt();

        int age = 2025 - birthYear;

        System.out.println("Vous avez environ " + age + " ans.");

        scanner.close();
    }
}
```

</details>

## Exercice 6 : Addition simple

Écrivez un programme qui demande deux nombres entiers à l'utilisatrice et
affiche leur somme.

Exemple d'interaction :

```text
Premier nombre : 15
Deuxième nombre : 27
15 + 27 = 42
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Premier nombre : ");
        int num1 = scanner.nextInt();

        System.out.print("Deuxième nombre : ");
        int num2 = scanner.nextInt();

        int sum = num1 + num2;

        System.out.println(num1 + " + " + num2 + " = " + sum);

        scanner.close();
    }
}
```

</details>

## Exercice 7 : Calculatrice de moyenne

Écrivez un programme qui demande trois notes à l'utilisatrice et calcule leur
moyenne. Utilisez des nombres décimaux (`double`).

Exemple d'interaction :

```text
Note 1 : 5.5
Note 2 : 4.0
Note 3 : 6.0
Moyenne : 5.166666666666667
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Note 1 : ");
        double grade1 = scanner.nextDouble();

        System.out.print("Note 2 : ");
        double grade2 = scanner.nextDouble();

        System.out.print("Note 3 : ");
        double grade3 = scanner.nextDouble();

        double average = (grade1 + grade2 + grade3) / 3;

        System.out.println("Moyenne : " + average);

        scanner.close();
    }
}
```

</details>

## Exercice 8 : Carte de visite

Écrivez un programme qui demande plusieurs informations à l'utilisatrice (nom,
prénom, âge, ville) et affiche une "carte de visite" formatée.

Exemple d'interaction :

```text
Nom : Sacha
Prénom : Ariel
Âge : 25
Ville : Lausanne

=== Carte de visite ===
Nom : Sacha
Prénom : Ariel
Âge : 25 ans
Ville : Lausanne
========================
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nom : ");
        String lastName = scanner.nextLine();

        System.out.print("Prénom : ");
        String firstName = scanner.nextLine();

        System.out.print("Âge : ");
        int age = scanner.nextInt();
        scanner.nextLine(); // Consommer le retour à la ligne

        System.out.print("Ville : ");
        String city = scanner.nextLine();

        System.out.println();
        System.out.println("=== Carte de visite ===");
        System.out.println("Nom : " + lastName);
        System.out.println("Prénom : " + firstName);
        System.out.println("Âge : " + age + " ans");
        System.out.println("Ville : " + city);
        System.out.println("========================");

        scanner.close();
    }
}
```

**Note importante** : Après avoir utilisé `nextInt()`, nous appelons
`nextLine()` pour consommer le caractère de retour à la ligne laissé dans le
tampon. Sans cela, le prochain `nextLine()` lirait une chaîne vide.

</details>

## Exercice 9 : Convertisseur de température

Écrivez un programme qui demande une température en Celsius et la convertit en
Fahrenheit. Formule : `F = C × 9/5 + 32`

Exemple d'interaction :

```text
Température en Celsius : 25
25.0°C = 77.0°F
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Température en Celsius : ");
        double celsius = scanner.nextDouble();

        double fahrenheit = celsius * 9.0 / 5.0 + 32.0;

        System.out.println(celsius + "°C = " + fahrenheit + "°F");

        scanner.close();
    }
}
```

</details>

## Exercice 10 : Calculatrice complète

Écrivez un programme qui demande deux nombres et affiche :

- Leur somme
- Leur différence
- Leur produit
- Leur quotient

Exemple d'interaction :

```text
Premier nombre : 10
Deuxième nombre : 3

Résultats :
10.0 + 3.0 = 13.0
10.0 - 3.0 = 7.0
10.0 × 3.0 = 30.0
10.0 ÷ 3.0 = 3.3333333333333335
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Premier nombre : ");
        double num1 = scanner.nextDouble();

        System.out.print("Deuxième nombre : ");
        double num2 = scanner.nextDouble();

        double sum = num1 + num2;
        double difference = num1 - num2;
        double product = num1 * num2;
        double quotient = num1 / num2;

        System.out.println();
        System.out.println("Résultats :");
        System.out.println(num1 + " + " + num2 + " = " + sum);
        System.out.println(num1 + " - " + num2 + " = " + difference);
        System.out.println(num1 + " × " + num2 + " = " + product);
        System.out.println(num1 + " ÷ " + num2 + " = " + quotient);

        scanner.close();
    }
}
```

</details>

## Exercice bonus : Quiz interactif

Créez un petit quiz qui pose trois questions à l'utilisatrice et compte le
nombre de bonnes réponses. Les questions peuvent être sur n'importe quel sujet.

Exemple d'interaction :

```text
=== Quiz de culture générale ===

Question 1 : Quelle est la capitale de la Suisse ?
Votre réponse : Berne
Correct !

Question 2 : Combien font 7 × 8 ?
Votre réponse : 56
Correct !

Question 3 : En quelle année a été créé Java ?
Votre réponse : 1990
Incorrect. La bonne réponse était : 1995

Vous avez obtenu 2 sur 3 !
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int score = 0;

        System.out.println("=== Quiz de culture générale ===");
        System.out.println();

        // Question 1
        System.out.println("Question 1 : Quelle est la capitale de la Suisse ?");
        System.out.print("Votre réponse : ");
        String answer1 = scanner.nextLine();

        if (answer1.equalsIgnoreCase("Berne")) {
            System.out.println("Correct !");
            score++;
        } else {
            System.out.println("Incorrect. La bonne réponse était : Berne");
        }
        System.out.println();

        // Question 2
        System.out.println("Question 2 : Combien font 7 × 8 ?");
        System.out.print("Votre réponse : ");
        int answer2 = scanner.nextInt();
        scanner.nextLine(); // Consommer le retour à la ligne

        if (answer2 == 56) {
            System.out.println("Correct !");
            score++;
        } else {
            System.out.println("Incorrect. La bonne réponse était : 56");
        }
        System.out.println();

        // Question 3
        System.out.println("Question 3 : En quelle année a été créé Java ?");
        System.out.print("Votre réponse : ");
        int answer3 = scanner.nextInt();

        if (answer3 == 1995) {
            System.out.println("Correct !");
            score++;
        } else {
            System.out.println("Incorrect. La bonne réponse était : 1995");
        }
        System.out.println();

        // Afficher le résultat final
        System.out.println("Vous avez obtenu " + score + " sur 3 !");

        scanner.close();
    }
}
```

**Note** : Cet exercice utilise `equalsIgnoreCase()` pour comparer les chaînes
sans tenir compte de la casse, et une structure `if` que vous verrez plus en
détail dans un prochain cours.

</details>

## Pour aller plus loin

Maintenant que vous maîtrisez les bases de l'entrée et de la sortie, essayez de
créer vos propres programmes :

- Un convertisseur d'unités (kilomètres en miles, etc.)
- Un calculateur de l'indice de masse corporelle (IMC)
- Un générateur de facture simple
- Une calculatrice de pourboire
- Un programme qui calcule le temps de trajet en fonction de la distance et de
  la vitesse

N'oubliez pas de :

- Donner des instructions claires à l'utilisatrice
- Utiliser des noms de variables explicites en anglais
- Toujours fermer le `Scanner`
- Tester votre programme avec différentes valeurs

**La programmation s'apprend par la pratique. Plus vous coderez, plus ce sera
facile !**
