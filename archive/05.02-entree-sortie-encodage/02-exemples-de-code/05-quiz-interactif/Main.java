import java.util.Scanner;

/**
 * Exemple complet : Quiz interactif sur la programmation Java.
 * 
 * Ce programme combine tous les concepts d'entrée/sortie :
 * - Affichage formaté
 * - Lecture de données
 * - Validation
 * - Boucles et conditions
 * - Fonctions modulaires
 */
public class Main {

    /**
     * Affiche l'en-tête du quiz.
     */
    public static void displayHeader() {
        System.out.println("\n╔═══════════════════════════════════════╗");
        System.out.println("║       QUIZ JAVA POUR DÉBUTANTS        ║");
        System.out.println("╚═══════════════════════════════════════╝\n");
    }

    /**
     * Pose une question et vérifie la réponse.
     * 
     * @param scanner        le Scanner pour lire la réponse
     * @param questionNumber le numéro de la question
     * @param question       le texte de la question
     * @param correctAnswer  la réponse correcte
     * @return true si la réponse est correcte, false sinon
     */
    public static boolean askQuestion(Scanner scanner, int questionNumber,
            String question, String correctAnswer) {
        System.out.println("╔════════════════════════════════════════════╗");
        System.out.println("║  QUESTION " + questionNumber + "                                ║");
        System.out.println("╚════════════════════════════════════════════╝");
        System.out.println(question);
        System.out.print("\nVotre réponse : ");

        String userAnswer = scanner.nextLine().trim();

        if (userAnswer.equalsIgnoreCase(correctAnswer)) {
            System.out.println("✓ Correct ! 🎉\n");
            return true;
        } else {
            System.out.println("✗ Incorrect. La bonne réponse était : " + correctAnswer + "\n");
            return false;
        }
    }

    /**
     * Affiche le résultat final du quiz.
     * 
     * @param score          le score obtenu
     * @param totalQuestions le nombre total de questions
     */
    public static void displayResult(int score, int totalQuestions) {
        double percentage = (score * 100.0) / totalQuestions;

        System.out.println("\n╔═══════════════════════════════════════╗");
        System.out.println("║          RÉSULTAT FINAL               ║");
        System.out.println("╚═══════════════════════════════════════╝");
        System.out.println("Score : " + score + " / " + totalQuestions + " (" + percentage + "%)");

        // Feedback selon le score
        if (percentage >= 80) {
            System.out.println("Évaluation : Excellent ! ⭐⭐⭐");
        } else if (percentage >= 60) {
            System.out.println("Évaluation : Bien ! ⭐⭐");
        } else if (percentage >= 40) {
            System.out.println("Évaluation : Passable ⭐");
        } else {
            System.out.println("Évaluation : À améliorer");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Quiz interactif complet ===");

        Scanner scanner = new Scanner(System.in);
        int score = 0;
        final int TOTAL_QUESTIONS = 5;

        displayHeader();

        System.out.println("Bienvenue dans ce quiz sur Java !");
        System.out.println("Vous allez répondre à " + TOTAL_QUESTIONS + " questions.");
        System.out.print("\nEntrez votre nom : ");
        String userName = scanner.nextLine();
        System.out.println("\nC'est parti, " + userName + " ! Bonne chance ! 🍀\n");

        // Question 1
        if (askQuestion(scanner, 1,
                "Quel mot-clé permet de déclarer une variable constante en Java ?\n" +
                        "a) const\n" +
                        "b) final\n" +
                        "c) static\n" +
                        "d) immutable",
                "b")) {
            score++;
        }

        // Question 2
        if (askQuestion(scanner, 2,
                "Quelle classe permet de lire les entrées utilisateur ?\n" +
                        "a) Reader\n" +
                        "b) Input\n" +
                        "c) Scanner\n" +
                        "d) Console",
                "c")) {
            score++;
        }

        // Question 3
        if (askQuestion(scanner, 3,
                "Quel est le type primitif pour les nombres entiers en Java ?\n" +
                        "a) integer\n" +
                        "b) number\n" +
                        "c) int\n" +
                        "d) Integer",
                "c")) {
            score++;
        }

        // Question 4
        if (askQuestion(scanner, 4,
                "Quelle méthode affiche du texte AVEC retour à la ligne ?\n" +
                        "a) System.out.print()\n" +
                        "b) System.out.println()\n" +
                        "c) System.out.write()\n" +
                        "d) System.out.display()",
                "b")) {
            score++;
        }

        // Question 5
        if (askQuestion(scanner, 5,
                "Quel encodage Java utilise-t-il en interne ?\n" +
                        "a) ASCII\n" +
                        "b) UTF-8\n" +
                        "c) UTF-16\n" +
                        "d) Latin-1",
                "c")) {
            score++;
        }

        // Affichage du résultat
        displayResult(score, TOTAL_QUESTIONS);

        System.out.println("\nMerci d'avoir participé, " + userName + " !");
        System.out.println("Continue à apprendre, tu progresseras rapidement ! 💪");

        scanner.close();

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
