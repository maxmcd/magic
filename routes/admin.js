var express = require('express');
var router = express.Router();

var Magician = require('../models/magicians');
var Message = require('../models/messages');
var User = require('../models/users');

router.get('/', function(req, res, next) {
    var msg_count, mag_count, usr_count;

    Magician.count().on('success', function(e) {
        msg_count = e;

        User.count().on('success', function(e) {
            usr_count = e;

            Magician.count().on('success', function(e) {
                mag_count = e;

                res.render('admin', {
                    magician_count: mag_count,
                    message_count: msg_count,
                    user_count: usr_count
                }); 

            });
        });
    });

});


module.exports = router;
