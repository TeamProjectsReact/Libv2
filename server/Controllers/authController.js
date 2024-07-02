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

        const checkUser = await User.findOne({ email: email, username: username})

        if(checkUser){
            return res.json({ Error: "User Already in Database"})
        }
        else{
            const hashPass = await bcrypt.hash(password, 10)

            if(hashPass){
                
            }
            else{
                return res.json({ Error: "Error White Hashing Password"})
            }
        }

    }
}

module.exports = authController