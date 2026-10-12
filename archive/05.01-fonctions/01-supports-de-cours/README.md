# Fonctions (Méthodes) - Supports de cours

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.01-fonctions/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.01-fonctions/01-supports-de-cours/05.01-fonctions-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Table des matières

- [Ressources annexes](#ressources-annexes)
- [Table des matières](#table-des-matières)
- [Objectifs](#objectifs)
- [Qu'est-ce qu'une méthode ?](#quest-ce-quune-méthode-)
- [Déclarer une méthode en Java](#déclarer-une-méthode-en-java)
- [Appeler une méthode en Java](#appeler-une-méthode-en-java)
- [Passer des paramètres à une méthode](#passer-des-paramètres-à-une-méthode)
- [Retourner une valeur depuis une méthode](#retourner-une-valeur-depuis-une-méthode)
- [Combiner paramètres et valeurs de retour](#combiner-paramètres-et-valeurs-de-retour)
- [Portée des variables](#portée-des-variables)
- [Variables de classe (à éviter pour l'instant)](#variables-de-classe-à-éviter-pour-linstant)
- [Méthodes prédéfinies en Java](#méthodes-prédéfinies-en-java)
- [Réutiliser du code avec des méthodes](#réutiliser-du-code-avec-des-méthodes)
- [Bonnes pratiques et conseils](#bonnes-pratiques-et-conseils)
- [Conclusion](#conclusion)
- [Exercices](#exercices)

## Objectifs

Les méthodes (ou fonctions) sont un concept fondamental en programmation. Elles
permettent de découper un programme en morceaux plus petits, plus faciles à
comprendre et à maintenir. Les méthodes permettent également de réutiliser du
code, en l'encapsulant dans une méthode que l'on peut appeler à plusieurs
endroits.

Dans ce cours, nous allons voir comment déclarer et appeler des méthodes en
Java. Nous allons également voir comment passer des paramètres à une méthode et
comment retourner une valeur depuis une méthode.

De façon plus concise, vous devriez être capables de :

- Décrire ce qu'est une méthode en programmation
- Déclarer une méthode en Java
- Appeler une méthode en Java
- Passer des paramètres à une méthode en Java
- Utiliser une valeur de retour
- Expliquer ce qu'est une portée de variable
- Utiliser des variables de classe
- Savoir où trouver la documentation sur les méthodes prédéfinies en Java
- Utiliser des méthodes prédéfinies en Java
- Réutiliser du code avec des méthodes

## Introduction

Jusqu'à présent, nous avons écrit tout notre code directement dans la méthode
`main`. Pour des programmes simples, cela fonctionne bien. Mais imaginez un
programme de 1000 lignes où tout le code est dans une seule méthode ! Ce serait
très difficile à lire, à comprendre et à maintenir.

Les méthodes (également appelées fonctions dans d'autres langages) sont la
solution à ce problème. Elles permettent de **découper un programme en morceaux
plus petits**, chacun ayant une responsabilité claire et bien définie.

> [!NOTE]
>
> En Java, on utilise le terme "méthode" plutôt que "fonction" car elles sont
> toujours définies à l'intérieur d'une classe. Mais les deux termes font
> référence au même concept.

Dans ce chapitre, vous allez apprendre à créer vos propres méthodes, à les
appeler, à leur passer des informations et à récupérer leurs résultats. Vous
découvrirez également les nombreuses méthodes déjà fournies par Java que vous
pouvez utiliser immédiatement.

À la fin de cette séance, vous devriez être capable de :

- Décrire ce qu'est une méthode en programmation
- Déclarer une méthode en Java
- Appeler une méthode en Java
- Passer des paramètres à une méthode en Java
- Utiliser une valeur de retour
- Expliquer ce qu'est une portée de variable
- Utiliser des variables de classe
- Savoir où trouver la documentation sur les méthodes prédéfinies en Java
- Utiliser des méthodes prédéfinies en Java
- Réutiliser du code avec des méthodes

## Qu'est-ce qu'une méthode ?

### Définition

Une **méthode** est un bloc de code réutilisable qui effectue une tâche
spécifique. Une méthode peut :

- Recevoir des données en entrée (appelées **paramètres**)
- Effectuer des opérations sur ces données
- Renvoyer un résultat en sortie (appelé **valeur de retour**)

### Analogies du quotidien

#### Analogie 1 : Une recette de cuisine

Imaginez une recette de gâteau au chocolat :

- **Nom de la recette** : "faire Gâteau Au Chocolat"
- **Ingrédients** (paramètres) : farine, sucre, œufs, chocolat
- **Instructions** : mélanger, cuire, décorer
- **Résultat** (valeur de retour) : un gâteau

Vous pouvez utiliser cette recette plusieurs fois, avec des quantités
différentes, et obtenir à chaque fois un gâteau.

#### Analogie 2 : Une calculatrice

Quand vous utilisez la fonction "racine carrée" d'une calculatrice :

- **Nom** : "racine carrée"
- **Entrée** (paramètre) : un nombre (par exemple, 16)
- **Traitement** : calcul mathématique
- **Sortie** (valeur de retour) : le résultat (4)

#### Analogie 3 : Un distributeur automatique

Un distributeur de boissons :

- **Nom** : "distribuer Boisson"
- **Entrées** (paramètres) : code de la boisson (ex: B3), montant payé
- **Traitement** : vérifier le paiement, récupérer la boisson
- **Sortie** : une boisson et la monnaie

### Représentation mathématique

En mathématiques, vous avez déjà rencontré des fonctions :

$$f(x) = x^2$$

Cette fonction :

- Se nomme $f$
- Prend un paramètre $x$
- Retourne le carré de $x$

Exemples d'utilisation :

- $f(3) = 9$
- $f(5) = 25$
- $f(10) = 100$

En programmation, c'est exactement le même principe !

### Pourquoi utiliser des méthodes ?

Les méthodes apportent plusieurs avantages majeurs :

1. **Réutilisabilité** : Écrire le code une fois, l'utiliser plusieurs fois

   ```java
   // Sans méthode : répétition du code
   int carre1 = 5 * 5;
   int carre2 = 8 * 8;
   int carre3 = 12 * 12;

   // Avec méthode : pas de répétition
   int carre1 = carre(5);
   int carre2 = carre(8);
   int carre3 = carre(12);
   ```

2. **Lisibilité** : Code plus clair et plus facile à comprendre

   ```java
   // Difficile à comprendre
   double resultat = (prix * 1.077);

   // Clair et explicite
   double resultat = calculerPrixAvecTVA(prix);
   ```

3. **Maintenabilité** : Si vous devez changer le code, vous ne le faites qu'à un
   seul endroit

4. **Organisation** : Découper un gros problème en petits morceaux plus simples

5. **Test et débogage** : Plus facile de tester et corriger des petites méthodes

> [!IMPORTANT]
>
> Une bonne méthode fait **une seule chose** et la fait bien. Si votre méthode
> fait trop de choses différentes, c'est probablement qu'elle devrait être
> divisée en plusieurs méthodes plus petites.

## Déclarer une méthode en Java

### Anatomie d'une méthode

En Java, une méthode est composée de plusieurs parties :

```java
public static int calculer(int a, int b) {
    int resultat = a + b;
    return resultat;
}
```

Décomposons chaque élément :

1. **`public`** : Modificateur d'accès (la méthode est accessible de partout)
2. **`static`** : La méthode appartient à la classe (pas besoin d'objet)
3. **`int`** : Type de retour (la méthode renvoie un entier)
4. **`calculer`** : Nom de la méthode
5. **`(int a, int b)`** : Liste des paramètres (deux entiers nommés `a` et `b`)
6. **`{ ... }`** : Corps de la méthode (le code à exécuter)
7. **`return resultat`** : Valeur à renvoyer

> [!NOTE]
>
> Le mot-clé `static` signifie que la méthode appartient à la classe elle-même
> et non à une instance de la classe. Pour l'instant, utilisez toujours `static`
> pour vos méthodes. Nous verrons la programmation orientée objet plus tard.

### Syntaxe générale

```java
modificateur static typeRetour nomMethode(typeParam1 param1, typeParam2 param2, ...) {
    // Corps de la méthode
    // Instructions à exécuter
    return valeur; // Si la méthode retourne quelque chose
}
```

### Méthode sans paramètres ni valeur de retour

La forme la plus simple : une méthode qui ne prend rien et ne retourne rien.

```java
public class Main {
    public static void afficherMessage() {
        System.out.println("=== Bienvenue dans le programme ===");
        System.out.println("Version 1.0");
        System.out.println("====================================");
    }

    public static void main(String[] args) {
        afficherMessage(); // Appel de la méthode
    }
}
```

**Résultat :**

```text
=== Bienvenue dans le programme ===
Version 1.0
====================================
```

> [!TIP]
>
> Le type `void` signifie "aucun retour". Utilisez `void` quand votre méthode
> effectue une action (comme afficher quelque chose) mais ne calcule pas de
> résultat à renvoyer.

### Conventions de nommage des méthodes

En Java, les méthodes suivent ces conventions :

- **camelCase** : première lettre en minuscule, majuscules pour les mots
  suivants
- **Verbes d'action** : le nom doit décrire ce que fait la méthode

**Exemples de bons noms :**

```java
calculerMoyenne()
afficherResultat()
verifierAge()
convertirEnMajuscules()
estPair()
```

**Exemples de mauvais noms :**

```java
calcul()           // Pas assez précis
x()               // Pas descriptif
Calculer()        // Ne commence pas par une minuscule
calculer_moyenne() // Utilise des underscores (style Python/C)
```

> [!IMPORTANT]
>
> Un bon nom de méthode doit être suffisamment descriptif pour qu'on comprenne
> ce qu'elle fait sans lire son code. Préférez un nom long et clair à un nom
> court et obscur.

## Appeler une méthode en Java

### Principe de base

Pour appeler (ou "invoquer") une méthode, on écrit son nom suivi de parenthèses
`()`. C'est comme appuyer sur un bouton : on déclenche l'exécution du code
contenu dans la méthode.

```java
public class Main {
    public static void afficherBienvenue() {
        System.out.println("Bonjour le monde !");
    }

    public static void main(String[] args) {
        afficherBienvenue(); // Appel de la méthode
    }
}
```

### Ordre d'exécution

Lorsqu'une méthode est appelée, le programme :

1. **Saute** à la ligne où commence la méthode
2. **Exécute** toutes les instructions de la méthode
3. **Revient** à la ligne suivant l'appel

```java
public class Main {
    public static void afficherEtape(int numero) {
        System.out.println("Étape " + numero + " terminée");
    }

    public static void main(String[] args) {
        System.out.println("Début du programme");
        afficherEtape(1);  // Saute vers afficherEtape
        afficherEtape(2);  // Saute encore vers afficherEtape
        System.out.println("Fin du programme");
    }
}
```

**Résultat :**

```text
Début du programme
Étape 1 terminée
Étape 2 terminée
Fin du programme
```

### Appeler une méthode plusieurs fois

Une méthode peut être appelée autant de fois que nécessaire :

```java
public class Main {
    public static void afficherSeparateur() {
        System.out.println("========================");
    }

    public static void main(String[] args) {
        afficherSeparateur();
        System.out.println("Section 1");
        afficherSeparateur();
        System.out.println("Section 2");
        afficherSeparateur();
    }
}
```

**Résultat :**

```text
========================
Section 1
========================
Section 2
========================
```

> [!TIP]
>
> C'est exactement le but des méthodes : éviter de répéter le même code. Plutôt
> que d'écrire trois fois `System.out.println("========================")`, on
> écrit une fois la méthode et on l'appelle trois fois.

### Appeler une méthode depuis une autre méthode

Une méthode peut appeler d'autres méthodes :

```java
public class Main {
    public static void afficherTitre() {
        System.out.println("╔════════════════════════════╗");
        System.out.println("║   CALCULATRICE SIMPLE      ║");
        System.out.println("╚════════════════════════════╝");
    }

    public static void afficherMenu() {
        afficherTitre(); // Appel d'une autre méthode
        System.out.println("1. Addition");
        System.out.println("2. Soustraction");
        System.out.println("3. Quitter");
    }

    public static void main(String[] args) {
        afficherMenu();
    }
}
```

> [!IMPORTANT]
>
> L'ordre des déclarations n'a pas d'importance en Java. Vous pouvez appeler une
> méthode qui est déclarée plus bas dans le fichier. Ce qui compte, c'est que la
> méthode soit déclarée quelque part dans la classe.

## Passer des paramètres à une méthode

### Qu'est-ce qu'un paramètre ?

Un **paramètre** permet de passer des informations à une méthode pour qu'elle
puisse les utiliser. C'est comme donner des ingrédients à une recette : la
recette (méthode) est toujours la même, mais le résultat change selon les
ingrédients (paramètres).

```java
public class Main {
    public static void saluer(String nom) {
        System.out.println("Bonjour " + nom + " !");
    }

    public static void main(String[] args) {
        saluer("Ariel"); // Affiche "Bonjour Ariel !"
        saluer("Nox");   // Affiche "Bonjour Nox !"
        saluer("Amaru"); // Affiche "Bonjour Amaru !"
    }
}
```

### Paramètre vs Argument

Il existe une distinction importante entre **paramètre** et **argument** :

- **Paramètre** : variable dans la **déclaration** de la méthode
- **Argument** : valeur passée lors de l'**appel** de la méthode

```java
public static void afficher(String message) {
    //                         ^^^^^^^ Paramètre (variable)
    System.out.println(message);
}

public static void main(String[] args) {
    afficher("Hello");
    //       ^^^^^^^ Argument (valeur concrète)
}
```

> [!NOTE]
>
> Dans la pratique, les termes "paramètre" et "argument" sont souvent utilisés
> de manière interchangeable, mais connaître la distinction aide à comprendre la
> documentation.

### Différents types de paramètres

Les paramètres peuvent être de n'importe quel type Java :

```java
public class Main {
    // Paramètre entier
    public static void afficherAge(int age) {
        System.out.println("Vous avez " + age + " ans.");
    }

    // Paramètre décimal
    public static void afficherPrix(double prix) {
        System.out.println("Prix : " + prix + " CHF");
    }

    // Paramètre booléen
    public static void afficherStatut(boolean estActif) {
        if (estActif) {
            System.out.println("Compte actif");
        } else {
            System.out.println("Compte inactif");
        }
    }

    public static void main(String[] args) {
        afficherAge(25);
        afficherPrix(19.90);
        afficherStatut(true);
    }
}
```

**Résultat :**

```text
Vous avez 25 ans.
Prix : 19.90 CHF
Compte actif
```

### Méthode avec plusieurs paramètres

Une méthode peut avoir plusieurs paramètres séparés par des virgules :

```java
public class Main {
    public static void afficherRectangle(int largeur, int hauteur) {
        System.out.println("Rectangle de " + largeur + " × " + hauteur);
        System.out.println("Aire : " + (largeur * hauteur));
        System.out.println("Périmètre : " + (2 * (largeur + hauteur)));
    }

    public static void main(String[] args) {
        afficherRectangle(5, 3);
        afficherRectangle(10, 7);
    }
}
```

**Résultat :**

```text
Rectangle de 5 × 3
Aire : 15
Périmètre : 16
Rectangle de 10 × 7
Aire : 70
Périmètre : 34
```

> [!IMPORTANT]
>
> L'ordre des arguments doit correspondre exactement à l'ordre des paramètres.
> Si vous inversez les valeurs, le résultat sera incorrect (ou le code ne
> compilera pas si les types ne correspondent pas).

## Retourner une valeur depuis une méthode

### Le mot-clé `return`

Une méthode peut **calculer** une valeur et la **renvoyer** au code qui l'a
appelée. C'est comme une calculatrice : vous lui donnez des nombres, elle
effectue un calcul et vous renvoie le résultat.

Pour retourner une valeur, on utilise le mot-clé `return` suivi de la valeur à
renvoyer.

```java
public class Main {
    public static int carre(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        int resultat = carre(5);
        System.out.println("Le carré de 5 est : " + resultat); // Affiche 25
    }
}
```

### Utiliser la valeur retournée

Une fois qu'une méthode retourne une valeur, vous pouvez :

1. **La stocker** dans une variable
2. **L'afficher** directement
3. **L'utiliser** dans un calcul

```java
public class Main {
    public static double calculerTVA(double prixHT, double taux) {
        return prixHT * taux;
    }

    public static void main(String[] args) {
        // 1. Stocker dans une variable
        double tva = calculerTVA(100, 0.077);
        System.out.println("TVA : " + tva); // Affiche 7.7

        // 2. Afficher directement
        System.out.println("TVA : " + calculerTVA(200, 0.077)); // Affiche 15.4

        // 3. Utiliser dans un calcul
        double prixTotal = 100 + calculerTVA(100, 0.077);
        System.out.println("Prix total : " + prixTotal); // Affiche 107.7
    }
}
```

### Type de retour

Le **type de retour** doit être déclaré dans la signature de la méthode. Il
indique quel type de valeur la méthode va renvoyer.

```java
public static int additionner(int a, int b) {
    //         ^^^ Type de retour
    return a + b;
}

public static double calculerMoyenne(int a, int b) {
    //         ^^^^^^ Type de retour
    return (a + b) / 2.0;
}

public static boolean estPair(int nombre) {
    //         ^^^^^^^ Type de retour
    return nombre % 2 == 0;
}

public static String creerMessage(String nom) {
    //         ^^^^^^ Type de retour
    return "Bonjour " + nom + " !";
}
```

> [!IMPORTANT]
>
> Le type de la valeur retournée avec `return` doit correspondre exactement au
> type déclaré dans la signature de la méthode. Si vous déclarez `int` mais
> retournez un `String`, le code ne compilera pas.

### Méthode sans valeur de retour (`void`)

Si une méthode ne retourne rien, on utilise le type `void` :

```java
public static void afficherMessage(String message) {
    //         ^^^^ Pas de valeur de retour
    System.out.println(message);
    // Pas de "return" nécessaire
}
```

Avec `void`, vous pouvez aussi utiliser `return` sans valeur pour sortir
prématurément de la méthode :

```java
public static void verifierAge(int age) {
    if (age < 0) {
        System.out.println("Âge invalide !");
        return; // Sort immédiatement de la méthode
    }
    System.out.println("Âge valide : " + age);
}
```

### Une seule valeur de retour

Une méthode ne peut retourner **qu'une seule valeur**. Si vous avez besoin de
retourner plusieurs valeurs, vous devez :

- Créer une classe ou structure de données
- Utiliser un tableau
- Appeler plusieurs méthodes

```java
// ❌ Impossible : retourner plusieurs valeurs
public static ??? calculerStatistiques(int a, int b) {
    return a + b, a - b; // ERREUR !
}

// ✅ Solution : retourner un tableau
public static int[] calculerStatistiques(int a, int b) {
    int[] resultats = {a + b, a - b};
    return resultats;
}
```

> [!TIP]
>
> Quand `return` est exécuté, la méthode s'arrête immédiatement. Tout code après
> un `return` ne sera jamais exécuté. C'est une erreur de compilation si le
> compilateur détecte du code inaccessible après un `return`.

## Combiner paramètres et valeurs de retour

### Méthodes complètes

Les méthodes les plus utiles combinent souvent des paramètres et une valeur de
retour. Elles prennent des données en entrée, effectuent un traitement, et
renvoient un résultat.

```java
public class Main {
    public static double calculerPrixTTC(double prixHT, double tauxTVA) {
        return prixHT * (1 + tauxTVA);
    }

    public static void main(String[] args) {
        double prix1 = calculerPrixTTC(100, 0.077);
        double prix2 = calculerPrixTTC(250, 0.077);

        System.out.println("Prix 1 TTC : " + prix1); // 107.7
        System.out.println("Prix 2 TTC : " + prix2); // 267.75
    }
}
```

### Plusieurs paramètres de types différents

Une méthode peut accepter plusieurs paramètres de types différents :

```java
public class Main {
    public static String creerFacture(String client, int quantite, double prixUnitaire) {
        double total = quantite * prixUnitaire;
        return "Facture pour " + client + " : " + quantite + " articles à " +
               prixUnitaire + " CHF = " + total + " CHF";
    }

    public static void main(String[] args) {
        String facture = creerFacture("Ariel", 3, 15.50);
        System.out.println(facture);
        // Affiche : Facture pour Ariel : 3 articles à 15.5 CHF = 46.5 CHF
    }
}
```

### Ordre des paramètres

L'ordre des arguments doit correspondre exactement à l'ordre des paramètres :

```java
public class Main {
    public static double calculerRemise(double prix, double pourcentage) {
        return prix * (pourcentage / 100);
    }

    public static void main(String[] args) {
        double remise1 = calculerRemise(100, 20);  // 100 CHF, 20% = 20 CHF
        double remise2 = calculerRemise(20, 100);  // 20 CHF, 100% = 20 CHF (!)

        System.out.println("Remise 1 : " + remise1); // 20.0
        System.out.println("Remise 2 : " + remise2); // 20.0
    }
}
```

> [!WARNING]
>
> Si vous inversez l'ordre des arguments, vous pouvez obtenir un résultat
> mathématiquement correct mais sémantiquement incorrect. Soyez attentif à
> l'ordre des paramètres !

### Exemples pratiques avec plusieurs paramètres

```java
public class Main {
    // Calculer l'aire d'un rectangle
    public static int calculerAire(int largeur, int hauteur) {
        return largeur * hauteur;
    }

    // Calculer la moyenne de trois notes
    public static double calculerMoyenne(double note1, double note2, double note3) {
        return (note1 + note2 + note3) / 3.0;
    }

    // Vérifier si un nombre est dans un intervalle
    public static boolean estDansIntervalle(int nombre, int min, int max) {
        return nombre >= min && nombre <= max;
    }

    public static void main(String[] args) {
        System.out.println("Aire : " + calculerAire(5, 3));           // 15
        System.out.println("Moyenne : " + calculerMoyenne(5, 4, 6));   // 5.0
        System.out.println("Dans intervalle : " + estDansIntervalle(15, 10, 20)); // true
    }
}
```

## Portée des variables

### Variables locales

Les variables déclarées à l'intérieur d'une méthode sont **locales** à cette
méthode. Elles n'existent que pendant l'exécution de la méthode et ne sont pas
accessibles ailleurs.

```java
public class Main {
    public static int doubler(int nombre) {
        int resultat = nombre * 2; // Variable locale
        return resultat;
    }

    public static void main(String[] args) {
        int valeur = doubler(5);
        System.out.println(valeur);    // OK : 10
        System.out.println(resultat);  // ERREUR : resultat n'existe pas ici
    }
}
```

> [!NOTE]
>
> Pensez à une variable locale comme à une note sur un papier dans un bureau
> fermé. Seule la personne dans ce bureau peut lire cette note. Une fois qu'elle
> sort et ferme la porte, la note n'est plus accessible.

### Paramètres sont aussi locaux

Les paramètres d'une méthode sont également des variables locales. Ils
n'existent que pendant l'exécution de la méthode :

```java
public class Main {
    public static void afficher(String message) {
        // "message" est une variable locale (paramètre)
        System.out.println(message);
    } // "message" disparaît ici

    public static void main(String[] args) {
        afficher("Bonjour");
        System.out.println(message); // ERREUR : message n'existe pas ici
    }
}
```

### Portées imbriquées

Chaque bloc de code a sa propre portée. Les variables déclarées dans un bloc
interne ne sont pas accessibles dans le bloc externe :

```java
public class Main {
    public static void tester(int nombre) {
        if (nombre > 0) {
            int double = nombre * 2; // Variable dans le bloc if
            System.out.println(double); // OK
        }
        System.out.println(double); // ERREUR : double n'existe plus
    }
}
```

### Schéma de la portée des variables

```java
public class Main {
    // Zone globale de la classe

    public static void methode1(int param1) {
        // param1 existe ICI
        int local1 = 10; // local1 existe ICI

        if (param1 > 0) {
            int local2 = 20; // local2 existe SEULEMENT ICI
        }
        // local2 n'existe PLUS ici
    } // param1 et local1 n'existent PLUS ici

    public static void methode2() {
        // param1, local1, local2 n'existent PAS ici
        int autreVariable = 30; // Variable différente, portée locale
    }
}
```

> [!IMPORTANT]
>
> Deux méthodes différentes peuvent avoir des variables locales avec le même nom
> sans conflit, car elles sont dans des portées différentes. C'est comme avoir
> deux pièces séparées avec chacune une boîte nommée "outils" - elles sont
> indépendantes.

## Variables de classe (à éviter pour l'instant)

### Qu'est-ce qu'une variable de classe ?

Il est possible de déclarer des variables en dehors des méthodes, au niveau de
la classe. Ces variables sont appelées **variables de classe** (ou **champs
statiques**) et sont accessibles par toutes les méthodes de la classe.

```java
public class Main {
    public static int compteur = 0; // Variable de classe

    public static void incrementer() {
        compteur = compteur + 1;
    }

    public static void main(String[] args) {
        System.out.println(compteur); // 0
        incrementer();
        System.out.println(compteur); // 1
        incrementer();
        System.out.println(compteur); // 2
    }
}
```

### Différence avec les variables locales

| Aspect            | Variable locale                 | Variable de classe             |
| ----------------- | ------------------------------- | ------------------------------ |
| **Déclaration**   | À l'intérieur d'une méthode     | En dehors des méthodes         |
| **Portée**        | Uniquement dans la méthode      | Toute la classe                |
| **Durée de vie**  | Le temps d'exécution de méthode | Toute l'exécution du programme |
| **Accessibilité** | Une seule méthode               | Toutes les méthodes            |

### Exemple comparatif

```java
public class Main {
    public static int variableClasse = 100; // Accessible partout dans la classe

    public static void methode1() {
        int variableLocale = 50; // Accessible seulement ici
        System.out.println(variableClasse); // OK : 100
        System.out.println(variableLocale); // OK : 50
    }

    public static void methode2() {
        System.out.println(variableClasse); // OK : 100
        System.out.println(variableLocale); // ERREUR : n'existe pas ici
    }
}
```

### Pourquoi éviter les variables de classe ?

Les variables de classe créent ce qu'on appelle un **état global**. Cela peut
sembler pratique, mais pose plusieurs problèmes :

1. **Difficulté à comprendre** : On ne sait pas quelle méthode modifie quelle
   variable
2. **Bugs difficiles à trouver** : Une méthode peut modifier une variable et
   casser une autre méthode
3. **Code difficile à tester** : Les méthodes dépendent de l'état global au lieu
   d'être indépendantes
4. **Couplage fort** : Les méthodes deviennent dépendantes les unes des autres

**Mauvais exemple avec variable de classe :**

```java
public class Main {
    public static int total = 0; // État global

    public static void ajouter(int nombre) {
        total = total + nombre; // Modifie l'état global
    }

    public static void afficher() {
        System.out.println("Total : " + total); // Dépend de l'état global
    }

    public static void main(String[] args) {
        ajouter(10);
        ajouter(20);
        afficher(); // Total : 30
        // Mais d'où vient ce 30 ? Il faut lire tout le code pour comprendre
    }
}
```

**Meilleur exemple avec paramètres et retours :**

```java
public class Main {
    public static int ajouter(int valeurActuelle, int nombre) {
        return valeurActuelle + nombre; // Retourne le résultat
    }

    public static void afficher(int total) {
        System.out.println("Total : " + total);
    }

    public static void main(String[] args) {
        int total = 0;
        total = ajouter(total, 10);
        total = ajouter(total, 20);
        afficher(total); // Total : 30
        // Clair : on voit d'où vient total et comment il évolue
    }
}
```

> [!CAUTION]
>
> Pour l'instant, évitez d'utiliser des variables de classe (sauf pour les
> constantes). Privilégiez les paramètres et les valeurs de retour. Vous verrez
> plus tard, avec la programmation orientée objet, quand et comment utiliser
> correctement l'état dans vos programmes.

### Exception : les constantes

Une exception à cette règle concerne les **constantes** : valeurs qui ne
changent jamais. Pour les constantes, on utilise `static final` et des noms en
MAJUSCULES :

```java
public class Main {
    public static final double TAUX_TVA = 0.077;     // OK : constante
    public static final int NOMBRE_JOURS_SEMAINE = 7; // OK : constante

    public static double calculerTTC(double prixHT) {
        return prixHT * (1 + TAUX_TVA); // Utiliser une constante : OK
    }
}
```

> [!TIP]
>
> Les constantes sont acceptables car elles ne changent jamais, donc elles ne
> créent pas les problèmes de l'état global mutable.

## Méthodes prédéfinies en Java

### La bibliothèque standard Java

Java vient avec des milliers de méthodes déjà programmées et prêtes à l'emploi.
C'est comme avoir une immense boîte à outils : pourquoi fabriquer un marteau
quand il y en a déjà un parfait dans la boîte ?

Ces méthodes sont organisées dans des **classes** de la bibliothèque standard.
Vous avez déjà utilisé certaines d'entre elles sans le savoir :

```java
System.out.println("Hello");  // Méthode println de la classe System
```

### La classe `Math` : calculs mathématiques

La classe `Math` contient des méthodes pour les opérations mathématiques
courantes :

```java
public class Main {
    public static void main(String[] args) {
        // Valeur absolue
        System.out.println(Math.abs(-15));      // 15

        // Puissance
        System.out.println(Math.pow(2, 3));     // 8.0 (2 puissance 3)

        // Racine carrée
        System.out.println(Math.sqrt(16));      // 4.0

        // Arrondi
        System.out.println(Math.round(3.7));    // 4
        System.out.println(Math.round(3.2));    // 3

        // Maximum et minimum
        System.out.println(Math.max(10, 20));   // 20
        System.out.println(Math.min(10, 20));   // 10

        // Constantes mathématiques
        System.out.println(Math.PI);            // 3.141592653589793
        System.out.println(Math.E);             // 2.718281828459045
    }
}
```

> [!TIP]
>
> Utilisez `Math.pow(base, exposant)` pour calculer des puissances. Par exemple,
> `Math.pow(2, 10)` calcule $2^{10} = 1024$.

### La classe `String` : manipulation de texte

Les chaînes de caractères en Java sont des objets de la classe `String`, qui
possède de nombreuses méthodes utiles :

```java
public class Main {
    public static void main(String[] args) {
        String texte = "Bonjour le monde";

        // Longueur
        System.out.println(texte.length());              // 16

        // Majuscules / minuscules
        System.out.println(texte.toUpperCase());         // BONJOUR LE MONDE
        System.out.println(texte.toLowerCase());         // bonjour le monde

        // Extraire un caractère
        System.out.println(texte.charAt(0));             // B
        System.out.println(texte.charAt(8));             // l

        // Extraire une sous-chaîne
        System.out.println(texte.substring(0, 7));       // Bonjour
        System.out.println(texte.substring(8));          // le monde

        // Vérifier le contenu
        System.out.println(texte.contains("monde"));     // true
        System.out.println(texte.startsWith("Bon"));     // true
        System.out.println(texte.endsWith("!"));         // false

        // Remplacer
        System.out.println(texte.replace("monde", "Java")); // Bonjour le Java
    }
}
```

> [!IMPORTANT]
>
> Les méthodes sur les `String` ne modifient **jamais** la chaîne originale.
> Elles renvoient une **nouvelle** chaîne. C'est pourquoi vous devez récupérer
> le résultat : `String nouveau = texte.toUpperCase();`

### Exemple pratique : calculer une aire

Combiner vos propres méthodes avec les méthodes prédéfinies :

```java
public class Main {
    public static double calculerAireDisque(double rayon) {
        return Math.PI * Math.pow(rayon, 2);
    }

    public static String formaterResultat(double aire) {
        return String.format("L'aire est de %.2f cm²", aire);
    }

    public static void main(String[] args) {
        double rayon = 5.0;
        double aire = calculerAireDisque(rayon);
        String message = formaterResultat(aire);
        System.out.println(message); // L'aire est de 78.54 cm²
    }
}
```

### Documentation officielle

Toutes les méthodes prédéfinies sont documentées en ligne :

- **Documentation Java** : <https://docs.oracle.com/en/java/javase/21/docs/api/>
- **Classe Math** :
  [java.lang.Math](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html)
- **Classe String** :
  [java.lang.String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
- **Classe System** :
  [java.lang.System](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/System.html)

> [!TIP]
>
> Apprendre à lire la documentation Java est une compétence essentielle.
> Explorez les méthodes disponibles, regardez les exemples, testez-les dans
> votre code. C'est en explorant que vous découvrirez de nouveaux outils !

## Réutiliser du code avec des méthodes

### Le problème de la duplication de code

Imaginez que vous devez afficher un menu à plusieurs endroits dans votre
programme. Sans méthodes, vous devriez copier-coller le code partout :

```java
public class Main {
    public static void main(String[] args) {
        // Premier affichage du menu
        System.out.println("=== MENU ===");
        System.out.println("1. Nouveau jeu");
        System.out.println("2. Charger partie");
        System.out.println("3. Options");
        System.out.println("4. Quitter");
        System.out.println("============");

        // ... du code ...

        // Deuxième affichage du menu (copier-coller)
        System.out.println("=== MENU ===");
        System.out.println("1. Nouveau jeu");
        System.out.println("2. Charger partie");
        System.out.println("3. Options");
        System.out.println("4. Quitter");
        System.out.println("============");

        // ... encore du code ...

        // Troisième affichage (encore copier-coller !)
        System.out.println("=== MENU ===");
        System.out.println("1. Nouveau jeu");
        System.out.println("2. Charger partie");
        System.out.println("3. Options");
        System.out.println("4. Quitter");
        System.out.println("============");
    }
}
```

**Problèmes avec cette approche :**

1. **Code répétitif** : Beaucoup de lignes identiques
2. **Difficile à modifier** : Si vous voulez changer le menu, vous devez le
   changer à 3 endroits
3. **Risque d'erreurs** : Vous pourriez oublier de modifier un des menus
4. **Illisible** : Le code est long et difficile à comprendre

### La solution : une méthode

Créons une méthode qui affiche le menu :

```java
public class Main {
    public static void afficherMenu() {
        System.out.println("=== MENU ===");
        System.out.println("1. Nouveau jeu");
        System.out.println("2. Charger partie");
        System.out.println("3. Options");
        System.out.println("4. Quitter");
        System.out.println("============");
    }

    public static void main(String[] args) {
        afficherMenu();  // Une seule ligne !

        // ... du code ...

        afficherMenu();  // Une seule ligne !

        // ... encore du code ...

        afficherMenu();  // Une seule ligne !
    }
}
```

**Avantages :**

1. **Code court et clair** : Une ligne au lieu de 6
2. **Facile à modifier** : Changez le menu à un seul endroit
3. **Pas d'erreurs** : Tous les menus seront identiques
4. **Lisible** : Le code exprime l'intention ("afficher menu")

### Refactoriser : transformer du code dupliqué en méthodes

Le processus de transformation de code dupliqué en méthodes s'appelle le
**refactoring**. Voici un exemple complet :

**Avant (code dupliqué) :**

```java
public class Main {
    public static void main(String[] args) {
        // Calcul 1
        int base1 = 5;
        int hauteur1 = 3;
        int aire1 = (base1 * hauteur1) / 2;
        System.out.println("Aire du triangle 1 : " + aire1);

        // Calcul 2 (même code !)
        int base2 = 8;
        int hauteur2 = 4;
        int aire2 = (base2 * hauteur2) / 2;
        System.out.println("Aire du triangle 2 : " + aire2);

        // Calcul 3 (encore le même code !)
        int base3 = 10;
        int hauteur3 = 6;
        int aire3 = (base3 * hauteur3) / 2;
        System.out.println("Aire du triangle 3 : " + aire3);
    }
}
```

**Après (avec méthode) :**

```java
public class Main {
    public static int calculerAireTriangle(int base, int hauteur) {
        return (base * hauteur) / 2;
    }

    public static void main(String[] args) {
        System.out.println("Aire du triangle 1 : " + calculerAireTriangle(5, 3));
        System.out.println("Aire du triangle 2 : " + calculerAireTriangle(8, 4));
        System.out.println("Aire du triangle 3 : " + calculerAireTriangle(10, 6));
    }
}
```

> [!IMPORTANT]
>
> La règle DRY (Don't Repeat Yourself) : "Ne vous répétez pas". Chaque fois que
> vous copiez-collez du code, demandez-vous si une méthode ne serait pas plus
> appropriée.

### Reconnaître quand créer une méthode

Créez une méthode quand :

1. **Vous copiez-collez du code** : Si vous dupliquez, créez une méthode
2. **Un bloc fait plusieurs choses** : Découpez en plusieurs méthodes
3. **Le code est difficile à comprendre** : Donnez-lui un nom avec une méthode
4. **Vous réutilisez une logique** : Même si elle est légèrement différente

**Exemple : découper un programme complexe**

```java
public class Main {
    // Au lieu d'un énorme main(), découpez en méthodes claires

    public static void afficherBienvenue() {
        System.out.println("=== Bienvenue dans le jeu ===");
    }

    public static String demanderNomJoueur() {
        System.out.print("Entrez votre nom : ");
        // Code pour lire l'entrée
        return "Joueur"; // Simplifié
    }

    public static void lancerPartie(String nomJoueur) {
        System.out.println("Début de la partie pour " + nomJoueur);
        // Logique du jeu
    }

    public static void afficherResultats() {
        System.out.println("=== Résultats finaux ===");
        // Affichage des scores
    }

    public static void main(String[] args) {
        // Le main est clair et facile à lire !
        afficherBienvenue();
        String nom = demanderNomJoueur();
        lancerPartie(nom);
        afficherResultats();
    }
}
```

> [!TIP]
>
> Un bon `main()` devrait lire comme un sommaire : il montre les grandes étapes
> du programme, et chaque méthode gère les détails.

## Bonnes pratiques et conseils

### Taille des méthodes

Une méthode devrait idéalement :

- **Tenir sur un écran** : Si vous devez scroller pour la voir entièrement, elle
  est probablement trop longue
- **Faire une seule chose** : Si vous utilisez "et" pour décrire ce qu'elle
  fait, découpez-la
- **Avoir un nom clair** : Le nom doit décrire exactement ce que fait la méthode

**Exemple de méthode trop longue :**

```java
// ❌ Fait trop de choses différentes
public static void traiterCommande() {
    // 1. Valider les données (15 lignes)
    // 2. Calculer le prix (20 lignes)
    // 3. Enregistrer dans la base (10 lignes)
    // 4. Envoyer l'email (15 lignes)
    // 5. Générer la facture (25 lignes)
    // Total : 85 lignes dans une méthode !
}
```

**Meilleure approche :**

```java
// ✅ Chaque méthode fait une chose claire
public static void traiterCommande() {
    validerDonnees();
    double prix = calculerPrix();
    enregistrerCommande();
    envoyerEmailConfirmation();
    genererFacture(prix);
}
```

### Nommer les méthodes

**Règles pour les noms de méthodes :**

1. **Utilisez des verbes** : Les méthodes font des actions

   ```java
   calculer(), afficher(), verifier(), convertir(), creer()
   ```

2. **Soyez spécifique** : Évitez les noms vagues

   ```java
   // ❌ Vague
   faire(), traiter(), gerer()

   // ✅ Spécifique
   calculerMoyenne(), afficherResultat(), verifierAge()
   ```

3. **Pour les booléens, utilisez des questions**

   ```java
   estPair(), contientErreurs(), aExpire(), peutVoter()
   ```

4. **Évitez les abréviations obscures**

   ```java
   // ❌ Difficile à comprendre
   calcMoy(), affRes(), verAge()

   // ✅ Clair
   calculerMoyenne(), afficherResultat(), verifierAge()
   ```

### Documentation des méthodes

Ajoutez des commentaires pour expliquer **pourquoi** (pas **comment**) :

```java
/**
 * Calcule le prix TTC en appliquant la TVA suisse (7.7%).
 *
 * @param prixHT le prix hors taxes en CHF
 * @return le prix TTC en CHF
 */
public static double calculerPrixTTC(double prixHT) {
    return prixHT * 1.077;
}
```

> [!TIP]
>
> Si vous devez écrire beaucoup de commentaires pour expliquer ce que fait une
> méthode, c'est peut-être que son nom n'est pas assez clair, ou qu'elle fait
> trop de choses.

### Éviter les effets de bord

Une méthode devrait soit :

- **Faire quelque chose** (effet de bord) : afficher, modifier une variable
  globale
- **Retourner quelque chose** (calcul pur) : calculer et retourner un résultat

**Mais pas les deux !** C'est plus clair.

```java
// ❌ Fait les deux : calcule ET affiche
public static double calculerEtAfficherMoyenne(int a, int b) {
    double moyenne = (a + b) / 2.0;
    System.out.println("Moyenne : " + moyenne); // Effet de bord
    return moyenne; // Retourne aussi
}

// ✅ Séparez les responsabilités
public static double calculerMoyenne(int a, int b) {
    return (a + b) / 2.0; // Juste le calcul
}

public static void afficherMoyenne(double moyenne) {
    System.out.println("Moyenne : " + moyenne); // Juste l'affichage
}

public static void main(String[] args) {
    double m = calculerMoyenne(10, 20);
    afficherMoyenne(m);
}
```

### Gérer les cas limites

Pensez aux cas spéciaux et gérez-les correctement :

```java
public static double calculerMoyenne(int[] nombres) {
    if (nombres == null || nombres.length == 0) {
        return 0; // Cas limite : tableau vide
    }

    int somme = 0;
    for (int nombre : nombres) {
        somme += nombre;
    }
    return (double) somme / nombres.length;
}
```

> [!WARNING]
>
> Toujours vérifier les cas limites : valeurs nulles, tableaux vides, divisions
> par zéro, nombres négatifs quand ils ne sont pas attendus, etc.

## Conclusion

Les méthodes sont **essentielles** en programmation. Elles permettent de :

1. **Découper** les problèmes complexes en petits morceaux gérables
2. **Réutiliser** le code sans le dupliquer
3. **Organiser** le programme de manière logique et claire
4. **Tester** chaque partie du programme indépendamment
5. **Maintenir** le code plus facilement

### Checklist pour vos méthodes

Avant de finaliser une méthode, demandez-vous :

- [ ] Le nom est-il clair et descriptif ?
- [ ] Fait-elle **une seule chose** ?
- [ ] Est-elle suffisamment courte (< 30 lignes idéalement) ?
- [ ] Les paramètres sont-ils bien nommés ?
- [ ] Le type de retour est-il correct ?
- [ ] Les cas limites sont-ils gérés ?
- [ ] Pourrais-je la réutiliser ailleurs ?

### Prochaines étapes

Maintenant que vous maîtrisez les méthodes de base, vous êtes prêts à :

- Explorer les **méthodes prédéfinies** de Java (Math, String, etc.)
- Combiner des méthodes pour résoudre des problèmes complexes
- Apprendre les **tableaux** pour manipuler des collections de données
- Découvrir la **programmation orientée objet** où les méthodes appartiennent à
  des objets

Les méthodes sont votre premier outil de **décomposition** de problèmes. Plus
vous les utiliserez, plus votre code sera professionnel et maintenable.

## Exercices

Nous vous invitons à réaliser les exercices de ce cours pour renforcer votre
compréhension des concepts vus en classe.

Vous trouverez les détails des exercices ici :
[Exercices](../03-exercices/README.md).

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
