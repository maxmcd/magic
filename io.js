var Message = require('./models/messages')
var twilio = require('twilio')(
    process.env.TWILIO_MAGIC_SID, 
    process.env.TWILIO_MAGIC_TOKEN
);

module.exports = function(io) {
    console.log('any');
    io.on('connection', function(socket) {
        socket.on('user', function(user) {
            socket.join("u_" + user.id);
        })
        socket.on('message', function(m) {
            console.log(m);
            Message.create({
                userId: m.user.id,
                magicianId: m.magician.id,
                fromUser: false,
                body: m.message
            }).then(function(message) {
                twilio.sendMessage({
                    from: process.env.MAGIC_PHONE_NUMBER_FORMATTED, 
                    to: m.user.phoneNumber, 
                    body: m.message 
                }, function(err, responseData) { 
                    if (!err) { 
                        io.in(
                            "u_" + m.user.id
                        ).emit('message', message)
                        // console.log(responseData.from); 
                        // console.log(responseData.body); 
                    } else {
                        // delete the message in the db
                        // report an error to the user                        
                    }
                });
            })

        });
    });
};
