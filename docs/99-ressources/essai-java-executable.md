# Essai : Java exécutable

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

!!! warning "Page d'essai"

    Cette page teste l'exécution de Java directement dans le navigateur, sans
    rien installer. Elle ne fait pas partie du cours. Ce qui marche ici pourra
    ensuite être repris dans les pages des séances.

## Comment l'utiliser

Modifiez le code, puis cliquez sur _Exécuter_. Le programme est compilé et
exécuté dans votre navigateur, et sa sortie s'affiche sous le code.

Le premier clic télécharge le compilateur, environ 7 Mo. Les suivants prennent
moins d'une seconde. _Réinitialiser_ remet le code de départ.

Le compilateur est `javac` 25, celui du cours, mais le programme ne tourne pas
dans la machine virtuelle Java : il est traduit pour le navigateur. Quelques
messages d'erreur à l'exécution diffèrent donc de ceux d'IntelliJ, et `Scanner`
n'existe pas ici. En cas de doute, IntelliJ fait foi.

Un programme qui ne s'arrête pas est arrêté au bout de 5 secondes, ou dès qu'il
affiche trop de texte. Le bouton _Arrêter_ le fait tout de suite.

## Un exemple

Les valeurs de l'atelier de la
[séance 05](../01-seances/05-fonctions-et-portee/02-atelier-decouper-en-fonctions.md).

<div class="java-run" markdown>

```java title="Main.java"
public class Main {
    public static double walkingMinutes(double distanceKm, double speedKmh) {
        return (distanceKm / speedKmh) * 60;
    }

    public static double roundTo5Cents(double amount) {
        return Math.round(amount * 20) / 20.0;
    }

    public static double splitBill(double total, int people) {
        return roundTo5Cents(total / people);
    }

    public static void main(String[] args) {
        System.out.println(walkingMinutes(10, 5));
        System.out.println(splitBill(100, 3));
    }
}
```

</div>

## Une sortie surprenante

L'exemple de la
[séance 06](../01-seances/06-conditions/03-plusieurs-cas-et-operateurs-logiques.md).
La sortie est bien celle de Java.

<div class="java-run" markdown>

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        System.out.println(0.1 + 0.2);
        System.out.println((0.1 + 0.2) == 0.3);
    }
}
```

</div>

## Un exercice vérifié

<div class="java-run" markdown>

Complétez `celsiusToFahrenheit` pour que le programme affiche la sortie
attendue. La formule : multiplier par 9, diviser par 5, puis ajouter 32.

```java title="Main.java"
public class Main {
    public static double celsiusToFahrenheit(double celsius) {
        // À compléter
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(celsiusToFahrenheit(100));
        System.out.println(celsiusToFahrenheit(0));
        System.out.println(celsiusToFahrenheit(-40));
    }
}
```

```text title="Sortie attendue"
212.0
32.0
-40.0
```

</div>

??? tip "Solution"

    ```java title="Main.java" linenums="1" hl_lines="3"
    public class Main {
        public static double celsiusToFahrenheit(double celsius) {
            return ((celsius * 9) / 5) + 32;
        }

        public static void main(String[] args) {
            System.out.println(celsiusToFahrenheit(100));
            System.out.println(celsiusToFahrenheit(0));
            System.out.println(celsiusToFahrenheit(-40));
        }
    }
    ```

## Lire au clavier

L'exemple de la
[séance 04](../01-seances/04-du-diagramme-au-code/03-lire-au-clavier.md). Le
navigateur ne peut pas attendre que vous tapiez pendant que le programme tourne.
Écrivez donc vos réponses à l'avance dans la zone _Entrée_, une par ligne. La
sortie les affiche après chaque question, comme dans un terminal.

<div class="java-run" markdown>

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        String firstName = IO.readln("Votre prénom : ");
        System.out.println("Bonjour " + firstName);
    }
}
```

```text title="Entrée"
Camille
```

</div>

## Un exercice avec saisie

<div class="java-run" markdown>

Le programme lit un âge. Ajoutez la ligne qui affiche l'âge de l'année
prochaine, dans la même phrase que la sortie attendue.

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        int age = Integer.parseInt(IO.readln("Votre âge : "));
    }
}
```

```text title="Entrée"
20
```

```text title="Sortie attendue"
Votre âge : 20
L'année prochaine, vous aurez 21 ans.
```

</div>

??? tip "Solution"

    ```java title="Main.java" linenums="1" hl_lines="4"
    public class Main {
        public static void main(String[] args) {
            int age = Integer.parseInt(IO.readln("Votre âge : "));
            System.out.println("L'année prochaine, vous aurez " + (age + 1) + " ans.");
        }
    }
    ```

## Une boucle qui ne s'arrête pas

Ce programme contient un bug placé exprès : il devait afficher `0`, `1` et `2`.
Exécutez-le : il est arrêté, et la page reste utilisable.

<div class="java-run" markdown>

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        int i = 0;
        while (i < 3) {
            System.out.println(i);
        }
    }
}
```

</div>

??? tip "Correction"

    `i` ne change jamais : `i < 3` reste vrai pour toujours. Il manque
    `i = i + 1;` après l'affichage, dans la boucle.

## Crédits

- [TeaVM](https://teavm.org/) et
  [teavm-javac](https://github.com/konsoletyper/teavm-javac), d'Alexey Andreev,
  sous licence Apache 2.0.
- [CodeMirror](https://codemirror.net/), de Marijn Haverbeke, sous licence MIT,
  pour l'éditeur.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
