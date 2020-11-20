const { Sequelize } = require("sequelize");
const db = require("../config/db");
const Products = require('./Products')
const Orders = require('./Orders')


const Product_orders = db.define("Product_order", {
  price: Sequelize.STRING,
  quantity: Sequelize.STRING,
});

Products.belongsToMany(Orders, { through: "Product_order" })
Orders.belongsToMany(Products, { through: "Product_order" })

module.exports = Product_orders;
