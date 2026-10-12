package utils;

/**
 * Classe utilitaire pour formater l'affichage de données.
 * 
 * Cette classe contient uniquement des méthodes statiques et ne
 * peut pas être instanciée.
 */
public class Formatter {

    /**
     * Formate un montant en CHF avec 2 décimales.
     * 
     * @param amount le montant à formater
     * @return le montant formaté avec l'unité
     */
    public static String formatPrice(double amount) {
        // Arrondir à 2 décimales
        double rounded = Math.round(amount * 100.0) / 100.0;
        return rounded + " CHF";
    }

    /**
     * Crée une ligne de séparation pour l'affichage.
     * 
     * @param length la longueur de la ligne
     * @return une chaîne de caractères '=' de la longueur spécifiée
     */
    public static String createSeparator(int length) {
        String separator = "";
        for (int i = 0; i < length; i++) {
            separator = separator + "=";
        }
        return separator;
    }

    /**
     * Formate un titre avec des bordures.
     * 
     * @param title le titre à formater
     * @return le titre encadré
     */
    public static String formatTitle(String title) {
        int length = title.length() + 4;
        String separator = createSeparator(length);
        return separator + "\n  " + title + "\n" + separator;
    }

    /**
     * Centre un texte dans une largeur donnée.
     * 
     * @param text  le texte à centrer
     * @param width la largeur totale
     * @return le texte centré
     */
    public static String centerText(String text, int width) {
        int padding = (width - text.length()) / 2;

        // Alternative avec une boucle :
        // String spaces = "";
        // for (int i = 0; i < padding; i++) {
        // spaces = spaces + " ";
        // }
        // return spaces + text;

        return " ".repeat(padding) + text;
    }
}
