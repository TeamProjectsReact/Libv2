const express = require('express')
const UserController = require('../Controllers/UserController')

const router = express.Router()

router.get('/CountUsers', UserController.CountUsers)
router.get('/LastUsers', UserController.LastTenUser)
router.get('/SearchUser', UserController.SearchUser)

module.exports = router