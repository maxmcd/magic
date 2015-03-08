var Sequelize = require('sequelize');
var database = require('./database');

var Charge = database.define('charges', {
    note: {
        type: Sequelize.TEXT,
        field: 'note'
    },
    transactionId: {
        type: Sequelize.STRING,
        field: 'charge_id'
    }
}, {
    freezeTableName: true 
});


module.exports = Charge;
