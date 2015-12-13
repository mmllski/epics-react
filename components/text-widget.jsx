var React = require('react')
var io = require('socket.io-client')



module.exports = React.createClass({

  onValueChange: function(data){
    this.setState({value: data.value})
  },

  getInitalState: function(){
    value: ''
  },
  componentWillMount: function() {
    this.socket = io()
    this.socket.on('TEST:AI', this.onValueChange)
    this.setState({value: 100})
  },
  componentWillUnmount: function() {
    this.props.socket.unmount()
  },
  render: function() {
    return (
    <div>
      <h1> {this.props.desc} : {this.state.value} </h1>
      <span>
      <button
        type="button"
        onClick={this.handleClick}
        className="btn btn-default">
        Change to ddd100
        </button></span>
    </div>

  )},
  handleClick: function(){
    this.socket.emit('change', 100)
    console.log('emited from text')
  }

})