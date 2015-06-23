// example data build script

var fs = require('fs');
var path = require('path');

var generateData = require('../tasks/data');

var data;
var options = {};

options.iconTree = [
  'node_modules/geomicons-open/dist/icons'
];

options.config = {
  // datasvgcss: "icons.data.svg.css",
  // datapngcss: "icons.data.png.css",
  // urlpngcss: "icons.fallback.css",
  // files: {
  //   loader: fs.readFileSync('node_modules/grunticon-lib/static/grunticon.loader.js', 'utf-8'),
  //   embed: fs.readFileSync('node_modules/grunticon-lib/static/grunticon.embed.js', 'utf-8'),
  //   corsEmbed: fs.readFileSync('node_modules/grunticon-lib/static/grunticon.embed.cors.js', 'utf-8'),
  //   banner: fs.readFileSync('node_modules/grunticon-lib/static/grunticon.loader.banner.js', 'utf-8')
  // },
  // previewhtml: "preview.html",
  // loadersnippet: "grunticon.loader.js",
  // customselectors: {},
  // cssprefix: ".icon-",
  // defaultWidth: "400px",
  // defaultHeight: "300px",
  // colors: {},
  // dynamicColorOnly: false,
  // pngfolder: "png",
  // pngpath: "png",
  // template: '{{#each customselectors}}{{this}},{{/each}}{{prefix}}{{name}} {background-image: url("{{datauri}}");background-repeat: no-repeat;}',
  // previewTemplate: fs.readFileSync('node_modules/grunticon-lib/static/preview.hbs', 'utf-8'),
  // enhanceSVG: false,
  // corsEmbed: false
};

options.dirname = path.join(__dirname, '..');

data = generateData(options);

fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(data));
