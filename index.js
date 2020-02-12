var socket = require('socket.io');
var express = require('express');
var mongoose = require('mongoose');
var ejs = require('ejs');


// connect to the datbase 
mongoose.connect('mongodb+srv://majd:majd@to-do-c6yoh.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });


// create schema for database 

var todoSchema = new mongoose.Schema({
    item: String
});

var todos = [];
// creating model from the schema
var todo = mongoose.model('Todo', todoSchema);


var app = express();
app.set('view engine', 'ejs');




var server = app.listen(5000, function (req, res) {
    console.log('you are listening to server 5000');

});

app.use(express.static('assets'));
app.get('/', (req, res) => {
    todo.find({}, (err, data) => {
    if (err) throw err;
    todos = data;
    console.log(data);
});
    res.render('index', { array: todos });

});

app.post('/', (req, res) => {
    todo.find({}, (err, data) => {
        if (err) throw err;
        todos = data;
        console.log(data);
    });
});
var io = socket(server);

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('task', function (task) {
        io.sockets.emit('task', task);
        // creating item to add 
        var todoItem = todo({ item: task }).save((err) => {
            if (err) throw err;
            console.log('item saved')
        });
    });
});

