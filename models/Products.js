const { Sequelize } = require('sequelize')
const db = require('../config/db')


const Products = db.define('Product', {
    product_name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    topping: Sequelize.JSON,
    path: Sequelize.STRING
})




module.exports = Products;