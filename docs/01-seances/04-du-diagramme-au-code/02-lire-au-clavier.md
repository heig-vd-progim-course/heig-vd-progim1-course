# Lire au clavier

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif

Faire entrer dans le programme une valeur que la personne qui l'utilise tape au
clavier, plutôt qu'une valeur écrite dans le code. Et comprendre pourquoi cette
valeur arrive sous forme de texte, et ce que cela coûte.

## Le problème des valeurs en dur

En séance 03, vos notes étaient écrites dans le code :

```java
double grade1 = 4.5;
double grade2 = 5.0;
```

Pour calculer une autre moyenne, il faut modifier le code, recompiler,
relancer. Un programme qui ne sait traiter que les valeurs qu'on a écrites
dedans n'est pas très utile.

Il faut que le programme **demande** les valeurs au moment où il s'exécute.

## `IO.readln` : demander une ligne

```java
public class Main {
    public static void main(String[] args) {
        String firstName = IO.readln("Votre prénom : ");
        System.out.println("Bonjour " + firstName);
    }
}
```

Dans la console, en tapant `Camille` puis Entrée :

```text
Votre prénom : Camille
Bonjour Camille
```

`IO.readln("Votre prénom : ")` fait deux choses :

1. il affiche le texte entre parenthèses, sans aller à la ligne ;
2. il **attend** que la personne tape une ligne et appuie sur Entrée, puis
   rend ce qu'elle a tapé.

Pendant qu'il attend, votre programme est arrêté. Rien d'autre ne s'exécute.

!!! warning "Cliquez dans la console avant de taper"

    Dans IntelliJ, la saisie se fait dans la console, en bas de l'écran. Si le
    curseur est resté dans l'éditeur, ce que vous tapez s'écrit dans votre
    code. Le programme, lui, attend toujours.

`IO` fait partie de Java depuis la version 25, celle que vous avez installée.
Il ne demande aucun `import`. Sa documentation officielle tient en une page :
[java.lang.IO](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/IO.html).

## Ce qui revient est toujours du texte

`IO.readln` rend un `String`, quoi que la personne ait tapé. Même un nombre.

```java
String grade = IO.readln("Votre note : ");
System.out.println(grade + 1);
```

```text
Votre note : 4.5
4.51
```

Vous avez déjà vu ce résultat en séance 03 : avec un `String`, `+` colle au
lieu d'additionner. `"4.5"` n'est pas `4.5`.

Et si l'on essaie de ranger directement le résultat dans un `double` :

```java
double grade = IO.readln("Votre note : ");
```

```text
Main.java:3: error: incompatible types: String cannot be converted to double
        double grade = IO.readln("Votre note : ");
                                ^
1 error
```

C'est une erreur de compilation : Java refuse de démarrer. Il ne transformera
pas du texte en nombre de lui-même, il faut le lui demander.

## Convertir : `Double.parseDouble` et `Integer.parseInt`

```java
String text = IO.readln("Votre note : ");
double grade = Double.parseDouble(text);
System.out.println(grade + 1);
```

```text
Votre note : 4.5
5.5
```

`Double.parseDouble` lit un texte et rend le `double` qu'il représente. Pour
un nombre entier, c'est `Integer.parseInt` :

```java
int age = Integer.parseInt(IO.readln("Votre âge : "));
System.out.println("L'année prochaine, vous aurez " + (age + 1) + " ans.");
```

```text
Votre âge : 20
L'année prochaine, vous aurez 21 ans.
```

La deuxième forme imbrique les deux appels sur une ligne : `IO.readln` est
exécuté d'abord, et son résultat est passé directement à `Integer.parseInt`.
Les deux formes font la même chose. Utilisez celle que vous lisez le mieux.

## Ce qui peut mal tourner

Votre programme compile. Il démarre. Et pourtant, il peut s'arrêter net, selon
ce que la personne tape. C'est une **erreur à l'exécution**, la deuxième
famille d'erreurs vue en séance 03.

### Une virgule au lieu d'un point

```text
Votre note : 4,5
Exception in thread "main" java.lang.NumberFormatException: For input string: "4,5"
	at java.base/jdk.internal.math.FloatingDecimal.readJavaFormatString(FloatingDecimal.java:2054)
	at java.base/jdk.internal.math.FloatingDecimal.parseDouble(FloatingDecimal.java:110)
	at java.base/java.lang.Double.parseDouble(Double.java:792)
	at Main.main(Main.java:4)
```

`Double.parseDouble` n'accepte que le **point** comme séparateur décimal,
quelle que soit la langue de votre ordinateur. C'est la même règle que dans
votre code : on écrit `4.5`, jamais `4,5`.

### Rien du tout

En appuyant sur Entrée sans rien taper :

```text
Votre note : 
Exception in thread "main" java.lang.NumberFormatException: empty String
	at java.base/jdk.internal.math.FloatingDecimal.readJavaFormatString(FloatingDecimal.java:1842)
	at java.base/jdk.internal.math.FloatingDecimal.parseDouble(FloatingDecimal.java:110)
	at java.base/java.lang.Double.parseDouble(Double.java:792)
	at Main.main(Main.java:4)
```

### Un mot

```text
Votre note : quatre
Exception in thread "main" java.lang.NumberFormatException: For input string: "quatre"
	at java.base/jdk.internal.math.FloatingDecimal.readJavaFormatString(FloatingDecimal.java:2054)
	at java.base/jdk.internal.math.FloatingDecimal.parseDouble(FloatingDecimal.java:110)
	at java.base/java.lang.Double.parseDouble(Double.java:792)
	at Main.main(Main.java:4)
```

### Un nombre à virgule là où on attend un entier

```text
Votre âge : 20.5
Exception in thread "main" java.lang.NumberFormatException: For input string: "20.5"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)
	at java.base/java.lang.Integer.parseInt(Integer.java:662)
	at java.base/java.lang.Integer.parseInt(Integer.java:778)
	at Main.main(Main.java:3)
```

### Lire le message

Ces messages paraissent longs. Deux lignes suffisent :

- la **première** dit ce qui s'est passé : `NumberFormatException`, une erreur
  de format de nombre, et le texte qui l'a provoquée entre guillemets ;
- la **dernière qui parle de `Main`** dit où : `Main.java:4`, la ligne 4 de
  votre fichier.

Les lignes du milieu sont l'intérieur de Java. Elles indiquent le chemin
parcouru, mais l'erreur n'y est pas : elle est dans ce qui a été tapé.

Les espaces avant et après le nombre, eux, sont tolérés : `" 4.5 "` donne bien
`4.5`.

### Et pour l'instant, on n'y peut rien

Votre programme ne sait pas encore vérifier ce qu'on lui donne : il faudrait
pouvoir lui faire poser une question et agir selon la réponse. C'est le sujet
de la séance 06.

En attendant, la règle est une hypothèse, et elle s'écrit : _"on suppose que la
personne tape un nombre, avec un point"_. Notez-la dans votre liste des cas non
couverts.

??? note "Et `Scanner` ?"

    Vous trouverez dans la plupart des tutoriels et des réponses en ligne une
    autre manière de lire au clavier, avec la classe `Scanner`. Elle est plus
    ancienne que `IO` et demande des notions que vous n'avez pas encore.

    Elle a aussi un piège qui concerne directement ce cours : pour lire un
    nombre à virgule, elle suit la langue de votre ordinateur. Sur une machine
    réglée en français de Suisse, elle refuse `4.5` et attend `4,5`. Le même
    programme se comporte donc différemment selon la machine.

    Nous ne l'utilisons pas. Si vous la rencontrez, vous savez pourquoi.

## Résumé

- `IO.readln("...")` affiche une question et attend une ligne tapée au
  clavier.
- Ce qui revient est **toujours** un `String`.
- `Double.parseDouble` et `Integer.parseInt` convertissent un texte en nombre.
- Si le texte n'est pas un nombre valide, le programme s'arrête avec une
  `NumberFormatException`. Il compilait pourtant très bien.
- Le séparateur décimal est le point, à la saisie comme dans le code.

## Pour aller plus loin

- [java.lang.IO](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/IO.html) -
  documentation officielle, une page.
- [Double.parseDouble](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Double.html#parseDouble(java.lang.String)) -
  documentation officielle. Exigeante, mais c'est la référence.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
