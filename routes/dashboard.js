var express = require('express');
var router = express.Router();

var Magician = require('../models/magicians');

router.get('/', function(req, res, next) {
    var magician = res.locals.magician

    magician.getUsers().then(function(users) {
        res.render('dashboard', {
            magician: res.locals.magician,
            title: 'dashboard',
            users: users,
            displayTitle: process.env.MAGIC_NAME
        });
    })
});


module.exports = router;
