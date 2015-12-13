var React = require('react')
var ReactDOM = require('react-dom')
var TextPV = require('./text-widget')

var App = React.createClass({
  render: function(){
    return <div>
    <h2> app level </h2>
    <TextPV
      PV="TEST:AI"
      desc="Analog Input PV"
      />
    <TextPV
      PV="TEST:BI"
      desc="Binary Input PV"
      />
    </div>
  }
})



ReactDOM.render(
  <App />,
  document.querySelector('.app')
);