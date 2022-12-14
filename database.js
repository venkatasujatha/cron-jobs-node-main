const {Sequelize}  = require('sequelize');
require('dotenv').config()
const db = new Sequelize({
  
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "postgres",
  dialect:"postgres"
  
});

module.exports = db ;