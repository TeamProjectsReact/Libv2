const express = require('express')
const BookController = require('../Controllers/BookController')

const router = express.Router()

router.get('/ViewGestBooks', BookController.GestViewBook)
router.get('/CountBooks', BookController.CountAllBooks)
router.get('/SearchBook', BookController.SearchBooks)
router.get('/BkLastID', BookController.LastBookID)
router.post('/AddBook', BookController.AddnewBook)
router.get('/TenLastBooks', BookController.lastBookTen)
router.get('/GetViewBook/:id', BookController.ViewSelectedBook)
router.get('/LastWeek', BookController.BooksAddedLastWeek)
router.get('/FourLastBooks', BookController.lastBookFour)
router.post('/DataUpdateBook/:id', BookController.UpdateBookData)
router.post('/BookRequest/:id/:email', BookController.BookRequest)
router.get('/CountBookBorrowReqeusts', BookController.CountBookBorrowReq)
router.get('/BookRequestData', BookController.GetBookRequestData)

module.exports = router