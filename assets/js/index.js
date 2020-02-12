var socket = io.connect('http://localhost:5000');

var addBtn = document.getElementById('add');
var taskInput = document.getElementById('task');
var task_area = document.getElementById('task-area');
var form = document.getElementById('form');



form.addEventListener('submit', function (event) {
    var task = taskInput.value;
    taskInput.value = '';
    socket.emit('task', task);
    event.preventDefault();
});



socket.on('task', function (task) {
    console.log(task);
    task_area.innerHTML += '<div class="item">' + task + '</div>';
});