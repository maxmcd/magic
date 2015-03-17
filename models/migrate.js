var sequelize = require('./database');
var User = require('./users');
var Message = require('./messages');
var Magician = require('./magicians');
var Charge = require('./charges');
var bcrypt = require('bcrypt');

Magician.hasMany(User);
Magician.hasMany(Message);
Magician.hasMany(Charge);
User.hasMany(Message);
User.hasMany(Charge);

var force_migrate, seed;
if (process.env.MIGRATE === "true") {
    force_migrate = true;
} else {
    force_migrate = false;
}
if (process.env.SEED === "true") {
    run_seed = true;
} else {
    run_seed = false;
}
 
sequelize.sync({force: force_migrate}).success(function() {
    console.log('sync done');
    if (run_seed === true) {
        seed();        
    }
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
                    body: "this is a fake message",
                    fromUser: true
                });
            });
        });
    });
};

module.exports = sequelize;
