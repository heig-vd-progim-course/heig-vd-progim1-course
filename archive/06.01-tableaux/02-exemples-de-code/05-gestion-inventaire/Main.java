/**
 * Exemple de gestion d'un inventaire simple avec des tableaux.
 * 
 * Cet exemple montre comment utiliser des tableaux parallèles pour gérer un
 * inventaire de produits avec leurs quantités et prix.
 */
public class Main {
    

    /**
     * Affiche l'inventaire complet avec noms, quantités et prix.
     *
     * @param names      les noms des produits
     * @param quantities les quantités en stock
     * @param prices     les prix unitaires
     */
    public static void displayInventory(String[] names, int[] quantities, double[] prices) {
        System.out.println("----------------------------------------");
        System.out.println(String.format("%-15s %10s %10s", "Produit", "Quantité", "Prix (CHF)"));
        System.out.println("----------------------------------------");
        for (int i = 0; i < names.length; i++) {
            System.out.println(String.format("%-15s %10d %10.2f", names[i], quantities[i], prices[i]));
        }
        System.out.println("----------------------------------------");
    }

    /**
     * Calcule la valeur totale de l'inventaire.
     *
     * @param quantities les quantités en stock
     * @param prices     les prix unitaires
     * @return la valeur totale en CHF
     */
    public static double calculateTotalValue(int[] quantities, double[] prices) {
        double total = 0;
        for (int i = 0; i < quantities.length; i++) {
            total += quantities[i] * prices[i];
        }
        return total;
    }

    /**
     * Recherche un produit dans l'inventaire par son nom.
     *
     * @param names       les noms des produits
     * @param productName le nom du produit à rechercher
     * @return l'index du produit ou -1 s'il n'est pas trouvé
     */
    public static int findProduct(String[] names, String productName) {
        for (int i = 0; i < names.length; i++) {
            if (names[i].equals(productName)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Met à jour la quantité d'un produit.
     *
     * @param names       les noms des produits
     * @param quantities  les quantités en stock
     * @param productName le nom du produit à mettre à jour
     * @param change      la variation de quantité (positive ou négative)
     */
    public static void updateQuantity(String[] names, int[] quantities,
            String productName, int change) {
        int index = findProduct(names, productName);
        if (index != -1) {
            quantities[index] += change;
            System.out.println("Mise à jour : " + productName + " (" + change + ")");
            System.out.println("Nouvelle quantité : " + quantities[index]);
        } else {
            System.out.println("Erreur : Produit non trouvé - " + productName);
        }
    }

    /**
     * Affiche les produits dont la quantité est inférieure au seuil.
     *
     * @param names      les noms des produits
     * @param quantities les quantités en stock
     * @param threshold  le seuil de stock faible
     */
    public static void displayLowStock(String[] names, int[] quantities, int threshold) {
        boolean found = false;
        for (int i = 0; i < names.length; i++) {
            if (quantities[i] < threshold) {
                System.out.println("- " + names[i] + " : " + quantities[i] + " unités");
                found = true;
            }
        }
        if (!found) {
            System.out.println("Aucun produit en stock faible.");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Gestion d'inventaire ===\n");

        // Tableaux parallèles pour l'inventaire
        String[] productNames = { "Pommes", "Bananes", "Oranges", "Poires", "Kiwis" };
        int[] quantities = { 50, 30, 40, 25, 15 };
        double[] prices = { 2.50, 1.80, 3.20, 2.90, 4.50 };

        // Affichage de l'inventaire complet
        System.out.println("Inventaire actuel :");
        displayInventory(productNames, quantities, prices);

        // Calcul de la valeur totale de l'inventaire
        double totalValue = calculateTotalValue(quantities, prices);
        System.out.println("\nValeur totale de l'inventaire : " + totalValue + " CHF");

        // Recherche d'un produit
        String searchProduct = "Oranges";
        int index = findProduct(productNames, searchProduct);
        if (index != -1) {
            System.out.println("\nProduit trouvé : " + searchProduct);
            System.out.println("Quantité en stock : " + quantities[index]);
            System.out.println("Prix unitaire : " + prices[index] + " CHF");
            System.out.println("Valeur totale : " + (quantities[index] * prices[index]) + " CHF");
        } else {
            System.out.println("\nProduit non trouvé : " + searchProduct);
        }

        // Mise à jour d'une quantité (vente de 10 pommes)
        System.out.println("\n--- Vente de 10 pommes ---");
        updateQuantity(productNames, quantities, "Pommes", -10);
        System.out.println("\nInventaire après vente :");
        displayInventory(productNames, quantities, prices);

        // Réapprovisionnement (ajout de 20 bananes)
        System.out.println("\n--- Réapprovisionnement de 20 bananes ---");
        updateQuantity(productNames, quantities, "Bananes", 20);
        System.out.println("\nInventaire après réapprovisionnement :");
        displayInventory(productNames, quantities, prices);

        // Produits en rupture de stock (quantité < 20)
        System.out.println("\n--- Produits à réapprovisionner (< 20) ---");
        displayLowStock(productNames, quantities, 20);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
