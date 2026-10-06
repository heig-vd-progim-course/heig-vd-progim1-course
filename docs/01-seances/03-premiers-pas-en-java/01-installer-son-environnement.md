# Atelier - Installer son environnement

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Objectif de l'atelier

Repartir avec IntelliJ IDEA installé et un programme Java qui s'exécute sur
votre machine.

Rien d'autre. Si vous avez fait cela, l'atelier est réussi.

## Avant de commencer

Vérifiez que votre machine tient la configuration minimale annoncée par
JetBrains :

| Élément     | Minimum                                 |
| :---------- | :-------------------------------------- |
| Processeur  | x86-64 ou arm64, 4 cœurs                |
| Mémoire     | 8 Go, dont 3 Go disponibles pour l'IDE  |
| Disque      | 10 Go libres                            |
| Écran       | 1280 x 720                              |

Si votre machine est en dessous, venez me voir : il existe des solutions de
repli, mais elles demandent d'être mises en place avant la séance 04.

## Étape 1 - Installer IntelliJ IDEA

!!! note "IntelliJ IDEA Community Edition n'existe plus"

    Depuis la version 2025.3, JetBrains ne distribue plus qu'un seul
    installateur. Les fonctionnalités de l'ancienne Community Edition sont
    gratuites dans cette version unifiée ; d'autres, qui ne nous serviront pas
    cette année, demandent une licence.

    Si vous trouvez un tutoriel qui vous demande de télécharger _"IntelliJ IDEA
    Community Edition"_, il date d'avant ce changement. Ce n'est pas grave,
    mais l'écran ne ressemblera pas à sa capture.

    Références : [plan de la distribution unifiée](https://blog.jetbrains.com/idea/2025/07/intellij-idea-unified-distribution-plan/)
    et [sa FAQ](https://lp.jetbrains.com/intellij-idea-unified-faq/).

Deux manières d'installer, au choix.

=== "Installation directe"

    La plus simple pour cette année.

    1. Aller sur [jetbrains.com/idea/download](https://www.jetbrains.com/idea/download/).
    2. Choisir son système, puis télécharger.
        - **macOS** : attention à l'architecture. Apple Silicon (puces M1 à
          M4) et Intel ont deux fichiers `.dmg` différents. Pour savoir
          laquelle vous avez : menu Pomme, _"À propos de ce Mac"_.
        - **Windows** : prendre l'installateur `.exe`.
    3. Lancer le fichier téléchargé et suivre l'installation.
        - **macOS** : glisser IntelliJ IDEA dans le dossier Applications.
        - **Windows** : laisser les options par défaut. Cocher
          _"Add bin folder to the PATH"_ si la case est proposée.

=== "Toolbox App"

    Recommandée par JetBrains si vous comptez utiliser plusieurs de leurs
    outils, ou garder plusieurs versions en parallèle.

    1. Installer la [Toolbox App](https://www.jetbrains.com/toolbox-app/).
    2. Ouvrir Toolbox, chercher IntelliJ IDEA, cliquer sur _"Install"_.
    3. Les mises à jour se feront ensuite depuis Toolbox.

    Un peu plus lourd à installer, plus confortable sur la durée.

La documentation officielle complète est le
[guide d'installation JetBrains](https://www.jetbrains.com/help/idea/installation-guide.html).

## Étape 2 - Obtenir un JDK

Pour écrire du Java, il faut un **JDK** (Java Development Kit). Nous y
reviendrons dans la
[théorie](02-machine-virtuelle-et-compilation.md) ; pour l'instant, retenez
que c'est la boîte à outils qui contient de quoi compiler et de quoi exécuter.

**Vous n'avez rien à télécharger séparément.** IntelliJ sait le faire pour
vous :

1. Au premier lancement, choisir _"New Project"_.
2. Dans le champ **JDK**, dérouler la liste et choisir _"Download JDK..."_.
3. Choisir :
    - **Version** : 25, qui est la version à support long terme actuelle ;
    - **Vendor** : _"Eclipse Temurin"_, une distribution libre et sans
      restriction d'usage.
4. Cliquer sur _"Download"_ et attendre.

Documentation officielle :
[gérer les JDK dans IntelliJ](https://www.jetbrains.com/help/idea/sdk.html).

??? note "Si vous préférez installer le JDK vous-même"

    Ce n'est pas nécessaire, mais c'est formateur et cela vous servira quand
    vous travaillerez hors d'un IDE.

    1. Aller sur [adoptium.net](https://adoptium.net/temurin/releases/).
    2. Choisir votre système, votre architecture, le type **JDK** et la
       version **25 - LTS**.
    3. Installer le paquet téléchargé.
    4. Vérifier dans un terminal :

        ```sh
        java -version
        javac -version
        ```

    Les deux commandes doivent répondre avec un numéro de version. Si l'une
    des deux répond _"commande introuvable"_, l'installation n'est pas
    terminée ou le `PATH` n'a pas été mis à jour. Venez me voir plutôt que de
    chercher seul : c'est le genre de problème qui prend deux minutes à deux
    et quarante minutes tout seul.

## Étape 3 - Créer et lancer son premier projet

1. _"New Project"_.
2. **Name** : `hello-world`. **Language** : Java. **Build system** :
   _"IntelliJ"_.
    - Pas Maven, pas Gradle. Nous n'en avons pas besoin cette année.
3. Laisser _"Add sample code"_ coché.
4. _"Create"_.
5. Ouvrir `src/Main.java`, cliquer sur la flèche verte à gauche de la méthode
   `main`.

En bas de la fenêtre, une zone s'ouvre et affiche le résultat. Si vous y voyez
du texte, vous avez compilé et exécuté un programme Java.

### Vérification

Remplacez le contenu du fichier par ceci, puis relancez :

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour tout le monde");
    }
}
```

Sortie attendue :

```text
Bonjour tout le monde
```

Appelez-moi quand c'est fait. Je passe valider.

## Étape 4 - Activer le tutoriel intégré

IntelliJ contient deux choses différentes, et les deux sont utiles.

### Apprendre l'IDE : _"Learn IDE features"_

Un parcours interactif qui apprend à se servir de l'éditeur lui-même :
naviguer, chercher, renommer, déboguer.

Accès : écran d'accueil, onglet **Learn**, puis _"Learn IDE features"_. Dans
une fenêtre déjà ouverte : menu **Help**, puis _"Learn IDE Features"_.

Documentation :
[Learn IDE features](https://www.jetbrains.com/help/idea/feature-trainer.html).

Ce parcours n'enseigne pas Java. Il enseigne l'outil, ce qui est un gain de
temps considérable et que presque personne ne prend le temps de faire.

### Apprendre Java : les cours JetBrains Academy

Des cours interactifs, avec exercices corrigés automatiquement dans l'IDE.

Accès : écran d'accueil, onglet **Learn**, puis parcourir les cours
disponibles et choisir un cours d'introduction à Java. Selon votre version,
l'activation du plugin JetBrains Academy vous sera proposée à ce moment-là.

Documentation :
[outils éducatifs d'IntelliJ IDEA](https://www.jetbrains.com/help/idea/product-educational-tools.html).

!!! tip "Ce que j'attends de vous avec ces cours"

    Ils sont **facultatifs** et ils ne remplacent pas le cours. Ils sont une
    bonne manière de pratiquer entre deux séances, en particulier si vous avez
    l'impression de suivre en classe sans savoir refaire seul.

    Le catalogue de cours évolue régulièrement du côté de JetBrains : prenez
    celui qui porte sur les bases de Java, quel que soit son titre exact.

## Checklist de sortie

Vous ne quittez pas la salle avant d'avoir coché les cinq lignes.

- [ ] IntelliJ IDEA se lance.
- [ ] Un JDK est configuré dans le projet, sans message d'erreur en haut de la
      fenêtre.
- [ ] Le projet `hello-world` existe.
- [ ] `Bonjour tout le monde` s'affiche dans la zone d'exécution.
- [ ] Vous savez relancer le programme sans aide.

## Problèmes fréquents

| Symptôme                                               | Cause probable et solution                                      |
| :------------------------------------------------------ | :-------------------------------------------------------------- |
| Bandeau rouge _"Project SDK is not defined"_            | Aucun JDK choisi. **File > Project Structure > Project > SDK**, puis _"Download JDK"_ |
| La flèche verte n'apparaît pas                          | Le fichier n'est pas dans un dossier source, ou la classe n'a pas de méthode `main` |
| _"java: cannot find symbol"_                            | Faute de frappe sur un nom. Java distingue les majuscules des minuscules |
| L'installation échoue sur macOS                         | Mauvaise architecture téléchargée. Vérifier Intel ou Apple Silicon |
| Le téléchargement du JDK n'aboutit pas                  | Réseau de l'école. Passer par le partage de connexion ou par [adoptium.net](https://adoptium.net/temurin/releases/) |
| Accents cassés à l'affichage                            | Problème d'encodage. On le traitera ; ce n'est pas votre faute   |

## Notes pour l'équipe enseignante

### Avant la séance

- Tester l'installation complète sur une machine Windows et une machine macOS
  depuis le réseau de l'école, y compris le téléchargement du JDK depuis
  IntelliJ. C'est l'étape qui tombe le plus souvent sur un pare-feu.
- Prévoir une clé USB avec les installateurs IntelliJ pour Windows, macOS
  Intel et macOS Apple Silicon, plus les JDK Temurin correspondants. Vingt
  téléchargements simultanés saturent la salle.
- Vérifier que les personnes ont les droits d'administration sur leur machine.
  C'est la cause de blocage la plus bête et la plus fréquente.

### Pendant l'atelier

- Afficher la checklist de sortie au tableau dès le début.
- Faire lever la main aux personnes qui ont terminé et les envoyer aider les
  autres. C'est la seule manière de tenir cinquante minutes avec vingt
  machines différentes.
- Tenir une liste des personnes non validées en fin de séance et les
  recontacter dans la semaine. Ne pas attendre la séance 04 pour le découvrir.

### Mention de la licence étudiante

JetBrains propose une licence gratuite à usage éducatif donnant accès aux
fonctionnalités payantes. Elle n'est **pas nécessaire** pour ce cours, et je ne
la présente pas en séance pour ne pas ajouter une étape de création de compte à
un atelier déjà chargé. Elle est mentionnée ici pour celles et ceux qui la
demandent :
[programmes éducatifs JetBrains](https://www.jetbrains.com/community/education/).

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
