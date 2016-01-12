var React = require('react')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.pv.val,
      changed: false
    }
  },
  render: function () {
    return (
      <div className="input-group">
        <input
          value={this.state.value}
          type="text"
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          className="form-control" />
        <span className="input-group-btn">
          <button
            className="btn btn-default"
            onClick={this.props.update.bind(null,this)}
            type="button">
            <span className="glyphicon glyphicon-play"> </span>
          </button>
        </span>
      </div>
    )
  },
  handleOnKeyDown: function(event) {
    if(event.key == "Enter"){
      this.props.update()
    }
    //e.persist()
    //console.log(e)
  },

  handleOnChange: function (event){
    this.setState({value: event.target.value})
  },


})