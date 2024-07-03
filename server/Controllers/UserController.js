const User = require('../Models/User')

const UserController = {
    CountUsers: async(req, res) => {
        try{
            const UserCount = await User.countDocuments()
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = UserController