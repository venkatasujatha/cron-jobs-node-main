const router = require('express').Router()
const userController = require('../controller/userController')

//post
router.post('/save', userController.add)

module.exports = router
