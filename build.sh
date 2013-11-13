#!/usr/bin/env bash

./build/bin/pelican -o ./ -s ./build/src/en_pelicanconf.py ./build/src/content/
./build/bin/pelican -o ./de/ -s ./build/src/de_pelicanconf.py ./build/src/content/