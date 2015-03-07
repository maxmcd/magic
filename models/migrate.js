var sequelize = require('./database');
var User = require('./users');
var Message = require('./messages');
var Magician = require('./magicians');
var Charge = require('./charges');
var bcrypt = require('bcrypt');

Magician.hasMany(User);
Magician.hasMany(Message);
User.hasMany(Message);
User.hasMany(Charge);

sequelize.sync({force: true}).success(function() {
    console.log('sync done');
    seed();
}).error(function(error) {
    console.log('there was a problem');
});

var seed = function() {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash('password', salt, function(err, hash) {
            Magician.create({
                email: 'admin@hello.com',
                password: hash,
                isAdmin: true
            });
            Magician.create({
                email: 'hello@hello.com',
                password: hash
            }).then(function() {
                User.create({
                    magicianId: 1,
                    phoneNumber: "+12033133609",
                    status: "active"
                });
                User.create({
                    magicianId: 1,
                    phoneNumber: "203-313-1234",
                    status: "new"
                });
                User.create({
                    magicianId: 1,
                    phoneNumber: "203-313-1234",
                    status: "complete"
                });
                User.create({
                    phoneNumber: "+11234567890",
                    status: "new"
                });
                Message.create({
                    userId: 1,
                    body: "this is a fake message"
                });
            });
        });
    });
};

module.exports = sequelize;
