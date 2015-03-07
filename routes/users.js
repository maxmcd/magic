var express = require('express');
var router = express.Router();
var User = require('../models/users')
var Message = require('../models/messages');
var stripe = require('stripe')(process.env.STRIPE_MAGIC_API_KEY);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/:id', function(req, res, next) {
    var id = req.params('id');
    var name = req.params('name');
    var address = req.params('address');
    var notes = req.params('notes'); 
    User.find(id).then(function(user) {
        user.name = name;
        user.address = address;
        user.notes = notes;
        user.save()
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params('id');
    User.find({
        where: {id: id},
        include: [ Message ]
    }).then(function(user) {
        res.json(user);
    });
});

router.post('/assign-new', function(req, res, next) {
    User.find({
        where: {magicianId: null}
    })
})

router.get('/:id/cc/', function(req, res, next) {
    var id = req.params('id');
    res.render('cc', {userId: id})
})

router.post('/:id/cc/', function(req, res, next) {
    console.log(req)
    var id = req.params('id');
    var token = req.body["token[id]"]
    User.find(id).then(function(user) {
        user.stripeId = token
        user.save().then(function(user) {
            res.json(true)           
        })
    })
    // should alert a socket here that 
    // the card is ready
    // maybe just send a message?
})

router.post("/:id/charge/", function(req, res, next) {
    var amount = req.body.amount
    
    var formattedAmount = Math.round(amount*100)
    // stripe needs 1040, not 10.40

    User.find(id).then(function(user) {
        stripe.charges.create({
          amount: formattedAmount,
          currency: "usd",
          source: user.stripeId, // obtained with Stripe.js
          description: "Charge for Magic"
        }, function(err, charge) {
            if (!err) {
                res.json(true)
                return
            }
        });
    })
    res.status(500).send('Something broke!');
})

module.exports = router;
