var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
var Magician = require('../models/magicians');

router.get('/', function(req, res, next) {
    var note = req.session.note;
    req.session.note = null;
    req.session.save(function() {
        res.render('login', { title: 'Login', note: note });
    });
});

router.get('/quit', function(req, res, next) {
    req.session.destroy(function() {    
        console.log("SDSD");
        res.redirect('/');        
    });
});

router.post('/', function(req, res, next) {
    Magician.find({ where: {email: req.body.email} }).then(function(magician) {
        if (magician === null) {
            req.session.note = "Invalid email";
            req.session.save(function() {
                res.redirect('/login');                
            });
        }
        if (req.body.password === null || req.body.password === '') {
            req.session.note = "Password can't be blank";
            req.session.save(function() {
                res.redirect('/login');                
            });
        }
        bcrypt.compare(req.body.password, magician.password, function(err, match) {
            if (match === true) {
                req.session.magician_id = magician.id;
                req.session.save(function() {
                    res.redirect(
                        req.session.previous_url || 
                        '/dashboard'
                    );                    
                });
            } else {
                req.session.note = "Invalid password";
                req.session.save(function() {
                    res.redirect('/login');                    
                });
            }
        });
    });
});

module.exports = router;
