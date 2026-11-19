"""Écrans complets des six niveaux de Thealivery, en images fixes.

Usage : python3 generer.py "<dossier Ninja Adventure - Asset Pack>" <dossier de sortie>

Chaque écran montre, de haut en bas : le titre et la consigne, le plateau
(dessiné par ../niveaux/generer.py), la bulle de Théa avec son portrait, la
tournée avec ses cartes numérotées (et les flèches des sauts), la zone « Mise de
côté » s'il y a un piège, puis les boutons. Les cartes sont dans un ordre
mélangé, comme au début d'une partie.

Pixel art : Ninja Adventure (Pixel-boy et AAA), CC0. Texte : Atkinson
Hyperlegible, installée sur la machine (le script cherche dans les dossiers de
polices habituels). Il faut Pillow.
"""
import os, random, sys
from PIL import Image, ImageDraw, ImageFont

PACK, OUT = sys.argv[1], sys.argv[2]
os.environ["NINJA_PACK"] = PACK
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "niveaux"))
import generer as niveaux  # noqa: E402

Z = 2           # agrandissement du pixel art
PAD = 24        # marges, en pixels de l'écran
GUTTER = 56     # marge gauche des cartes, pour les flèches des sauts

def find_font(name):
    for d in [os.path.expanduser("~/.local/share/fonts"), "/usr/share/fonts", "/usr/local/share/fonts"]:
        for root, _, files in os.walk(d):
            if name in files:
                return os.path.join(root, name)
    raise FileNotFoundError(name + " : installez Atkinson Hyperlegible")
REG, BOLD = find_font("AtkinsonHyperlegible-Regular.ttf"), find_font("AtkinsonHyperlegible-Bold.ttf")
font = lambda size, bold=False: ImageFont.truetype(BOLD if bold else REG, size)

INK, MUTED, BG = (40, 30, 30, 255), (105, 92, 86, 255), (241, 238, 231, 255)
JUMP_COLORS = [(214, 140, 18, 255), (52, 122, 190, 255)]

def load(*parts):
    return Image.open(os.path.join(PACK, *parts)).convert("RGBA")
def scale(img, k):
    return img.resize((img.width * k, img.height * k), Image.NEAREST)
def nine(img, w, h, m):
    """Étire une image en neuf morceaux : coins fixes, bords et centre étirés."""
    W0, H0 = img.size
    out = Image.new("RGBA", (w, h))
    xs, ys, tx, ty = [0, m, W0 - m, W0], [0, m, H0 - m, H0], [0, m, w - m, w], [0, m, h - m, h]
    for j in range(3):
        for i in range(3):
            part = img.crop((xs[i], ys[j], xs[i + 1], ys[j + 1]))
            tw, th = tx[i + 1] - tx[i], ty[j + 1] - ty[j]
            if tw > 0 and th > 0:
                out.alpha_composite(part.resize((tw, th), Image.NEAREST), (tx[i], ty[j]))
    return out

# Icônes choisies par Vincent, agrandies d'un facteur entier pour rester nettes
ICON = {
    "avancer": scale(load("Ui", "Input", "Keyboard", "KeyUp.png"), 3),
    "tourner-gauche": scale(load("Ui", "Input", "Keyboard", "KeyLeft.png"), 3),
    "tourner-droite": scale(load("Ui", "Input", "Keyboard", "KeyRight.png"), 3),
    "ramasser": scale(load("Ui", "Skill Icon", "Job & Action", "Interact.png"), 2),
    "livrer": scale(load("Items", "Other", "Letter.png"), 4),
    "aller": scale(load("Ui", "Theme", "Theme Wood", "arrow_right.png"), 3),
    "si": scale(load("Ui", "Emote", "emote23.png").crop((0, 0, 14, 13)), 3),
}
TEXT = {
    "avancer": "Avancer", "tourner-gauche": "Tourner à gauche", "tourner-droite": "Tourner à droite",
    "ramasser": "Ramasser les feuilles", "livrer": "Livrer le thé",
    "aller": "Aller à {n}", "si-maison": "Si une maison attend ici, aller à {n}",
}
CARD_PANEL = load("Ui", "Theme", "Theme Wood", "nine_path_panel_3.png")
BUTTON = load("Ui", "Theme", "Theme Wood", "button_normal.png")
DIALOG = load("Ui", "Dialog", "DialogBoxFaceset.png")
FACE = load("Actor", "Character", "Cavegirl", "Faceset.png")

def cards(*types):
    return [{"id": f"c{i}", "type": t.replace("piège:", ""), "trap": t.startswith("piège:")} for i, t in enumerate(types)]
LEVELS = {
    "01-premiere-livraison": ("Première livraison", "Livrez le thé à la maison.", cards("avancer", "avancer", "avancer", "livrer")),
    "02-coin-de-la-rue": ("Le coin de la rue", "La maison est au coin de la rue.",
                          cards("avancer", "avancer", "tourner-droite", "avancer", "avancer", "livrer")),
    "03-attention-aux-flaques": ("Attention aux flaques", "Contournez les trous et les mares.",
                                 cards("avancer", "avancer", "tourner-droite", "avancer", "avancer", "tourner-gauche", "avancer", "livrer")),
    "04-deux-maisons": ("Deux maisons", "Deux maisons, une seule tournée. Une carte est en trop.",
                        cards("avancer", "avancer", "livrer", "tourner-droite", "avancer", "avancer", "tourner-droite", "avancer", "avancer", "livrer", "piège:tourner-gauche")),
    "05-les-feuilles": ("Les feuilles", "Ramassez les feuilles, puis livrez. Une carte est en trop.",
                        cards("avancer", "avancer", "ramasser", "tourner-gauche", "avancer", "avancer", "tourner-gauche", "avancer", "avancer", "livrer", "piège:tourner-droite")),
    "06-la-rue-qui-s-allonge": ("La rue qui s'allonge", "Le même programme doit livrer les deux rues.",
                                [{"id": "a", "type": "avancer"}, {"id": "b", "type": "si-maison", "target": "d"},
                                 {"id": "c", "type": "aller", "target": "a"}, {"id": "d", "type": "livrer"}]),
}

def shuffled(slug, deck):
    rnd = random.Random(slug + ":cartes")
    for _ in range(20):
        order = deck[:]
        rnd.shuffle(order)
        if [c["type"] for c in order] != [c["type"] for c in deck]:
            return order
    return deck[::-1]

def text_width(draw, text, f):
    return draw.textlength(text, font=f)

def draw_card(screen, d, card, number, x, y, w, h, target_number, color):
    screen.alpha_composite(scale(nine(CARD_PANEL, w // Z, h // Z, 6), Z), (x, y))
    d.text((x + 22, y + h // 2), str(number), fill=INK, font=font(24, True), anchor="lm")
    icon = ICON["si"] if card["type"].startswith("si-") else ICON[card["type"]]
    screen.alpha_composite(icon, (x + 64 + (48 - icon.width) // 2, y + (h - icon.height) // 2))
    phrase = TEXT[card["type"]]
    tx = x + 128
    f = font(22)
    if "{n}" in phrase:
        before = phrase.split("{n}")[0]
        d.text((tx, y + h // 2), before, fill=INK, font=f, anchor="lm")
        d.text((tx + text_width(d, before, f), y + h // 2), str(target_number), fill=color, font=font(22, True), anchor="lm")
    else:
        d.text((tx, y + h // 2), phrase, fill=INK, font=f, anchor="lm")

def draw_button(screen, d, label, x, y):
    w = int(text_width(d, label, font(20, True))) + 48
    screen.alpha_composite(scale(nine(BUTTON, w // Z, 20, 3), Z), (x, y))
    d.text((x + w // 2, y + 20), label, fill=(255, 250, 240, 255), font=font(20, True), anchor="mm")
    return w

def render_screen(slug, level_grids):
    title, consigne, deck = LEVELS[slug]
    order = shuffled(slug, deck)
    board = scale(niveaux.render_level(slug, level_grids), Z)
    has_jumps = any(c["type"] in ("aller", "si-maison") for c in deck)
    has_traps = any(c.get("trap") for c in deck)

    W = max(board.width, 760) + 2 * PAD
    card_h, gap = 64, 10
    list_x = PAD + (GUTTER if has_jumps else 0)
    card_w = W - PAD - list_x
    H = (PAD + 90 + board.height + 24 + DIALOG.height * Z + 30 + 30 + len(order) * (card_h + gap)
         + (130 if has_traps else 0) + 90 + PAD)
    screen = Image.new("RGBA", (W, H), BG)
    d = ImageDraw.Draw(screen)

    num = slug.split("-")[0]
    d.text((PAD, PAD), f"{num} · {title}", fill=INK, font=font(34, True))
    d.text((PAD, PAD + 48), consigne, fill=MUTED, font=font(22))
    y = PAD + 90
    screen.alpha_composite(board, ((W - board.width) // 2, y))
    y += board.height + 24

    # Bulle de Théa, avec son portrait
    bx = (W - DIALOG.width * Z) // 2
    screen.alpha_composite(scale(DIALOG, Z), (bx, y))
    screen.alpha_composite(scale(FACE, Z), (bx + 10 * Z, y + 10 * Z))
    d.text((bx + 60 * Z, y + 14 * Z), "Je suis prête. Remettez ma tournée", fill=INK, font=font(21))
    d.text((bx + 60 * Z, y + 30 * Z), "dans l'ordre, puis Exécuter.", fill=INK, font=font(21))
    y += DIALOG.height * Z + 30

    d.text((list_x, y), "TOURNÉE DE THÉA", fill=MUTED, font=font(16, True))
    d.text((W - PAD, y), f"{len(order)} cartes", fill=MUTED, font=font(16, True), anchor="ra")
    y += 30
    positions = {}
    jump_ids = [c["id"] for c in deck if "target" in c]
    for i, card in enumerate(order):
        positions[card["id"]] = (i, y + card_h // 2)
        y += card_h + gap
    for i, card in enumerate(order):
        cy = positions[card["id"]][1] - card_h // 2
        target_number = color = None
        if "target" in card:
            target_number = positions[card["target"]][0] + 1
            color = JUMP_COLORS[jump_ids.index(card["id"]) % 2]
        draw_card(screen, d, card, i + 1, list_x, cy, card_w, card_h, target_number, color)

    # Flèches des sauts, dans la marge gauche : du saut vers sa carte
    for lane, jid in enumerate(jump_ids):
        card = next(c for c in deck if c["id"] == jid)
        y1, y2 = positions[jid][1], positions[card["target"]][1]
        color = JUMP_COLORS[lane % 2]
        xl = PAD + 10 + lane * 18
        d.line([(list_x, y1), (xl, y1), (xl, y2), (list_x - 4, y2)], fill=color, width=5, joint="curve")
        d.polygon([(list_x - 14, y2 - 9), (list_x - 1, y2), (list_x - 14, y2 + 9)], fill=color)

    if has_traps:
        y += 10
        d.text((PAD, y), "MISE DE CÔTÉ", fill=MUTED, font=font(16, True))
        box = (PAD, y + 28, W - PAD, y + 28 + 74)
        for x0 in range(box[0], box[2], 18):
            d.line([(x0, box[1]), (min(x0 + 10, box[2]), box[1])], fill=MUTED, width=2)
            d.line([(x0, box[3]), (min(x0 + 10, box[2]), box[3])], fill=MUTED, width=2)
        for y0 in range(box[1], box[3], 18):
            d.line([(box[0], y0), (box[0], min(y0 + 10, box[3]))], fill=MUTED, width=2)
            d.line([(box[2], y0), (box[2], min(y0 + 10, box[3]))], fill=MUTED, width=2)
        d.text(((box[0] + box[2]) // 2, (box[1] + box[3]) // 2), "Glissez ici la carte en trop.", fill=MUTED, font=font(20), anchor="mm")
        y += 120

    y += 20
    x = PAD
    for label in ("Exécuter", "Pas à pas", "Mélanger"):
        x += draw_button(screen, d, label, x, y) + 16
    return screen


if __name__ == "__main__":
    for slug, title, grids in niveaux.LEVELS:
        img = render_screen(slug, grids)
        path = os.path.join(OUT, f"ecran-{slug}.png")
        img.save(path)
        print(os.path.basename(path), img.size)
