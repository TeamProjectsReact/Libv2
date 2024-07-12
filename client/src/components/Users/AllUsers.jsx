import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import Users from './Users';

const AllUsers = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");


    // check the search form us submitted
    const [IsSearchSubimited, SetIsSearchSubimited] = useState(false)

    // submit the search form
    const headleSubmit = (e) => {
        e.preventDefault();
        SetIsSearchSubimited(true)
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
        return (
            <div>
                <Users />

                <div className="">
                    <h1 className="text-xl text-gray-500">Search User</h1>
                    <hr />

                    <div className="">
                        <form method="post" onSubmit={headleSubmit}>
                            <div className="">
                                <input type="text" name="" id="" className="w-full bg-gray-200 pl-2 h-12 my-2" placeholder='Search User' required/>
                            </div>

                            <div className="">
                                <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded duration-500 hover:bg-purple-600 shadow-md">Search User</button>
                            </div>
                        </form>
                    </div>
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

export default AllUsers