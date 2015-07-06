module.exports = {

  options: {
    prettify: {indent: 2},
    marked: {sanitize: false},
    production: true,
    data: 'src/**/*.{json,yml}',
    assets: '<%= site.destination %>/assets',
    helpers: 'src/helpers/helper-*.js',
    layoutdir: 'src/templates/layouts',
    partials: ['src/templates/includes/**/*.hbs'],
  },
  site: {
    options: {
      layout: 'default.hbs'
    },
    files: [
      {
        expand: true,
        cwd: 'src/templates/pages',
        src: ['*.{hbs,yml,yaml}'],
        dest: '<%= site.destination %>/'
      }
    ]
  }
};