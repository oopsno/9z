"use strict";

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-babel');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        src: ['dist/test/*.js']
      }
    },
    babel: {
      dist: {
        options: {
          presets: ['es2015']
        },
        files: {
          'dist/ir.js': 'src/ir.js',
          'dist/l10n.js': 'src/l10n.js',
          'dist/test/ir.js': 'src/test/ir.js'
        }
      }
    }
  });
  grunt.registerTask('test', 'mochaTest');
};
