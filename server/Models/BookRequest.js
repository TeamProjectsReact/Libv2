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
    isAccept: {
        type: Number
    },
    isReject: {
        type: Number
    }
})

const BookRequest = mongoose.model('BookRequest', BookRequestSchema)

module.exports = BookRequest