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

    const [query, setQuery] = useState('');

    const [UserSearch, SetUserSearch] = useState([])

    // submit the search form
    const headleSubmit = async (e) => {
        e.preventDefault();
        SetIsSearchSubimited(true)        

        try {
            const res = await axios.get(`http://localhost:5000/user/SearchUser?query=${query}`)
            .then(res => SetUserSearch(res.data.Result))
            // console.log(UserSearch)
        }
        catch (err) {
            console.log(err)
        }
        
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


    // view user data
    const ViewUser = (id) => {
        
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
                                <input type="text" name="" id="" className="w-full bg-gray-200 pl-2 h-12 my-2" placeholder='Search User' required
                                onChange={(e) => setQuery(e.target.value)}/>
                            </div>

                            <div className="">
                                <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded duration-500 hover:bg-purple-600 shadow-md">Search User</button>
                            </div>
                        </form>
                    </div>
                </div>  

                <hr className='my-4'/>

                {
                    (() => {

                    })()
                }

                <div className="my-4">
                    <h1 className="text-xl text-gray-500">Search Result</h1>
                        <div className="">
                            {
                                (() => {
                                    if(IsSearchSubimited === true) {
                                        return (
                                            <button onClick={CloseSearch} className="bg-red-500 text-white py-1 px-4 rounded shadow-md my-2 duration-500 hover:bg-red-600">Close Search</button>
                                        )
                                    }
                                    else{
                                        return (
                                            <div className=""></div>
                                        )
                                    }
                                })()
                            }
                        </div>

                                   <div className="">
                                        <div className="my-3 overflow-hidden rounded-t-lg border border-gray-200">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-800 h-12 text-white">
                                                    <tr>
                                                        <th scope="col" className="max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                            Email Address
                                                        </th>
                                                        <th scope="col" className="md:table-cell hidden max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                            Username
                                                        </th>
                                                        <th scope="col" className="md:table-cell hidden max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                            Role
                                                        </th>
                                                        <th scope="col" className="max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <thead>
                                                    {
                                                        (() => {
                                                            if(IsSearchSubimited === true){
                                                                return (
                                                                    UserSearch.map((searchUser, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <th className="text-left max-w-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                                    {searchUser.email}
                                                                                </th>
                                                                                <td className="md:table-cell hidden max-w-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                                    {searchUser.username}
                                                                                </td>
                                                                                <td className="max-w-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                                    {
                                                                                        (() => {
                                                                                            if(searchUser.Role === "SuperAdmin"){
                                                                                                return(
                                                                                                    <div className="text-red-500">{searchUser.Role}</div>
                                                                                                )
                                                                                            }
                                                                                            else{
                                                                                                return (
                                                                                                    <div className="text-blue-500">{searchUser.Role}</div>
                                                                                                )
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                </td>
                                                                                <td className="max-w-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                                    <button className="bg-purple-500 text-white py-1 px-4 rounded shadow-md duration-500 hover:bg-purple-600">View</button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                            else{
                                                                return (
                                                                    LastUsers.map((users,index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <th className="text-left max-w-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                                    {users.email}
                                                                                </th>
                                                                                <td className="md:table-cell hidden max-w-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                                    {users.username}
                                                                                </td>
                                                                                <td className="max-w-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                                    {
                                                                                        (() => {
                                                                                            if(users.Role === "SuperAdmin"){
                                                                                                return(
                                                                                                    <div className="text-red-500">{users.Role}</div>
                                                                                                )
                                                                                            }
                                                                                            else{
                                                                                                return (
                                                                                                    <div className="text-blue-500">{users.Role}</div>
                                                                                                )
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                </td>
                                                                                <td className="max-w-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                                    <a href="#ViewUser" onClick={() => ViewUser(users.email)}>
                                                                                        <button className="bg-purple-500 text-white py-1 px-4 rounded shadow-md duration-500 hover:bg-purple-600">View</button>
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </thead>
                                            </table>
                                        </div>
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