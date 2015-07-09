var path = require("path");
var slugg = require("slugg");

'use strict';

module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {

    configPath: path.join(process.cwd(), 'build/config'),

    // auto grunt.initConfig
    init: true,

    data: {
      pkg : grunt.file.readJSON('package.json'),
      site: grunt.file.readYAML('src/data/site.yml'),
      aliases: grunt.file.readYAML('./build/aliases.yaml'),
      keys: (grunt.file.exists('keys.json') ? grunt.file.readJSON('keys.json') : {}),

      /*
       * Default path for deployed releases
       */
      release: {
        path: (grunt.option("branch") ? slugg(grunt.option("branch")) : 'master')
      }
    },

    postProcess: function(config) {
      if ( process.env.GATHERCONTENT_API ) {
        config.gathercontent.options.apiKey = process.env.GATHERCONTENT_API;
      }

      if ( process.env.AWS_ID ) {
        config.aws.options.AWSAccessKeyId = process.env.AWS_ID;
      }

      if ( process.env.AWS_KEY ) {
        config.aws.options.AWSSecretKey = process.env.AWS_KEY;
      }
    }
  });

  // automatically load the standard vendor tasks
  require('load-grunt-tasks')(grunt);

  // Get custom tasks from the build/tasks directory
  grunt.loadTasks('build/tasks');

  grunt.loadNpmTasks('assemble');

};
