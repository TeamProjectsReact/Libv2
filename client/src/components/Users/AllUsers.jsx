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

    // Get last 10 uses
    const [LastUsers, SetLastUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/user/LastUsers')
        .then(res => SetLastUsers(res.data.Result))
        .catch(err => console.log(err))
    }, [])

    // close Search
    const CloseSearch = () => {
        SetIsSearchSubimited(false)
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

                <hr className='my-4'/>

                <div className="my-4">
                    <h1 className="text-xl text-gray-500">Search Result</h1>

                    {
                        (() => {
                            if(IsSearchSubimited === true){
                                return (
                                    <div className="">
                                        <button onClick={CloseSearch} className="bg-red-500 py-1 px-4 rounded shadow-md text-white my-3 duration-500 hover:bg-red-600">Close Search</button>
                                    </div>
                                )
                            }
                            else{
                                return (
                                    <div className="">
                                        <div className="my-3 overflow-hidden rounded-t-lg border border-gray-200">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-800 h-12 text-white">
                                                    <tr>
                                                        <th scope="col" className="max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                            Email Address
                                                        </th>
                                                        <th scope="col" className="max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                            Username
                                                        </th>
                                                        <th scope="col" className="max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                            Role
                                                        </th>
                                                        
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }
                        })()
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

export default AllUsers