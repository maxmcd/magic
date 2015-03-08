var express = require('express');
var router = express.Router();

var Magician = require('../models/magicians');
var Message  = require('../models/messages');
var User     = require('../models/users'); 
var Charge   = require('../models/charges');

var models = {
    user: User, 
    message: Message,
    magician: Magician,
    charge: Charge,  
};

router.get('/', function(req, res, next) {
    var response = {};
    response.keys = [];

    for (var model in models) {
        response.keys.push(model);
    }


    Magician.count().then(function(count) {
        response.magician_count = count;

        return User.count();
    }).then(function(count) {
        response.user_count = count;

        return Message.count();
    }).then(function(count) {
        response.message_count = count;
        
        res.render('admin/admin', response); 
    });

});

router.get('/:table/all', function(req, res, next) {
    models[req.params.table].findAndCountAll({
        offset: 0,
        limit: 10
    }).then(function(result) {
        res.json(result);
    });   
});

router.post('/:table/:id', function(req, res, next) {
    models[req.params.table].find(req.params.id)
    .then(function(thing) {
        console.log(req.body);
        for (var attr in req.body) {
            var value = req.body[attr];
            if (value === "") {
                value = null;
            }
            thing[attr] = value; 
        }
        console.log(thing);
        thing.save().then(function(thing) {
            res.json(thing);
        });
    });
});

router.get('/:table/:id', function(req, res, next) {
    models[req.params.table].
        find(req.params.id).
        then(function(thing) {
            res.json(thing);
    });        
});


module.exports = router;
