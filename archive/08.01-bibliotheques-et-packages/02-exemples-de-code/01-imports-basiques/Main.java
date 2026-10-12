import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

/**
 * Exemple d'utilisation des imports basiques en Java.
 * 
 * Cet exemple montre comment importer et utiliser des classes de la
 * bibliothèque standard java.util.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Imports basiques ===\n");

        // Utilisation d'ArrayList (import de java.util.ArrayList)
        ArrayList<String> cities = new ArrayList<>();
        cities.add("Yverdon-les-Bains");
        cities.add("Lausanne");
        cities.add("Genève");
        cities.add("Berne");

        System.out.println("Liste des villes :");
        for (String city : cities) {
            System.out.println("- " + city);
        }

        // Utilisation d'Arrays (import de java.util.Arrays)
        int[] numbers = { 5, 2, 8, 1, 9, 3 };
        System.out.println("\nTableau avant tri : " + Arrays.toString(numbers));

        Arrays.sort(numbers);
        System.out.println("Tableau après tri : " + Arrays.toString(numbers));

        // Utilisation de Scanner (import de java.util.Scanner)
        Scanner scanner = new Scanner(System.in);

        System.out.print("\nCombien de villes souhaitez-vous ajouter ? ");
        int count = scanner.nextInt();
        scanner.nextLine(); // Consommer le retour à la ligne

        for (int i = 0; i < count; i++) {
            System.out.print("Ville " + (i + 1) + " : ");
            String newCity = scanner.nextLine();
            cities.add(newCity);
        }

        System.out.println("\nListe mise à jour :");
        for (String city : cities) {
            System.out.println("- " + city);
        }

        scanner.close();

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
