var Sequelize = require('sequelize')
var sequelize
if (process.env.NODE_ENV == 'production') {

} else {
    sequelize = new Sequelize(
        'magictest', 
        null, 
        null, 
        {
            dialect: 'postgres'
        }
    )
}

module.exports = sequelize
