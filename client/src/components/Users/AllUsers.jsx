import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';

const AllUsers = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div>AllUsers</div>
          )
    }

    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }   
}

export default AllUsers