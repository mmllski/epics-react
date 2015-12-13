var React = require('react')
var io = require('socket.io-client')

module.exports = React.createClass({
  componentWillMount: function(){
    this.socket = io()
    console.log('mounted')
  },
  render: function() {
    return (<div>
    <button
      type="button"
      onClick={this.handleClick}
      className="btn btn-default">
      {this.props.label}
      </button>
      </div>
    )},

    handleClick: function(){
      this.socket.emit('change', 100)
      console.log('emited')
    }

})
