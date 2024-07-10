import Books from './Books'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';

const AddNewBook = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  // get last book ID
  const [BookLastID, SetBookLastID] = useState([])

  useEffect(() => {
      axios.get('http://localhost:5000/books/BkLastID')
      .then(res => SetBookLastID(res.data.Result))
      .catch(err => console.log(err))
  }, [])

  // add new book

  const [addBook, SetaddBook] = useState({
    AccNumber: '',
    Title: '',
    ClassNo: '',
    AuthorEditor1: '',
    AuthorEditor2: '',
    Discription: '',
    ISBNNumber: '',
    Keywords1: '',
    Keywords2: '',
    Publisher: '',
    Year: '',
    Place: ''
  })

  
  const headleAddBook = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post('http://localhost:5000/books/AddBook', addBook)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Book Added Successful")
          window.location()
        }
        else{
          alert(res.data.Error)
        }
      })
    }
    catch (err) {
      console.log(err)
    }

  }

  if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div>
          <Books />
          <div className="my-4">
            <h1 className="text-gray-500 font-semibold text-xl">Add New Book</h1>
            <hr />
            last Book : {BookLastID}
            <form method='post' onSubmit={headleAddBook}>
              <div className="">
                <div className="md:grid grid-cols-3 gap-4">

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Book Acc Number</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" value={BookLastID + 1} placeholder='Book Title'
                    onChange={e => SetaddBook({ AccNumber: e.target.value })}/>
                  </div>
    
                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Book Title</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Book Title'
                    onChange={e => SetaddBook({ Title: e.target.value })}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Class No</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Book Class No'
                    onChange={e => SetaddBook({ ClassNo: e.target.value })}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Author / Editor 1</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Author / Editor 1'
                    onChange={e => SetaddBook({ AuthorEditor1: e.target.value })}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Author / Editor 2</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Author / Editor 2'
                    onChange={e => SetaddBook({ AuthorEditor2: e.target.value })}/>
                  </div>
                  
                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Discription</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Discription'
                    onChange={e => SetaddBook({ Discription: e.target.value })}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">ISBN Number</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='ISBN Number'
                    onChange={e => SetaddBook({ ISBNNumber: e.target.value })}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Keywords 1</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Keywords 1'
                    onChange={e => SetaddBook({ Keywords1: e.target.value })}/>
                  </div>
                  
                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Keywords 2</label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Keywords 2'
                    onChange={e => SetaddBook({ Keywords2: e.target.value })}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Publisher </label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Publisher'
                    onChange={e => SetaddBook({ Publisher: e.target.value })}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Publish Year </label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Publish Year'
                    onChange={e => SetaddBook({ Year: e.target.value })}/>
                  </div>

                  <div className="my-2">
                    <label htmlFor="" className="text-gray-500">Publish Place </label>
                    <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Publish Place'
                    onChange={e => SetaddBook({ Place: e.target.value })}/>
                  </div>  
                </div>

                <div className="my-4">
                  <button type="submit" className="bg-purple-500 text-white rounded py-2 px-4 duration-500 hover:bg-purple-600">Add New Book</button>
                </div>
              </div>
            </form>
          </div>
      </div>
    )
  }
  else{
    useEffect(() => {
      localStorage.clear()
      navigate('/')
    }, [])
  }
}

export default AddNewBook