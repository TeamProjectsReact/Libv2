import React, { useEffect, useState } from 'react'
import { BsChevronDown, BsChevronUp, BsPersonCircle, BsPersonGear, BsPower } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"

const DashNav = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    const [UserDropDown, SetUserDropDown] = useState(false)
    const toggleDropDown = () => {
      SetUserDropDown(!UserDropDown)
    }

    const headleLogOut = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }

    const headletoMyData = () => {
        navigate('MyData')
        window.location.reload();
    }
    
    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className='bg-gray-800 text-white py-5'>
                <div className="flex justify-between">
                    <div className="px-4">
                        {
                            (() => {
                                if(RoleUser === "SuperAdmin"){
                                    return (
                                        <p className="">SuperAdmin</p>
                                    )
                                }
                                if(RoleUser === "Director"){
                                    return (
                                        <p className="">Director</p>
                                    )
                                }
                                if(RoleUser === "Secretary"){
                                    return (
                                        <p className="">Secretary</p>
                                    )
                                }
                                if(RoleUser === "HOD"){
                                    return (
                                        <p className="">Head Of Department </p>
                                    )
                                }
                                if(RoleUser === "RA"){
                                    return (
                                        <p className="">Research Assistant</p>
                                    )
                                }
                            })()
                        }
                    </div>
                    <div className="md:block hidden">
                        <div className="flex cursor-pointer px-4" onClick={toggleDropDown}>
                            <BsPersonCircle className='text-2xl'/> 
                            <p className="pl-2">{EmailUser}</p>
                            <p className="">
                            {
                                !UserDropDown ? <BsChevronDown className='pl-2 text-xl font-bold'/> : <BsChevronUp className='pl-2 text-xl font-bold'/>
                            }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className={`${!UserDropDown ? 'hidden' : 'visibale'} py-4 bg-gray-800/95 mt-5 overflow-auto absolute px-4 border-b border-red-500 rounded-b`}>
                        <div className="flex cursor-pointer py-4 px-4" onClick={headletoMyData}>
                            <p className=""><BsPersonGear className='text-xl'/></p>
                            <p className="pl-2">My Profile</p>
                        </div>                         
                        <div className="flex text-red-500 cursor-pointer py-4 px-4" onClick={headleLogOut}>
                            <p className=""><BsPower className='text-xl' /></p>
                            <p className="pl-2">LogOut</p>
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

export default DashNav