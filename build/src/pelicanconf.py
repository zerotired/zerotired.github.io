#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import os

SITEURL = ''
TIMEZONE = 'Europe/Berlin'

DEFAULT_LANG = u'de'

if DEFAULT_LANG == 'de':
	GRATIS_WORD = u'KOSTENLOSS'
	AUTHOR = u'Inventorum Gmbh'
	SITENAME = u'INVENTORUM - Wir l(i)eben Einzelhandel - Die iPad Kasse für den Einzelhandel.'
	SITEKEYWORDS = u'kasse, registrierkasse, kassensystem, registrierkasse, kasse, ipadkasse, mobiles Kassen System, Einzelhandel, E-Commerce, ebay, Online Shop, Multi-Channel, GDPdu, 1-Touch, Publishing, Warenwirtschaft, Warenwirtschaftsystem, POS, iPhone, Kassensystem für iPhone'
	SITEDESCRIPTION = u'Inventorum - Die Kasse und Warenwirtschaftssystem für iPhone, iPod touch und iPad.'

if DEFAULT_LANG == 'en':
	GRATIS_WORD = 'GRATIS'
	AUTHOR = u'Inventorum Gmbh'
	SITENAME = u'INVENTORUM - Retail is our Passion - The iPad Point of Sale for Retailers'
	SITEKEYWORDS = u'point of sale, cash register, mobile, retail, E-Commerce, ebay, Online Shop, Multi-Channel, 1-Touch, Publishing, Inventory Management, POS, iPhone, iPad, iPad mini'
	SITEDESCRIPTION = u'Inventorum - The point of sale / cash register for iPhone, iPod touch and iPad..'


# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Blogroll
LINKS =  (('Pelican', 'http://getpelican.com/'),
          ('Python.org', 'http://python.org/'),
          ('Jinja2', 'http://jinja.pocoo.org/'),
          ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10
STATIC_PATHS = ['documents', 'jobs']
# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

THEME = './themes/inventorum/'