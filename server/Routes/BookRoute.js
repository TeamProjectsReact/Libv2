const express = require('express')
const BookController = require('../Controllers/BookController')

const router = express.Router()

router.get('/ViewGestBooks', BookController.GestViewBook)
router.get('/CountBooks', BookController.CountAllBooks)
router.get('/SearchBook', BookController.SearchBooks)

module.exports = router