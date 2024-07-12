import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import Users from './Users';

const AddNewAdmin = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div>
                <Users />

                <h1 className="text-gray-500 text-xl">Add New Admin</h1>
                <hr />
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

export default AddNewAdmin