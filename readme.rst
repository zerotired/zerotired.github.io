Prerequisites
-------------

Setup
.....
::

    cd build
    python bootstrap.py
    bin/buildout -vvN

Development
...........

./build/bin/pelican -o ./output/en/ -s ./build/src/en_pelicanconf.py
./build/bin/pelican -o ./output/de/ -s ./build/src/de_pelicanconf.py
