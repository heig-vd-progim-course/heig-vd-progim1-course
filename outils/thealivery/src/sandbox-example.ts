// Le niveau d'exemple du bac à sable. Il montre tout le vocabulaire : deux
// rues, des obstacles, une boucle (« aller »), une condition (« si-maison »)
// et un piège. Dans son propre module pour que les tests puissent le valider
// sans charger l'éditeur.

export const EXAMPLE = `<div class="thealivery" data-id="bac-a-sable" markdown>

Le même programme doit livrer les deux rues. Une carte est en trop.

\`\`\`text
Tv ~  ~  .
.  .  .  M
\`\`\`

\`\`\`text
Tv ~  .  ~  .  .
.  .  .  .  .  M
\`\`\`

1. avancer
2. tourner-gauche
3. avancer {#boucle}
4. si-maison -> fin
5. aller -> boucle
6. livrer {#fin}
7. piège : tourner-droite

</div>
`;
