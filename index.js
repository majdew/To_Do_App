var socket = require('socket.io');
var express = require('express');
var fs = require('fs');

fs.mkdir('./data' , function (data){
    
});
var app = express();

var server = app.listen(5000, function (req, res) {
    console.log('you are listening to server 5000');
 
});


app.use(express.static('page'));

var io = socket(server);

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('task' , function(task){
        io.sockets.emit('task' , task);
    });
});

