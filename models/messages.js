var Sequelize = require('sequelize')
var database = require('./database')

var Message = database.define('messages', {
    body: {
        type: Sequelize.TEXT,
        field: 'body'
    },
    fromUser: {
        type: Sequelize.BOOLEAN,
        field: 'from_user'
    }
}, {
    freezeTableName: true 
});

module.exports = Message;
