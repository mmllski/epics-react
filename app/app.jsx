var React = require('react')
var io = require('socket.io-client')

var TextPV = require('./text-widget.jsx')

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
    this.socket = io()
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
        <TextPV pv={this.state.pv['TEST:AI']}/>
        <TextPV pv={this.state.pv['TEST:PROGRESS']}/>
      </div>
    </div>
  }
})

React.render(
  <App />,
  document.querySelector('.app')
)
