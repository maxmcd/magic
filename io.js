module.exports = function(io) {
    console.log('any');
    io.on('connection', function(socket) {
        socket.on('message', function(m) {
            console.log(m.message, m.user, m.magician);
        });
    });
};
