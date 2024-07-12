import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import { BsPeopleFill } from 'react-icons/bs';

const Users = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  const UserData = [
    {id: 1, link: 'Users', name: "Users", icon: <BsPeopleFill />, value: <CountUp end={CountBooks} />, bgColor: "bg-blue-500/30", borderColor: "border-blue-500", style: "text-blue-500"},
    {id: 2, link: 'BorrowReq', name: "Book Requests", icon: <BsJournalCheck />, value: <CountUp end={20} />, bgColor: "bg-green-500/30", borderColor: "border-green-500", style: "text-green-500"},
    {id: 3, link: 'BorrowedBooks', name: "Borrow Books", icon: <BsJournalBookmark />, value: <CountUp end={20} />, bgColor: "bg-red-500/30", borderColor: "border-red-500", style: "text-red-500"},
    {id: 4, link: 'AddNewBook', name: "Add New Book", icon: <BsJournalPlus />, value: "#", bgColor: "bg-green-500", borderColor: "", style: "text-white"},
    {id: 5, link: 'MyBookReq', name: "My Book Requests", icon: <BsJournalBookmark />, value: <CountUp end={20} />, bgColor: "bg-purple-500/30", borderColor: "border-purple-500", style: "text-purple-500"},
    {id: 6, link: 'MyBorrowedBooks', name: "My Borrowed Books", icon: <BsJournalBookmark />, value: <CountUp end={20} />, bgColor: "bg-pink-500/30", borderColor: "border-pink-500", style: "text-pink-500"},
  ]


  if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div>
        <h1 className="text-xl text-gray-500 ">Users</h1>



        
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

export default Users