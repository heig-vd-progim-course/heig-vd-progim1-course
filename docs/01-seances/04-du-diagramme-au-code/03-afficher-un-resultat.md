# Afficher un résultat lisible

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Produire une sortie qu'une personne peut lire sans effort : une phrase, et des
nombres avec le nombre de décimales voulu. Et savoir ce que l'affichage cache
de la valeur réelle.

## Ce que donne `println`

Le programme de la moyenne, avec ce que vous savez déjà :

```java
public class Main {
    public static void main(String[] args) {
        // Entrées
        double grade1 = Double.parseDouble(IO.readln("Première note : "));
        double grade2 = Double.parseDouble(IO.readln("Deuxième note : "));

        // Traitement
        double average = (grade1 + grade2) / 2;

        // Sortie
        System.out.println("Moyenne : " + average);
    }
}
```

```text
Première note : 4.5
Deuxième note : 5
Moyenne : 4.75
```

Correct. Mais avec d'autres notes :

```java
System.out.println((4.7 + 4.4) / 2);
System.out.println((3.3 + 4.6) / 2);
```

```text
4.550000000000001
3.9499999999999997
```

C'est la virgule flottante de la séance 03. Le calcul est aussi juste que
possible, mais personne ne veut lire cela sur un bulletin.

## `printf` : un modèle et des valeurs

`System.out.printf` prend un **modèle** de phrase, avec des trous, puis les
valeurs à mettre dans les trous, dans l'ordre.

```java
String name = IO.readln("Nom : ");
double grade1 = Double.parseDouble(IO.readln("Première note : "));
double grade2 = Double.parseDouble(IO.readln("Deuxième note : "));

double average = (grade1 + grade2) / 2;

System.out.printf("%s a obtenu %.1f de moyenne.%n", name, average);
```

```text
Nom : Camille
Première note : 4.5
Deuxième note : 5
Camille a obtenu 4.8 de moyenne.
```

Les trous que vous utiliserez :

| Trou   | Pour                                       | Exemple de sortie |
| :----- | :----------------------------------------- | :---------------- |
| `%s`   | Un texte, un `String`                      | `Camille`         |
| `%d`   | Un nombre entier, un `int` ou un `long`    | `20`              |
| `%.1f` | Un nombre à virgule, avec une décimale     | `4.8`             |
| `%.2f` | Un nombre à virgule, avec deux décimales   | `4.75`            |
| `%n`   | Un passage à la ligne                      |                   |

`printf` ne va **pas** à la ligne tout seul. Sans `%n` :

```java
System.out.printf("Moyenne : %.1f", average);
System.out.printf("Fin du programme");
```

```text
Moyenne : 4.8Fin du programme
```

### Deux erreurs à l'exécution

Le modèle n'est vérifié qu'à l'exécution. Le compilateur ne voit rien.

Un trou `%d` pour un `double` :

```java
double average = 4.75;
System.out.printf("Moyenne : %d%n", average);
```

```text
Moyenne : Exception in thread "main" java.util.IllegalFormatConversionException: d != java.lang.Double
	at java.base/java.util.Formatter$FormatSpecifier.failConversion(Formatter.java:4515)
	at java.base/java.util.Formatter$FormatSpecifier.printInteger(Formatter.java:3066)
	at java.base/java.util.Formatter$FormatSpecifier.print(Formatter.java:3021)
	at java.base/java.util.Formatter.format(Formatter.java:2791)
	at java.base/java.io.PrintStream.implFormat(PrintStream.java:1367)
	at java.base/java.io.PrintStream.format(PrintStream.java:1346)
	at java.base/java.io.PrintStream.printf(PrintStream.java:1245)
	at Main.main(Main.java:4)
```

Un trou de plus que de valeurs :

```java
String name = "Camille";
double average = 4.75;
System.out.printf("%s a obtenu %.1f de moyenne.%n", name);
```

```text
Camille a obtenu Exception in thread "main" java.util.MissingFormatArgumentException: Format specifier '%.1f'
	at java.base/java.util.Formatter.format(Formatter.java:2790)
	at java.base/java.io.PrintStream.implFormat(PrintStream.java:1367)
	at java.base/java.io.PrintStream.format(PrintStream.java:1346)
	at java.base/java.io.PrintStream.printf(PrintStream.java:1245)
	at Main.main(Main.java:5)
```

Notez que le début de la phrase s'est affiché : le programme a commencé
l'affichage, puis s'est arrêté en tombant sur le trou sans valeur. Même lecture
que d'habitude : première ligne pour le quoi, `Main.java` pour le où.

## Le point ou la virgule

Le même programme, sur deux ordinateurs :

```java
double average = 4.75;
System.out.println(average);
System.out.printf("%.2f%n", average);
```

Sur un ordinateur réglé en anglais, ou en allemand de Suisse :

```text
4.75
4.75
```

Sur un ordinateur réglé en français, de Suisse ou de France :

```text
4.75
4,75
```

`println` affiche toujours un point. `printf` suit la langue de votre
ordinateur. Et `Double.parseDouble`, à la saisie, n'accepte que le point.

Ce n'est pas une erreur de votre part, et il n'y a rien à corriger
aujourd'hui. Mais si votre programme affiche `4,75` et refuse ensuite qu'on lui
tape `4,75`, vous savez maintenant pourquoi.

## Afficher arrondi n'est pas arrondir

`%.1f` change ce qui est **affiché**. La valeur dans la variable, elle, reste
la même. La plupart du temps, cela suffit. Pas toujours.

Prenez les notes 3.3 et 4.6. Leur moyenne exacte est 3.95, qui s'arrondit à
4.0 au dixième. Avec le programme ci-dessus :

```text
Nom : Camille
Première note : 3.3
Deuxième note : 4.6
Camille a obtenu 3.9 de moyenne.
```

`printf` a arrondi `3.9499999999999997`, la valeur réellement stockée, et non
3.95. Sur un bulletin, c'est la différence entre une note suffisante et une
note insuffisante.

Pour arrondir la **valeur** au dixième, avant de l'afficher :

```java
double grade1 = Double.parseDouble(IO.readln("Première note : "));
double grade2 = Double.parseDouble(IO.readln("Deuxième note : "));

double average = (grade1 + grade2) / 2;
double rounded = Math.round(average * 10) / 10.0;

System.out.printf("Moyenne : %.1f%n", rounded);
```

```text
Première note : 3.3
Deuxième note : 4.6
Moyenne : 4.0
```

`Math.round` arrondit à l'entier le plus proche. On multiplie par 10, on
arrondit, on redivise par 10. Le `10.0` n'est pas un détail : avec `10`, ce
serait une division entière, le premier piège de la séance 03.

Même principe pour arrondir au demi-point, comme le font certaines écoles :

```java
double average = 4.66;
double rounded = Math.round(average * 2) / 2.0;
System.out.println(rounded);
```

```text
4.5
```

??? note "Pour aller plus loin : `Math.round` non plus n'est pas parfait"

    `Math.round` corrige le cas de 3.3 et 4.6, mais pas tous. Avec 1.1 et 4.6,
    dont la moyenne exacte est 2.85 :

    ```java
    double grade1 = 1.1;
    double grade2 = 4.6;

    double average = (grade1 + grade2) / 2;
    System.out.println(average);
    System.out.println(Math.round(average * 10) / 10.0);

    // En dixièmes entiers : 1.1 devient 11, 4.6 devient 46
    long tenths1 = Math.round(grade1 * 10);
    long tenths2 = Math.round(grade2 * 10);
    long averageTenths = (tenths1 + tenths2 + 1) / 2;
    System.out.println(averageTenths / 10.0);
    ```

    ```text
    2.8499999999999996
    2.8
    2.9
    ```

    La solution robuste est celle de la séance 03 pour l'argent : ne pas
    calculer avec des virgules. Une note au dixième est un nombre entier de
    dixièmes. En comptant en dixièmes avec des entiers, il n'y a plus
    d'approximation.

    Le `+ 1` avant la division entière par 2 fait arrondir les demis vers le
    haut. Prenez le temps de vérifier pourquoi sur un exemple.

## Résumé

- `printf` remplit un modèle avec des valeurs, dans l'ordre : `%s`, `%d`,
  `%.1f`, et `%n` pour aller à la ligne.
- Une erreur dans le modèle n'apparaît qu'à l'exécution.
- `printf` suit la langue de votre ordinateur pour la virgule ;
  `Double.parseDouble` exige un point.
- `%.1f` arrondit l'affichage, pas la valeur. Quand la valeur arrondie compte,
  arrondissez-la avec `Math.round` avant de l'afficher.

## Pour aller plus loin

- [Formatting Numeric Print Output](https://docs.oracle.com/javase/tutorial/java/data/numberformat.html) -
  tutoriel officiel sur `printf`. Ancien, toujours exact.
- [Formatter](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Formatter.html) -
  la liste complète des trous possibles. Vous n'en utiliserez qu'une poignée.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
