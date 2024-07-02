const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const authController = {
    SignUp: async (req, res) => {
        // console.log(req.body)
        const {
            username,
            email,
            password            
        } = req.body

        const Role = req.body.foundUser.designation

        
    }
}

module.exports = authController