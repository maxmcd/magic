var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Magician = require('../models/magicians');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    Magician.find({ where: {email: req.body.email} }).then(function(magician) {
        if (magician == null) {
            res.redirect('/login');
        }
        bcrypt.compare(req.body.password, magician.password, function(err, match) {
            if (match == true) {
                res.redirect('/dashboard');
            } else {
                res.redirect('/login');
            }
        });
    });
});

module.exports = router;
