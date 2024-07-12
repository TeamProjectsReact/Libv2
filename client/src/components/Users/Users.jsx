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
    {id: 2, link: 'UserAccounts', name: "User Accounts", icon: <BsJournalCheck />, value: <CountUp end={20} />, bgColor: "bg-green-500/30", borderColor: "border-green-500", style: "text-green-500"},
    {id: 3, link: 'Admins', name: "Admins", icon: <BsJournalBookmark />, value: <CountUp end={20} />, bgColor: "bg-red-500/30", borderColor: "border-red-500", style: "text-red-500"},
    {id: 4, link: 'AddNewBook', name: "Add New Book", icon: <BsJournalPlus />, value: "#", bgColor: "bg-green-500", borderColor: "", style: "text-white"},    
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