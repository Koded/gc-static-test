module.exports = {
  options: {
    accessKeyId: '<%= keys.aws.AWSAccessKeyId %>', // Use the variables
    secretAccessKey: '<%= keys.aws.AWSSecretKey %>', // You can also use env variables
    region: 'eu-west-1',
    uploadConcurrency: 5,
    downloadConcurrency: 5
  },
  staging: {
    options: {
      bucket: 'cxp-inno-stg',
      differential: true
    },
    files: [{
      expand: true,
      cwd: '_gh_pages',
      src: ['**/*'],
      dest: './<%= release.path %>'
    }]
  }
};