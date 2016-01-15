var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var epics = require('epics')

// TODO: create the following array from the file
var pvList = ['TEST:AI', 'TEST:BINARY', 'TEST:BLINK', 'TEST:CALC', 'TEST:PROGRESS']

var pvSocket = {}
pvList.forEach(function (pv) {
  pvSocket[pv] = new epics.Channel(pv)
  console.log('Node connected to PV: ' + pv)
  pvSocket[pv].on('value', function (data) {
    io.emit('update', {'pv': pv, 'val': data})
  })
  pvSocket[pv].connect(function () {
    pvSocket[pv].monitor()
  })
})

io.on('connection', function (client) {
  console.log('Client connected')
  client.on('client update', function (data) {
    pvSocket[data.pv].put(data.val)
  })
})

app.use(express.static(__dirname + '/build'))

app.get('/', function (req, res) {
  res.render('index.html')
})

server.listen(8081, function () {
  console.log('listening on 8081')
})
