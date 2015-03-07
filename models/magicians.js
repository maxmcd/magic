var Sequelize = require('sequelize');
var database = require('./database');

var Magician = database.define('magicians', {
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        file: 'is_admin',
        defaultValue: false
    }
}, {
    freezeTableName: true 
});

// Seeds
if (process.env.NODE_ENV != 'production') {
}

module.exports = Magician;
