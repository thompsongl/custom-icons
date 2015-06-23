
var React = require('react');
var IconsList = require('./icons-list');
var Css = require('./css');
var Config = require('./config');

var CustomCss = React.createClass({displayName: "CustomCss",

  getDefaultProps: function() {
    return {
      iconTree: [],
      initialConfig: {}
    };
  },

  getInitialState: function() {
    return {
      icons: this.walkIconTree(this.props.iconTree),
      included: [],
      compiled: '',
      defaults: this.props.initialConfig,
    };
  },

  toggleActive: function(i) {
    var included = this.state.included;
    included[i] = !included[i];
    this.setState({ included: included });
  },

  selectAll: function() {
    var included = this.state.included.map(function(i) {
      return true;
    });
    this.setState({ included: included });
  },

  selectNone: function() {
    var included = this.state.included.map(function(i) {
      return false;
    });
    this.setState({ included: included });
  },

  updateDefaults: function(defaults) {
    this.setState({ defaults: defaults });
  },

  walkIconTree: function(files, filelist) {
    var self = this;
    filelist = filelist || [];
    files.forEach(function(file) {
      if (file.type === 'folder') {
        filelist = self.walkIconTree(file.children, filelist);
      } else {
        filelist.push(file);
      }
    });
    return filelist;
  },

  componentDidMount: function() {
    var included = [];
    this.state.icons.forEach(function(m, i) {
      included.push(false);
    });
    this.setState({
      included: included,
    });
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(IconsList, React.__spread({},  this.props,  this.state, 
          {className: "mb3", 
          toggleActive: this.toggleActive, 
          selectAll: this.selectAll, 
          selectNone: this.selectNone})), 
        React.createElement(Config, React.__spread({},  this.props,  this.state, 
          {className: "mb3", 
          updateDefaults: this.updateDefaults})), 
        React.createElement(Css, React.__spread({},  this.props,  this.state))
      )
    );
  }

});

module.exports = CustomCss;
