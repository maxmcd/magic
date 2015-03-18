var express = require('express');
var router = express.Router();

var Magician = require('../models/magicians');
var Message = require('../models/messages');

router.get('/', function(req, res, next) {
    var magician = res.locals.magician;
    magician.getUsers({include: [ Message ]}).then(function(users) {
        res.render('dashboard', {
            magician: res.locals.magician,
            title: 'dashboard',
            users: users,
            displayTitle: process.env.MAGIC_NAME,
            host: req.headers.host
        });
    });
});


module.exports = router;
