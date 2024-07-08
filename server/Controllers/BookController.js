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


            const query = {};
            if (Title) query.Title = new RegExp(Title, 'i');
            if (Author) {
            query.$or = [
                { AuthorEditort: new RegExp(Author, 'i') },
                { AuthorEditor: new RegExp(Author, 'i') }
            ];
            }
            if (ISBNNumber) query.ISBNNumber = new RegExp(ISBNNumber, 'i');
            if (Keywords) {
            query.$or = [
                { Keywords1: new RegExp(Keywords, 'i') },
                { Keywords2: new RegExp(Keywords, 'i') }
            ];
            }
            if (Publisher) query.Publisher = new RegExp(Publisher, 'i');
            if (YearofPublication) query.YearofPublication = YearofPublication;
            if (PlaceofPublisher) query.PlaceofPublisher = new RegExp(PlaceofPublisher, 'i');

            const BookData = await Books.find(query);

            if(BookData){
                return res.json({ Result: BookData })
                // console.log(BookData)
            }   
            else{
                return res.json({ Error: "No Book Found"})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    LastBookID: async(req, res) => {
        
    },
}

module.exports = BookController