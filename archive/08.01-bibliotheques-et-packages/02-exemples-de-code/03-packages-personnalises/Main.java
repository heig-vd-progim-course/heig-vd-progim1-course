
// Import des fonctions utilitaires depuis nos packages personnalisés
import utils.Formatter;
import utils.Calculator;

/**
 * Exemple d'utilisation de packages personnalisés dans le contexte
 * d'une bibliothèque d'outils communautaire.
 * 
 * Une bibliothèque d'outils permet aux membres d'une communauté d'emprunter
 * des outils plutôt que de les acheter individuellement, favorisant ainsi
 * le partage des ressources et réduisant la consommation.
 * 
 * Cet exemple montre comment :
 * - Organiser les fonctions en packages (utils)
 * - Importer des fonctions depuis différents packages
 * - Utiliser des fonctions statiques pour les calculs et le formatage
 * 
 * IMPORTANT : Aucune utilisation du mot-clé "new" !
 * Toutes les fonctions sont appelées directement via NomClasse.nomFonction()
 */
public class Main {

    public static void main(String[] args) {
        System.out.println(Formatter.formatTitle("Bibliothèque d'outils communautaire"));
        System.out.println();

        // Données : durées d'emprunt enregistrées (en jours)
        // Ces données représentent les emprunts effectués ce mois
        double[] loanDurations = {7.0, 14.0, 3.5, 21.0, 10.0, 7.0, 14.0, 5.0};

        System.out.println("=== Analyse des emprunts du mois ===\n");
        System.out.println("Nombre d'emprunts enregistrés : " + loanDurations.length);

        // Affichage des durées individuelles
        System.out.println("\nDurées d'emprunt (en jours) :");
        for (int i = 0; i < loanDurations.length; i++) {
            System.out.println("  Emprunt " + (i + 1) + " : " + loanDurations[i] + " jours");
        }

        // Calculs statistiques utilisant les fonctions du package utils
        System.out.println("\n" + Formatter.createSeparator(50));
        System.out.println("\n=== Statistiques ===\n");

        double avgDuration = Calculator.average(loanDurations);
        double minDuration = Calculator.min(loanDurations);
        double maxDuration = Calculator.max(loanDurations);

        System.out.println("Durée moyenne d'emprunt : " + 
                String.format("%.2f", avgDuration) + " jours");
        System.out.println("Durée minimale : " + 
                String.format("%.2f", minDuration) + " jours");
        System.out.println("Durée maximale : " + 
                String.format("%.2f", maxDuration) + " jours");

        // Analyse des taux d'utilisation (pourcentages)
        double[] utilizationRates = {60.0, 80.0, 100.0, 45.0, 70.0};

        System.out.println("\n" + Formatter.createSeparator(50));
        System.out.println("\n=== Taux d'utilisation par catégorie ===\n");

        String[] categories = {
            "Électroportatif",
            "Jardin",
            "Accès",
            "Menuiserie",
            "Plomberie"
        };

        for (int i = 0; i < categories.length; i++) {
            System.out.println("  " + categories[i] + " : " + 
                    String.format("%.1f", utilizationRates[i]) + "%");
        }

        double avgUtilization = Calculator.average(utilizationRates);
        System.out.println("\nTaux d'utilisation moyen : " + 
                String.format("%.1f", avgUtilization) + "%");

        // Calcul de pourcentage
        double totalTools = 50.0;
        double borrowedTools = 35.0;
        double percentageBorrowed = Calculator.percentage(borrowedTools, totalTools);

        System.out.println("\n" + Formatter.createSeparator(50));
        System.out.println("\n=== État actuel ===\n");
        System.out.println("Outils totaux : " + (int)totalTools);
        System.out.println("Outils empruntés : " + (int)borrowedTools);
        System.out.println("Pourcentage emprunté : " + 
                String.format("%.1f", percentageBorrowed) + "%");

        // Message de conclusion
        System.out.println("\n" + Formatter.createSeparator(50));
        System.out.println("\nLes bibliothèques d'outils favorisent le partage des ressources");
        System.out.println("et réduisent le besoin d'acheter des outils peu utilisés.");
        System.out.println("\n=== Fin de l'exemple ===");
    }
}
