var React = require('react')




module.exports = React.createClass({

  getInitalState: function(){
    return {
    value: null
  }
  },
  componentWillMount: function() {
    this.props.io.on(this.props.PV, this.onValueChange)
    this.setState({value: 0})
  },
  componentWillUnmount: function() {
    this.props.socket.unmount()
  },
  render: function() {
    return (
    <div>
      <h1> {this.props.desc} : {this.state.value} </h1>
    </div>

  )},
  onValueChange: function(data){
    this.setState({value: data.value})
  },

})