var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.get('/login', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
        
});


module.exports = router;
