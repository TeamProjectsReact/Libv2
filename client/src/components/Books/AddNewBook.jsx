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

  if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div>
          <Books />
          <div className="my-4">
            <h1 className="text-gray-500 font-semibold text-xl">Add New Book</h1>
            <hr />
            last Book : {BookLastID}
            <div className="">
              <div className="md:grid grid-cols-3 gap-4">

                <div className="my-2">
                  <label htmlFor="" className="text-gray-500">Book Acc Number</label>
                  <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" value={BookLastID + 1} placeholder='Book Title'/>
                </div>
  
                <div className="my-2">
                  <label htmlFor="" className="text-gray-500">Book Title</label>
                  <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Book Title'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className="text-gray-500">Class No</label>
                  <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Book Class No'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className="text-gray-500">Author / Editor 1</label>
                  <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Author / Editor 1'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className="text-gray-500">Author / Editor 2</label>
                  <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Author / Editor 2'/>
                </div>

                
                <div className="my-2">
                  <label htmlFor="" className="text-gray-500">Discription</label>
                  <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200 rounded" placeholder='Discription'/>
                </div>
  
              </div>
            </div>
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