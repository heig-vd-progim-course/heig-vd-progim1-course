/**
 * Exemple de création et manipulation basique d'un tableau.
 * 
 * Cet exemple montre comment déclarer un tableau, y accéder et le modifier.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Tableau simple ===\n");

        // Déclaration et initialisation d'un tableau de notes
        double[] grades = { 5.5, 4.0, 5.0, 4.5, 6.0 };

        // Affichage de la taille du tableau
        System.out.println("Nombre de notes : " + grades.length);

        // Accès aux éléments par index
        System.out.println("\nPremière note : " + grades[0]);
        System.out.println("Troisième note : " + grades[2]);
        System.out.println("Dernière note : " + grades[grades.length - 1]);

        // Modification d'un élément
        System.out.println("\nModification de la deuxième note...");
        System.out.println("Ancienne valeur : " + grades[1]);
        grades[1] = 5.5;
        System.out.println("Nouvelle valeur : " + grades[1]);

        // Affichage de toutes les notes
        System.out.println("\nToutes les notes :");
        for (int i = 0; i < grades.length; i++) {
            System.out.println("Note " + (i + 1) + " : " + grades[i]);
        }

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
