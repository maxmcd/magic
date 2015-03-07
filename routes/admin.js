var express = require('express');
var router = express.Router();

var Magician = require('../models/magicians');
var Message = require('../models/messages');
var User = require('../models/users');

router.get('/', function(req, res, next) {
    var response = {};

    Magician.count().then(function(count) {
        response.magician_count = count;

        return User.count();
    }).then(function(count) {
        response.user_count = count;

        return Message.count();
    }).then(function(count) {
        response.message_count = count;
        
        res.render('admin', response); 
    });

});


module.exports = router;
