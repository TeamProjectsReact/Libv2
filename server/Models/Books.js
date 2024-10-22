const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    AccNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    Title: {
        type: String,
        required: true,
    },
    ClassNo: {
        type: "mixed",
    },
    AuthorEditort: {
        type: String,
    },
    AuthorEditor: {
        type: String,
    },
    Discription: {
        type: String,
    },
    ISBNNumber: {
        type: String,
    },
    Keywords1: {
        type: String,
    },
    Keywords2: {
        type: String,
    },
    Publisher: {
        type: String,
    },
    YearofPublication: {
        type: Number,
    },
    PlaceofPublisher: {
        type: String,
    },
    Status: {
        type: String,
        required: true,
    },
    AddedData: {
        type: Date,
        default: Date.now
    }
})

const Books = mongoose.model('Books', BookSchema)

module.exports = Books