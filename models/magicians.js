var Sequelize = require('sequelize')
var database = require('../database')
var bcrypt = require('bcrypt')

var Magician = database.define('magicians', {
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    }
}, {
    freezeTableName: true 
});

Magician.sync({force: true}).then(function () {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash('password', salt, function(err, hash) {
            return Magician.create({
                email: 'hello@hello.com',
                password: hash
            });
        });
    });
});

module.exports = Magician;
