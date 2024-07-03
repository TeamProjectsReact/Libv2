import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import { BsBook, BsBookFill, BsJournal, BsJournalCheck, BsJournalX, BsJournals, BsPeopleFill, BsTextParagraph } from 'react-icons/bs';
import CountUp from 'react-countup'

const DashHome = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    // count books
    const [CountBooks, SetCountBooks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/books/CountBooks')
        .then(res => SetCountBooks(res.data.Result))
        .catch(err => console.log(err))
    }, [])

    const DashData = [
        {id: 1, name: "Users", bgstyle: 'bg-green-400/20', borderStyle: 'border-green-500', icon: <BsPeopleFill />, value: <CountUp end={20} />, style: "text-green-500"},
        {id: 2, name: "Books", bgstyle: 'bg-blue-400/20', borderStyle: 'border-blue-500', icon: <BsBookFill />, value: <CountUp end={CountBooks} />, style: "text-blue-500"},
        {id: 3, name: "Thesis", bgstyle: 'bg-yellow-400/20', borderStyle: 'border-yellow-500', icon: <BsTextParagraph />, value: <CountUp end={20} />, style: "text-yellow-500"},
        {id: 4, name: "Borrowed Books", bgstyle: 'bg-purple-400/20', borderStyle: 'border-purple-500', icon: <BsJournalCheck />, value: <CountUp end={20} />, style: "text-purple-500"},
        {id: 5, name: "Selected Books", bgstyle: 'bg-red-400/20', borderStyle: 'border-red-500', icon: <BsJournalX />, value: <CountUp end={20} />, style: "text-red-500"},
        {id: 6, name: "My Books", bgstyle: 'bg-green-400/20', borderStyle: 'border-green-500', icon: <BsJournals />, value: <CountUp end={20} />, style: "text-green-500"},
        {id: 7, name: "My Selected Books", bgstyle: 'bg-blue-400/20', borderStyle: 'border-blue-500', icon: <BsJournalX />, value: <CountUp end={20} />, style: "text-blue-500"},
        {id: 8, name: "My Borrowed Books", bgstyle: 'bg-yellow-400/20', borderStyle: 'border-yellow-500', icon: <BsJournalCheck />, value: <CountUp end={20} />, style: "text-yellow-500"},
    ]

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div>
                <div className="">
                    <h1 className="text-xl text-gray-500 mb-4">Dashboard</h1>
                    <div className="md:grid grid-cols-4 gap-4 mr-4">
                    {
                        DashData.map((data) => {
                            if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
                                if(data.id !== 6 && data.id !== 7 && data.id !== 8){
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
                            }
                            else{
                                if(data.id !== 1 && data.id !== 2 && data.id !== 3 && data.id !== 4 && data.id !== 5){
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
                            }
                        })
                    }   
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

export default DashHome