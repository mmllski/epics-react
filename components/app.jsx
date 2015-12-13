var React = require('react')
var TextPV = require('./text-widget')
var Btn = require('./button')

var App = React.createClass({
  render: function(){
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          EPICS web interface
        </h2>
        <h1> App level </h1>
        <hr />
        <TextPV
          PV="TEST:AI"
          desc="Analog Input PV"/>
        <Btn label="test" />


    </div>
    </div>
  }
})



React.render(
  <App />,
  document.querySelector('.app')
);