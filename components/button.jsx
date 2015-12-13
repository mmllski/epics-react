var React = require('react')
var io = require('socket.io-client')

module.exports = React.createClass({

  render: function() {
    return (<div>
    <button
      type="button"
      onClick={this.handleClick}
      className="btn btn-default">
      {this.props.label}
      <span className="glyphicon glyphicon-play"></span>
      </button>
      </div>
    )},

    handleClick: function(){
      this.props.io.emit('change', 100)
      console.log('emited')
    }

})
