import java.util.Scanner;

/**
 * Exemple de lecture de données avec Scanner en Java.
 * 
 * Scanner permet de lire des données saisies par l'utilisateur dans la console.
 * Il faut l'importer avec : import java.util.Scanner;
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Lecture avec Scanner ===\n");

        // Création d'un Scanner lié à l'entrée standard (clavier)
        Scanner scanner = new Scanner(System.in);

        // ========================================
        // Lecture d'une chaîne de caractères
        // ========================================
        System.out.print("Entrez votre prénom : ");
        String firstName = scanner.nextLine();
        System.out.println("Bonjour " + firstName + " !");
        System.out.println();

        // ========================================
        // Lecture d'un nombre entier
        // ========================================
        System.out.print("Entrez votre âge : ");
        int age = scanner.nextInt();

        int yearOfBirth = 2024 - age;
        System.out.println("Vous êtes né(e) environ en " + yearOfBirth);
        System.out.println();

        // ========================================
        // Lecture d'un nombre décimal
        // ========================================
        System.out.print("Entrez votre taille (en mètres, ex: 1.75) : ");
        double height = scanner.nextDouble();
        System.out.println("Votre taille est " + height + " m");
        System.out.println();

        // ATTENTION : après nextInt() ou nextDouble(), il reste un '\n'
        // Il faut consommer ce retour à la ligne avec nextLine()
        scanner.nextLine(); // Consomme le '\n' restant

        // ========================================
        // Lecture d'une phrase complète
        // ========================================
        System.out.print("Quelle est votre ville préférée ? ");
        String city = scanner.nextLine();
        System.out.println("Vous aimez " + city + " !");
        System.out.println();

        // ========================================
        // Calcul avec les données saisies
        // ========================================
        System.out.println("=== Calculatrice simple ===");
        System.out.print("Entrez le premier nombre : ");
        double number1 = scanner.nextDouble();

        System.out.print("Entrez le deuxième nombre : ");
        double number2 = scanner.nextDouble();

        double sum = number1 + number2;
        double product = number1 * number2;

        System.out.println();
        System.out.println(number1 + " + " + number2 + " = " + sum);
        System.out.println(number1 + " × " + number2 + " = " + product);

        // ========================================
        // Fermeture du Scanner (bonne pratique)
        // ========================================
        scanner.close();

        System.out.println("\n=== Fin de l'exemple ===");
        System.out.println("⚠️ Note : Le Scanner a été fermé avec close()");
    }
}
