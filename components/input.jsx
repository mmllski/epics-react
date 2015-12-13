var React = require('react')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.value,
      changed: false
    }
  },
  componentWillMount: function (){
    this.props.io.on(this.props.PV, this.handleValueChange)
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
            onClick={this.handleUpdatePV}
            type="button">
            <span className="glyphicon glyphicon-play"> </span>
          </button>
        </span>
      </div>
    )
  },
  handleOnKeyDown: function(event) {
    if(event.key == "Enter"){
      this.handleUpdatePV()
    }
    //e.persist()
    //console.log(e)
  },

  handleValueChange: function (data){
    this.setState({value: data.value})
  },

  handleOnChange: function (event){
    this.setState({value: event.target.value})
  },

  handleUpdatePV: function (event){
    this.props.io.emit(this.props.PV, this.state.value)
  }

})