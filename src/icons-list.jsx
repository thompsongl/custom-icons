
var React = require('react');
var classnames = require('classnames');
var _ = require('lodash');

var IconsList = React.createClass({

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
      <li key={'module-'+m.name}>
        <label className={classnames('inline-block p2', { 'bg-aqua': active })}>
          <div className="">
            <input type="checkbox"
              checked={active}
              onChange={handleChange}
              className="m1"
              style={{position:'absolute',opacity:0}} />
            <div dangerouslySetInnerHTML={svg}></div>
          </div>
        </label>
      </li>
    );
  },

  render: function() {
    return (
      <div className={this.props.className + 'overflow-hidden'}>
        <div className="flex flex-baseline mxn1">
          <h3 className="flex-auto px1">Icons</h3>
          <div className="px1">
            <button className="button button-small button-link"
              onClick={this.props.selectAll}>
              Select All
            </button>
          </div>
          <div className="px1">
            <button className="button button-small button-link"
              onClick={this.props.selectNone}>
              Select None
            </button>
          </div>
        </div>
        <ul className="flex flex-wrap list-reset border-top">
          {this.props.icons.map(this.renderIcon)}
        </ul>
      </div>
    );
  }

});

module.exports = IconsList;
