const express = require('express')
const BookController = require('../Controllers/BookController')

const router = express.Router()

router.get('/ViewGestBooks', BookController.GestViewBook)

module.exports = router