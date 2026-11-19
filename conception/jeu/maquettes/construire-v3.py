"""Construit maquette-v3.html à partir de maquette-v3.modele.html.

Usage : python3 construire-v3.py "<dossier Ninja Adventure - Asset Pack>"

Le décor de chaque rue (sol, chemins, décor, maisons, obstacles) est dessiné par
../niveaux/generer.py, sans les parties mobiles : la maquette dessine elle-même
Théa, les feuilles et les marques des maisons. Les images et les sprites sont
insérés dans la page en data URI, pour qu'elle reste un seul fichier.
"""
import base64, io, json, os, sys
from PIL import Image

PACK = sys.argv[1]
os.environ["NINJA_PACK"] = PACK
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "niveaux"))
import generer as niveaux  # noqa: E402
sys.dont_write_bytecode = True

def data_uri(img):
    buf = io.BytesIO()
    img.save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()

def pack(*parts):
    return data_uri(Image.open(os.path.join(PACK, *parts)).convert("RGBA"))

def ripples_without_water():
    """Les ondulations du pack sont peintes sur un fond d'eau opaque : on rend
    transparente sa couleur dominante, pour les poser sur la mare."""
    img = Image.open(os.path.join(PACK, "Backgrounds", "Animated", "Water Ripples", "SpriteSheet16x16.png")).convert("RGBA")
    water = max(img.getcolors(4096), key=lambda c: c[0])[1]
    img.putdata([(0, 0, 0, 0) if px == water else px for px in img.getdata()])
    return img

backgrounds = {}
for slug, _title, grids in niveaux.LEVELS:
    widest = max(2 * len(g.split("\n")[0].split()) - 1 + 2 * niveaux.MARGIN for g in grids)
    streets = []
    for g in grids:
        meta = {}
        img = niveaux.render(slug, g, widest, moving_parts=False, meta=meta)
        streets.append({"src": data_uri(img), "obstacles": meta["obstacles"]})
    backgrounds[slug] = streets

assets = {
    "geometry": {"tile": niveaux.T, "cell": niveaux.T * niveaux.CELL, "margin": niveaux.MARGIN},
    "backgrounds": backgrounds,
    "thea": pack("Actor", "Character", "Cavegirl", "SpriteSheet.png"),
    "faceset": pack("Actor", "Character", "Cavegirl", "Faceset.png"),
    "leaf": pack("Items", "Food", "TeaLeaf.png"),
    "bang": pack("Ui", "Emote", "emote21.png"),
    "heart": pack("Ui", "Emote", "emote27.png"),
    "ripples": data_uri(ripples_without_water()),
    "icons": {
        "avancer": pack("Ui", "Input", "Keyboard", "KeyUp.png"),
        "tourner-gauche": pack("Ui", "Input", "Keyboard", "KeyLeft.png"),
        "tourner-droite": pack("Ui", "Input", "Keyboard", "KeyRight.png"),
        "ramasser": pack("Ui", "Skill Icon", "Job & Action", "Interact.png"),
        "livrer": pack("Items", "Other", "Letter.png"),
        "aller": pack("Ui", "Theme", "Theme Wood", "arrow_right.png"),
        "si": data_uri(Image.open(os.path.join(PACK, "Ui", "Emote", "emote23.png")).convert("RGBA").crop((0, 0, 14, 13))),
    },
    "panel": pack("Ui", "Theme", "Theme Wood", "nine_path_panel_3.png"),
    "button": pack("Ui", "Theme", "Theme Wood", "button_normal.png"),
    "buttonHover": pack("Ui", "Theme", "Theme Wood", "button_hover.png"),
    "facesetBox": pack("Ui", "Dialog", "FacesetBox.png"),
    "dialog": pack("Ui", "Dialog", "DialogueBoxSimple.png"),
}

template = open(os.path.join(HERE, "maquette-v3.modele.html"), encoding="utf-8").read()
assert "/*ASSETS*/null" in template
out = template.replace("/*ASSETS*/null", json.dumps(assets))
open(os.path.join(HERE, "maquette-v3.html"), "w", encoding="utf-8").write(out)
print("maquette-v3.html", len(out) // 1024, "Ko")
