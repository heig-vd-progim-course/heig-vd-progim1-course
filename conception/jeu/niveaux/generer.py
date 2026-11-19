"""Images fixes des six niveaux de Thealivery, avec le pack Ninja Adventure (CC0).

Usage : python3 generer.py "<dossier Ninja Adventure - Asset Pack>" <dossier de sortie>
Le pack n'est pas dans le dépôt : https://pixel-boy.itch.io/ninja-adventure-asset-pack
Il faut Pillow (pip install pillow).

Une intersection ou une rue occupe 3 x 3 tuiles de 16 pixels. Les rues font
toute la largeur de leur case ; entre elles, des pâtés d'herbe avec du décor.
Les choix au hasard (maisons, obstacles, décor) dépendent du nom du niveau :
une image se régénère toujours à l'identique.
"""
import os, random, sys
from PIL import Image, ImageDraw

P, OUT = sys.argv[1], sys.argv[2]
TS = os.path.join(P, "Backgrounds", "Tilesets")
T, CELL, MARGIN, ZOOM = 16, 3, 1, 3   # tuile, tuiles par case, cases de marge, agrandissement

def sheet(name):
    return Image.open(os.path.join(TS, name)).convert("RGBA")
FLOOR, HOUSE, WATER, HOLE, NATURE = (sheet(n) for n in ["TilesetFloor.png", "TilesetHouse.png", "TilesetWater.png", "TilesetHole.png", "TilesetNature.png"])
def tile(img, c, r, w=1, h=1):
    return img.crop((c * T, r * T, (c + w) * T, (r + h) * T))

# Chemin de terre sur herbe foncée (bloc de droite de TilesetFloor, lignes 7 à 10)
GRASS = tile(FLOOR, 11, 12)
GRASS_DETAILS = [tile(FLOOR, c, 12) for c in (12, 13, 14, 15)]
PATH = {  # clé : (haut, droite, bas, gauche) ont-ils de la terre ?
    (1, 1, 1, 1): (12, 8), (0, 1, 1, 1): (12, 7), (1, 1, 0, 1): (12, 9), (1, 0, 1, 1): (13, 8), (1, 1, 1, 0): (11, 8),
    (0, 1, 1, 0): (11, 7), (0, 0, 1, 1): (13, 7), (1, 1, 0, 0): (11, 9), (1, 0, 0, 1): (13, 9),
    (1, 0, 1, 0): (14, 8), (0, 1, 0, 1): (12, 10), (0, 0, 1, 0): (14, 7), (1, 0, 0, 0): (14, 9),
    (0, 1, 0, 0): (11, 10), (0, 0, 0, 1): (13, 10), (0, 0, 0, 0): (14, 10),
}
INNER = {"br": (16, 8), "bl": (17, 8), "tr": (16, 9), "tl": (17, 9)}  # coin d'herbe dans la terre

HOUSES = [tile(HOUSE, 16, 0, 3, 3), tile(HOUSE, 23, 0, 3, 3), tile(HOUSE, 26, 0, 3, 3)]  # boutique, pierre, pignon orange
# La mare n'existe que sur herbe claire : on lui applique la palette de l'herbe
# foncée, déduite des deux versions du même dessin dans TilesetFloor
def palette_swap():
    light, dark = tile(FLOOR, 0, 7, 11, 7), tile(FLOOR, 11, 7, 11, 7)
    mapping = {}
    for a, b in zip(light.getdata(), dark.getdata()):
        if a[3] and a != b:
            mapping.setdefault(a, b)
    return mapping
GRASS_MAP = palette_swap()
def recolor(img):
    out = img.copy()
    out.putdata([GRASS_MAP.get(px, px) for px in img.getdata()])
    return out
POND = recolor(tile(WATER, 0, 6, 3, 3))
PIT = tile(HOLE, 0, 0, 3, 3)
LEAF = Image.open(os.path.join(P, "Items", "Food", "TeaLeaf.png")).convert("RGBA")
# Décor : quatre arbres (2 x 2), deux fleurs, une souche et deux touffes d'herbe
# haute, chacune sur une seule tuile. Les rochers ont été retirés.
DECOR = [tile(NATURE, 0, 0, 2, 2), tile(NATURE, 2, 0, 2, 2), tile(NATURE, 14, 0, 2, 2), tile(NATURE, 6, 8, 2, 2),
         tile(NATURE, 0, 11), tile(NATURE, 1, 11), tile(NATURE, 4, 8), tile(NATURE, 4, 10), tile(NATURE, 5, 10)]
HERO = Image.open(os.path.join(P, "Actor", "Character", "Cavegirl", "SpriteSheet.png")).convert("RGBA")
HERO_COL = {">": 3, "<": 2, "^": 1, "v": 0}  # colonnes de la planche : bas, haut, gauche, droite

def parse(text):
    rows = [l.split() for l in text.strip().splitlines()]
    return rows

def render(level_id, grid_text, min_cells_w=0):
    rnd = random.Random(level_id + grid_text)
    rows = parse(grid_text)
    R, C = len(rows), len(rows[0])
    cells_w, cells_h = max((2 * C - 1) + 2 * MARGIN, min_cells_w), (2 * R - 1) + 2 * MARGIN
    W, H = cells_w * CELL, cells_h * CELL          # en tuiles
    img = Image.new("RGBA", (W * T, H * T))

    # Masque de terre, en tuiles : intersections et rues
    dirt = [[0] * W for _ in range(H)]
    for gr in range(2 * R - 1):
        for gc in range(2 * C - 1):
            if gr % 2 == 1 and gc % 2 == 1:
                continue   # pâté d'herbe entre les rues
            for ty in range(CELL):
                for tx in range(CELL):
                    dirt[(gr + MARGIN) * CELL + ty][(gc + MARGIN) * CELL + tx] = 1
    at = lambda y, x: dirt[y][x] if 0 <= y < H and 0 <= x < W else 0

    # Sol : herbe, quelques détails, puis la terre avec ses bords
    for y in range(H):
        for x in range(W):
            img.paste(GRASS, (x * T, y * T))
            if not dirt[y][x] and rnd.random() < 0.12:
                img.alpha_composite(rnd.choice(GRASS_DETAILS), (x * T, y * T))
    for y in range(H):
        for x in range(W):
            if not dirt[y][x]:
                continue
            key = (at(y - 1, x), at(y, x + 1), at(y + 1, x), at(y, x - 1))
            c, r = PATH[key]
            if key == (1, 1, 1, 1):
                for corner, (dy, dx) in {"br": (1, 1), "bl": (1, -1), "tr": (-1, 1), "tl": (-1, -1)}.items():
                    if not at(y + dy, x + dx):
                        c, r = INNER[corner]
            img.alpha_composite(tile(FLOOR, c, r), (x * T, y * T))

    def cell_px(gr, gc):   # coin haut-gauche d'une case de la grille, en pixels
        return ((gc + MARGIN) * CELL * T, (gr + MARGIN) * CELL * T)

    # Décor dans les pâtés et dans la marge, sans toucher la terre
    def free(x, y, w, h):
        return all(0 <= y + j < H and 0 <= x + i < W and not dirt[y + j][x + i] for j in range(h) for i in range(w))
    taken = set()
    for _ in range(W * H // 6):
        d = rnd.choice(DECOR)
        w, h = d.width // T, d.height // T
        x, y = rnd.randrange(0, W - w + 1), rnd.randrange(0, H - h + 1)
        spots = {(x + i, y + j) for i in range(w) for j in range(h)}
        if free(x, y, w, h) and not spots & taken:
            img.alpha_composite(d, (x * T, y * T))
            taken |= spots

    # Objets et Théa sur les intersections
    for r, row in enumerate(rows):
        for c, tok in enumerate(row):
            px, py = cell_px(2 * r, 2 * c)
            if tok == "M":
                img.alpha_composite(rnd.choice(HOUSES), (px, py))
            elif tok == "~":
                img.alpha_composite(rnd.choice([POND, PIT]), (px, py))
            elif tok == "f":
                img.alpha_composite(LEAF, (px + T, py + T))
            elif tok.startswith("T"):
                # Théa en double taille (32 x 32), centrée dans sa case de 48 x 48
                frame = HERO.crop((HERO_COL[tok[1]] * T, 0, HERO_COL[tok[1]] * T + T, T))
                frame = frame.resize((2 * T, 2 * T), Image.NEAREST)
                img.alpha_composite(frame, (px + T // 2, py + T // 2))
    return img

LEVELS = [
    ("01-premiere-livraison", "Première livraison", ["T> . . M"]),
    ("02-coin-de-la-rue", "Le coin de la rue", ["T> . .\n. . .\n. . M"]),
    ("03-attention-aux-flaques", "Attention aux flaques", ["T> . . .\n~ ~ . ~\n. . . M"]),
    ("04-deux-maisons", "Deux maisons", ["T> . M\n~ ~ .\nM . ."]),
    ("05-les-feuilles", "Les feuilles", ["Tv ~ M\n. ~ .\nf . ."]),
    ("06-la-rue-qui-s-allonge", "La rue qui s'allonge", ["T> . . M", "T> . . . . M"]),
]
for slug, title, grids in LEVELS:
    # Toutes les rues d'un niveau à la même largeur
    widest = max(2 * len(g.split("\n")[0].split()) - 1 + 2 * MARGIN for g in grids)
    parts = [render(slug, g, widest) for g in grids]
    gap = 8 if len(parts) > 1 else 0
    W = max(p.width for p in parts)
    H = sum(p.height for p in parts) + gap * (len(parts) - 1)
    out = Image.new("RGBA", (W, H), (26, 31, 26, 255))
    y = 0
    for p in parts:
        out.alpha_composite(p, (0, y)); y += p.height + gap
    big = out.resize((W * ZOOM, H * ZOOM), Image.NEAREST)
    path = os.path.join(OUT, f"niveau-{slug}.png")
    big.save(path)
    print(path.split("/")[-1], big.size)
