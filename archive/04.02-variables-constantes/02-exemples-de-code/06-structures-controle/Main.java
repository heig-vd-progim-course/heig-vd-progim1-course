/**
 * Exemple des trois structures algorithmiques fondamentales en Java.
 * 
 * 1. Séquence : exécution d'instructions les unes après les autres
 * 2. Sélection : choix entre différentes actions (if/else)
 * 3. Itération : répétition d'actions (boucles while et for)
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Structures de contrôle ===\n");

        // ========================================
        // 1. SÉQUENCE : instructions dans l'ordre
        // ========================================
        System.out.println("=== 1. Séquence ===");
        String playerName = "Ariel";
        int initialHealth = 100;
        int damage = 25;
        int finalHealth = initialHealth - damage;

        System.out.println("Joueur : " + playerName);
        System.out.println("Vie initiale : " + initialHealth);
        System.out.println("Dégâts reçus : " + damage);
        System.out.println("Vie restante : " + finalHealth);
        System.out.println();

        // ========================================
        // 2. SÉLECTION : choix avec if/else
        // ========================================
        System.out.println("=== 2. Sélection ===");
        int score = 85;

        // Simple if
        if (score >= 90) {
            System.out.println("Excellent ! Note : A");
        } else if (score >= 70) {
            System.out.println("Très bien ! Note : B");
        } else if (score >= 50) {
            System.out.println("Passable. Note : C");
        } else {
            System.out.println("Insuffisant. Note : D");
        }
        System.out.println();

        // Sélection avec opérateurs logiques
        int age = 16;
        boolean hasLicense = false;

        System.out.println("Âge : " + age + ", Permis : " + hasLicense);
        if (age >= 18 && hasLicense) {
            System.out.println("→ Peut conduire");
        } else if (age < 18) {
            System.out.println("→ Trop jeune pour conduire");
        } else {
            System.out.println("→ Doit obtenir le permis d'abord");
        }
        System.out.println();

        // ========================================
        // 3. ITÉRATION : répétition avec boucles
        // ========================================

        // Boucle while : tant que la condition est vraie
        System.out.println("=== 3a. Itération avec while ===");
        int countdown = 5;
        System.out.print("Compte à rebours : ");
        while (countdown > 0) {
            System.out.print(countdown + " ");
            countdown--;
        }
        System.out.println("Décollage ! 🚀");
        System.out.println();

        // Boucle for : répétition un nombre fixe de fois
        System.out.println("=== 3b. Itération avec for ===");
        System.out.println("Table de multiplication par 3 :");
        for (int i = 1; i <= 5; i++) {
            int result = 3 * i;
            System.out.println("3 × " + i + " = " + result);
        }
        System.out.println();

        // ========================================
        // EXEMPLE COMBINÉ : système de points
        // ========================================
        System.out.println("=== Exemple combiné : Système de récompenses ===");
        int points = 0;
        final int POINTS_PER_TASK = 10;
        final int REQUIRED_POINTS = 30;

        // On accomplit 4 tâches (itération avec for)
        for (int task = 1; task <= 4; task++) {
            points = points + POINTS_PER_TASK; // Séquence
            System.out.println("Tâche " + task + " accomplie. Points : " + points);

            // Vérification après chaque tâche (sélection)
            if (points >= REQUIRED_POINTS) {
                System.out.println("🎉 Récompense débloquée !");
                break; // On sort de la boucle
            }
        }

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
