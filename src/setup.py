#!/usr/bin/env python
from setuptools import setup, find_packages

setup (
    name='zerotired.site',
    version='0.0.1',
    author = "amb",
    url = "",
    author_email = "andi@zerotired.com",
    packages = find_packages(),
    include_package_data = True,
    extras_require = dict(
        test=[
            'WebTest',
            'lovely.testlayers',
            'livetest',
            'zc.buildout',
            ]),
    install_requires = [
            'plac==0.9.1',
            'pelican>=3.2.1', 
            ],
    zip_safe = False,
    entry_points = {
        'console_scripts':[
            # 'find=pansen.helpers.scripts:find'
            ],
       },
    dependency_links = [
    ],    
)

