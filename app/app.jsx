var React = require('react')
var io = require('socket.io-client')

var TextPV = require('./components/text.jsx')
var ProgressBar = require('./components/progressBar.jsx')
var ButtonPV = require('./components/button.jsx')

// TODO: Create pv list from file
var pv = {
  'TEST:AI': {
    val: 0,
    desc: 'Analog pv'
  },
  'TEST:BINARY': {
    val: null,
    desc: 'Binary pv'
  },
  'TEST:BLINK': {
    val: null,
    desc: 'Blink pv'
  },
  'TEST:CALC': {
    val: null,
    desc: 'Calc pv'
  },
  'TEST:PROGRESS': {
    val: null,
    desc: 'Progress pv'
  }
}

var App = React.createClass({
  getInitialState: function () {
    return {
      pv: pv
    }
  },
  componentDidMount: function () {
    this.socket = io('http://localhost:8081')
    this.socket.on('update pv', function (update) {
      var newPV = this.state.pv
      newPV[update.pv].val = update.val
      this.setState({
        pv: newPV
      })
    }.bind(this))
  },
  render: function () {
    return <div className='row panel panel-default'>
      <div className='col-md-8 col-md-offset-2'>
        <h2 className='text-center'>
          EPICS web interface
        </h2>
        <hr />

        <div className='row'>
          <div className='col-md-4'>I'm a generic controller for the PV:</div>
          <div className='col-md-4'><TextPV pv={this.state.pv['TEST:AI']}/></div>
          <div className='col-md-2'><ButtonPV onClick={this.updatePV} pv='TEST:AI' label='Set to 100' val='100' /></div>
          <div className='col-md-2'><ButtonPV onClick={this.updatePV} pv='TEST:AI' label='Set to 200' val='200' /></div>

        </div>
        <div className='row'>
          <div className='col-md-4'>I'm a generic controller for the PV: </div>
          <div className='col-md-4'><TextPV pv={this.state.pv['TEST:PROGRESS']}/></div>
          <div className='col-md-4'><ProgressBar pv={this.state.pv['TEST:PROGRESS']}/></div>
        </div>


      </div>
    </div>
  },
  updatePV: function (component, e) {
    this.socket.emit('client update', {pv: component.props.pv, val:component.props.val})

  }
})

React.render(
  <App />,
  document.querySelector('.app')
)
