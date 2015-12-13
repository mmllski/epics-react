var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var epics = require('epics')




io.on('connection', function(socket){
  console.log('Client connected')
  socket.on('change', function(data){
    pv.put(data)
  })
})


var pv = new epics.Channel('TEST:AI');
console.log('Connected to TEST:AI')
pv.on('value',function(data) {
  io.emit('TEST:AI', {'value': data})
  console.log('Current:',data);
});


pv.connect(function() {
  pv.monitor();
});


app.use(express.static(__dirname + '/public'))

// routing for single page app
app.get('/', function(req,res){
	res.render('index.html');
})



server.listen(8080, function(){
  console.log('listening on 8080')
})