var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
        number: process.env.MAGIC_PHONE_NUMBER, 
        name: process.env.MAGIC_NAME
    });
});

module.exports = router;
