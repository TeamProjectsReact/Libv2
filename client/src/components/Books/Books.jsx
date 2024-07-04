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
      <div>Books</div>
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