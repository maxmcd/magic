var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Magician = require('../models/magicians');

router.get('/', function(req, res, next) {
    var magicians;
    Magician.findAll().then(function(result) {
        magicians = result;
        res.render('magicians', { title: 'Express', magicians: magicians });
    });
});

router.post('/add', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            magician = Magician.build({
                email: email,
                password: hash
            });
            magician.save()
            res.redirect('/magicians');
        });
    });
});



module.exports = router;
