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
       try{
            const lastBook = await Books.findOne().sort({ AccNumber: -1 }).limit(1);
            // console.log(lastBook.AccNumber)

            if(lastBook){
                return res.json({ Result: lastBook.AccNumber })
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
       }    
       catch(err) {
            console.log(err)
       } 
    },
    AddnewBook: async (req, res) => {
        try{
            // console.log(req.body)

            const lastBook = await Books.findOne().sort({ AccNumber: -1 }).limit(1);
            const newBkAccNo = lastBook.AccNumber + 1
            // console.log(newBkAccNo)
            
            const {
                Title,
                ClassNo,
                AuthorEditor1,
                AuthorEditor2,
                Discription,
                ISBNNumber,
                Keywords1,
                Keywords2,
                Publisher,
                Year,
                Place
            } = req.body

            const checkBook = await Books.findOne({ isbnNumber: ISBNNumber })

            if(checkBook) {
                return res.json({ Error: "Book Already in Database According to Given ISBN Number"})
            }
            else{
                const BookNew = new Books({
                    AccNumber: newBkAccNo,
                    Title: Title,
                    ClassNo: ClassNo, 
                    AuthorEditort: AuthorEditor1,
                    AuthorEditor: AuthorEditor2,
                    Discription: Discription,
                    ISBNNumber: ISBNNumber,
                    Keywords1: Keywords1,
                    Keywords2: Keywords2,
                    Publisher: Publisher,
                    YearofPublication: Year,
                    PlaceofPublisher: Place,
                    Status: "Available"
                })

                const ResultBook = BookNew.save();

                if(ResultBook) {
                    return res.json({ Status: "Success"})
                }
                else{
                    return res.json({ Error: "Internal Server Error"})
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    lastBookTen: async (req, res) => {
        try{
            const Tenbooks = await Books.find().sort({ AccNumber: -1 }).limit(10)
            // console.log(Tenbooks)
            
            if(Tenbooks) {
                return res.json({Result: Tenbooks})
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