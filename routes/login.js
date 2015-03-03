var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    if (req.params.login != null) {

    } else if (req.params.register != null) {
        bcyrpt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.params.password, salt, function(err, hash) {
                
            });
        });
    }    
});



module.exports = router;
