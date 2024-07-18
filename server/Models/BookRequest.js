const mongoose = require('mongoose')

const BookRequestSchema = new mongoose.Schema({
    AccNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    RequestAt: {
        type: String,
        required: true,
    },
    isReject: {
        type: int
    }
})

const BookRequest = mongoose.model('BookRequest', BookRequestSchema)

module.exports = BookRequest