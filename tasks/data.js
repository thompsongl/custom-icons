
var fs = require('fs');
var _ = require('lodash');
var uglify = require('uglify-js');
var dirTree = require('../lib/dirtree');

module.exports = function(options) {

  var options = options || {};
  options = _.defaults(options, {
    dirname: '.',
    iconTree: [],
    config: {}
  });

  var data = {};
  data.iconTree = options.iconTree.map(function(dir) {
    return dirTree(dir);
  });

  data.initialConfig = _.defaults(options.config, {
    datasvgcss: "icons.data.svg.css",
    datapngcss: "icons.data.png.css",
    urlpngcss: "icons.fallback.css",
    files: {
      loader: uglify.minify([
        'node_modules/grunticon-lib/node_modules/fg-loadcss/loadCSS.js',
        'node_modules/grunticon-lib/node_modules/fg-loadcss/onloadCSS.js',
        'node_modules/grunticon-lib/static/grunticon.loader.js'
      ]).code,
      embed: uglify.minify('node_modules/grunticon-lib/static/grunticon.embed.js').code,
      corsEmbed: uglify.minify('node_modules/grunticon-lib/static/grunticon.embed.cors.js').code,
      banner: fs.readFileSync('node_modules/grunticon-lib/static/grunticon.loader.banner.js', 'utf-8')
    },
    previewhtml: "preview.html",
    loadersnippet: "grunticon.loader.js",
    customselectors: {},
    cssprefix: ".icon-",
    defaultWidth: "400px",
    defaultHeight: "300px",
    colors: {},
    dynamicColorOnly: false,
    pngfolder: "png",
    pngpath: "png",
    template: '{{#each customselectors}}{{this}},{{/each}}{{prefix}}{{name}} {background-image: url("{{datauri}}");background-repeat: no-repeat;}',
    previewTemplate: fs.readFileSync('node_modules/grunticon-lib/static/preview.hbs', 'utf-8'),
    enhanceSVG: false,
    corsEmbed: false
  });

  return data;

};
