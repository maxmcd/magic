var socket = io();


var joinUser = function(user) {
    socket.emit('user', user)
}

var sendMessage = function(msg) {
    socket.emit('message', {
        message: msg,
        magician: magician,
        user: user
    });
};

