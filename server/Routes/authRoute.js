const express = require('express')
const authController = require('../Controllers/authController')

const router = express.Router()

router.post('/SignUp', authController.SignUp)

module.exports = router