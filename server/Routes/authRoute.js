const express = require('express')
const authController = require('../Controllers/authController')

const router = express.Router()

router.post('/SignUp', authController.SignUp)
router.post('/SignIn', authController.SignIn)

module.exports = router