var React = require('react')
var io = require('socket.io-client')

var TextPV = require('./text-widget.jsx')
var InPV = require('./input.jsx')

var App = React.createClass({
  componentWillMount: function () {
    this.io = io()
  },
  componentWillUnmount: function () {
      this.io.unmount()
  },
  render: function(){
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          EPICS web interface
        </h2>
        <h1> App level </h1>
        <hr />
        <TextPV
          io={this.io}
          PV="TEST:AI"
          desc="Analog Input"
          />
        <InPV
          io={this.io}
          PV="TEST:AI"
          value="0"
          />


    </div>
    </div>
  }
})



React.render(
  <App />,
  document.querySelector('.app')
);