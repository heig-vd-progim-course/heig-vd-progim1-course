/**
 * Exemple de déclaration et initialisation de variables.
 * 
 * Une variable doit être déclarée avant d'être utilisée.
 * Elle peut être initialisée (recevoir une valeur) immédiatement ou plus tard.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Déclaration et initialisation ===\n");

        // Déclaration et initialisation en une seule ligne (recommandé)
        int numberOfCoffees = 2;
        System.out.println("J'ai bu " + numberOfCoffees + " cafés ce matin");

        // Déclaration seule (sans valeur)
        int numberOfTeas;
        // ... plus tard dans le code, on lui donne une valeur
        numberOfTeas = 1;
        System.out.println("J'ai bu " + numberOfTeas + " thé cet après-midi");
        System.out.println();

        // Les variables peuvent changer de valeur (elles sont "variables" !)
        int score = 0;
        System.out.println("Score initial : " + score);

        score = 10; // Le joueur gagne des points
        System.out.println("Score après le premier niveau : " + score);

        score = score + 5; // On ajoute 5 points au score actuel
        System.out.println("Score après le bonus : " + score);
        System.out.println();

        // Nommage des variables : utilisez des noms descriptifs
        double accountBalance = 1500.50; // Bon : on comprend ce que c'est
        System.out.println("Solde du compte : " + accountBalance + " CHF");
        System.out.println();

        // On peut déclarer plusieurs variables du même type en une ligne
        int apples = 5, oranges = 3, bananas = 2;
        System.out.println("Fruits disponibles :");
        System.out.println("- Pommes : " + apples);
        System.out.println("- Oranges : " + oranges);
        System.out.println("- Bananes : " + bananas);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
