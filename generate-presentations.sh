#!/usr/bin/env sh

# Genere les presentations Marp du dossier `presentations/` vers le dossier
# `docs/presentations/`, ou Zensical les publiera comme fichiers statiques.
#
# Pour chaque dossier `presentations/<slug>/` contenant un `PRESENTATION.md` :
#   - `docs/presentations/<slug>/index.html`
#   - `docs/presentations/<slug>/<slug>-presentation.pdf`
#   - `docs/presentations/<slug>/images/` (copie, si le dossier existe)

set -eu

WORKDIR=$(pwd)
MARP_DOCKER_IMAGE="marpteam/marp-cli:v4.1.1"
SOURCE_DIR="presentations"
OUTPUT_DIR="docs/presentations"

echo "Suppression des presentations generees precedemment..."
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

if command -v "marp-cli.js" > /dev/null 2>&1; then
	echo "Marp est installe localement, utilisation de la version locale..."
	MARP_CMD="marp-cli.js"
else
	echo "Marp n'est pas installe, utilisation de son image Docker..."
	MARP_CMD="docker run --rm --entrypoint=\"marp-cli.js\" --volume=\"$WORKDIR\":/home/marp/app $MARP_DOCKER_IMAGE"
fi

for presentation in "$SOURCE_DIR"/*/PRESENTATION.md; do
	[ -e "$presentation" ] || continue

	slug=$(basename "$(dirname "$presentation")")
	target="$OUTPUT_DIR/$slug"

	echo "Traitement de $slug..."
	mkdir -p "$target"

	if [ -d "$SOURCE_DIR/$slug/images" ]; then
		cp -r "$SOURCE_DIR/$slug/images" "$target/images"
	fi

	eval "$MARP_CMD --config-file .marp/config.yaml \
		--output $target/index.html $presentation"

	eval "$MARP_CMD --config-file .marp/config.yaml --pdf \
		--output $target/$slug-presentation.pdf $presentation"
done

echo "Toutes les presentations ont ete generees dans $OUTPUT_DIR."
