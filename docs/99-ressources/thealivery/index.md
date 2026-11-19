# Thealivery, page d'essai

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

!!! warning "Page d'essai"

    Cette page sert à tester le jeu Thealivery avant de l'intégrer aux séances.
    Elle n'est pas une page du cours. Le
    [bac à sable](bac-a-sable.md) permet d'écrire un niveau et de le jouer
    aussitôt.

Théa, livreuse de thé, apporte ses infusions dans le quartier. Remettez sa
tournée dans l'ordre, puis cliquez sur _Exécuter_.

## 01 - Première livraison

<div class="thealivery" data-id="essai-01-premiere-livraison" markdown>

Livrez le thé à la maison.

```text
T> .  .  M
```

1. avancer
2. avancer
3. avancer
4. livrer

</div>

## 02 - Le coin de la rue

<div class="thealivery" data-id="essai-02-coin-de-la-rue" markdown>

La maison est au coin de la rue.

```text
T> .  .
.  .  .
.  .  M
```

1. avancer
2. avancer
3. tourner-droite
4. avancer
5. avancer
6. livrer

</div>

## 03 - Attention aux flaques

<div class="thealivery" data-id="essai-03-attention-aux-flaques" markdown>

Contournez les trous et les mares.

```text
T> .  .  .
~  ~  .  ~
.  .  .  M
```

1. avancer
2. avancer
3. tourner-droite
4. avancer
5. avancer
6. tourner-gauche
7. avancer
8. livrer

</div>

## 04 - Deux maisons

<div class="thealivery" data-id="essai-04-deux-maisons" markdown>

Deux maisons, une seule tournée. Une carte est en trop.

```text
T> .  M
~  ~  .
M  .  .
```

1. avancer
2. avancer
3. livrer
4. tourner-droite
5. avancer
6. avancer
7. tourner-droite
8. avancer
9. avancer
10. livrer
11. piège : tourner-gauche

</div>

## 05 - Les feuilles

<div class="thealivery" data-id="essai-05-les-feuilles" markdown>

Ramassez les feuilles, puis livrez. Une carte est en trop.

```text
Tv ~  M
.  ~  .
f  .  .
```

1. avancer
2. avancer
3. ramasser
4. tourner-gauche
5. avancer
6. avancer
7. tourner-gauche
8. avancer
9. avancer
10. livrer
11. piège : tourner-droite

</div>

## 06 - La rue qui s'allonge

<div class="thealivery" data-id="essai-06-la-rue-qui-s-allonge" markdown>

Le même programme doit livrer les deux rues.

```text
T> .  .  M
```

```text
T> .  .  .  .  M
```

1. avancer {#debut}
2. si-maison -> fin
3. aller -> debut
4. livrer {#fin}

</div>

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
