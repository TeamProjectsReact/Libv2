import Books from './Books'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';

const AllBooks = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  if(RoleUser !== null && EmailUser !== null){
    return (
      <div>
          <Books />
          <div className="my-8">
            <h1 className="text-xl font-semibold text-gray-500">Search Books</h1>
            <hr />

            <form>
              <div className="md:grid grid-cols-4 gap-4">
                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Book Title : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Title'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Author / Editor : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Author or Editor'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>ISBN Number : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books ISBN Number'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Keywords : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Keywords'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Publisher : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Publisher'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Year of Publication : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Year of Publication'/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Place of Publication : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Place of Publication'/>
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

export default AllBooks