/**
 * Exemple de déclaration et utilisation des types primitifs en Java.
 * 
 * Les types primitifs sont les blocs de base pour stocker des données simples.
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Types primitifs ===\n");

        // Type int : nombres entiers (de -2 147 483 648 à 2 147 483 647)
        int age = 20;
        int numberOfStudents = 35;
        System.out.println("Âge : " + age + " ans");
        System.out.println("Nombre d'étudiants : " + numberOfStudents);
        System.out.println();

        // Type double : nombres décimaux (avec virgule)
        double price = 19.99;
        double temperature = -3.5;
        System.out.println("Prix : " + price + " CHF");
        System.out.println("Température : " + temperature + " °C");
        System.out.println();

        // Type boolean : vrai ou faux
        boolean isRaining = true;
        boolean hasFinished = false;
        System.out.println("Il pleut : " + isRaining);
        System.out.println("Travail terminé : " + hasFinished);
        System.out.println();

        // Type char : un seul caractère (entouré de guillemets simples)
        char firstLetter = 'A';
        char grade = 'B';
        System.out.println("Première lettre : " + firstLetter);
        System.out.println("Note : " + grade);
        System.out.println();

        // Type long : grands nombres entiers
        long distanceToMoon = 384400000L; // Le L indique un long
        System.out.println("Distance Terre-Lune : " + distanceToMoon + " mètres");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
