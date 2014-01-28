#!/usr/bin/env bash

./bin/pelican -o ./build/ -s ./build/src/en_pelicanconf.py ./src/content/
./bin/pelican -o ./build/de/ -s ./build/src/de_pelicanconf.py ./src/content/