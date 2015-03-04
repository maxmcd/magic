var Sequelize = require('sequelize')
var database = require('./database')
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

// Seeds
if (process.env.NODE_ENV != 'production') {
}

module.exports = Magician;
