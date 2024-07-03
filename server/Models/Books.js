const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    accNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    classNo: {
        type: String,
        required: true,
    },
    authorEditor: {
        type: String,
    },
    description: {
        type: String,
    },
    isbnNumber: {
        type: String,
    },
    keywords: {
        type: String,
    },
    publisher: {
        type: String,
        required: true,
    },
    yearOfPublication: {
        type: Number,
        required: true,
    },
    placeOfPublisher: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

const Book = mongoose.model('books', BookSchema)

module.exports = Book