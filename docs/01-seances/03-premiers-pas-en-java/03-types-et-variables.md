# Les types et les variables

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Rappel de la séance 01

Dans l'activité de dictée de dessin, vous aviez besoin de savoir d'où partait le
crayon pour que l'instruction suivante ait un sens. Nous avions appelé cela
l'**état**.

Une **variable**, c'est exactement cela : un endroit où le programme retient
quelque chose, avec un nom pour y revenir.

## Où écrire votre code : dans `main`

Ouvrez `src/Main.java` dans votre projet `hello-world`. Vous y trouvez ceci :

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour tout le monde");
    }
}
```

Pour l'instant, **tout ce que vous écrirez se place entre les deux accolades de
la méthode `main`**, à la place de la ligne `System.out.println(...)` ou en
dessous. Pas avant, pas après, pas en dehors.

```java
public class Main {
    public static void main(String[] args) {
        // ← Votre code commence ici

        // ← et se termine ici
    }
}
```

`main` est le **point d'entrée** du programme : quand vous cliquez sur la flèche
verte, Java cherche `main` et exécute ses lignes une par une, de haut en bas. Ce
qui n'est pas dans `main` n'est pas exécuté.

Les autres mots (`public`, `class`, `static`, `void`, `String[] args`) seront
expliqués au fil des séances. Pour l'instant, considérez-les comme un cadre
qu'on ne touche pas.

!!! warning "Tous les exemples de cette page vont dans `main`"

    Pour gagner de la place, les exemples ci-dessous ne montrent que les lignes
    qui comptent. Quand vous lisez :

    ```java
    int age = 20;
    System.out.println(age);
    ```

    il faut comprendre que le fichier complet est :

    ```java
    public class Main {
        public static void main(String[] args) {
            int age = 20;
            System.out.println(age);
        }
    }
    ```

    Si IntelliJ souligne tout en rouge, vérifiez d'abord que vos lignes sont
    bien **à l'intérieur** des accolades de `main`.

## Voir ce que fait le programme : `System.out.println`

Une variable vit dans la mémoire de l'ordinateur. Vous ne la voyez pas. Le seul
moyen de savoir ce qu'elle contient, c'est de **l'afficher dans la console**,
avec `System.out.println`.

**Une ligne `System.out.println` dans le code produit une ligne dans la
console.** Pas plus, pas moins, et dans le même ordre :

```java
System.out.println("Première ligne");
System.out.println("Deuxième ligne");
System.out.println("Troisième ligne");
```

```text
Première ligne
Deuxième ligne
Troisième ligne
```

Si une ligne que vous attendiez n'apparaît pas dans la console, c'est que le
`System.out.println` correspondant n'a pas été exécuté. Si une valeur vous
surprend, c'est la console qui a raison, pas votre intuition.

!!! tip "Le raccourci `sout`"

    Dans IntelliJ, tapez `sout` puis appuyez sur ++tab++ (ou ++enter++).
    IntelliJ écrit `System.out.println();` pour vous et place le curseur entre
    les parenthèses.

    Vous allez l'écrire des centaines de fois cette année. Prenez l'habitude
    dès maintenant.

La console s'ouvre en bas d'IntelliJ quand vous cliquez sur la flèche verte.
Elle affiche ce que vos `println` ont produit, suivi de
`Process finished with exit code 0` quand le programme s'est terminé
normalement.

!!! example "À vous"

    Écrivez trois `sout` dans `main` qui affichent votre prénom, votre ville et
    votre plat préféré. Lancez. Puis **inversez l'ordre** de deux lignes dans
    le code, et relancez. Qu'est-ce qui a changé dans la console ?

## Déclarer une variable

```java
int age = 20;
```

Trois éléments, dans l'ordre :

- `int` : le **type**, ce que la variable a le droit de contenir ;
- `age` : le **nom**, choisi par vous ;
- `20` : la **valeur** initiale.

Déclarer une variable ne produit **rien** dans la console. Le programme retient
la valeur, mais ne la montre pas. Pour la voir, il faut la passer à
`System.out.println` :

```java
int age = 20;
System.out.println(age);
```

```text
20
```

Notez qu'il n'y a pas de guillemets autour de `age` : on demande d'afficher **ce
que contient** la variable `age`, pas le mot « age ». La différence est
expliquée plus bas, dans la section sur `String`.

### Une variable est remplacée par sa valeur

**Avant d'exécuter une ligne, Java remplace chaque variable par la valeur
qu'elle contient à ce moment-là.** Puis il exécute la ligne.

Ces deux programmes affichent donc exactement la même chose :

=== "Avec une variable"

    ```java title="Main.java" linenums="1" hl_lines="3 4"
    public class Main {
        public static void main(String[] args) {
            double grade = 4.5;
            System.out.println(grade);
        }
    }
    ```

    ```text
    4.5
    ```

=== "Avec la valeur"

    ```java title="Main.java" linenums="1" hl_lines="3"
    public class Main {
        public static void main(String[] args) {
            System.out.println(4.5);
        }
    }
    ```

    ```text
    4.5
    ```

À la ligne 4 du premier programme, Java remplace `grade` par `4.5`, et la ligne
devient `System.out.println(4.5);`.

Le remplacement se fait **au moment où la ligne s'exécute**, avec la valeur de
ce moment-là. Prédisez ce que ce programme affiche avant de lire la sortie :

```java title="Main.java" linenums="1" hl_lines="4 5"
public class Main {
    public static void main(String[] args) {
        double a = 4.0;
        double b = a;
        a = 6.0;
        System.out.println(a);
        System.out.println(b);
    }
}
```

```text
6.0
4.0
```

À la ligne 4, `a` est remplacée par `4.0` : la ligne devient `double b = 4.0;`.
`b` reçoit une **copie** de la valeur, pas un lien vers `a`. Quand `a` change à
la ligne 5, `b` ne bouge pas.

Une fois déclarée, la variable se réutilise par son nom, et on peut changer sa
valeur :

```java
int age = 20;
System.out.println(age);
age = age + 1;
System.out.println(age);
age = 30;
System.out.println(age);
```

```text
20
21
30
```

Trois `println`, trois lignes. Chacune montre la valeur de `age` **au moment où
la ligne est exécutée**. C'est la même variable, mais son contenu a changé entre
deux affichages.

Le signe `=` n'est pas celui des mathématiques. `age = age + 1` ne dit pas que
`age` est égal à `age` plus un, ce qui serait faux. Il dit : **calcule
`age + 1`, et range le résultat dans `age`**. C'est une affectation, pas une
équation.

Seul le `age` de **droite** est remplacé par sa valeur : avec `age` à 20, la
ligne devient `age = 20 + 1;`. Celui de gauche ne désigne pas une valeur, mais
l'endroit où ranger le résultat.

On n'écrit le type qu'**une seule fois**, à la déclaration. Ensuite, on utilise
seulement le nom. Écrire `int age = 30;` une deuxième fois provoque une erreur :
la variable `age` existe déjà.

### Afficher une variable avec une explication

Une console remplie de nombres sans contexte devient vite illisible. On colle un
texte devant la valeur avec `+` :

```java
int age = 20;
System.out.println("Âge : " + age);
age = age + 1;
System.out.println("Âge l'année prochaine : " + age);
```

```text
Âge : 20
Âge l'année prochaine : 21
```

Prenez cette habitude : quand vous affichez une variable pour vérifier sa
valeur, écrivez son nom à côté. Avec dix `println`, vous saurez immédiatement
quelle ligne de la console correspond à quelle ligne du code.

!!! example "À vous : modifier, relancer, vérifier"

    Recopiez ce code dans `main` :

    ```java
    int score = 10;
    System.out.println("Score de départ : " + score);
    score = score + 5;
    System.out.println("Après bonus : " + score);
    score = score * 2;
    System.out.println("Après doublement : " + score);
    ```

    1. **Avant** de lancer, écrivez sur une feuille les trois lignes que vous
       attendez dans la console. Lancez, et comparez.
    2. Changez la valeur de départ à `0`. Prédisez, relancez, vérifiez.
    3. Ajoutez une ligne `score = score - 100;` suivie d'un `sout` qui affiche
       le score. Prédisez, relancez, vérifiez.
    4. Supprimez le deuxième `System.out.println`. Combien de lignes reste-t-il
       dans la console ? La valeur finale a-t-elle changé ?

    La réponse à la question 4 est importante : `println` **montre** une
    valeur, il ne la **change** pas.

## Pourquoi déclarer un type

Parce que Java refuse de compiler si vous mettez autre chose que ce que vous
avez annoncé :

```java
int age = "vingt";
```

```text
error: incompatible types: String cannot be converted to int
```

C'est une contrainte, et c'est un service. Cette erreur apparaît sur votre écran
en trois secondes. Dans un langage qui ne vérifie rien, le même code démarre,
tourne, et plante plus tard, ailleurs, sans que rien n'indique d'où cela vient.

## Les huit types primitifs

Java a exactement huit types de base. Ils s'écrivent en minuscules, et ce sont
les seuls qui ne sont pas des objets.

### Les nombres entiers

| Type    | Taille  |            Valeur minimale |           Valeur maximale |
| :------ | :------ | -------------------------: | ------------------------: |
| `byte`  | 8 bits  |                       -128 |                       127 |
| `short` | 16 bits |                    -32 768 |                    32 767 |
| `int`   | 32 bits |             -2 147 483 648 |             2 147 483 647 |
| `long`  | 64 bits | -9 223 372 036 854 775 808 | 9 223 372 036 854 775 807 |

**En pratique, utilisez `int`.** C'est le choix par défaut, et il couvre
l'immense majorité des cas. Passez à `long` quand vous dépassez deux milliards,
ce qui arrive avec des durées en millisecondes ou des identifiants.

`byte` et `short` existent pour économiser la mémoire dans des contextes très
contraints. Vous n'en aurez pas besoin cette année.

Un `long` s'écrit avec un `L` à la fin, et on peut aérer les grands nombres avec
des traits de soulignement :

```java
long population = 9_000_000_000L;
System.out.println(population);
```

```text
9000000000
```

### Les nombres à virgule

| Type     | Taille  | Chiffres significatifs environ |
| :------- | :------ | :----------------------------- |
| `float`  | 32 bits | 7                              |
| `double` | 64 bits | 15 à 16                        |

**Utilisez `double`.** `float` n'économise que quatre octets et perd beaucoup de
précision ; il n'a d'intérêt que dans des cas très particuliers.

### Les deux autres

| Type      | Contient                   | Exemple              |
| :-------- | :------------------------- | :------------------- |
| `char`    | Un seul caractère          | `char c = 'A';`      |
| `boolean` | Vrai ou faux, rien d'autre | `boolean ok = true;` |

Un `char` se note avec des apostrophes simples. Il est stocké comme un nombre :

```java
char lettre = 'A';
System.out.println(lettre);
System.out.println((int) lettre);
System.out.println((char) (lettre + 1));
System.out.println('A' + 1);
```

```text
A
65
B
66
```

Les deux dernières lignes méritent qu'on s'y arrête : `(char) (lettre + 1)`
donne `B`, mais `'A' + 1` sans conversion donne `66`. Java a additionné deux
nombres et vous a rendu un nombre.

Le `boolean` ne peut valoir que `true` ou `false`. Pas `0`, pas `1`, pas
`"oui"`. C'est le type sur lequel reposeront toutes les conditions de la
séance 05.

### Et `String` ?

`String` contient du texte : un mot, une phrase, un prénom, une adresse. On
appelle ce texte une **chaîne de caractères**.

Il s'écrit avec une majuscule, parce que **ce n'est pas un type primitif** :
c'est une classe. Nous verrons ce que cela implique en ProgIM2. Pour l'instant,
il se déclare comme les autres :

```java
String prenom = "Camille";
System.out.println(prenom);
```

```text
Camille
```

#### Les guillemets doubles sont obligatoires

Un texte s'écrit **toujours entre guillemets doubles** `"..."`. Les guillemets
indiquent à Java où le texte commence et où il s'arrête. Ils ne font pas partie
du texte : ils n'apparaissent pas dans la console.

Sans guillemets, Java ne voit plus du texte, il voit un **nom de variable** :

```java
String prenom = Camille;
```

```text
error: cannot find symbol
  symbol:   variable Camille
```

Java a cherché une variable qui s'appellerait `Camille`, ne l'a pas trouvée, et
refuse de compiler. Le message « cannot find symbol » sur un mot qui devrait
être du texte veut presque toujours dire : **il manque des guillemets**.

Les guillemets sont la frontière entre deux mondes :

| Vous écrivez | Java comprend                                  | Console   |
| :----------- | :--------------------------------------------- | :-------- |
| `prenom`     | la variable `prenom`, donc ce qu'elle contient | `Camille` |
| `"prenom"`   | le texte p-r-e-n-o-m, tel quel                 | `prenom`  |
| `Camille`    | une variable `Camille`, qui n'existe pas       | erreur    |
| `"Camille"`  | le texte C-a-m-i-l-l-e, tel quel               | `Camille` |

```java
String prenom = "Camille";
System.out.println(prenom);
System.out.println("prenom");
```

```text
Camille
prenom
```

Même mot, une paire de guillemets de différence, deux résultats différents.

#### Guillemets doubles, pas simples

Les apostrophes simples `'A'` sont réservées au type `char`, qui ne contient
qu'**un seul** caractère. Pour du texte, ce sont toujours des guillemets doubles
:

```java
String salutation = 'Bonjour';
```

```text
error: unclosed character literal
```

Et un guillemet oublié à la fin produit une erreur du même genre :

```java
String salutation = "Bonjour;
```

```text
error: unclosed string literal
```

Java a ouvert le texte au premier `"` et cherche en vain où il se ferme.

#### `"20"` n'est pas `20`

Un nombre entre guillemets n'est plus un nombre : c'est du texte qui ressemble à
un nombre.

```java
int nombre = 20;
String texte = "20";

System.out.println(nombre + 1);
System.out.println(texte + 1);
```

```text
21
201
```

Avec un `int`, `+` additionne. Avec un `String`, `+` **colle** : c'est la
**concaténation**. Les deux lignes affichent quelque chose de plausible, et une
seule fait ce que vous vouliez probablement.

#### Coller du texte et des variables

La concaténation sert surtout à construire des phrases :

```java
String prenom = "Camille";
int age = 20;
System.out.println("Bonjour " + prenom + ", tu as " + age + " ans.");
```

```text
Bonjour Camille, tu as 20 ans.
```

Java ne rajoute **aucun espace** de lui-même. Les espaces doivent se trouver à
l'intérieur des guillemets :

```java
System.out.println("Bonjour" + prenom);
System.out.println("Bonjour " + prenom);
```

```text
BonjourCamille
Bonjour Camille
```

Une chaîne peut aussi être vide, `""`, et une variable `String` peut changer de
valeur comme n'importe quelle autre :

```java
String message = "";
System.out.println("[" + message + "]");
message = "Salut";
System.out.println("[" + message + "]");
message = message + " tout le monde";
System.out.println("[" + message + "]");
```

```text
[]
[Salut]
[Salut tout le monde]
```

Les crochets ne servent qu'à rendre visible le début et la fin du texte dans la
console, ce qui est bien utile pour repérer une chaîne vide ou un espace en
trop.

!!! example "À vous : les guillemets"

    Dans `main`, avec `String ville = "Yverdon";` :

    1. Affichez `ville`, puis `"ville"`. Avant de lancer, prédisez les deux
       lignes de la console.
    2. Retirez les guillemets autour de `"Yverdon"` dans la déclaration.
       Lancez. Lisez le message d'erreur : quel mot Java ne trouve-t-il pas ?
       Remettez les guillemets.
    3. Affichez la phrase `J'habite à Yverdon.` en utilisant la variable.
       Vérifiez dans la console qu'il y a bien un espace avant `Yverdon` et
       un point à la fin.
    4. Changez la valeur de `ville` pour votre propre ville, sans toucher au
       `println`. Relancez. Quelle ligne de la console a changé ?
    5. Prédisez puis vérifiez : `System.out.println("5" + 5);` et
       `System.out.println(5 + 5);`.

## La division entière, premier piège

```java
System.out.println(7 / 2);
System.out.println(7 % 2);
System.out.println(7.0 / 2);
```

```text
3
1
3.5
```

Quand les deux opérandes sont des entiers, Java fait une **division entière** :
il garde le quotient et jette le reste. `7 / 2` vaut `3`, pas `3.5`.

L'opérateur `%`, appelé **modulo**, donne ce reste. Il vous servira constamment
: tester la parité, boucler sur un cycle, formater un affichage.

Pour obtenir une division décimale, il suffit qu'un seul des deux soit décimal.

Appliqué au problème du semestre :

```java
int premiereNote = 5;
int deuxiemeNote = 4;
int troisiemeNote = 5;

int somme = premiereNote + deuxiemeNote + troisiemeNote;

System.out.println(somme / 3);
System.out.println((double) somme / 3);
```

```text
4
4.666666666666667
```

La première ligne est fausse, et elle ne produit **aucune erreur**. Le programme
compile, s'exécute, affiche un résultat plausible, et il est faux. C'est
exactement le type de bogue que le compilateur ne peut pas attraper pour vous.

## La virgule flottante, le vrai piège

Tapez ceci et exécutez-le.

```java
System.out.println(0.1 + 0.2);
```

```text
0.30000000000000004
```

Ce n'est pas un bogue de Java. Vous obtiendrez exactement la même chose en
Python, en JavaScript, en C et dans votre tableur.

### Pourquoi

Un `double` est stocké en binaire, sur 64 bits. En binaire, on écrit les nombres
comme des sommes de puissances de deux : un demi, un quart, un huitième, et
ainsi de suite.

Avec ces briques, `0.5` s'écrit exactement. `0.25` aussi. Mais `0.1` ne tombe
jamais juste : il faudrait une infinité de termes. L'ordinateur s'arrête donc au
bit près et garde la valeur représentable la plus proche.

C'est le même phénomène qu'un tiers en décimal : `0,3333...` ne se termine
jamais, et si vous écrivez `0,33`, vous avez déjà perdu quelque chose.

Deux approximations minuscules, additionnées, donnent une erreur visible.

### Ce qui en découle

L'erreur s'accumule à chaque opération :

```java
double somme = 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1;
System.out.println(somme);
```

```text
0.9999999999999999
```

Dix fois un dixième ne font pas un. Chaque addition ajoute sa petite erreur à
celle des précédentes.

Le cas le plus traître est celui-ci :

```java
double total = 1.1 + 1.1 + 1.1;
System.out.println(total);
System.out.println(total == 3.3);
```

```text
3.3000000000000003
false
```

Le résultat affiché a l'air juste au premier coup d'oeil, et la comparaison
répond pourtant `false`.

### `float` ment encore mieux

```java
System.out.println(0.1f + 0.2f);
System.out.println(0.1 + 0.2);
```

```text
0.3
0.30000000000000004
```

Le `float` affiche `0.3`, ce qui est rassurant et faux : il a si peu de
précision que l'affichage arrondit l'erreur. Le `double` est plus précis, donc
plus honnête. C'est une raison de plus de préférer `double` : un type qui cache
ses erreurs est pire qu'un type qui les montre.

### La règle à retenir

!!! danger "Ne comparez jamais deux nombres à virgule avec `==`"

    ```java
    System.out.println(0.1 + 0.2 == 0.3);
    ```

    ```text
    false
    ```

    Cette ligne est fausse, elle compile, elle ne produit aucun avertissement,
    et le bogue qui en résulte est très difficile à trouver.

Trois solutions, selon le besoin.

=== "Comparer à une tolérance près"

    Pour savoir si deux valeurs sont « assez proches » :

    ```java
    System.out.println(Math.abs((0.1 + 0.2) - 0.3) < 1e-9);
    ```

    ```text
    true
    ```

    `1e-9` se lit « un milliardième ». C'est la méthode courante en calcul
    scientifique.

=== "Arrondir à l'affichage"

    Pour afficher un résultat propre sans toucher au calcul :

    ```java
    System.out.printf("%.2f%n", 0.1 + 0.2);
    ```

    ```text
    0.30
    ```

    `%.2f` veut dire « un nombre à virgule, deux décimales ». `%n` est le
    passage à la ligne.

    Attention : cela change seulement ce qui est affiché. La valeur en mémoire
    reste approximative.

=== "Ne pas utiliser de virgule du tout"

    Pour de l'argent, la bonne réponse est souvent de **compter en centimes**,
    avec des entiers. Pas de virgule, pas d'approximation.

    Un `BigDecimal` existe aussi, et il calcule en décimal exact. Il est plus
    verbeux et plus lent ; vous le rencontrerez plus tard.

!!! tip "Une bonne nouvelle pour nos moyennes"

    Comparer une moyenne à un seuil avec `>=` fonctionne presque toujours :
    l'erreur est de l'ordre du quadrillionième et ne fait pas basculer un
    résultat de part et d'autre de 4.0.

    C'est `==` qui casse, et l'accumulation d'un grand nombre d'additions.
    Gardez la règle simple : `>=` et `<=` sur des `double`, oui ; `==`,
    jamais.

## Les conversions

### Automatiques, quand rien ne se perd

```java
int entier = 5;
double decimal = entier;
System.out.println(decimal);
```

```text
5.0
```

Un `int` entre sans problème dans un `double` : aucune information n'est perdue.

### Explicites, quand quelque chose se perd

L'inverse exige que vous le demandiez, par un **transtypage** :

```java
double note = 3.99;
int tronque = (int) note;
System.out.println(tronque);
```

```text
3
```

Notez que cela **tronque** et n'arrondit pas. `3.99` devient `3`. Pour arrondir,
il y a `Math.round`.

Java vous oblige à écrire `(int)` parce qu'il veut une confirmation : vous êtes
en train de jeter de l'information, et il refuse de le faire dans votre dos.

### Le dépassement de capacité

```java
System.out.println(Integer.MAX_VALUE);
System.out.println(Integer.MAX_VALUE + 1);
```

```text
2147483647
-2147483648
```

Ajouter un au plus grand `int` donne le plus petit. Le compteur a fait le tour,
comme un compteur kilométrique mécanique qui repasse à zéro.

Aucune erreur, aucun avertissement. Le programme continue avec une valeur
absurde. C'est pour cela qu'on choisit son type en pensant à l'ordre de grandeur
des valeurs attendues.

### La concaténation, qui surprend tout le monde

```java
System.out.println("1" + 2 + 3);
System.out.println(1 + 2 + "3");
```

```text
123
33
```

Java lit de gauche à droite. Dans le premier cas, il rencontre d'abord du texte
et colle tout. Dans le second, il additionne `1 + 2` puis colle `"3"` au
résultat.

## Nommer ses variables

Les règles du cours, et les conventions de Java :

- en **anglais** : `averageGrade`, pas `moyenneNote` ;
- en **camelCase** : première lettre minuscule, puis une majuscule par mot ;
- un nom qui dit **ce que la variable contient**, pas son type : `studentCount`,
  pas `nbInt` ;
- pas d'abréviation sauf si elle est universelle : `index` plutôt que `idx` ;
- une `CONSTANTE` en majuscules avec des traits de soulignement.

```java
// Correct
int studentCount = 24;
double averageGrade = 4.7;
final double PASSING_GRADE = 4.0;

// À éviter
int n = 24;
double x2 = 4.7;
double passing_grade = 4.0;
```

Le mot-clé `final` déclare une **constante** : une variable qu'on ne peut plus
modifier après sa création. C'est la réponse au problème que vous avez rencontré
en séance 02, quand une même valeur était écrite à deux endroits et que vous
n'en aviez changé qu'un. Une constante n'existe qu'à un seul endroit.

## Atelier

Dans votre projet `hello-world`, **dans la méthode `main`** de `src/Main.java`.
Chaque exercice se fait en modifiant le fichier et en relançant.

Pour chaque exercice, suivez le même cycle :

1. **prédire** : écrivez ce que la console devrait afficher ;
2. **lancer** : cliquez sur la flèche verte ;
3. **comparer** : chaque ligne de la console correspond à un `println` du code.
   Si une ligne ne correspond pas à votre prédiction, trouvez lequel ;
4. **modifier** une valeur, et recommencer.

Ce cycle est la compétence de la séance, plus que n'importe quel type.

1. Déclarez une variable `int compteur = 0;`. Affichez-la. Ajoutez-lui 1 et
   affichez-la à nouveau, trois fois de suite. La console doit afficher `0`,
   `1`, `2`, `3` sur quatre lignes. Changez la valeur de départ à `10` : quelles
   lignes changent ?
2. Déclarez une variable pour votre prénom, une pour votre âge, une pour votre
   taille en mètres. Affichez une phrase les utilisant toutes les trois. Quels
   types avez-vous choisis, et pourquoi ? Changez ensuite la valeur de chaque
   variable, sans toucher au `println`, et vérifiez que la phrase de la console
   suit.
3. Affichez le résultat de `0.1 + 0.2`. Puis affichez-le arrondi à deux
   décimales.
4. Calculez la moyenne de trois notes stockées dans trois variables `int`.
   Obtenez d'abord le résultat faux, puis corrigez-le. Expliquez à voix haute à
   la personne à côté de vous d'où venait l'erreur.
5. Trouvez par vous-même la valeur de `Integer.MAX_VALUE + 2`. Prédisez avant
   d'exécuter.
6. Déclarez une constante `PASSING_GRADE` à 4.0, puis essayez de la modifier à
   la ligne suivante. Lisez le message d'erreur et reformulez-le avec vos mots.
7. Que vaut `(int) -3.99` ? Prédisez, puis vérifiez. Est-ce que cela vous
   surprend ?

L'exercice 4 est celui qui compte. C'est le bogue que vous referez tous dans le
mini-projet.

## Résumé

- Pour l'instant, tout votre code s'écrit entre les accolades de la méthode
  `main`, qui est exécutée de haut en bas.
- Un `System.out.println` (raccourci `sout`) produit une ligne dans la console.
  C'est le seul moyen de voir ce que contient une variable.
- Une variable est un état que le programme retient, avec un type, un nom et une
  valeur.
- Huit types primitifs. En pratique : `int`, `double`, `boolean`, parfois `char`
  et `long`.
- La division de deux entiers est entière, et le compilateur ne vous préviendra
  pas.
- Un `String` s'écrit toujours entre guillemets doubles. Sans eux, Java cherche
  une variable de ce nom. Avec un `String`, `+` colle au lieu d'additionner.
- Les nombres à virgule sont approchés, et l'erreur s'accumule à chaque
  opération. Jamais de `==` sur un `double`.
- Une conversion qui perd de l'information doit être demandée explicitement.
- Un nom de variable dit ce qu'elle contient. Une valeur fixe devient une
  constante `final`.

## Pour aller plus loin

- [Primitive data types](https://dev.java/learn/language-basics/primitive-types/) -
  tutoriel officiel.
- [What Every Computer Scientist Should Know About Floating-Point Arithmetic](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html) -
  l'article de référence de David Goldberg, 1991. Exigeant, et la réponse
  complète à la question du jour.
- [0.30000000000000004.com](https://0.30000000000000004.com/) - le même calcul
  dans une cinquantaine de langages, pour se convaincre que ce n'est pas la
  faute de Java.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
