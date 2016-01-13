var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var epics = require('epics')

// TODO: create the following array from the file
var pvList = ['TEST:AI', 'TEST:BINARY', 'TEST:BLINK', 'TEST:CALC', 'TEST:PROGRESS']

io.on('connection', handleConnection(pvList))

function handleConnection (pvList) {
  return function (socket) {
    // epics channel binding to socketio namespace
    pvList.forEach(function (pv) {
      var pvSocket = new epics.Channel(pv)
      console.log('Node connected to PV: ' + pv)
      pvSocket.on('value', function (data) {
        io.emit('update', {'pv': pv, 'val': data})
      })
      pvSocket.connect(function () {
        pvSocket.monitor()
      })
      socket.on(pv + ' update', function (data) {
        pvSocket.put(data)
        console.log('client update > ' + pv + ': ' + data)
      })
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
