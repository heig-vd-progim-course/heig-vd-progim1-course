/**
 * Exemple de portée des variables en Java.
 * 
 * La portée (scope) d'une variable détermine où elle peut être utilisée dans le
 * code.
 * Une variable locale n'existe que dans la fonction où elle est déclarée.
 */
public class Main {

    /**
     * Calcule et affiche le prix total avec la TVA.
     * 
     * @param price le prix hors TVA
     */
    public static void calculateTotalPrice(double price) {
        // 'vatRate' est une variable locale à cette fonction
        double vatRate = 0.077;

        // 'total' est aussi une variable locale
        double total = price + (price * vatRate);

        System.out.println("Prix HT : " + price + " CHF");
        System.out.println("Prix TTC : " + total + " CHF");

        // On peut utiliser 'vatRate' et 'total' ici car on est dans la fonction
    }

    /**
     * Affiche des informations sur un livre.
     * 
     * @param title le titre du livre
     * @param pages le nombre de pages
     */
    public static void displayBookInfo(String title, int pages) {
        // 'title' et 'pages' sont des paramètres (variables locales)

        // 'category' est une variable locale
        String category;
        if (pages < 200) {
            category = "Court";
        } else if (pages < 400) {
            category = "Moyen";
        } else {
            category = "Long";
        }

        System.out.println("Livre : " + title);
        System.out.println("Pages : " + pages);
        System.out.println("Catégorie : " + category);

        // ❌ On ne peut PAS utiliser 'vatRate' ici (elle n'existe que dans
        // calculateTotalPrice)
        // ❌ On ne peut PAS utiliser 'userName' ici (elle n'existe que dans main)
    }

    /**
     * Calcule le temps de lecture estimé d'un livre.
     * 
     * @param pages le nombre de pages du livre
     * @return le temps de lecture en heures
     */
    public static double calculateReadingTime(int pages) {
        // 'pagesPerHour' est une variable locale à cette fonction
        int pagesPerHour = 50;

        double hours = (double) pages / pagesPerHour;
        return hours;

        // Après le return, on sort de la fonction
        // Les variables locales 'pagesPerHour' et 'hours' sont détruites
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Portée des variables ===\n");

        // 'userName' est une variable locale à la fonction main
        String userName = "Ariel";
        System.out.println("Utilisateur : " + userName);
        System.out.println();

        // On appelle une fonction
        System.out.println("=== Calcul du prix ===");
        calculateTotalPrice(100.0);
        System.out.println();

        // ❌ On ne peut PAS utiliser 'vatRate' ici (elle n'existe que dans
        // calculateTotalPrice)
        // ❌ On ne peut PAS utiliser 'total' ici (elle n'existe que dans
        // calculateTotalPrice)

        // Autre exemple avec un livre
        System.out.println("=== Information sur le livre ===");
        String bookTitle = "Java pour débutants";
        int bookPages = 350;

        displayBookInfo(bookTitle, bookPages);
        System.out.println();

        // On peut utiliser 'bookTitle' et 'bookPages' ici car elles sont dans main
        double readingTime = calculateReadingTime(bookPages);
        System.out.println("Temps de lecture estimé : " + readingTime + " heures");
        System.out.println();

        // ❌ On ne peut PAS utiliser 'category' ici (elle n'existe que dans
        // displayBookInfo)
        // ❌ On ne peut PAS utiliser 'pagesPerHour' ici (elle n'existe que dans
        // calculateReadingTime)

        // Résumé
        System.out.println("=== Résumé de la portée ===");
        System.out.println("✓ Chaque fonction a ses propres variables locales");
        System.out.println("✓ Les paramètres sont des variables locales");
        System.out.println("✓ Une variable n'existe que dans sa fonction");
        System.out.println("✓ Pour partager des données entre fonctions, on utilise :");
        System.out.println("  - Les paramètres (passage de valeurs)");
        System.out.println("  - Les valeurs de retour");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
