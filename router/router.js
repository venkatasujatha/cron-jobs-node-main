const router = require('express').Router()
const userController = require('../controller/userController')

//post
router.post('/save', userController.add)
//router.delete('/delete',userController.deleteUser)
//router.get('/get',userController.updateAndDelete)

module.exports = router
