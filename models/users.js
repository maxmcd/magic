var Sequelize = require('sequelize')
var database = require('./database')
var Magician = require('./magicians')

var User = database.define('users', {
    stripeId: {
        type: Sequelize.STRING,
        field: 'stripe_id'
    },
    phoneNumber: {
        type: Sequelize.STRING,
        field: 'phone_number'
    },
    status: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true 
});

module.exports = User;
