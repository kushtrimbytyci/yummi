const { Sequelize } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const Orders = require('./Orders')




const User = db.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    type: {
        type: Sequelize.STRING,
        values: ['client', 'admin'],
        defaultValue: 'client'
    },
    createdAt: { type: Sequelize.DATEONLY },
    updatedAt: { type: Sequelize.DATEONLY }

}, {
    defaultScope: {
        attributes: { exclude: ['password'] }
    }
    ,
})

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

User.prototype.getSignedJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}




User.hasMany(Orders)
Orders.belongsTo(User)


module.exports = User;