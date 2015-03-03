var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
    res.render('magicians', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    if (req.params.newMagician != null) {
        var email = req.params.email;
        var password = req.params.password;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err hash) {
                
            });
        });
    }
});



module.exports = router;
