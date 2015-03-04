var socket = io();

var sendMessage = function(msg) {
    socket.emit('message', {
        message: msg,
        magician: magician.id,
        user: user.id
    });
};

