/*
 * grunt-graphviz
 * https://github.com/euskadi31/grunt-contrib-graphviz
 *
 * Copyright (c) 2013 Axel Etcheverry
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },
    graphviz: {
      schema: {
        files: {
          './test/schema.png': './test/schema.dot'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('test', ['graphviz']);

};
