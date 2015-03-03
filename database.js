var Sequelize = require('sequelize')
var sequelize
if (process.env.NODE_ENV == 'production') {

} else {
    sequelize = new Sequelize(
        'magic', 
        null, 
        null, 
        {
            dialect: 'postgres'
        }
    )
}

module.exports = sequelize