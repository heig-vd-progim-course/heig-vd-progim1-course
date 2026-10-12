/**
 * Exemple illustrant l'utilisation des arguments de ligne de commande.
 * 
 * La méthode main reçoit un tableau String[] args qui contient tous les
 * arguments passés au programme lors de son exécution.
 * 
 * Exemple d'exécution :
 * java CommandLineArguments Ariel 25 Lausanne
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class CommandLineArguments {

    /**
     * Affiche une ligne de séparation.
     */
    public static void displaySeparator() {
        System.out.println("─────────────────────────────────────────");
    }

    /**
     * Affiche tous les arguments reçus.
     */
    public static void displayAllArguments(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   ARGUMENTS REÇUS                      ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("Nombre d'arguments : " + args.length);
        System.out.println();

        if (args.length == 0) {
            System.out.println("Aucun argument passé au programme.");
            System.out.println();
            System.out.println("Essayez : java CommandLineArguments Ariel Nox Amaru");
        } else {
            for (int i = 0; i < args.length; i++) {
                System.out.println("Argument " + i + " : " + args[i]);
            }
        }
    }

    /**
     * Exemple d'utilisation pratique : saluer une personne.
     */
    public static void greetPerson(String[] args) {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   EXEMPLE : SALUTATION                 ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        if (args.length > 0) {
            String name = args[0];
            System.out.println("Bonjour, " + name + " !");

            if (args.length > 1) {
                String age = args[1];
                System.out.println("Vous avez " + age + " ans.");
            }

            if (args.length > 2) {
                String city = args[2];
                System.out.println("Vous habitez à " + city + ".");
            }
        } else {
            System.out.println("Bonjour, inconnu !");
            System.out.println();
            System.out.println("Pour me dire votre nom, exécutez :");
            System.out.println("  java CommandLineArguments VotreNom");
            System.out.println();
            System.out.println("Pour donner plus d'informations :");
            System.out.println("  java CommandLineArguments VotreNom VotreAge VotreVille");
        }
    }

    /**
     * Exemple d'utilisation pratique : calculatrice simple.
     */
    public static void simpleCalculator(String[] args) {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   EXEMPLE : CALCULATRICE               ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        if (args.length >= 3) {
            try {
                // On essaie de convertir les arguments en nombres
                double num1 = Double.parseDouble(args[0]);
                String operator = args[1];
                double num2 = Double.parseDouble(args[2]);

                System.out.println("Calcul demandé : " + num1 + " " + operator + " " + num2);

                double result = 0;
                boolean validOperation = true;

                // On effectue l'opération selon l'opérateur
                switch (operator) {
                    case "+":
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "*":
                        result = num1 * num2;
                        break;
                    case "/":
                        if (num2 != 0) {
                            result = num1 / num2;
                        } else {
                            System.out.println("Erreur : Division par zéro !");
                            validOperation = false;
                        }
                        break;
                    default:
                        System.out.println("Opérateur non reconnu : " + operator);
                        System.out.println("Utilisez +, -, * ou /");
                        validOperation = false;
                }

                if (validOperation) {
                    System.out.println("Résultat : " + result);
                }
            } catch (NumberFormatException e) {
                System.out.println("Erreur : Les arguments doivent être des nombres !");
                System.out.println();
                System.out.println("Exemple d'utilisation :");
                System.out.println("  java CommandLineArguments 10 + 5");
            }
        } else {
            System.out.println("Calculatrice simple en ligne de commande");
            System.out.println();
            System.out.println("Usage : java CommandLineArguments nombre opérateur nombre");
            System.out.println();
            System.out.println("Exemples :");
            System.out.println("  java CommandLineArguments 10 + 5");
            System.out.println("  java CommandLineArguments 20 - 7");
            System.out.println("  java CommandLineArguments 6 * 8");
            System.out.println("  java CommandLineArguments 15 / 3");
        }
    }

    /**
     * Affiche des conseils sur l'utilisation des arguments.
     */
    public static void displayTips() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   CONSEILS PRATIQUES                   ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("1. Les arguments sont séparés par des espaces");
        System.out.println("2. args[0] est le premier argument, args[1] le deuxième, etc.");
        System.out.println("3. args.length donne le nombre d'arguments");
        System.out.println("4. Toujours vérifier args.length avant d'accéder à args[i]");
        System.out.println("5. Les arguments sont toujours des String (conversion nécessaire)");
        System.out.println();
        System.out.println("Pour passer un argument avec des espaces, utilisez des guillemets :");
        System.out.println("  java CommandLineArguments \"Ariel Sacha\"");
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Arguments en ligne de commande ===\n");

        displayAllArguments(args);
        greetPerson(args);
        simpleCalculator(args);
        displayTips();

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
