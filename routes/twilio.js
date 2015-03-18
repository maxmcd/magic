var express = require('express');
var router = express.Router();

var User = require('../models/users.js');
var Message = require('../models/messages.js');

var io;

// io.in("u_"+userId).emit('message', messagedata);


/* GET home page. */
router.post('/', function(req, res, next) {
    var fromNumber = req.body.From;
    var messageBody = req.body.Body;

    User.findOrCreate({
            where: {phoneNumber: fromNumber}, 
            defaults: {status: 'new'}
    }).spread(function(user, created) {
        Message.create({
            userId: user.id,
            magicianId: user.magicianId,
            body: messageBody,
            fromUser: true
        }).then(function(message) {
            io.in("u_"+user.id).emit('message', message);
            res.set('Content-Type', 'text/xml');
            res.send("true");
        });
    });
});

router.obtainSocketIo = function(passedIo) {
    io = passedIo;
};

module.exports = router;
