"""Construit les images et les sons de Thealivery à partir du pack Ninja Adventure.

Usage : python3 construire-atlas.py "<dossier Ninja Adventure - Asset Pack>"

Le pack n'est pas dans le dépôt : https://pixel-boy.itch.io/ninja-adventure-asset-pack
(Pixel-boy et AAA, licence CC0). Il faut Pillow, et ffmpeg pour les sons.

Produit, dans docs/vendor/thealivery/ :

- atlas.png et atlas.json : toutes les tuiles du plateau dans une seule image,
  la mare déjà recolorée pour l'herbe foncée, les ondulations sans leur fond ;
- ui/ : les cadres, boutons, bulle, portrait, icônes des cartes, cadenas et
  émotions, en fichiers séparés parce que le CSS les utilise en border-image ;
- sons/ : les bruitages choisis, convertis en MP3 mono, courts et légers.

Les règles de dessin du plateau sont celles de conception/jeu/niveaux/generer.py :
les noms des tuiles de route (« floor:12,8 ») reprennent ses coordonnées.
"""
import json, os, shutil, subprocess, sys
from PIL import Image

PACK = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "..", "..", "docs", "vendor", "thealivery"))
T = 16

def load(*parts):
    return Image.open(os.path.join(PACK, *parts)).convert("RGBA")
def tileset(name):
    return load("Backgrounds", "Tilesets", name)
def tile(img, c, r, w=1, h=1):
    return img.crop((c * T, r * T, (c + w) * T, (r + h) * T))

FLOOR, HOUSE, WATER, HOLE, NATURE, LOGIC = (tileset(n) for n in [
    "TilesetFloor.png", "TilesetHouse.png", "TilesetWater.png", "TilesetHole.png",
    "TilesetNature.png", "TilesetLogic.png"])

# La mare n'existe que sur herbe claire : la palette de l'herbe foncée est
# déduite des deux versions du même dessin dans TilesetFloor
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

def ripples_without_water():
    """Les ondulations sont peintes sur un fond d'eau opaque : on rend
    transparente sa couleur dominante, pour les poser sur la mare."""
    img = load("Backgrounds", "Animated", "Water Ripples", "SpriteSheet16x16.png")
    water = max(img.getcolors(4096), key=lambda c: c[0])[1]
    img.putdata([(0, 0, 0, 0) if px == water else px for px in img.getdata()])
    return img

# Tuiles de route : (colonne, ligne) dans TilesetFloor, comme dans generer.py
PATH_TILES = [(12, 8), (12, 7), (12, 9), (13, 8), (11, 8), (11, 7), (13, 7), (11, 9), (13, 9),
              (14, 8), (12, 10), (14, 7), (14, 9), (11, 10), (13, 10), (14, 10),
              (16, 8), (17, 8), (16, 9), (17, 9)]

sprites = {
    "grass": tile(FLOOR, 11, 12),
    **{f"grass-detail-{i}": tile(FLOOR, c, 12) for i, c in enumerate((12, 13, 14, 15))},
    **{f"floor:{c},{r}": tile(FLOOR, c, r) for c, r in PATH_TILES},
    # Boutique, maison de pierre, pignon orange
    **{f"house-{i}": tile(HOUSE, c, 0, 3, 3) for i, c in enumerate((16, 23, 26))},
    "pond": recolor(tile(WATER, 0, 6, 3, 3)),
    "hole": tile(HOLE, 0, 0, 3, 3),
    "leaf": load("Items", "Food", "TeaLeaf.png"),
    # Décor : quatre arbres, deux fleurs, une souche, deux touffes d'herbe haute
    **{f"decor-{i}": img for i, img in enumerate([
        tile(NATURE, 0, 0, 2, 2), tile(NATURE, 2, 0, 2, 2), tile(NATURE, 14, 0, 2, 2), tile(NATURE, 6, 8, 2, 2),
        tile(NATURE, 0, 11), tile(NATURE, 1, 11), tile(NATURE, 4, 8), tile(NATURE, 4, 10), tile(NATURE, 5, 10)])},
    # Théa : quatre colonnes (bas, haut, gauche, droite), la marche en lignes
    "thea": load("Actor", "Character", "Cavegirl", "SpriteSheet.png"),
    "ripples": ripples_without_water(),
    "bang": load("Ui", "Emote", "emote21.png"),
    "heart": load("Ui", "Emote", "emote27.png"),
}

# Émotions de Théa, au-dessus de sa tête et à côté de son portrait
MOODS = {
    "ready": 11, "happy": 18, "love": 27, "splash": 15, "fall": 3, "bump": 19,
    "puzzled": 23, "lost": 25, "dizzy": 28, "sad": 16, "dots": 20,
}
for name, n in MOODS.items():
    sprites[f"mood-{name}"] = load("Ui", "Emote", f"emote{n}.png")

def pack(images):
    """Rangement simple par étagères, les plus hautes d'abord, 1 pixel d'écart."""
    width = 256
    order = sorted(images.items(), key=lambda kv: (-kv[1].height, kv[0]))
    x = y = shelf = 0
    places = {}
    for name, img in order:
        if x + img.width > width:
            x, y, shelf = 0, y + shelf + 1, 0
        places[name] = (x, y, img.width, img.height)
        x += img.width + 1
        shelf = max(shelf, img.height)
    atlas = Image.new("RGBA", (width, y + shelf))
    for name, (px, py, _, _) in places.items():
        atlas.alpha_composite(images[name], (px, py))
    return atlas, places

if os.path.isdir(OUT):
    shutil.rmtree(OUT)
os.makedirs(os.path.join(OUT, "ui"))
os.makedirs(os.path.join(OUT, "sons"))

atlas, places = pack(sprites)
atlas.save(os.path.join(OUT, "atlas.png"), optimize=True)
with open(os.path.join(OUT, "atlas.json"), "w", encoding="utf-8") as f:
    json.dump({"tile": T, "sprites": dict(sorted(places.items()))}, f, separators=(",", ":"))

# Interface : cadres de bois (le 3 au repos, le wood3 pour la carte en cours),
# boutons, bulle, portrait, icônes des cartes, cadenas et émotions
UI = {
    "panel.png": load("Ui", "Theme", "Theme Wood", "nine_path_panel_3.png"),
    "panel-active.png": load("Ui", "Theme", "Wip", "ThemeWood3", "nine_path_panel.png"),
    "button.png": load("Ui", "Theme", "Theme Wood", "button_normal.png"),
    "button-hover.png": load("Ui", "Theme", "Theme Wood", "button_hover.png"),
    "button-pressed.png": load("Ui", "Theme", "Theme Wood", "button_pressed.png"),
    "dialog.png": load("Ui", "Dialog", "DialogueBoxSimple.png"),
    "faceset-box.png": load("Ui", "Dialog", "FacesetBox.png"),
    "faceset.png": load("Actor", "Character", "Cavegirl", "Faceset.png"),
    "lock.png": tile(LOGIC, 6, 3),
    "icon-avancer.png": load("Ui", "Input", "Keyboard", "KeyUp.png"),
    "icon-tourner-gauche.png": load("Ui", "Input", "Keyboard", "KeyLeft.png"),
    "icon-tourner-droite.png": load("Ui", "Input", "Keyboard", "KeyRight.png"),
    "icon-ramasser.png": load("Ui", "Skill Icon", "Job & Action", "Interact.png"),
    "icon-livrer.png": load("Items", "Other", "Letter.png"),
    "icon-aller.png": load("Ui", "Theme", "Theme Wood", "arrow_right.png"),
    "icon-si.png": load("Ui", "Emote", "emote23.png").crop((0, 0, 14, 13)),
    "icon-appeler.png": load("Items", "Scroll", "Scroll.png"),
    "icon-routine.png": load("Items", "Scroll", "ScrollEmpty.png"),
    "icon-remplir.png": load("Items", "Potion", "MilkPot.png"),
    "icon-ajouter.png": load("Ui", "Skill Icon", "Spell", "Upgrade.png"),
    **{f"mood-{name}.png": load("Ui", "Emote", f"emote{n}.png") for name, n in MOODS.items()},
}
for name, img in UI.items():
    img.save(os.path.join(OUT, "ui", name), optimize=True)

# Bruitages : un son court par événement, en MP3 mono
SOUNDS = {
    "move": ("Menu", "Move3.wav"),
    "turn": ("Menu", "Menu5.wav"),
    "pick-up": ("Elemental", "Grass.wav"),
    "deliver": ("Bonus", "Coin.wav"),
    "jump": ("Whoosh & Slash", "Whoosh.wav"),
    "pond": ("Elemental", "Water1.wav"),
    "hole": ("Hit & Impact", "Impact.wav"),
    "bump": ("Hit & Impact", "Hit1.wav"),
    "fail": ("Menu", "Cancel.wav"),
    "help": ("Alert", "Alert.wav"),
}
for name, (folder, file) in SOUNDS.items():
    src = os.path.join(PACK, "Audio", "Sounds", folder, file)
    dst = os.path.join(OUT, "sons", name + ".mp3")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-ac", "1", "-b:a", "64k", dst], check=True)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", os.path.join(PACK, "Audio", "Jingles", "Success1.wav"),
                "-ac", "1", "-b:a", "64k", os.path.join(OUT, "sons", "success.mp3")], check=True)

shutil.copy(os.path.join(PACK, "LICENSE.txt"), os.path.join(OUT, "LICENSE.txt"))
with open(os.path.join(OUT, "README.txt"), "w", encoding="utf-8") as f:
    f.write(
        "Images et sons de Thealivery, tirés du pack Ninja Adventure\n"
        "(Pixel-boy et AAA, licence CC0, voir LICENSE.txt) :\n"
        "https://pixel-boy.itch.io/ninja-adventure-asset-pack\n\n"
        "Fichiers produits par outils/thealivery/atlas/construire-atlas.py.\n"
        "Ne pas les modifier à la main : relancer le script.\n")

print(f"atlas.png {atlas.width} x {atlas.height}, {len(places)} sprites ; {len(UI)} images d'interface ; {len(SOUNDS) + 1} sons")
