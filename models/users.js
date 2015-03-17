var Sequelize = require('sequelize');
var database = require('./database');
var Magician = require('./magicians');

var User = database.define('users', {
    stripeId: {
        type: Sequelize.STRING,
        field: 'stripe_id'
    },
    phoneNumber: {
        type: Sequelize.STRING,
        field: 'phone_number'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    address: {
        type: Sequelize.STRING,
        field: 'address'
    },
    notes: {
        type: Sequelize.TEXT,
        field: 'notes'
    },
    status: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true 
});

module.exports = User;
