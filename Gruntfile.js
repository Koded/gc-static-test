var path = require("path");

'use strict';

module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    // path to task.js files, defaults to grunt dir
    configPath: path.join(process.cwd(), 'build/config'),

    // auto grunt.initConfig
    init: true,

    data: {
      pkg : grunt.file.readJSON('package.json'),
      site: grunt.file.readYAML('src/data/site.yml'),
      aliases: grunt.file.readYAML('./build/aliases.yaml'),
      keys: (grunt.file.exists('keys.json') ? grunt.file.readJSON('keys.json') : {})
    }
  });

  // automatically load the standard vendor tasks
  require('load-grunt-tasks')(grunt);

  // Get custom tasks from the build/tasks directory
  grunt.loadTasks('build/tasks');

  grunt.loadNpmTasks('assemble');

};
