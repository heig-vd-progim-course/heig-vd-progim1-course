/**
 * Exemple de fonction simple en Java.
 * 
 * Une fonction (ou méthode) est un bloc de code réutilisable qui effectue une
 * tâche spécifique.
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {

    /**
     * Fonction qui affiche un message de bienvenue.
     * 
     * Le mot-clé 'void' signifie que la fonction ne retourne aucune valeur.
     * Le mot-clé 'static' permet d'appeler la fonction sans créer d'objet.
     */
    public static void displayWelcomeMessage() {
        System.out.println("╔════════════════════════════╗");
        System.out.println("║   Bienvenue dans notre     ║");
        System.out.println("║   programme Java !         ║");
        System.out.println("╚════════════════════════════╝");
    }

    /**
     * Fonction qui affiche une ligne de séparation.
     */
    public static void displaySeparator() {
        System.out.println("─────────────────────────────");
    }

    /**
     * Fonction qui affiche un message de remerciement.
     */
    public static void displayGoodbyeMessage() {
        System.out.println("\nMerci d'avoir utilisé notre programme !");
        System.out.println("À bientôt ! 👋");
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Fonction simple ===\n");

        // On appelle les fonctions dans l'ordre souhaité
        displayWelcomeMessage();
        displaySeparator();

        System.out.println("\nContenu du programme...");
        System.out.println("Vous pouvez maintenant utiliser les fonctions !");

        displaySeparator();
        displayGoodbyeMessage();

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
