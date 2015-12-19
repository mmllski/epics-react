var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (<div>
    <button
      type="button"
      onClick={this.props.onClick.bind(null,this)}
      className="btn btn-default">
      {this.props.label}
      <span className="glyphicon glyphicon-play"></span>
      </button>
      </div>
    )},

})
