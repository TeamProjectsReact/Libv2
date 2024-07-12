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
            console.log(req.query)
            const { query } = req.query;
            let searchCriteria = [
              { Title: { $regex: query, $options: 'i' } },
              { ClassNo: { $regex: query, $options: 'i' } },
              { AuthorEditort: { $regex: query, $options: 'i' } },
              { AuthorEditor: { $regex: query, $options: 'i' } },
              { Description: { $regex: query, $options: 'i' } },
              { ISBNNumber: { $regex: query, $options: 'i' } },
              { Keywords1: { $regex: query, $options: 'i' } },
              { Keywords2: { $regex: query, $options: 'i' } },
              { Publisher: { $regex: query, $options: 'i' } },
              { PlaceofPublisher: { $regex: query, $options: 'i' } },
              { Status: { $regex: query, $options: 'i' } },
            ];
        
            if (!isNaN(query)) {
              searchCriteria.push({ YearofPublication: parseInt(query) });              
            }          

            const items = await Books.find({ $or: searchCriteria });

            if(items){
                return res.json({ Result: items })
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
    },

    lastBookFour: async (req, res) => {
        try{
            const Fourbooks = await Books.find().sort({ AccNumber: -1 }).limit(4)
            // console.log(Tenbooks)
            
            if(Fourbooks) {
                return res.json({Result: Fourbooks})
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }   
        catch (err) {
            console.log(err)
        }
    },

    ViewSelectedBook: async (req, res) => {
        try{
            // console.log(req.params.id)
            const getBook = await Books.findOne({ AccNumber:req.params.id })

            if(getBook) {
                return res.json({ Result: getBook })
                // console.log(getBook)
            }
            else{
                return res.json({ Error: "Internal Server Error" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    BooksAddedLastWeek: async(req, res) => {
        try{
            const today = new Date();
            const last7Days = new Date(today.setDate(today.getDate() - 7));
            const books = await Books.aggregate([
              {
                $match: {
                  AddedData: {
                    $gte: last7Days
                  }
                }
              },
              {
                $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$AddedData" } },
                  count: { $sum: 1 }
                }
              },
              {
                $sort: { _id: 1 }
              }
            ]);
            
            res.json(books);
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = BookController