var socket = io();

var sendMessage = function(msg) {
    socket.emit('message', msg);
};

