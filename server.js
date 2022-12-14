const db = require('./database')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const router = require('./router/router')
const cron = require('node-cron')
const { deleteUser } = require('./controller/userController')
require('dotenv').config()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use('/', router)
app.use(cors())
//const { deleteUser } = require('./controller/userController')

db.sync({ alter: true })
  .then(data => {
    console.log('table synced successfully')
  })
  .catch(err => {
    console.error(err)
  })

async function run () {
  try {
    await db.authenticate()
    console.log('datasource is initialized')
    cron.schedule('*/30 * * * * *', deleteUser)

    deleteUser()
    console.log('deltete evry 60sec')
    app.listen(process.env.port, () => {
      console.log(`listening on port ${process.env.port}`)
    })
  } catch (err) {
    console.log(err.message)
  }
}
run()
