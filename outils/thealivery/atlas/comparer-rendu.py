"""Compare le rendu du jeu (TypeScript) à celui de generer.py, pixel par pixel.

Usage, depuis outils/thealivery : npm run compare-rendu -- "<dossier du pack>"

Le jeu calcule une liste d'ordres de dessin ; ce script les exécute avec
l'atlas, puis compare l'image à celle de generer.py, sans les parties mobiles.
"""
import json, os, sys
from PIL import Image, ImageChops

os.environ["NINJA_PACK"] = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "..", "..", "conception", "jeu", "niveaux"))
sys.dont_write_bytecode = True
import generer  # noqa: E402

VENDOR = os.path.join(HERE, "..", "..", "..", "docs", "vendor", "thealivery")
atlas = Image.open(os.path.join(VENDOR, "atlas.png")).convert("RGBA")
sprites = json.load(open(os.path.join(VENDOR, "atlas.json")))["sprites"]

failures = 0
for street in json.load(sys.stdin):
    img = Image.new("RGBA", (street["width"], street["height"]))
    for op in street["background"]:
        x, y, w, h = sprites[op["sprite"]]
        img.alpha_composite(atlas.crop((x, y, x + w, y + h)), (op["x"], op["y"]))
    rows = generer.parse(street["grid"])
    widest = street["width"] // (generer.T * generer.CELL)
    meta = {}
    ref = generer.render(street["id"], street["grid"], widest, moving_parts=False, meta=meta)
    kinds = {k: ("pond" if v == "mare" else "hole") for k, v in meta["obstacles"].items()}
    same_size = ref.size == img.size
    diff = ImageChops.difference(ref, img).getbbox() if same_size else "taille"
    ok = same_size and diff is None and kinds == street["obstacles"]
    failures += not ok
    print(("identique " if ok else "DIFFÉRENT ") + street["id"], "" if ok else f"{diff} {kinds} {street['obstacles']}")
sys.exit(1 if failures else 0)
