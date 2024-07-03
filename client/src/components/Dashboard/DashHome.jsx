import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import { BsPeopleFill } from 'react-icons/bs';

const DashHome = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    const DashData = [
        {id: 1, name: "Employees", bgstyle: 'bg-green-400/20', borderStyle: 'border-green-500', icon: <BsPeopleFill />, value: <CountUp end={20} />, style: "text-green-500"},
    ]

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div>
                {
                          DashData.map((data) => {
                            if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
                              return(
                                <div className={`md:my-0 my-2 ${data.bgstyle} text-white px-4 py-8 rounded border-l-4 shadow-lg shadow-red ${data.borderStyle}`}>
                                  <div className="flex justify-between">
                                      <div className="">
                                          <h1 className={`text-3xl font-semibold ${data.style}`}>{data.value}</h1>
                                          <p className={`${data.style}`}>{data.name}</p> 
                                      </div>
                                      <div className="">
                                          <p className={`text-4xl ${data.style} pt-2`}>{data.icon}</p>
                                      </div>
                                  </div>
                                </div>
                              )
                            }
                          })
                        }   
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

export default DashHome