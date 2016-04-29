"use strict";

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-babel');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        src: ['test/*.js']
      }
    },
    babel: {
      dist: {
        options: {
          presets: ['es2015']
        },
        files: {}
      }
    }
  });
  grunt.registerTask('test', 'mochaTest');
};
