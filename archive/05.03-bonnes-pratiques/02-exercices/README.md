# Exercices : Bonnes pratiques de programmation

Ce document contient les exercices pour le cours sur les bonnes pratiques de
programmation. Vous pratiquerez le nommage, le formatage, les commentaires et
l'identification de problèmes dans du code.

## Ressources

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.03-bonnes-pratiques/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/05.03-bonnes-pratiques/01-supports-de-cours/05.03-bonnes-pratiques-presentation.pdf)
- Exercices : [Lien vers le contenu](../02-exercices/README.md)

## Objectifs

- Corriger du code mal formaté
- Améliorer les noms de variables et méthodes
- Identifier les problèmes de qualité dans du code
- Écrire des commentaires pertinents

## Exercice 1 : Corriger le formatage

Le code suivant fonctionne, mais il est très mal formaté. Corrigez le formatage
pour le rendre lisible.

```java
import java.util.Scanner;
public class Main{public static void main(String[]args){Scanner sc=new Scanner(System.in);System.out.print("Entrez un nombre : ");int n=sc.nextInt();int r=n*n;System.out.println("Le carré de "+n+" est "+r);sc.close();}}
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Entrez un nombre : ");
        int number = scanner.nextInt();

        int result = number * number;

        System.out.println("Le carré de " + number + " est " + result);

        scanner.close();
    }
}
```

**Améliorations** :

- Indentation correcte
- Espaces autour des opérateurs
- Lignes vides pour séparer les sections logiques
- Noms de variables plus explicites (`scanner` au lieu de `sc`, `number` au lieu
  de `n`)

</details>

## Exercice 2 : Améliorer les noms

Le code suivant utilise des noms de variables peu clairs. Renommez toutes les
variables pour qu'elles soient plus explicites.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Entrez le prix : ");
        double p = sc.nextDouble();

        System.out.print("Entrez la quantité : ");
        int q = sc.nextInt();

        double t = p * q;
        double tx = t * 0.2;
        double f = t + tx;

        System.out.println("Total : " + f + " CHF");

        sc.close();
    }
}
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Entrez le prix : ");
        double unitPrice = scanner.nextDouble();

        System.out.print("Entrez la quantité : ");
        int quantity = scanner.nextInt();

        double subtotal = unitPrice * quantity;
        double tax = subtotal * 0.2;
        double totalPrice = subtotal + tax;

        System.out.println("Total : " + totalPrice + " CHF");

        scanner.close();
    }
}
```

**Améliorations** :

- `sc` → `scanner` : nom complet plus clair
- `p` → `unitPrice` : indique qu'il s'agit du prix unitaire
- `q` → `quantity` : nom explicite
- `t` → `subtotal` : indique le sous-total avant taxe
- `tx` → `tax` : nom explicite pour la taxe
- `f` → `totalPrice` : indique le prix final

</details>

## Exercice 3 : Identifier les problèmes

Le code suivant contient plusieurs problèmes de qualité. Identifiez-les tous (au
moins 6 problèmes), puis proposez une version corrigée.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        // declaration des variables
        int a;  // age
        String nom;
        double s;  // salaire

        System.out.print("Nom : ");
        nom=input.nextLine();
        System.out.print("Age : ");a=input.nextInt();
        System.out.print("Salaire : ");
        s=input.nextDouble();

        // calcul du bonus
        double b=s*0.1;  // bonus est 10%

        // affichage
        System.out.println(nom+" a "+a+" ans et gagne "+s+" CHF");
        System.out.println("Bonus : "+b);

        // int oldSalary = 5000;
        // System.out.println(oldSalary);

        input.close();
    }
}
```

<details>
<summary>Solution - Identification des problèmes</summary>

**Problèmes identifiés** :

1. **Noms de variables en français** : `nom`, `salaire` (devrait être en
   anglais)
2. **Noms de variables trop courts** : `a`, `s`, `b` (pas assez explicites)
3. **Commentaires inutiles** : "declaration des variables", "age", "salaire"
   (répètent ce que le code dit déjà)
4. **Code commenté** : `// int oldSalary = 5000;` (devrait être supprimé)
5. **Formatage incohérent** : manque d'espaces autour de `=`, lignes collées
6. **Commentaire évident** : "bonus est 10%" (le code le montre déjà)
7. **Manque de lignes vides** : les sections ne sont pas séparées
8. **Commentaires avant chaque section** : "affichage", "calcul du bonus" (peu
   utiles ici)

</details>

<details>
<summary>Solution - Code corrigé</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nom : ");
        String name = scanner.nextLine();

        System.out.print("Age : ");
        int age = scanner.nextInt();

        System.out.print("Salaire : ");
        double salary = scanner.nextDouble();

        // Le bonus est de 10% du salaire annuel
        final double BONUS_RATE = 0.1;
        double bonus = salary * BONUS_RATE;

        System.out.println(name + " a " + age + " ans et gagne " +
                          salary + " CHF");
        System.out.println("Bonus : " + bonus);

        scanner.close();
    }
}
```

**Améliorations** :

- Tous les noms en anglais et explicites
- Variables déclarées au moment de leur utilisation
- Commentaires uniquement pour expliquer le "pourquoi" (taux de bonus)
- Code commenté supprimé
- Formatage cohérent avec espaces appropriés
- Lignes vides pour séparer les sections logiques
- Utilisation d'une constante pour le taux de bonus

</details>

## Exercice 4 : Ajouter des commentaires pertinents

Le code suivant calcule l'IMC (Indice de Masse Corporelle) mais n'a aucun
commentaire. Ajoutez **uniquement** les commentaires pertinents (pas de
commentaires évidents !).

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Entrez votre poids (kg) : ");
        double weight = scanner.nextDouble();

        System.out.print("Entrez votre taille (m) : ");
        double height = scanner.nextDouble();

        double bmi = weight / (height * height);
        double roundedBmi = Math.round(bmi * 10.0) / 10.0;

        System.out.println("Votre IMC est : " + roundedBmi);

        if (roundedBmi < 18.5) {
            System.out.println("Insuffisance pondérale");
        } else if (roundedBmi < 25) {
            System.out.println("Poids normal");
        } else if (roundedBmi < 30) {
            System.out.println("Surpoids");
        } else {
            System.out.println("Obésité");
        }

        scanner.close();
    }
}
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Entrez votre poids (kg) : ");
        double weight = scanner.nextDouble();

        System.out.print("Entrez votre taille (m) : ");
        double height = scanner.nextDouble();

        // Formule de l'IMC : poids (kg) / taille² (m²)
        double bmi = weight / (height * height);

        // Arrondi à 1 décimale pour une meilleure lisibilité
        double roundedBmi = Math.round(bmi * 10.0) / 10.0;

        System.out.println("Votre IMC est : " + roundedBmi);

        // Classification selon l'OMS (Organisation Mondiale de la Santé)
        if (roundedBmi < 18.5) {
            System.out.println("Insuffisance pondérale");
        } else if (roundedBmi < 25) {
            System.out.println("Poids normal");
        } else if (roundedBmi < 30) {
            System.out.println("Surpoids");
        } else {
            System.out.println("Obésité");
        }

        scanner.close();
    }
}
```

**Commentaires ajoutés** :

- Explication de la formule de l'IMC
- Raison de l'arrondi
- Référence à la classification de l'OMS (ajoute du contexte important)

**Commentaires NON ajoutés** (car évidents) :

- "Lecture du poids" (le code le montre)
- "Affichage de l'IMC" (le code le montre)
- "Fermeture du scanner" (le code le montre)

</details>

## Exercice 5 : Refactoriser complètement

Le code suivant est un désastre ! Il contient tous les types de problèmes vus
dans le cours. Refactorisez-le complètement en appliquant toutes les bonnes
pratiques.

```java
import java.util.Scanner;
public class Main{
public static void main(String[]args){
Scanner s=new Scanner(System.in);
// programme de calcul
System.out.print("Nombre 1 : ");int x=s.nextInt();
System.out.print("Nombre 2 : ");int y=s.nextInt();
// calculs
int a=x+y;  // addition
int b=x-y;  // soustraction
int c=x*y;  // multiplication
// division
double d=(double)x/y;
// affichage des resultats
System.out.println("Addition : "+a);
System.out.println("Soustraction : "+b);
System.out.println("Multiplication : "+c);
System.out.println("Division : "+d);
// int z = 100;
s.close();}}
```

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nombre 1 : ");
        int firstNumber = scanner.nextInt();

        System.out.print("Nombre 2 : ");
        int secondNumber = scanner.nextInt();

        int sum = firstNumber + secondNumber;
        int difference = firstNumber - secondNumber;
        int product = firstNumber * secondNumber;
        double quotient = (double) firstNumber / secondNumber;

        System.out.println("Addition : " + sum);
        System.out.println("Soustraction : " + difference);
        System.out.println("Multiplication : " + product);
        System.out.println("Division : " + quotient);

        scanner.close();
    }
}
```

**Améliorations appliquées** :

1. **Formatage** :
   - Indentation correcte
   - Espaces autour des opérateurs
   - Lignes vides pour séparer les sections logiques
   - Accolades correctement placées

2. **Nommage** :
   - `s` → `scanner`
   - `x`, `y` → `firstNumber`, `secondNumber`
   - `a`, `b`, `c`, `d` → `sum`, `difference`, `product`, `quotient`

3. **Commentaires** :
   - Suppression de tous les commentaires évidents
   - Pas de commentaires nécessaires ici (le code est auto-explicatif)
   - Suppression du code commenté

4. **Structure** :
   - Variables déclarées au moment de leur utilisation
   - Sections logiques bien séparées

</details>

## Exercice 6 : Analyse de code en équipe

Voici le code d'un camarade de classe. En groupe de 2-3 personnes, identifiez
tous les problèmes et proposez des améliorations. Discutez de vos choix.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner INPUT = new Scanner(System.in);

        System.out.print("Prix article : ");
        double price_article = INPUT.nextDouble();
        System.out.print("Nombre d'articles : ");
        int NB = INPUT.nextInt();

        // on calcule le total
        double TOT = price_article * NB;

        // si plus de 5 articles on fait une remise
        if (NB > 5) {
            TOT = TOT * 0.9;  // -10%
        }

        System.out.println("Total à payer : " + TOT + " CHF");

        INPUT.close();
    }
}
```

<details>
<summary>Solution - Problèmes identifiés</summary>

**Problèmes de conventions de nommage** :

1. `INPUT` : constante alors que ce n'est pas une constante (devrait être
   `scanner`)
2. `price_article` : mélange de styles (snake_case + anglais/français)
3. `NB` : abréviation en majuscules (devrait être `quantity` ou `itemCount`)
4. `TOT` : abréviation en majuscules (devrait être `total`)

**Problèmes de cohérence** :

- Mélange de `camelCase` et `UPPER_CASE` pour les variables
- Mélange d'anglais et de français (`price_article`)

**Problèmes de commentaires** :

- "on calcule le total" : évident
- "si plus de 5 articles on fait une remise" : utile mais pourrait être amélioré

**Problèmes de formatage** :

- Manque d'espaces dans certaines lignes
- Pas de ligne vide pour séparer la logique de calcul

</details>

<details>
<summary>Solution - Code amélioré</summary>

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Prix article : ");
        double unitPrice = scanner.nextDouble();

        System.out.print("Nombre d'articles : ");
        int quantity = scanner.nextInt();

        double total = unitPrice * quantity;

        // Remise de 10% pour les commandes de plus de 5 articles
        final int MIN_QUANTITY_FOR_DISCOUNT = 5;
        final double DISCOUNT_RATE = 0.9;

        if (quantity > MIN_QUANTITY_FOR_DISCOUNT) {
            total = total * DISCOUNT_RATE;
        }

        System.out.println("Total à payer : " + total + " CHF");

        scanner.close();
    }
}
```

**Améliorations** :

- Noms cohérents en `camelCase`
- Noms explicites en anglais
- Constantes pour les valeurs magiques (5, 0.9)
- Commentaire amélioré avec contexte
- Formatage cohérent

</details>

## Exercice 7 : Choisir les bons noms

Pour chaque situation, proposez un nom de variable approprié en respectant les
conventions Java (camelCase pour les variables).

1. Une variable qui stocke l'âge d'une personne
2. Une variable qui indique si un utilisatrice est connecté
3. Une constante pour le nombre de jours dans une semaine
4. Une variable qui stocke le prix total d'un panier
5. Une variable qui compte le nombre de tentatives
6. Une variable qui indique si un fichier existe
7. Une constante pour la vitesse de la lumière
8. Une méthode qui calcule la moyenne de trois nombres

<details>
<summary>Solution</summary>

1. `age` ou `personAge`
2. `isLoggedIn` ou `isConnected`
3. `DAYS_PER_WEEK` (constante en UPPER_SNAKE)
4. `totalPrice` ou `cartTotal`
5. `attemptCount` ou `numberOfAttempts`
6. `fileExists` ou `doesFileExist`
7. `SPEED_OF_LIGHT` (constante en UPPER_SNAKE)
8. `calculateAverage()` ou `computeMean()`

**Rappel des conventions** :

- Variables : `camelCase`
- Constantes : `UPPER_SNAKE_CASE`
- Méthodes : `camelCase` (souvent avec un verbe)
- Booléens : préfixe `is`, `has`, `can`, `should`

</details>

## Exercice 8 : Corriger les commentaires

Le code suivant contient des commentaires de mauvaise qualité. Supprimez les
commentaires inutiles et améliorez ceux qui sont pertinents.

```java
public class Main {
    public static void main(String[] args) {
        // Constante pour PI
        final double PI = 3.14159;

        // Variable rayon
        double radius = 5.0;

        // Calcul de l'aire
        double area = PI * radius * radius;  // On multiplie PI par le rayon au carré

        // Calcul du périmètre
        double perimeter = 2 * PI * radius;  // Formule : 2 * PI * r

        // Affichage de l'aire
        System.out.println("Aire : " + area);

        // Affichage du périmètre
        System.out.println("Périmètre : " + perimeter);
    }
}
```

<details>
<summary>Solution</summary>

```java
public class Main {
    public static void main(String[] args) {
        final double PI = 3.14159;
        double radius = 5.0;

        // Formule : π × r²
        double area = PI * radius * radius;

        // Formule : 2 × π × r
        double perimeter = 2 * PI * radius;

        System.out.println("Aire : " + area);
        System.out.println("Périmètre : " + perimeter);
    }
}
```

**Commentaires supprimés** :

- "Constante pour PI" : évident
- "Variable rayon" : évident
- "On multiplie PI par le rayon au carré" : répète ce que le code fait
- "Affichage de l'aire" : évident
- "Affichage du périmètre" : évident

**Commentaires améliorés** :

- Formules mathématiques rendues plus concises et claires
- Utilisation de symboles mathématiques (×, π, r, ²) pour plus de clarté

**Alternative** : Ces commentaires pourraient même être supprimés si les noms de
variables sont suffisamment clairs !

</details>

## Exercice 9 : Projet de groupe - Revue de code

Travaillez en groupe de 3-4 personnes :

1. Chaque personne écrit un petit programme (20-30 lignes) qui :
   - Demande des informations à l'utilisatrice
   - Effectue des calculs
   - Affiche des résultats

2. Échangez vos codes entre vous

3. Chaque personne revoit le code d'un camarade et identifie :
   - Points positifs (ce qui est bien fait)
   - Points à améliorer (nommage, formatage, commentaires)
   - Suggestions concrètes

4. Discutez ensemble des retours et des améliorations possibles

**Critères d'évaluation** :

- ✅ Nommage cohérent et explicite
- ✅ Formatage correct (indentation, espaces)
- ✅ Commentaires pertinents (pas trop, pas trop peu)
- ✅ Code lisible et compréhensible

## Exercice 10 : Créer un guide de style

En groupe ou individuellement, créez un petit guide de style (1 page) pour vos
futurs projets.

Incluez :

1. Convention de nommage choisie (camelCase, snake_case, etc.)
2. Règles de formatage (indentation, espaces, longueur de ligne)
3. Règles pour les commentaires
4. Configuration VS Code ou EditorConfig à utiliser

**Exemple de structure** :

```markdown
# Guide de style - Projet XYZ

## Nommage

- Variables : camelCase
- Constantes : UPPER_SNAKE_CASE
- Classes : PascalCase

## Formatage

- Indentation : 4 espaces (pas de tabulations)
- Longueur de ligne : maximum 80 caractères
- Accolades : style Java (ouvrante sur la même ligne)

## Commentaires

- Expliquer le "pourquoi", pas le "quoi"
- Utiliser Javadoc pour les méthodes publiques
- Pas de code commenté dans le dépôt

## Configuration

- Utiliser `.vscode/settings.json` avec formatage automatique
- Extensions requises : Prettier, Code Spell Checker
```

<details>
<summary>Exemple complet</summary>

# Guide de style - Projet Calculatrice

## 1. Conventions de nommage

### Variables et méthodes : camelCase

```java
int totalPrice;
String userName;
void calculateTotal() { }
```

### Constantes : UPPER_SNAKE_CASE

```java
final double TAX_RATE = 0.2;
final int MAX_ATTEMPTS = 3;
```

### Classes : PascalCase

```java
class BankAccount { }
class UserProfile { }
```

### Packages : lowercase

```java
package com.company.project;
```

## 2. Formatage

### Indentation

- 4 espaces (pas de tabulations)
- Toujours indenter les blocs de code

### Espaces

- Autour des opérateurs : `a + b`, `x = 5`
- Après les virgules : `method(a, b, c)`
- Pas d'espaces inutiles en fin de ligne

### Accolades

```java
// Style Java (accolade ouvrante sur la même ligne)
if (condition) {
    // code
}
```

### Longueur de ligne

- Maximum 80 caractères
- Couper les lignes trop longues de manière logique

### Lignes vides

- Une ligne vide entre les sections logiques
- Une ligne vide entre les méthodes

## 3. Commentaires

### Quand commenter

- Expliquer le "pourquoi", pas le "quoi"
- Documenter les décisions non évidentes
- Ajouter du contexte utile

### Quand ne pas commenter

- Code évident
- Répétition de ce que le code dit
- Code commenté (à supprimer)

### Format

```java
// Commentaire court sur une ligne

/*
 * Commentaire plus long
 * sur plusieurs lignes
 */

/**
 * Documentation Javadoc pour les méthodes publiques
 * @param value la valeur à traiter
 * @return le résultat du calcul
 */
```

## 4. Configuration

### Fichier `.vscode/settings.json`

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true,
	"editor.rulers": [80],
	"files.encoding": "utf8",
	"files.eol": "\n"
}
```

### Extensions VS Code requises

- Prettier - Code formatter
- Code Spell Checker
- Code Spell Checker French

### Fichier `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true
```

## 5. Bonnes pratiques supplémentaires

- Toujours fermer les ressources (`Scanner`, fichiers, etc.)
- Utiliser des constantes pour les valeurs "magiques"
- Préférer des noms longs et clairs à des noms courts et obscurs
- Tester le code avant de le partager
- Garder les méthodes courtes (idéalement < 20 lignes)

---

**Rappel** : Ces règles sont des guides, pas des lois. L'important est la
cohérence dans tout le projet !

</details>

## Pour aller plus loin

Maintenant que vous maîtrisez les bases des bonnes pratiques, essayez de :

- Configurer VS Code pour tous vos projets
- Créer un fichier `.editorconfig` pour vos projets de groupe
- Faire des revues de code avec vos camarades
- Lire du code open source sur GitHub pour voir comment les professionnels
  écrivent du code
- Expérimenter avec des outils comme Checkstyle ou SpotBugs

**N'oubliez pas** : les bonnes pratiques s'apprennent par l'habitude. Plus vous
les appliquerez, plus elles deviendront naturelles !
