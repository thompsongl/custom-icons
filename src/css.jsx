
var _ = require('lodash');
var React = require('react');
var JSZip = require('jszip');
var Handlebars = require('handlebars');
var humanize = require('humanize-plus');

var Css = React.createClass({

  getDefaultProps: function() {
    return {
      icons: [],
      included: [],
      defaults: {},
    };
  },

  const: {
    SVG_URI_PREFIX: "data:image/svg+xml;charset=US-ASCII,",
    PNG_URI_PREFIX: "data:image/png;base64,"
  },

  loaderify: function(defaults){
    var embedText = '';
    var banner = defaults.files.banner;
		embedText = banner + "\n" + defaults.files.loader;
		if( defaults.enhanceSVG ){
			embedText += defaults.files.embed;
			if( defaults.corsEmbed ){
				embedText += defaults.files.corsEmbed;
			}
		}
    return embedText;
  },

  cssify: function(collection, type, defaults){
    var template = Handlebars.compile(defaults.template);

    return collection.map(function(icon){
      return template({
        customselectors: icon.selectors,
				prefix: defaults.cssprefix,
				name: icon.name,
				datauri: type === 'datasvg' ? icon.svgDataUri : (type === 'datapng' ? icon.pngDataUri : defaults.pngfolder +'/'+icon.name+'.png')
      });
    }).join('\n');
  },

  htmlify: function(collection, defaults){
    var template = Handlebars.compile(defaults.previewTemplate);

    return template({
			loaderText: '',
			embedText: this.loaderify(defaults),
			cssFiles: {
				svg: defaults.datasvgcss,
				png: defaults.datapngcss,
				fallback: defaults.urlpngcss
			},
			icons: collection.map(function(icon){
				return {
					prefix: defaults.cssprefix,
					name: icon.name,
					width: icon.width,
					height: icon.height,
					selectorType: "class",
					selectorString: defaults.cssprefix.slice(1)
				};
			})
		});
  },

  pngify: function(src){
    var img = new Image();
    img.src = src;
    var width = img.width || 30;
		var height = img.height || 30;
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");

		canvas.width = width;
		canvas.height = height;

		context.drawImage(img, 0, 0);

		return canvas;
  },

  gconify: function(icon){
    var self = this,
        name = icon.name.split('.svg')[0],
        svgDataUri = this.const.SVG_URI_PREFIX + escape(icon.content),
        img = this.pngify(svgDataUri),
        pngDataUri = (img.toDataURL());

    return _.extend(icon, {
      name: name,
      svgDataUri: svgDataUri,
      pngDataUri: pngDataUri,
      height: img.height,
      width: img.width,
      selectors: []
    });
  },

  compileCss: function(defaults) {
    var self = this,
        zip = new JSZip(),
        pngs = zip.folder(defaults.pngfolder),
        svgs = zip.folder('svgs'),
        reader = new FileReader(),
        iconSet = '',
        collection = [];

    this.props.included.forEach(function(active, i) {
      if (active) {
        var icon = self.props.icons[i];
        collection.push(self.gconify(icon));
        iconSet += icon.content;
      }
    });

    if (collection.length){
      collection.forEach(function(icon){
        pngs.file(
          icon.name + '.png',
					icon.pngDataUri.replace(self.const.PNG_URI_PREFIX, '') +  '\n',
					{base64: true}
        );
        svgs.file(
          icon.name + '.svg',
					icon.content
        );
      });
      zip.file(defaults.datasvgcss, self.cssify(collection, 'datasvg', defaults));
      zip.file(defaults.datapngcss, self.cssify(collection, 'datapng', defaults));
      zip.file(defaults.urlpngcss, self.cssify(collection, 'urlpng', defaults));
      zip.file(defaults.loadersnippet, self.loaderify(defaults));
      zip.file(defaults.previewhtml, self.htmlify(collection, defaults));
    }

    var content = zip.generate({type:'blob'});
    var url = (window.URL || window.webkitURL).createObjectURL( content );

    return { css: iconSet, blob: content, download: url };
  },

  render: function() {
    var obj = this.compileCss(this.props.defaults);
    var code = { __html: obj.css };
    var fileSize = humanize.fileSize(obj.blob.size);
    var download = obj.download;
    var preStyle = {
      maxHeight: '40vh'
    };
    return (
      <div className="overflow-hidden">
        <div className="flex flex-center flex-wrap mb2 mxn1">
          <h3 className="m0 px1 flex-auto">Icon Set</h3>
          <div className="h5 bold px1">{fileSize}</div>
          <a href={download}
            className="button ml1 mr1"
            download="moocons-custom.zip">
            Download
          </a>
        </div>
        <pre dangerouslySetInnerHTML={code} style={preStyle} />
        <a href={download}
          className="button"
          download="moocons-custom.zip">
          Download
        </a>
      </div>
    );
  }

});

module.exports = Css;
