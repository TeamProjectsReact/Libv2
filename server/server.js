const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 

const authRoute = require('./Routes/authRoute')
const BookRoute = require('./Routes/BookRoute')
const UserRoute = require('./Routes/UserRoute')

const app = express();
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(cors())
app.use(express.json())

// all routes
app.use('/auth', authRoute)
app.use('/books', BookRoute)
app.use('/user', UserRoute)

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
})