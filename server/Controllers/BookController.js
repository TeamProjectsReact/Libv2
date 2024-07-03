const Books = require('../Models/Books')

const BookController = {
    GestViewBook: async (req, res) => {
        try{
            const AllBooks = await Books.find()

            if(AllBooks){
                return res.json({ Result: AllBooks })
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    CountAllBooks: async(req, res) => {
        try{
            const countBooks = await Books.countDocuments()

            if(countBooks) {
                return res.json({ Result: countBooks })
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

module.exports = BookController