var Sequelize = require('sequelize')
var database = require('../database')

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
  // Table created
});

module.exports = Magician;
