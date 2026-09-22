#!/usr/bin/env bash

## Configure Bash aliases
tee -a ~/.bash_aliases > /dev/null <<"EOF"
alias tree='tree --dirsfirst -A -F'
alias jpegoptim='jpegoptim --strip-all --all-progressive'
alias optipng='optipng -o5 -strip all -fix'
EOF

## Enable globstar option for recursive globbing
tee -a ~/.bashrc > /dev/null <<"EOF"
shopt -s globstar nullglob
EOF

## Install required packages
# Update packages list
sudo apt update

# Install packages to optimize images (jpegoptim, optipng)
sudo apt install --yes jpegoptim optipng

# Install packages to optimize documents (ps2pdf)
sudo apt install --yes ghostscript

## Setup Python virtual environment and install dependencies
# Create virtual environment
python3 -m venv .venv

# Activate virtual environment and install zensical
source .venv/bin/activate
pip install --upgrade pip
pip install zensical

## Activate the virtual environment in every new shell
tee -a ~/.bashrc > /dev/null <<"EOF"
if [ -f /workspace/.venv/bin/activate ]; then
	source /workspace/.venv/bin/activate
fi
EOF

## Pre-pull the Marp image so the first build is not the slow one
docker pull marpteam/marp-cli:v4.1.1 || true

## Configure Git to rebase when pulling
git config pull.rebase true
