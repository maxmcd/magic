var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
    res.render('magicians', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    if (req.params.newMagician != null) {
        var email = req.params.email;
    }    
});



module.exports = router;
