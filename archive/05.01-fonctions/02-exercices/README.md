# Exercices - Fonctions

## Ressources

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.01-fonctions/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.01-fonctions/01-supports-de-cours/05.01-fonctions-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Objectifs

Ces exercices vous permettront de pratiquer la création et l'utilisation de
méthodes en Java.

## Exercice 1 : Aire d'un rectangle

Créez une méthode `calculateRectangleArea` qui prend deux paramètres `length` et
`width` (de type `double`) et retourne l'aire du rectangle.

Testez votre méthode avec différentes valeurs dans la méthode `main`.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static double calculateRectangleArea(double length, double width) {
        return length * width;
    }

    public static void main(String[] args) {
        double area1 = calculateRectangleArea(5.0, 3.0);
        System.out.println("Aire du rectangle : " + area1); // Affiche 15.0

        double area2 = calculateRectangleArea(10.0, 2.5);
        System.out.println("Aire du rectangle : " + area2); // Affiche 25.0
    }
}
```

</details>

## Exercice 2 : Température

Créez une méthode `celsiusToFahrenheit` qui convertit une température en degrés
Celsius en degrés Fahrenheit. La formule est : $F = C \times 1.8 + 32$.

Testez votre méthode avec différentes valeurs.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static double celsiusToFahrenheit(double celsius) {
        return celsius * 1.8 + 32;
    }

    public static void main(String[] args) {
        double fahrenheit1 = celsiusToFahrenheit(0);
        System.out.println("0°C = " + fahrenheit1 + "°F"); // Affiche 32.0

        double fahrenheit2 = celsiusToFahrenheit(100);
        System.out.println("100°C = " + fahrenheit2 + "°F"); // Affiche 212.0

        double fahrenheit3 = celsiusToFahrenheit(20);
        System.out.println("20°C = " + fahrenheit3 + "°F"); // Affiche 68.0
    }
}
```

</details>

## Exercice 3 : Nombre pair

Créez une méthode `isEven` qui prend un nombre entier en paramètre et retourne
`true` si le nombre est pair, `false` sinon.

Testez votre méthode avec différentes valeurs.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static boolean isEven(int number) {
        return number % 2 == 0;
    }

    public static void main(String[] args) {
        System.out.println(isEven(4));  // Affiche true
        System.out.println(isEven(7));  // Affiche false
        System.out.println(isEven(0));  // Affiche true
        System.out.println(isEven(-2)); // Affiche true
    }
}
```

</details>

## Exercice 4 : Maximum de trois nombres

Créez une méthode `maxOfThree` qui prend trois nombres entiers en paramètres et
retourne le plus grand des trois.

Indice : vous pouvez utiliser la méthode `Math.max()` qui retourne le maximum de
deux nombres.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static int maxOfThree(int a, int b, int c) {
        return Math.max(Math.max(a, b), c);
    }

    public static void main(String[] args) {
        System.out.println(maxOfThree(5, 10, 3));   // Affiche 10
        System.out.println(maxOfThree(100, 50, 75)); // Affiche 100
        System.out.println(maxOfThree(-5, -10, -3)); // Affiche -3
    }
}
```

</details>

## Exercice 5 : Affichage personnalisé

Créez une méthode `displayMessage` qui prend un nom et un âge en paramètres et
affiche un message du type : "Bonjour [nom], vous avez [âge] ans."

Testez votre méthode avec différentes valeurs.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static void displayMessage(String name, int age) {
        System.out.println("Bonjour " + name + ", vous avez " + age + " ans.");
    }

    public static void main(String[] args) {
        displayMessage("Ariel", 25);
        displayMessage("Nox", 30);
        displayMessage("Amaru", 18);
    }
}
```

</details>

## Exercice 6 : Calcul de moyenne

Créez une méthode `calculateAverage` qui prend trois notes (de type `double`) en
paramètres et retourne la moyenne de ces trois notes.

Testez votre méthode avec différentes valeurs.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static double calculateAverage(double grade1, double grade2, double grade3) {
        return (grade1 + grade2 + grade3) / 3.0;
    }

    public static void main(String[] args) {
        double average1 = calculateAverage(15.0, 12.0, 18.0);
        System.out.println("Moyenne : " + average1); // Affiche 15.0

        double average2 = calculateAverage(10.5, 14.0, 16.5);
        System.out.println("Moyenne : " + average2); // Affiche 13.666...
    }
}
```

</details>

## Exercice 7 : Périmètre d'un cercle

Créez une méthode `calculateCirclePerimeter` qui prend le rayon d'un cercle (de
type `double`) en paramètre et retourne le périmètre du cercle. La formule est :
$P = 2 \times \pi \times r$.

Indice : utilisez `Math.PI` pour obtenir la valeur de $\pi$.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static double calculateCirclePerimeter(double radius) {
        return 2 * Math.PI * radius;
    }

    public static void main(String[] args) {
        double perimeter1 = calculateCirclePerimeter(5.0);
        System.out.println("Périmètre : " + perimeter1); // Affiche environ 31.4159

        double perimeter2 = calculateCirclePerimeter(10.0);
        System.out.println("Périmètre : " + perimeter2); // Affiche environ 62.8318
    }
}
```

</details>

## Exercice 8 : Manipulation de chaînes

Créez une méthode `invertCase` qui prend une chaîne de caractères en paramètre.
Si la chaîne est en majuscules, elle la retourne en minuscules, et vice versa.

Indices :

- `String.toUpperCase()` convertit en majuscules
- `String.toLowerCase()` convertit en minuscules
- `String.equals()` compare deux chaînes

<details>
<summary>Solution</summary>

```java
public class Main {
    public static String invertCase(String text) {
        if (text.equals(text.toUpperCase())) {
            return text.toLowerCase();
        } else {
            return text.toUpperCase();
        }
    }

    public static void main(String[] args) {
        System.out.println(invertCase("BONJOUR")); // Affiche "bonjour"
        System.out.println(invertCase("bonjour")); // Affiche "BONJOUR"
        System.out.println(invertCase("Hello"));   // Affiche "HELLO"
    }
}
```

</details>

## Exercice 9 : Distance entre deux points

Créez une méthode `calculateDistance` qui prend les coordonnées de deux points
$(x_1, y_1)$ et $(x_2, y_2)$ et retourne la distance entre ces deux points. La
formule est : $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.

Indice : utilisez `Math.sqrt()` pour la racine carrée et `Math.pow()` pour la
puissance.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static double calculateDistance(double x1, double y1, double x2, double y2) {
        double dx = x2 - x1;
        double dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static void main(String[] args) {
        double distance1 = calculateDistance(0, 0, 3, 4);
        System.out.println("Distance : " + distance1); // Affiche 5.0

        double distance2 = calculateDistance(1, 1, 4, 5);
        System.out.println("Distance : " + distance2); // Affiche 5.0
    }
}
```

</details>

## Exercice 10 : Factorielle

Créez une méthode `calculateFactorial` qui prend un nombre entier positif `n` en
paramètre et retourne la factorielle de ce nombre. La factorielle de $n$ est le
produit de tous les nombres de 1 à $n$ :
$n! = 1 \times 2 \times 3 \times
\ldots \times n$.

Par exemple : $5! = 1 \times 2 \times 3 \times 4 \times 5 = 120$.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static int calculateFactorial(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result = result * i;
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(calculateFactorial(5));  // Affiche 120
        System.out.println(calculateFactorial(3));  // Affiche 6
        System.out.println(calculateFactorial(10)); // Affiche 3628800
    }
}
```

</details>

## Exercice bonus : Nombre premier

Créez une méthode `isPrime` qui prend un nombre entier en paramètre et retourne
`true` si le nombre est premier, `false` sinon.

Rappel : un nombre premier est un nombre qui n'est divisible que par 1 et par
lui-même.

<details>
<summary>Solution</summary>

```java
public class Main {
    public static boolean isPrime(int number) {
        if (number <= 1) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPrime(2));  // Affiche true
        System.out.println(isPrime(7));  // Affiche true
        System.out.println(isPrime(10)); // Affiche false
        System.out.println(isPrime(17)); // Affiche true
        System.out.println(isPrime(20)); // Affiche false
    }
}
```

</details>
