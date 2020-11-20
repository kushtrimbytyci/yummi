const { Sequelize } = require('sequelize')
const db = require('../config/db')
const User = require('./User')

const Orders = db.define('Order', {
    total: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
})




module.exports = Orders;