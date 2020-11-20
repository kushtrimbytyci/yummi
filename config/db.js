const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path:path.join(__dirname,'config.env')})



const db = new Sequelize(process.env.DATABASE_USERNAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: 'remotemysql.com',
  dialect: 'mysql'
});





db.sync()


module.exports = db;