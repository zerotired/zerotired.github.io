#!/usr/bin/env bash

./build/bin/pelican -o ./output/en/ -s ./build/src/en_pelicanconf.py ./build/src/content/
./build/bin/pelican -o ./output/de/ -s ./build/src/de_pelicanconf.py ./build/src/content/