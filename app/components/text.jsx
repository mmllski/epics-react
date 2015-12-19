var React = require('react')

module.exports = React.createClass({

  render: function () {
    return (
    <div>
       {this.props.pv.desc}:  {this.props.pv.val} 
    </div>
  )
  }
})
