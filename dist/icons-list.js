
var React = require('react');
var classnames = require('classnames');
var _ = require('lodash');

var IconsList = React.createClass({displayName: "IconsList",

  getDefaultProps: function() {
    return {
      icons: [],
      included: [],
      toggleActive: function() {},
    };
  },

  renderIcon: function(m, i) {
    var self = this;
    var active = this.props.included[i];
    var svg = { __html: m.content };
    var handleChange = function(e) {
      self.props.toggleActive(i);
    };
    return (
      React.createElement("li", {key: 'module-'+m.name}, 
        React.createElement("label", {className: classnames('inline-block p2', { 'bg-aqua': active })}, 
          React.createElement("div", {className: ""}, 
            React.createElement("input", {type: "checkbox", 
              checked: active, 
              onChange: handleChange, 
              className: "m1", 
              style: {position:'absolute',opacity:0}}), 
            React.createElement("div", {dangerouslySetInnerHTML: svg})
          )
        )
      )
    );
  },

  render: function() {
    return (
      React.createElement("div", {className: this.props.className + 'overflow-hidden'}, 
        React.createElement("div", {className: "flex flex-baseline mxn1"}, 
          React.createElement("h3", {className: "flex-auto px1"}, "Icons"), 
          React.createElement("div", {className: "px1"}, 
            React.createElement("button", {className: "button button-small button-link", 
              onClick: this.props.selectAll}, 
              "Select All"
            )
          ), 
          React.createElement("div", {className: "px1"}, 
            React.createElement("button", {className: "button button-small button-link", 
              onClick: this.props.selectNone}, 
              "Select None"
            )
          )
        ), 
        React.createElement("ul", {className: "flex flex-wrap list-reset border-top"}, 
          this.props.icons.map(this.renderIcon)
        )
      )
    );
  }

});

module.exports = IconsList;
