var mkdirp = require('../');
var path = require('path');
var test = require('tap').test;
var fs = require('fs');
var mockfs = require('mock-fs');
var _0777 = parseInt('0777', 8);
var _0755 = parseInt('0755', 8);

test('opts.fs sync', function (t) {
    t.plan(4);
    
    var x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    
    var file = '/beep/boop/' + [x,y,z].join('/');
    mockfs();
    
    mkdirp.sync(file, { mode: _0755 });
    fs.exists(file, function (ex) {
        t.ok(ex, 'created file');
        fs.stat(file, function (err, stat) {
            t.ifError(err);
            t.equal(stat.mode & _0777, _0755);
            t.ok(stat.isDirectory(), 'target not a directory');
            mockfs.restore();
        });
    });
});
