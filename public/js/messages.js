var socket = io();

var sendMessage = function() {
    socket.emit('message', $('#magicianMsg').val());
});

