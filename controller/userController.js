const user1 = require('../model/user')
const db = require('../database')
const console = require('console')
const { where } = require('sequelize')

//post

const add = async (req, res) => {
  try {
    const resp = await user1.create(req.body)

    console.log(' record saved successfully')

    console.log(resp.toJSON())

    res.status(200).json({
      message: 'record saved successfully',
      res: resp
    })
  } catch (err) {
    console.error(err.message)
    res.status(400).json({
      message: 'record not saved successfully',
      err: err.message
    })
  }
}
const deleteUser = async (req, res) => {
  try {
    var date = new Date()
    var formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`
    console.log(formattedDate)
    await user1.destroy({
      where: {
        expiryDate: formattedDate
      }
    })
    console.log('rows deleted in db')
    console.log('running this task in every 60sec')
  } catch (error) {
    console.error(err.message)
    res.status(400).json({
      message: 'record not saved successfully',
      err: err.message
    })
  }
}
module.exports = { add, deleteUser }
