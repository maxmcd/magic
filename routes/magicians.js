var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Magician = require('../models/magicians');

router.get('/', function(req, res, next) {
    res.render('magicians', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    console.log('h');
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password);
    bcrypt.genSalt(10, function(err, salt) {
        console.log('e');
        bcrypt.hash(password, salt, function(err, hash) {
            console.log('l');
            magician = Magician.build({
                email: email,
                password: hash
            });
            magician.save()
            res.redirect('/magicians');
            console.log('o');
        });
    });
});



module.exports = router;
