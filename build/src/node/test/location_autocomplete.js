var ROOT = __dirname + '/../../';
var SCRIPT_PREFIX = ROOT;

var bohnengold = 'CnRqAAAAjRFDZFoCGVQUv9LfLyBXCnxVoRmCCRc6JPsu16GkIPGqGvtIRIPGaI_S8HrXYOZHUkllEzz03Ze4pRAP0UomkN4nzEOV5sNMCUlA0qd5Yt0znfYAjmm-JTjH8SKFVhmDST-Lp-ZuWXI1fxYCF-N9sxIQ6ScKHXHkLXPvZrI4l8yOmRoUOVVCr_9YllEd7zuNcznhku-to2U';
var API_KEY = 'AIzaSyBLtHzf-dbhUC7MOKFk9-lzuF-9rNW3X9Y';
var HOST = 'maps.googleapis.com';
var PLACE_DETAIL = '/maps/api/place/details/json?reference=%s&sensor=true&key=%s';
var PLACE_AUTOCOMPLETE = '/maps/api/place/autocomplete/json?input=%s&types=establishment&location=%d,%d&radius=500&sensor=true&key=%s&type=geocode';

var http = require('http');
var https = require('https');
var util = require('util');
var fs = require('fs');
var $ = require('jquery');
var location = require(ROOT + 'itemfire.site/itemfire/site/static/js/itemfire/location_autocomplete.js');
var jsdom = require("jsdom");

var htmlDoc = '<html lang="en-US">' +
'<head>' +
  '<title>itemfire testing</title>' +
  '<script src=\'' + SCRIPT_PREFIX + 'itemfire.site/itemfire/site/static/js/jquery-1.8.2.js' + '\'></script>' +
  '<script src=\'' + SCRIPT_PREFIX + 'itemfire.site/itemfire/deform/location/resources/js/mxn.js' + '\'></script>' +
  '<script src=\'' + SCRIPT_PREFIX + 'itemfire.site/itemfire/deform/location/resources/js/mxn.core.js' + '\'></script>' +
  '<script src=\'' + SCRIPT_PREFIX + 'itemfire.site/itemfire/deform/location/resources/js/mxn.geocoder.js' + '\'></script>' +
  '<script src=\'' + SCRIPT_PREFIX + 'itemfire.site/itemfire/deform/location/resources/js/mxn.googlev3.core.js' + '\'></script>' +
  '<script src=\'' + SCRIPT_PREFIX + 'itemfire.site/itemfire/deform/location/resources/js/mxn.googlev3.geocoder.js' + '\'></script>' +
  '<script src=\'' + SCRIPT_PREFIX + 'itemfire.site/itemfire/deform/location/resources/js/mxn.googlev3.extras.js' + '\'></script>' +
  '<script>' +
    'var testVar = 42;' +
  '</script>' +
'</head>' +
'<body>' +
  '<script type="text/javascript">document.body.innerHTML = "WOO";</script></body>' +
'</html>';
var document = jsdom.jsdom(htmlDoc);
var window = document.createWindow();
var elementsArray = window.document.getElementsByTagName('script');
console.log("elements Arr:", elementsArray.length);
for (i in elementsArray) {
  if (elementsArray[i].errors) console.log('error loading "'+elementsArray[i]+'"' + elementsArray[i].errors);
}

window.addEventListener('load', function () {
    console.log("innerHtml:", document.body.innerHTML);
    console.log("window.testVar:", window.testVar);
    console.log("jquery:", typeof window.$ == 'function');

    var geocoder = new window.mxn.Geocoder('googlev3', function() {
      console.log('ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ');
      window.close();
    });
    console.log(geocoder);
});

/*
jsdom.env(
  '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom\'s Homepage</a></p>',
  ["http://code.jquery.com/jquery.js",
  fs.readFileSync(ROOT + 'itemfire.site/itemfire/deform/location/resources/js/mxn.js').toString(),
  fs.readFileSync(ROOT + 'itemfire.site/itemfire/deform/location/resources/js/mxn.core.js').toString(),
  fs.readFileSync(ROOT + 'itemfire.site/itemfire/deform/location/resources/js/mxn.geocoder.js').toString(),
  fs.readFileSync(ROOT + 'itemfire.site/itemfire/deform/location/resources/js/mxn.googlev3.core.js').toString(),
  fs.readFileSync(ROOT + 'itemfire.site/itemfire/deform/location/resources/js/mxn.googlev3.geocoder.js').toString(),
  fs.readFileSync(ROOT + 'itemfire.site/itemfire/deform/location/resources/js/mxn.googlev3.extras.js').toString()
  ],
  function(errors, window) {
    document = window.document;
    //var mxn = window.document.mxn;
    //google = require('googlemaps');
    console.log(window.document.mxn)
    //var geocoder = new mxn.Geocoder('googlev3', function() {console.log('ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ');});
  }
);
*/

return;


exports.google_places_search = function(test){
  var options = {
    host: HOST,
    path: util.format(PLACE_AUTOCOMPLETE, 'bohnengold', 37.76999, -122.44696, API_KEY)
  };

  https.get(options, function(res) {
    //console.log(res)
    test.equals(200, res.statusCode)
    test.ok(res.headers['content-type'].match('application/json'), 'must contain "application/json"')

    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    }).on('end', function() {
      var parsed = $.parseJSON(body);
      var google = require('googlemaps');
      //console.log(parsed);
      test.equals(2, parsed['predictions'].length)
      test.equals('Bohnengold, Reichenberger Straße, Berlin, Germany', parsed['predictions'][0]['description'])

      //var gc = mxn.Geocoder('googlev3', function() {
      //  console.log('>>>>>>>>>>>>>>> XXXXXXXXXXXXX##############')
      //});
      google.geocode('Berlin, Germany', function(err, data){
        test.equals('OK', data.status);
        console.log(data.results[0].geometry);
        test.done();
      });

    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    test.done();
  });
  console.log(__dirname)
  test.expect(5)
};