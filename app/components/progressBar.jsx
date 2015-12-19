var React = require('react')


module.exports = React.createClass({

  render: function () {
    return <div className="progress">
          <div className="progress-bar"
          role="progressbar"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="150"
          style={{width: this.props.pv.val + '%'}}>
          {this.props.pv.val}
  </div>
</div>
  }
})