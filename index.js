var socket = require('socket.io');
var express = require('express');
var fs = require('fs');
var dir = './data';
var file = dir + '/file';
var array = ['buy milk', 'node prioject'];
fs.mkdir(dir, function (err) {
    console.log('folder was created')
    if (!fs.exists(file, function (err) {
        fs.writeFile(file, array, function (err) {
            console.log('data was written');
        });
    }));
});
var app = express();
app.use(express.static('assets'));
var server = app.listen(5000, function (req, res) {
    console.log('you are listening to server 5000');

});


app.get('/' , function(eq ,res){
    fs.createReadStream('./page/index.html').pipe(res);
});

//app.use(express.static('page'));

var io = socket(server);

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('task', function (task) {
        io.sockets.emit('task', task);
    });
});

