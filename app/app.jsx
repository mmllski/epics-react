var React = require('react')
var io = require('socket.io-client')

var TextPV = require('./components/text.jsx')
var ProgressBar = require('./components/progressBar.jsx')
var ButtonPV = require('./components/button.jsx')
var InputPV = require('./components/input.jsx')
// TODO: Create pv list from file
var pv = {
  'TEST:AI': {
    val: 0,
    desc: 'Analog pv'
  },
  'TEST:BINARY': {
    val: 0,
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
    this.socket.on('update', function (update) {
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
          <div className='col-md-3'>Controller for the PV:</div>
          <div className='col-md-3'><TextPV pv={this.state.pv['TEST:BINARY']}/></div>
          <div className='col-md-2'><ButtonPV onClick={this.updatePV} pv='TEST:BINARY' label='OFF' val='0' /></div>
          <div className='col-md-2'><ButtonPV onClick={this.updatePV} pv='TEST:BINARY' label='ON' val='1' /></div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-3'>Controller for the PV:</div>
          <div className='col-md-3'><TextPV pv={this.state.pv['TEST:AI']}/></div>
          <div className='col-md-4'><InputPV pv='TEST:AI' value='-1' onClick={this.updateFromInput} /></div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-3'>Controller for the PV: </div>
          <div className='col-md-3'><TextPV pv={this.state.pv['TEST:PROGRESS']}/></div>
          <div className='col-md-4'><ProgressBar pv={this.state.pv['TEST:PROGRESS']}/></div>
        </div>
        <hr />
      </div>
    </div>
  },
  updatePV: function (component, e) {
    console.log(component.props.pv)
    this.socket.emit(component.props.pv + ' update', component.props.val)
  },
  updateFromInput: function (component, e) {
    this.socket.emit(component.props.pv + ' update', component.state.value)
    console.log(component.state.value)
    console.log(component.props.pv)
  }
})

React.render(
  <App />,
  document.querySelector('.app')
)
