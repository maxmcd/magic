var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    if (req.params.login != null) {

    }    
});

module.exports = router;
