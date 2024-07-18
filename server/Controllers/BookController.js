const Books = require('../Models/Books')
const BookBorrow = require('../Models/BookBorrow')
const BookRequest = require('../Models/BookRequest')

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
            const Fourbooks = await Books.find().sort({ AccNumber: -1 }).limit(6)
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
    },

    UpdateBookData: async(req, res) => {
        try{
            const BookAccNumber = req.params.id
            // console.log(BookAccNumber, req.body)

            const updateFields = {};
            for (const [key, value] of Object.entries(req.body)) {
              if (value !== undefined && value !== '') {
                updateFields[key] = value;
              }
            }

            const BkDataUpdate = await Books.findOneAndUpdate(
                {AccNumber: BookAccNumber},
                updateFields,
                { new: true }
            )
            
            if(BkDataUpdate){
                return res.json({ Status: "Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }

        }   
        catch(err){
            console.log(err)
        }
    },

    BookRequest: async (req, res) => {
        try{
            const BookId = req.params.id
            const Borrower = req.params.email

            // console.log(BookId, Borrower)
            const today = new Date();
            const atherMonth = new Date(today.setDate(today.getDate() + 30));

            const RequestBook = new BookRequest({
                AccNumber: BookId,
                email: Borrower,
                RequestAt: new Date(),
                isReject: 0
            })

            // console.log(BorrowedBook)

            const ResultRequestBk = await RequestBook.save()

            if(ResultRequestBk){
                const BookFind = await Books.findOneAndUpdate(
                    {AccNumber: BookId},
                    {
                        $set: {
                            Status: "Requested"
                        }
                    },
                    { new: true }
                )

                if(BookFind) {
                    return res.json({ Status: "Success"})
                } 
                else{
                    return res.json({ Error: "Internal Server Error"})
                }
            }
            
        }
        catch (err){
            console.log(err)
        }
    },

    CountBookBorrowReq: async (req, res) => {
        try{
            const CountBorrowReq = await BookRequest.countDocuments({ isReject: 0 })

            if(CountBorrowReq){
                return res.json({ Result: CountBorrowReq })
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    GetBookRequestData: async(req, res) => {
        try{
            const GetAllRequests = await BookRequest.find({ isReject: 0 })

            if(GetAllRequests){
                return res.json({ Result: GetAllRequests })
            }
            else{
                return res.json({ Error: 'Internal Server Error'})
            }
        }
        catch(err){
            console.log(err)
        }
    },
    BookRequestAccept: async(req, res) => {
        try{
            
        }
        catch(err) {
            console.log(err)
        }
    }
}

module.exports = BookController