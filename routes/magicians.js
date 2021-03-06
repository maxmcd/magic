var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Magician = require('../models/magicians');

router.get('/', function(req, res, next) {
    var magicians;
    Magician.findAll().then(function(result) {
        magicians = result;
        res.render('admin/magicians', { title: 'Express', magicians: magicians });
    });
});

router.get('/:id/users', function(req, res, next) {
    var id = req.param('id');
    Magician.find(id).then(function(magician) {
        magician.getUsers().then(function(users) {
            res.json(users);
        });
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
            magician.save();
            res.redirect('/magicians');
        });
    });
});

module.exports = router;
