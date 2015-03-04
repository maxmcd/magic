var sequelize = require('./database')
var User = require('./users')
var Message = require('./messages')
var Magician = require('./magicians')
var bcrypt = require('bcrypt')

Magician.hasMany(User)

sequelize.sync({force: true}).success(function() {
    console.log('sync done');
    seed()
}).error(function(error) {
    console.log('there was a problem');
});

var seed = function() {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash('password', salt, function(err, hash) {
            Magician.create({
                email: 'hello@hello.com',
                password: hash
            }).then(function() {
                User.create({
                    magicianId: 1,
                    phoneNumber: "203-313-1234",
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
            })
        });
    });
}

module.exports = sequelize