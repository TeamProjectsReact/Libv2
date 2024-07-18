const mongoose = require('mongoose')

const BookBorrowSchema = new mongoose.Schema({
    AccNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    borrowedAt: {
        type: String,
        required: true,
    },
    returnAt: {
        type: String,
        required: true,
    },
    shouldReturnAt: {
        type: String,
        required: true,
    }
})

const BookBorrow = mongoose.model('BookBorrow', BookBorrowSchema)

module.exports = BookBorrow