import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import CountUp from 'react-countup'
import { BsBook } from 'react-icons/bs';


const Books = () => {

  const bookData = [
     {id: 1, name: "Books", icon: <BsBook />, value: <CountUp end={20} />, bgColor: "bg-blue-500/30", borderColor: "border-blue-500", style: "text-blue-500"}
  ]

  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div>
        <div className="">
          {
            bookData.map((book) => {
              return (
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
              )
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