var express = require('express');
var router = express.Router();

var Magician = require('../models/magicians');

router.get('/', function(req, res, next) {
        // Magician.find({ where: {id: id} }).then(function(magician) {
        //     if (magician == null) {
        //         res.redirect('/login');
        //     } else {
            console.log()
                res.render('dashboard', { 
                    magician: res.locals.magician,
                    title: 'dashboard' 
                });
            // }
});


module.exports = router;
