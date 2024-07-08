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
    },

    SearchBooks: async(req, res) => {
        try{
            const {
                Title,
                Author,
                ISBNNumber,
                Keywords,
                Publisher,
                YearofPublication,
                PlaceofPublisher
            } = req.query;
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = BookController