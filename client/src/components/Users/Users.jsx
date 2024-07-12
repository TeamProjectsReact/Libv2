import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import { BsPeopleFill, BsPersonFill, BsPersonFillAdd, BsPersonFillLock } from 'react-icons/bs';
import CountUp from 'react-countup'

const Users = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  const UserData = [
    {id: 1, link: 'Users', name: "Users", icon: <BsPeopleFill />, value: <CountUp end={20} />, bgColor: "bg-blue-500/30", borderColor: "border-blue-500", style: "text-blue-500"},
    {id: 2, link: 'UserAccounts', name: "User Accounts", icon: <BsPersonFill />, value: <CountUp end={20} />, bgColor: "bg-green-500/30", borderColor: "border-green-500", style: "text-green-500"},
    {id: 3, link: 'Admins', name: "Admins", icon: <BsPersonFillLock />, value: <CountUp end={20} />, bgColor: "bg-red-500/30", borderColor: "border-red-500", style: "text-red-500"},
    {id: 4, link: 'AddNewBook', name: "Add New Book", icon: <BsPersonFillAdd />, value: "#", bgColor: "bg-green-500", borderColor: "", style: "text-white"},    
  ]


  if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div>
        <h1 className="text-xl text-gray-500 ">Users</h1>
        <div className="md:grid grid-cols-4 gap-4 my-4">
          {
            UserData.map((user) => {
              if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
                  return (
                    <a href={user.link}>
                      <div className={`md:my-0 my-2 ${user.bgColor} text-white px-4 py-8 rounded border-l-4 shadow-lg shadow-red ${user.borderColor}`}>
                          <div className="flex justify-between">
                              <div className="">
                                  <h1 className={`text-3xl font-semibold ${user.style}`}>{user.value}</h1>
                                  <p className={`${user.style}`}>{user.name}</p> 
                              </div>
                              <div className="">
                                  <p className={`text-4xl ${user.style} pt-2`}>{user.icon}</p>
                              </div>
                          </div>
                      </div>
                    </a>
                  )
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
    }, [])
  }
}

export default Users