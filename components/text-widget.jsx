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
    </div>

  )}

})