const User = require('../Models/User')

const UserController = {
    CountUsers: async(req, res) => {
        try{
            const UserCount = await User.countDocuments()

            if(UserCount){
                return res.json({Result: UserCount})
            }
            else{
                return res.json({Error: "Internal Server Error"})
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    LastTenUser: async (req, res) => {
        try{
            const TenUsers = await User.find().sort({ createdAt: -1 }).limit(10);

            if(TenUsers){
                return res.json({ Result: TenUsers })
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = UserController