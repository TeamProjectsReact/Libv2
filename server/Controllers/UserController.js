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
    },

    SearchUser: async(req, res) => {
        try{
            console.log(req.query)
            const { query } = req.query;
            let searchCriteria = [
              { username: { $regex: query, $options: 'i' } },
              { email: { $regex: query, $options: 'i' } },
              { Role: { $regex: query, $options: 'i' } },
            ];
        
            const items = await User.find({ $or: searchCriteria });

            if(items){
                // return res.json({ Result: items })
                console.log(items)
            }   
            else{
                return res.json({ Error: "No Book Found"})
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = UserController