const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const authController = {
    SignUp: async (req, res) => {
        try{
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
                    const NewUser = new User({
                        username: username,
                        email: email,
                        password: hashPass,
                        Role: Role
                    })

                    const ResultUser = NewUser.save()

                    if(ResultUser){
                        return res.json({ Status: "Success"})
                    }
                    else{
                        return res.json({ Error: "Internal Server Error"})
                    }
                }
                else{
                    return res.json({ Error: "Error White Hashing Password"})
                }
            }
        }
        catch (err){
            console.log(err)
        }
    },

    SignUp: async(req, res) => {
        console.log(req.body)
    }
}

module.exports = authController