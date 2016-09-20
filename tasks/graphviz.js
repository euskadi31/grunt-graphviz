/*
 * grunt-graphviz
 * https://github.com/euskadi31/grunt-graphviz
 *
 * Copyright (c) 2013 Axel Etcheverry
 * Licensed under the MIT license.
 */

'use strict';

var Viz = require('viz.js');

module.exports = function(grunt) {
    var path            = require('path');
    var fs              = require('fs');
    var childProcess    = require('child_process');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('graphviz', 'Compile DOT files', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();
        var formats = ['svg', 'xdot', 'plain', 'ps'];

        grunt.verbose.writeflags(options, 'Options');

        grunt.util.async.forEachLimit(this.files, 30, function(file, next) {
            compile(file.src[0], file.dest, next);
        }.bind(this), this.async());

        function compile(src, dest, next) {
            var cp;

            function processed(err, result, code) {

                if (err) {
                    grunt.log.error(err);

                    if (!grunt.option('force')) {
                        return false;
                    }
                } else {
                    grunt.log.writeln("Compiling " + (src).cyan + ' -> ' + (dest).cyan);
                }

                next();
            }

            grunt.file.mkdir(path.dirname(dest));

            var format = path.extname(dest).substr(1).toLowerCase();

            if (formats.indexOf(format) === -1) {
                grunt.log.error('Error: format "' + format + '" not recognized. Use one of: ' + formats.join(' '));

                if (!grunt.option('force')) {
                    return false;
                }

                next();

            } else {

                if (dest !== src && grunt.file.exists(dest)) {
                    grunt.file.delete(dest);
                }
                var file = grunt.file.read(src);
                var output = Viz(file, {format: format});
                grunt.file.write(dest, output);
                processed();
            }

        }

    });
};
