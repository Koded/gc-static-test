var request = require("request");
var _ = require("lodash");
var yaml = require('js-yaml');
var fs = require('fs');
var Promise = require('es6-promise').Promise;
var path = require('path');

/**
 * Get the project details from the API
 *
 * @param config
 * @returns {Promise}
 */
var getProjectPages = function(config) {

  var options = {
    uri: 'https://' + config.account + '.gathercontent.com/api/0.4/get_pages_by_project',
    method: "POST",
    'auth': {
      'user': config.apiKey,
      'pass': 'x',
      'sendImmediately': false
    },
    form: {
      id: config.project
    }
  };

  return new Promise(function(resolve, reject) {
    request.post(options, function(err, response, body) {
      if ( err || response.statusCode !== 200 ) {
        reject("Problem connecting to gathercontent, please check credentials.");
      }
      resolve({
        config: config,
        results: JSON.parse(body)
      });
    });
  });
};

/**
 * Loop through the pages and save to file
 *
 * @param config
 * @returns {Promise}
 */
var savePages = function(config) {

  var pageData;
  var outData;
  var results = [];
  var filepath;
  var filename;
  var body;
  var outYaml;

  return new Promise(function(resolve, reject) {

    config.results.pages.map(function(current, index, array) {

      pageData = JSON.parse(new Buffer(current.config, 'base64').toString('utf8'));

      outData =_.transform(pageData[0].elements, function(result, n, key) {

        if ( n.label.toLowerCase() === config.config.bodyField) {
          result.body = n.value;
        }
        else if (n.value) {
          result.frontMatter[_.kebabCase(n.label)] = n.value;
        }

      }, {
        frontMatter: {},
        body: ''
      });


      filename = _.kebabCase(current.name) + '.yaml';

      outData.frontMatter.title = current.name;

      try {
        outYaml = yaml.safeDump(outData.frontMatter);
      } catch ( e ) {
        reject(e);
      }

      outYaml = "---" + require("os").EOL + outYaml + "---";

      if ( outData.body ) {
        outYaml += require("os").EOL + outData.body;
      }

      filepath = path.join(config.config.dest, filename);
      fs.writeFileSync(filepath, outYaml);

      results.push(filepath);

    });

    resolve(results);
  });
};



module.exports = function(grunt) {

  grunt.registerTask('gathercontent', 'Gather Content from GatherContent.', function() {

    var options = this.options();
    var done = this.async();

    getProjectPages(options)
      .then(savePages)
      .then(function(results) {
        grunt.log.subhead("Written:");
        results.forEach(function(file) {
          grunt.log.oklns(file);
        });
      })
      .then(done)
      .catch(function(err) {
        grunt.log.error(err);
      });
  });
};
