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
            <div>Dashboard</div>
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