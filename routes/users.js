var express = require('express');
var router = express.Router();
var User = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id/cc/', function(req, res, next) {
    var id = req.param('id');
    res.render('cc', {userId: id})
})

router.post('/:id/cc/', function(req, res, next) {
    console.log(req)
    var id = req.param('id');
    var token = req.body["token[id]"]
    User.find(id).then(function(user) {
        user.stripeId = token
        user.save().then(function(user) {
            res.json(true)           
        })
    })
})

module.exports = router;
