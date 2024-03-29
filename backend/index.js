const server = require("./server");
const io = require('socket.io')(server);

var user = 0;
var user_id = 10000000;

var avail = {};
var busy = {};
var worker_socket = {};
var fuser_socket = {};
var cuser_socket = {};



io.sockets.on('connection', function(socket) {
    user++;

    socket.on('no_id', function(data) {
        user_id++;
        socket.emit('new_id', { id: user_id });
        socket.id = user_id;
        fuser_socket[user_id] = socket;
    });

    socket.on('connect_me', function(data) {
        console.log(data);
        if (data.worker_id != null) {
            socket.id = data.user_id;
            cuser_socket[socket.id] = socket;
        } else {
            socket.id = data.user_id;
            fuser_socket[socket.id] = socket;
        }
    });

    socket.on('worker_reconnect', function(data) {
        socket.id = data.worker_id;
        worker_socket[socket.id] = socket;
    });

    socket.on('login', function(data) {
        socket.id = data.worker_id;
        worker_socket[socket.id] = socket;
        data.user_id = null;
        avail[data.worker_id] = data;
    });

    socket.on('confirmed', function(data) {
        delete avail[data.worker_id];
        busy[worker_id] = data;
    });


    socket.on('newLocation', function(data) {
        if (cuser_socket[data.user_id] != undefined) {
            worker_socket[data.worker_id].emit('newLocation', data);
        } else if (avail[data.worker_id] != undefined) {
            fuser_socket.forEach(function(user_soc) {
                user_soc.emit('newLocation', {});
            });
        } else if (busy[data.worker_id] != undefined) {
            cuser_socket[data.user_id].emit('newLocation', data);
        }
    });

    console.log(user + ' user connected');
    socket.on('disconnect', function() {
        if (worker_socket[socket.id] != undefined)
            delete worker_socket[socket.id];
        if (fuser_socket[socket.id] != undefined)
            delete fuser_socket[socket.id];
        if (cuser_socket[socket.id] != undefined)
            delete cuser_socket[socket.id];
        user--;
        console.log(user + ' user connected');
    });


});

require("./socket/socket.io")(io);