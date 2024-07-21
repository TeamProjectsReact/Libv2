import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import CountUp from 'react-countup'
import { BsBook, BsJournalBookmark, BsJournalCheck, BsJournalPlus } from 'react-icons/bs';


const Books = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");


    // count books
    const [CountBooks, SetCountBooks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/books/CountBooks')
        .then(res => SetCountBooks(res.data.Result))
        .catch(err => console.log(err))
    }, [])

    // book borrow requests 
    const [CountBKRequests, SetCountBKRequests] = useState(0)

    useEffect(() => {
      axios.get('http://localhost:5000/books/CountBookBorrowReqeusts')
      .then(res => SetCountBKRequests(res.data.Result))
      .catch(err => console.log(err))
    }, [])

    // count book borrowed
    const [BookBorrowedCount, SetBookBorrowedCount] = useState(0)
    
    useEffect(() => {
      axios.get('http://localhost:5000/books/CountBookBorrow')
      .then(res => SetBookBorrowedCount(res.data.Result))
      .catch(err => console.log(err))
    }, [])

    const bookData = [
      {id: 1, link: 'AllBooks', name: "Books", icon: <BsBook />, value: <CountUp end={CountBooks} />, bgColor: "bg-blue-500/30", borderColor: "border-blue-500", style: "text-blue-500"},
      {id: 2, link: 'BorrowReq', name: "Book Requests", icon: <BsJournalCheck />, value: <CountUp end={CountBKRequests} />, bgColor: "bg-green-500/30", borderColor: "border-green-500", style: "text-green-500"},
      {id: 3, link: 'BorrowedBooks', name: "Borrow Books", icon: <BsJournalBookmark />, value: <CountUp end={BookBorrowedCount} />, bgColor: "bg-red-500/30", borderColor: "border-red-500", style: "text-red-500"},
      {id: 4, link: 'AddNewBook', name: "Add New Book", icon: <BsJournalPlus />, value: "#", bgColor: "bg-green-500", borderColor: "", style: "text-white"},
      {id: 5, link: 'MyBookReq', name: "My Book Requests", icon: <BsJournalBookmark />, value: <CountUp end={20} />, bgColor: "bg-purple-500/30", borderColor: "border-purple-500", style: "text-purple-500"},
      {id: 6, link: 'MyBorrowedBooks', name: "My Borrowed Books", icon: <BsJournalBookmark />, value: <CountUp end={20} />, bgColor: "bg-pink-500/30", borderColor: "border-pink-500", style: "text-pink-500"},
    ]

  if(RoleUser !== null && EmailUser !== null){
    return (
      <div>
        <div className="">
          <h1 className="text-xl text-gray-500 mb-4">Books</h1>
        </div>
        <div className="md:grid grid-cols-4 gap-4">
          {
            bookData.map((book) => {
              if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
                if(book.id !== 5 && book.id !== 6){
                  return (
                    <a href={book.link}>
                      <div className={`md:my-0 my-2 ${book.bgColor} text-white px-4 py-8 rounded border-l-4 shadow-lg shadow-red ${book.borderColor}`}>
                          <div className="flex justify-between">
                              <div className="">
                                  <h1 className={`text-3xl font-semibold ${book.style}`}>{book.value}</h1>
                                  <p className={`${book.style}`}>{book.name}</p> 
                              </div>
                              <div className="">
                                  <p className={`text-4xl ${book.style} pt-2`}>{book.icon}</p>
                              </div>
                          </div>
                      </div>
                    </a>
                  )
                }
              }
              else{
                if(book.id !== 2 && book.id !== 3 && book.id !== 4){
                  return (
                    <a href={book.link}>
                      <div className={`md:my-0 my-2 ${book.bgColor} text-white px-4 py-8 rounded border-l-4 shadow-lg shadow-red ${book.borderColor}`}>
                          <div className="flex justify-between">
                              <div className="">
                                  <h1 className={`text-3xl font-semibold ${book.style}`}>{book.value}</h1>
                                  <p className={`${book.style}`}>{book.name}</p> 
                              </div>
                              <div className="">
                                  <p className={`text-4xl ${book.style} pt-2`}>{book.icon}</p>
                              </div>
                          </div>
                      </div>
                    </a>
                  )
                }
              }
            })
          }
        </div>
      </div>
    )
  }
  else{
    useEffect(() => {
      localStorage.clear()
      navigate('/')
    })
  }
}

export default Books