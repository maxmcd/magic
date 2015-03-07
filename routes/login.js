var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
var Magician = require('../models/magicians');

router.get('/', function(req, res, next) {
    var note = req.session.note;
    req.session.note = null;
    res.render('login', { title: 'Login', note: note });
});

router.get('/quit', function(req, res, next) {
    req.session.magician_id = null;
    res.redirect('/');
});

router.post('/', function(req, res, next) {
    Magician.find({ where: {email: req.body.email} }).then(function(magician) {
        if (magician === null) {
            req.session.note = "Invalid email";
            res.redirect('/login');
        }
        bcrypt.compare(req.body.password, magician.password, function(err, match) {
            if (match === true) {
                req.session.magician_id = magician.id;
                res.redirect(
                    req.session.previous_url || 
                    '/dashboard'
                );
            } else {
                req.session.note = "Invalid password";
                res.redirect('/login');
            }
        });
    });
});

module.exports = router;
