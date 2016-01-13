var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var epics = require('epics')

// TODO: create the following array from file
var pvList = ['TEST:AI', 'TEST:BINARY', 'TEST:BLINK', 'TEST:CALC', 'TEST:PROGRESS']

function createPvNamespace (pvName) {
  return io.of('/' + pvName)
}

// Create namespaces
var pvns
pvList.forEach(function (pv) {
  pvns = createPvNamespace(pv)
  pvns.on('connection', handleConnection(pv, pvns))
})

function handleConnection (pv, pvns) {
  return function (socket) {
    // epics channel binding to socketio namespace
    var pvSocket = new epics.Channel(pv)
    console.log('PV connected to ' + pv)
    pvSocket.on('value', function (data) {
      pvns.emit('update', data)
    })
    pvSocket.connect(function () {
      pvSocket.monitor()
    })
    socket.on('client update', function () {
      console.log('client update')
    })
  }
}

app.use(express.static(__dirname + '/build'))

app.get('/', function (req, res) {
  res.render('index.html')
})

server.listen(8081, function () {
  console.log('listening on 8081')
})
