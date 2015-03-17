var Sequelize = require('sequelize');
var sequelize;
if (process.env.NODE_ENV == 'PRODUCTION') {
    sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
    sequelize = new Sequelize(
        'magictest', 
        null, 
        null, 
        {
            dialect: 'postgres'
        }
    );
}

module.exports = sequelize;

