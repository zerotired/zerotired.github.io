var http = require('http');
var sys = require('sys');
var optparse = require('optparse');
var fs = require('fs');
var exec = require('child_process').exec;


// program vars
var dirToParse = null;
var filesToWatch = [];
var watchers = [];
var commandOnChange = null;


var parser = new optparse.OptionParser([
    ['-h', '--help', 'the help'],
    ['--dir directory', 'a directory to scan'],
    ['--file file', 'a file to watch'],
    ['--cmd command', 'the command']
]);

var help = function() {
    sys.puts('-h --help             display this help');
    // sys.puts('--dir directory       a directory to scan, must be used in conjuction with ``--ext``');
    sys.puts('--file file           a file to watch. this option can be repeated and overrides ``--dir``');
    sys.puts('--cmd command         the command to be executed when a watched file changes');
};
var fail = function() {
    help();
    process.exit(1);
};

// option parsing
parser.on('help', function() {
    help();
    process.exit(0);
});
/*
parser.on('dir', function(opt, value) {
    if (!value) fail();
    dirToParse = value;
});
*/
parser.on('file', function(opt, value) {
    if (!value) fail();
    console.log("add file " + value + " to be watched");
    filesToWatch.push(value);
});
parser.on('cmd', function(opt, value) {
    if (!value) fail();
    console.log("use command ``" + value + "`` for any file that changes");
    commandOnChange = value;
});
parser.on(function(opt) {
    fail();
});
parser.parse(process.argv);

if ((dirToParse == null && filesToWatch.length == 0) || commandOnChange == null) fail();


// main
var walk = function(dir, done) {
  var results = [];

  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;

    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};


var _buffer = null;
var _lock = false;

var bufferedPerform = function (fn) {
    if (!_lock) {
        (function() {
            _lock = true;
            console.log('performing function to call');
            var cb = function() {
                if (_buffer) {
                    var f = _buffer;
                    _buffer = null;
                    f(cb);
                } else {
                    _lock = false;
                }
            };
            fn(cb);
        })();
    } else {
        console.log('buffer command (was ' + (_buffer == null ? 'empty' : 'taken') + ' before)');
        _buffer = fn;
    }
};

var addWatches = function (files) {
    for (idx in files) {
        var file = files[idx];

        var startWatch = function(file) {
            console.log("create watcher for %s", file);
            watchers[file] = fs.watch(file, { persistent: true}, function(curr, prev) {
                // need to recreate the watcher here as for some reason this only works once
                watchers[file].close();
                startWatch(file);
                console.log("file: "+ file+" changed, call command ``" +commandOnChange+"``");

                var doit = function(doneCallback) {
                    exec(commandOnChange, function (error, value) {
                        if (error) {
                            console.error('error: %s', error);
                        }
                        console.log('%s', value);
                        if (doneCallback) doneCallback();
                    });
                };
                bufferedPerform(doit);
            });
        };
        startWatch(file);
    }
};

if (dirToParse != null) {
    walk(dirToParse, function(err, results) {
        if (err) {
            sys.puts(err);
            process.exit(1);
        }
        addWatches(filesToWatch);
    });
} else {
    addWatches(filesToWatch);
}
