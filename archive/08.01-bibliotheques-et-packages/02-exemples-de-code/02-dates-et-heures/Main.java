import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.Period;
import java.time.Duration;

/**
 * Exemple d'utilisation des dates et heures avec java.time.
 * 
 * Cet exemple montre comment manipuler des dates, des heures, et effectuer
 * des calculs temporels avec l'API moderne java.time (depuis Java 8).
 * 
 * Documentation :
 * https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/package-summary.html
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Dates et heures ===\n");

        // Manipulation de dates avec LocalDate
        LocalDate today = LocalDate.now();
        System.out.println("Date d'aujourd'hui : " + today);

        LocalDate birthday = LocalDate.of(2005, 3, 15);
        System.out.println("Date de naissance : " + birthday);

        // Calcul de l'âge avec Period
        Period age = Period.between(birthday, today);
        System.out.println("Âge : " + age.getYears() + " ans, " + 
                age.getMonths() + " mois, " + age.getDays() + " jours");

        // Ajouter et soustraire des dates
        LocalDate nextWeek = today.plusWeeks(1);
        LocalDate lastMonth = today.minusMonths(1);
        System.out.println("\nDate dans une semaine : " + nextWeek);
        System.out.println("Date il y a un mois : " + lastMonth);

        // Manipulation des heures avec LocalTime
        System.out.println("\n--- Heures ---");
        LocalTime now = LocalTime.now();
        System.out.println("Heure actuelle : " + now);

        LocalTime coursStart = LocalTime.of(8, 30);
        LocalTime coursEnd = LocalTime.of(10, 15);
        System.out.println("Début du cours : " + coursStart);
        System.out.println("Fin du cours : " + coursEnd);

        // Calcul de la durée
        Duration courseDuration = Duration.between(coursStart, coursEnd);
        long minutes = courseDuration.toMinutes();
        System.out.println("Durée du cours : " + minutes + " minutes");

        // Combinaison date + heure avec LocalDateTime
        System.out.println("\n--- Date et heure combinées ---");
        LocalDateTime meeting = LocalDateTime.of(2024, 6, 15, 14, 30);
        System.out.println("Réunion prévue : " + meeting);

        LocalDateTime reminder = meeting.minusHours(1);
        System.out.println("Rappel à envoyer : " + reminder);

        // Formatage personnalisé
        System.out.println("\n--- Formatage ---");
        DateTimeFormatter frenchFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("HH:mm");
        DateTimeFormatter fullFormat = DateTimeFormatter.ofPattern("EEEE dd MMMM yyyy 'à' HH:mm");

        System.out.println("Format français : " + today.format(frenchFormat));
        System.out.println("Heure simple : " + now.format(timeFormat));
        System.out.println("Format complet : " + meeting.format(fullFormat));

        // Comparaison de dates
        System.out.println("\n--- Comparaisons ---");
        LocalDate deadline = LocalDate.of(2024, 12, 31);

        if (today.isBefore(deadline)) {
            Period remaining = Period.between(today, deadline);
            int totalDays = remaining.getDays() + remaining.getMonths() * 30;
            System.out.println("Il reste " + totalDays + " jours avant l'échéance");
        }

        // Jours de la semaine
        System.out.println("\nAujourd'hui est un " + today.getDayOfWeek());
        System.out.println("Nous sommes le jour " + today.getDayOfMonth() +
                " du mois " + today.getMonth());

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
