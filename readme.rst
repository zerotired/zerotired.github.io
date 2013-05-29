Prerequisites
-------------

On a Mac (Mountain Lion here, do this first)::

	sudo rm -rf /System/Library/Frameworks/Python.framework/Versions/2.7/Extras/lib/python/setuptools*
	sudo rm -rf /opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/setuptools*
	sudo rm -rf /Library/Python/2.7/site-packages/setuptools*

Setup
-----

::

    cd build
    python bootstrap.py
    bin/buildout -vvN

Development
-----------

Run the local server::

    build/bin/develop_server start

Display the page in your browser at ``http://localhost:8000/``
