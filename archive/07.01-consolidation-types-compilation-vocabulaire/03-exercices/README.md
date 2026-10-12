# Consolidation : Types, compilation et vocabulaire - Exercices

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/07.01-consolidation-types-compilation-vocabulaire/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/07.01-consolidation-types-compilation-vocabulaire/01-supports-de-cours/07.01-consolidation-types-compilation-vocabulaire-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Exercices

### Exercice 1 : Types primitifs

**Objectif** : Manipuler tous les types primitifs de Java.

Créez un fichier `TypeExplorer.java` qui :

1. Déclare une variable de chaque type primitif (byte, short, int, long, float,
   double, boolean, char)
2. Affiche la valeur de chaque variable
3. Affiche la taille de chaque type en bits

**Bonus** : Essayez d'affecter une valeur trop grande pour un `byte` (par
exemple 200) et observez ce qui se passe.

<details>
<summary>Solution</summary>

```java
public class TypeExplorer {
    public static void main(String[] args) {
        System.out.println("=== Exploration des types primitifs ===\n");

        // Types entiers
        byte age = 25;
        short year = 2025;
        int population = 1_000_000;
        long distance = 149_600_000_000L;

        // Types à virgule flottante
        float pi = 3.14f;
        double preciseValue = 3.14159265358979;

        // Type booléen
        boolean isValid = true;

        // Type caractère
        char grade = 'A';

        // Affichage
        System.out.println("byte age = " + age + " (8 bits)");
        System.out.println("short year = " + year + " (16 bits)");
        System.out.println("int population = " + population + " (32 bits)");
        System.out.println("long distance = " + distance + " (64 bits)");
        System.out.println("float pi = " + pi + " (32 bits)");
        System.out.println("double preciseValue = " + preciseValue + " (64 bits)");
        System.out.println("boolean isValid = " + isValid + " (1 bit)");
        System.out.println("char grade = " + grade + " (16 bits)");

        // Bonus : débordement
        System.out.println("\n=== Bonus : Débordement ===");
        byte overflow = (byte) 200; // Casting forcé
        System.out.println("byte overflow = (byte) 200 → " + overflow);
        System.out.println("Explication : 200 dépasse la limite de byte (-128 à 127)");
    }
}
```

**Compilation et exécution** :

```bash
javac TypeExplorer.java
java TypeExplorer
```

</details>

### Exercice 2 : Comparaison de nombres flottants

**Objectif** : Comprendre les problèmes de précision avec les doubles.

Créez un fichier `FloatComparison.java` qui :

1. Calcule `0.1 + 0.2`
2. Compare le résultat avec `0.3` en utilisant `==` (mauvaise pratique)
3. Compare le résultat avec `0.3` en utilisant une marge d'erreur epsilon (bonne
   pratique)
4. Affiche les deux résultats

<details>
<summary>Solution</summary>

```java
public class FloatComparison {
    public static void main(String[] args) {
        System.out.println("=== Comparaison de nombres flottants ===\n");

        double result = 0.1 + 0.2;
        double expected = 0.3;

        System.out.println("Calcul : 0.1 + 0.2");
        System.out.println("Résultat : " + result);
        System.out.println("Attendu : " + expected);
        System.out.println();

        // Mauvaise pratique : comparaison avec ==
        System.out.println("=== Mauvaise pratique ===");
        if (result == expected) {
            System.out.println("Les nombres sont égaux (==)");
        } else {
            System.out.println("Les nombres ne sont PAS égaux (==)");
        }
        System.out.println();

        // Bonne pratique : comparaison avec epsilon
        System.out.println("=== Bonne pratique ===");
        double epsilon = 0.0001;
        if (Math.abs(result - expected) < epsilon) {
            System.out.println("Les nombres sont égaux (à epsilon près)");
        } else {
            System.out.println("Les nombres ne sont PAS égaux");
        }
    }
}
```

**Compilation et exécution** :

```bash
javac FloatComparison.java
java FloatComparison
```

</details>

### Exercice 3 : Arguments en ligne de commande

**Objectif** : Utiliser les arguments passés au programme.

Créez un fichier `Greeting.java` qui :

1. Vérifie si au moins un argument a été passé
2. Si oui, affiche "Bonjour, [nom] !" où [nom] est le premier argument
3. Si non, affiche "Bonjour, inconnu !"
4. Si un deuxième argument est présent, affiche "Tu as [âge] ans !"

**Testez votre programme avec** :

- `java Greeting`
- `java Greeting Ariel`
- `java Greeting Ariel 25`

<details>
<summary>Solution</summary>

```java
public class Greeting {
    public static void main(String[] args) {
        System.out.println("=== Programme de salutation ===\n");

        // Vérifier si un nom a été fourni
        if (args.length > 0) {
            String name = args[0];
            System.out.println("Bonjour, " + name + " !");

            // Vérifier si un âge a été fourni
            if (args.length > 1) {
                String age = args[1];
                System.out.println("Tu as " + age + " ans !");
            }
        } else {
            System.out.println("Bonjour, inconnu !");
            System.out.println();
            System.out.println("Usage : java Greeting [nom] [âge]");
        }
    }
}
```

**Compilation et exécution** :

```bash
javac Greeting.java

# Sans arguments
java Greeting

# Avec nom
java Greeting Ariel

# Avec nom et âge
java Greeting Ariel 25
```

</details>

### Exercice 4 : Calculatrice en ligne de commande

**Objectif** : Créer un programme complet utilisant les arguments.

Créez un fichier `Calculator.java` qui :

1. Reçoit trois arguments : nombre1, opérateur (+, -, \*, /), nombre2
2. Effectue le calcul et affiche le résultat
3. Gère les erreurs (division par zéro, arguments manquants, etc.)

**Testez avec** :

- `java Calculator 10 + 5`
- `java Calculator 20 - 8`
- `java Calculator 6 * 7`
- `java Calculator 15 / 3`
- `java Calculator 10 / 0` (gestion d'erreur)

<details>
<summary>Solution</summary>

```java
public class Calculator {
    public static void main(String[] args) {
        System.out.println("=== Calculatrice en ligne de commande ===\n");

        // Vérifier qu'on a bien 3 arguments
        if (args.length < 3) {
            System.out.println("Erreur : Arguments manquants !");
            System.out.println();
            System.out.println("Usage : java Calculator nombre1 opérateur nombre2");
            System.out.println();
            System.out.println("Exemples :");
            System.out.println("  java Calculator 10 + 5");
            System.out.println("  java Calculator 20 - 8");
            System.out.println("  java Calculator 6 * 7");
            System.out.println("  java Calculator 15 / 3");
            return;
        }

        try {
            // Convertir les arguments en nombres
            double num1 = Double.parseDouble(args[0]);
            String operator = args[1];
            double num2 = Double.parseDouble(args[2]);

            double result = 0;
            boolean validOperation = true;

            // Effectuer le calcul selon l'opérateur
            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 != 0) {
                        result = num1 / num2;
                    } else {
                        System.out.println("Erreur : Division par zéro !");
                        validOperation = false;
                    }
                    break;
                default:
                    System.out.println("Erreur : Opérateur non reconnu : " + operator);
                    System.out.println("Utilisez +, -, * ou /");
                    validOperation = false;
            }

            if (validOperation) {
                System.out.println("Calcul : " + num1 + " " + operator + " " + num2);
                System.out.println("Résultat : " + result);
            }

        } catch (NumberFormatException e) {
            System.out.println("Erreur : Les arguments doivent être des nombres !");
            System.out.println();
            System.out.println("Exemple : java Calculator 10 + 5");
        }
    }
}
```

**Compilation et exécution** :

```bash
javac Calculator.java

# Tests
java Calculator 10 + 5
java Calculator 20 - 8
java Calculator 6 * 7
java Calculator 15 / 3
java Calculator 10 / 0
```

</details>

### Exercice 5 : Vocabulaire technique

**Objectif** : Maîtriser le vocabulaire technique.

Pour chaque situation, identifiez s'il s'agit de :

- Une **déclaration** de variable
- Une **définition** (déclaration + initialisation) de variable
- Un **paramètre** de méthode
- Un **argument** d'appel de méthode
- Une **instruction**
- Une **expression**

**Code à analyser** :

```java
public class VocabularyExample {
    public static void greet(String name) {  // (1)
        System.out.println("Hello, " + name);  // (2)
    }

    public static void main(String[] args) {
        int age;  // (3)
        age = 25;  // (4)
        int score = 100;  // (5)
        greet("Ariel");  // (6)
        int result = 2 + 3;  // (7)
    }
}
```

<details>
<summary>Solution</summary>

1. `String name` : **Paramètre** de la méthode `greet`
2. `System.out.println("Hello, " + name);` : **Instruction**
3. `int age;` : **Déclaration** de variable
4. `age = 25;` : **Instruction** (affectation)
5. `int score = 100;` : **Définition** (déclaration + initialisation)
6. `"Ariel"` dans `greet("Ariel")` : **Argument** passé à la méthode
7. `2 + 3` : **Expression** (qui produit la valeur 5)
8. `int result = 2 + 3;` : **Instruction** (définition de variable)

**Explications** :

- **Paramètre** : Variable dans la signature de la méthode
- **Argument** : Valeur concrète passée lors de l'appel
- **Déclaration** : Annoncer l'existence d'une variable
- **Définition** : Déclaration + initialisation
- **Instruction** : Ligne de code se terminant par `;`
- **Expression** : Code produisant une valeur

</details>

### Exercice 6 : Compilation manuelle

**Objectif** : Compiler et exécuter un programme en ligne de commande.

Créez un fichier `HelloWorld.java` avec le code suivant :

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Ensuite :

1. Ouvrez un terminal
2. Compilez avec `javac HelloWorld.java`
3. Vérifiez qu'un fichier `HelloWorld.class` a été créé
4. Exécutez avec `java HelloWorld`

**Questions** :

- Que contient le fichier `.class` ?
- Que se passe-t-il si vous renommez la classe en `HelloUniverse` sans changer
  le nom du fichier ?
- Peut-on exécuter directement le fichier `.java` ?

<details>
<summary>Solution</summary>

**Étapes** :

```bash
# 1. Créer le fichier (avec un éditeur de texte ou echo)
echo 'public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}' > HelloWorld.java

# 2. Compiler
javac HelloWorld.java

# 3. Vérifier la création du .class
ls -l HelloWorld.*

# 4. Exécuter
java HelloWorld
```

**Réponses** :

1. **Que contient le fichier `.class` ?**
   - Le bytecode Java (code intermédiaire entre code source et code machine)
   - Ce bytecode peut être exécuté sur n'importe quelle JVM, quel que soit le
     système d'exploitation

2. **Renommer la classe ?**
   - Si vous renommez la classe en `HelloUniverse` dans le code mais gardez le
     nom de fichier `HelloWorld.java`, la compilation échouera avec une erreur :
   - `error: class HelloUniverse is public, should be declared in a file named HelloUniverse.java`
   - Le nom du fichier DOIT correspondre au nom de la classe publique

3. **Exécuter directement le `.java` ?**
   - Non, il faut d'abord compiler le `.java` en `.class`
   - La JVM exécute uniquement du bytecode (`.class`), pas du code source
     (`.java`)

</details>

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
