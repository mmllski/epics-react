var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var epics = require('epics')


var pvList = ['TEST:AI', 'TEST:BINARY', 'TEST:BLINK', 'TEST:CALC', 'TEST:PROGRESS']

io.on('connection', function(socket){
  console.log('Client connected')
})

pvList.forEach(function(pvInstance){
  var pv = new epics.Channel(pvInstance);
  console.log('Connected to ' + pvInstance)
  pv.on('value',function(data) {
    io.emit('update pv', {'pv':pvInstance, 'val': data})
  });
  pv.connect(function() {
    pv.monitor();
  });
})





app.use(express.static(__dirname + '/build'))

// routing for single page app
app.get('/', function(req,res){
	res.render('index.html');
})



server.listen(8080, function(){
  console.log('listening on 8080')
})