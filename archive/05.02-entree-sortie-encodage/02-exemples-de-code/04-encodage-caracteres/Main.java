/**
 * Exemple d'encodage des caractères en Java.
 * 
 * Java utilise Unicode (UTF-16) pour représenter les caractères.
 * Cela permet d'afficher des caractères de toutes les langues du monde.
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Encodage de caractères ===\n");

        // ========================================
        // Caractères ASCII de base (0-127)
        // ========================================
        System.out.println("=== Caractères ASCII ===");

        char letterA = 'A';
        int codeA = (int) letterA; // Conversion char → int pour obtenir le code
        System.out.println("Lettre : " + letterA);
        System.out.println("Code ASCII : " + codeA);
        System.out.println();

        // Affichage d'une partie de la table ASCII
        System.out.println("Table ASCII (lettres majuscules) :");
        for (int code = 65; code <= 90; code++) {
            char letter = (char) code; // Conversion int → char
            System.out.print(letter + " ");
        }
        System.out.println("\n");

        // ========================================
        // Caractères accentués (Latin-1 / Unicode)
        // ========================================
        System.out.println("=== Caractères accentués ===");

        String frenchText = "Voici des caractères français : àéèêëïôùç";
        System.out.println(frenchText);

        // Code des caractères accentués
        char eAccent = 'é';
        int codeEAccent = (int) eAccent;
        System.out.println("\nLe caractère 'é' a le code : " + codeEAccent);
        System.out.println();

        // ========================================
        // Symboles et caractères spéciaux
        // ========================================
        System.out.println("=== Symboles spéciaux ===");

        // Symboles mathématiques
        System.out.println("Symboles mathématiques : π ≈ ∞ √ ∑ ∫");

        // Symboles monétaires
        System.out.println("Monnaies : € $ £ ¥ ₹ ₿");

        // Flèches
        System.out.println("Flèches : → ← ↑ ↓ ↔");

        // Symboles divers
        System.out.println("Symboles : ★ ♥ ☀ ☁ ☂ ☃ ✓ ✗");
        System.out.println();

        // ========================================
        // Caractères de différents alphabets
        // ========================================
        System.out.println("=== Alphabets du monde (Unicode) ===");

        System.out.println("Grec : α β γ δ ε Σ Ω");
        System.out.println("Cyrillique : А Б В Г Д (russe)");
        System.out.println("Arabe : مرحبا");
        System.out.println("Chinois : 你好 (bonjour)");
        System.out.println("Japonais : こんにちは (bonjour)");
        System.out.println("Coréen : 안녕하세요 (bonjour)");
        System.out.println();

        // ========================================
        // Emojis (Unicode moderne)
        // ========================================
        System.out.println("=== Emojis (Unicode) ===");
        System.out.println("😀 😊 😎 🚀 🎉 🌟 💻 📚 ☕ 🍕");
        System.out.println();

        // ========================================
        // Caractères de contrôle
        // ========================================
        System.out.println("=== Caractères de contrôle ===");

        System.out.println("Retour à la ligne : \\n");
        System.out.println("Ligne 1\nLigne 2");
        System.out.println();

        System.out.println("Tabulation : \\t");
        System.out.println("Colonne1\tColonne2\tColonne3");
        System.out.println();

        // ========================================
        // Récapitulatif
        // ========================================
        System.out.println("=== Récapitulatif ===");
        System.out.println("✓ Java utilise Unicode (UTF-16) en interne");
        System.out.println("✓ ASCII : codes 0-127 (lettres de base, chiffres, symboles)");
        System.out.println("✓ Latin-1 : codes 0-255 (ASCII + caractères accentués)");
        System.out.println("✓ Unicode : codes 0-1114111 (tous les caractères du monde)");
        System.out.println("✓ Type char en Java : stocke un caractère Unicode");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
