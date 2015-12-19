var React = require('react')




module.exports = React.createClass({

  getInitalState: function(){
    return {
    value: null
  }
  },
  componentWillMount: function() {

  },
  componentWillUnmount: function() {

  },
  render: function() {
    return (
    <div>
      <h1> {this.props.pv.desc}: {this.props.pv.val}</h1>
    </div>

  )},


})

