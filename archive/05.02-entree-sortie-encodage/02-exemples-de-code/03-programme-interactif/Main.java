import java.util.Scanner;

/**
 * Exemple de programme interactif : convertisseur de températures.
 * 
 * Ce programme montre comment créer une interaction complète avec
 * l'utilisateur,
 * incluant un menu, des choix, et une boucle de répétition.
 */
public class Main {

    /**
     * Convertit des degrés Celsius en Fahrenheit.
     * 
     * @param celsius la température en Celsius
     * @return la température en Fahrenheit
     */
    public static double celsiusToFahrenheit(double celsius) {
        return (celsius * 9.0 / 5.0) + 32.0;
    }

    /**
     * Convertit des degrés Fahrenheit en Celsius.
     * 
     * @param fahrenheit la température en Fahrenheit
     * @return la température en Celsius
     */
    public static double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32.0) * 5.0 / 9.0;
    }

    /**
     * Affiche le menu principal.
     */
    public static void displayMenu() {
        System.out.println("\n╔═══════════════════════════════════╗");
        System.out.println("║  CONVERTISSEUR DE TEMPÉRATURES    ║");
        System.out.println("╚═══════════════════════════════════╝");
        System.out.println("1. Celsius → Fahrenheit");
        System.out.println("2. Fahrenheit → Celsius");
        System.out.println("3. Quitter");
        System.out.print("\nVotre choix : ");
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Programme interactif ===\n");

        Scanner scanner = new Scanner(System.in);
        boolean continueProgram = true;

        System.out.println("Bienvenue dans le convertisseur de températures !");

        // Boucle principale du programme
        while (continueProgram) {
            displayMenu();

            // Lecture du choix de l'utilisateur
            int choice = scanner.nextInt();

            // Traitement selon le choix
            switch (choice) {
                case 1:
                    // Conversion Celsius → Fahrenheit
                    System.out.print("\nEntrez la température en Celsius : ");
                    double celsius = scanner.nextDouble();
                    double fahrenheit = celsiusToFahrenheit(celsius);
                    System.out.println(celsius + "°C = " + fahrenheit + "°F");
                    break;

                case 2:
                    // Conversion Fahrenheit → Celsius
                    System.out.print("\nEntrez la température en Fahrenheit : ");
                    double fahrenheitInput = scanner.nextDouble();
                    double celsiusResult = fahrenheitToCelsius(fahrenheitInput);
                    System.out.println(fahrenheitInput + "°F = " + celsiusResult + "°C");
                    break;

                case 3:
                    // Quitter le programme
                    System.out.println("\nMerci d'avoir utilisé le convertisseur !");
                    System.out.println("À bientôt ! 👋");
                    continueProgram = false;
                    break;

                default:
                    // Choix invalide
                    System.out.println("\n❌ Choix invalide. Veuillez choisir 1, 2 ou 3.");
                    break;
            }
        }

        scanner.close();
        System.out.println("\n=== Fin de l'exemple ===");
    }
}
