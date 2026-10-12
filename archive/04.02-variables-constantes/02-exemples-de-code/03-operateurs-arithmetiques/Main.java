/**
 * Exemple d'utilisation des opérateurs arithmétiques en Java.
 * 
 * Les opérateurs permettent d'effectuer des calculs sur les variables.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Opérateurs arithmétiques ===\n");

        // Opérateurs de base : +, -, *, /
        int cookies = 12;
        int people = 4;

        int cookiesPerPerson = cookies / people;
        System.out.println("On a " + cookies + " cookies pour " + people + " personnes");
        System.out.println("Chacun reçoit " + cookiesPerPerson + " cookies");
        System.out.println();

        // Addition et soustraction
        double bankAccount = 1000.0;
        System.out.println("Solde initial : " + bankAccount + " CHF");

        bankAccount = bankAccount + 250.0; // Dépôt
        System.out.println("Après dépôt : " + bankAccount + " CHF");

        bankAccount = bankAccount - 180.0; // Retrait
        System.out.println("Après retrait : " + bankAccount + " CHF");
        System.out.println();

        // Multiplication
        int pricePerTicket = 25;
        int numberOfTickets = 3;
        int totalPrice = pricePerTicket * numberOfTickets;
        System.out.println("Prix d'un billet : " + pricePerTicket + " CHF");
        System.out.println("Nombre de billets : " + numberOfTickets);
        System.out.println("Prix total : " + totalPrice + " CHF");
        System.out.println();

        // Modulo (%) : donne le reste de la division
        int totalMinutes = 125;
        int hours = totalMinutes / 60;
        int minutes = totalMinutes % 60;
        System.out.println(totalMinutes + " minutes = " + hours + "h" + minutes);
        System.out.println();

        // Incrémentation et décrémentation
        int level = 1;
        System.out.println("Niveau initial : " + level);

        level++; // Équivalent à : level = level + 1
        System.out.println("Après level++ : " + level);

        level--; // Équivalent à : level = level - 1
        System.out.println("Après level-- : " + level);
        System.out.println();

        // Ordre de priorité (comme en mathématiques)
        int result = 2 + 3 * 4; // La multiplication est prioritaire
        System.out.println("2 + 3 * 4 = " + result); // Donne 14, pas 20

        int resultWithParentheses = (2 + 3) * 4; // Les parenthèses sont prioritaires
        System.out.println("(2 + 3) * 4 = " + resultWithParentheses); // Donne 20

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
