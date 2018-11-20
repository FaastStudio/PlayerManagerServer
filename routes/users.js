const express = require('express')
const router = express.Router()
const userController = require('../app/api/controllers/Users')

router.post('/register', userController.create)
router.post('/auth', userController.authenticate)

module.exports = router
