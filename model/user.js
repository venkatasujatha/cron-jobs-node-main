const { Sequelize } = require('sequelize')

const db = require('../database')

const user1 = db.define(
  'user1',
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    expiryDate: {
      type: Sequelize.DATEONLY,
      defaultValue: Date.now(),
      allowNull: false
    },
    validity: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = user1
