var Message = require('./models/messages');
var twilio = require('twilio')(
    process.env.TWILIO_MAGIC_SID, 
    process.env.TWILIO_MAGIC_TOKEN
);

// var sequelize = require('./models/migrate');
// var cookieParser = require('cookie-parser');
// var expressSession = require('express-session');
// var SequelizeStore = require(
//     'connect-session-sequelize')(expressSession.Store);
// var sessionMiddleware = expressSession({
//     secret: '1234567890QWERTY',
//     store: new SequelizeStore({
//         db: sequelize
//     })
// });

module.exports = function(io) {

    // io.use(function(socket, next) {
    //     sessionMiddleware(socket.request, socket.request.res, next);
    // });

    io.on('connection', function(socket) {
        // if (socket.request.session.magician_id === null) {
        //     socket.disconnect();
        // }
        socket.on('user', function(user) {
            socket.join("u_" + user.id);
        });
        socket.on('message', function(m) {
            Message.create({
                userId: m.user.id,
                magicianId: m.magician.id,
                fromUser: false,
                body: m.message
            }).then(function(message) {
                // twilio.sendMessage({
                //     from: process.env.MAGIC_PHONE_NUMBER_FORMATTED, 
                //     to: m.user.phoneNumber, 
                //     body: m.message 
                // }, function(err, responseData) { 
                //     if (!err) { 
                        io.in(
                            "u_" + m.user.id
                        ).emit('message', message);
                    // } else {
                    //     // !!!!!!!!
                    //     // !!!!!!!!
                    //     // delete the message in the db
                    //     // report an error to the user                        
                    // }
                // });
            });

        });
    });
};
