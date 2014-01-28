from setuptools import setup

setup(
    name = "osdetect_recipe",
    entry_points = {'zc.buildout': ['detect = osdetect:OsDetect']},
    )
