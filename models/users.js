var Sequelize = require('sequelize')
var database = require('../database')

var User = database.define('users', {
    stripeId: {
        type: Sequelize.STRING,
        field: 'stripe_id'
    },
    phoneNumber: {
        type: Sequelize.STRING,
        field: 'phone_number'
    }
}, {
    freezeTableName: true 
});

User.sync({force: true}).then(function () {
  // Table created
});

module.exports = User;
