import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage"
import { BsBackpack2Fill, BsSpeedometer2, BsPersonVideo3, BsFileEarmarkText, BsPeople, BsPersonGear, BsPower, BsBook, BsPatchCheck, BsBuilding, BsFile, BsMortarboard, BsList, BsX, BsCalendarEvent, BsBell, BsFilesAlt, BsFileText, BsCashCoin, BsMortarboardFill, BsCaretDownFill, BsBoxArrowDownRight, BsTicketDetailedFill, BsFileTextFill, BsHouseGearFill, BsPassFill, BsCashStack, BsCarFrontFill, BsPersonArmsUp, BsPersonFillLock, BsBuildingFill, BsPeopleFill, BsPerson, BsPersonFill, BsPersonCircle, BsCaretUpFill, BsPersonWorkspace } from "react-icons/bs";



const DashSide = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    // alert(DarkMode)RoleUser

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const SideLink = [
        {style: 'text-orange-500', id: 1, name: "Dashboard", link: "Home", icons: <BsSpeedometer2 />},    
        {style: 'text-yellow-500', id: 2, name: "Leaves", link: "Leaves", icons: <BsBoxArrowDownRight />},  
        {style: 'text-green-500', id: 3, name: "Reservation", link: "Reservation", icons: <BsTicketDetailedFill />},  
        {style: 'text-purple-500', id: 4, name: "SRNs", link: "SRNs", icons: <BsFileTextFill />},  
        {style: 'text-pink-500', id: 5, name: "Work Requests", link: "WorkRequests", icons: <BsHouseGearFill />},  
        {style: 'text-red-500', id: 7, name: "GatePass", link: "GatePass", icons: <BsPassFill />},  
        {style: 'text-blue-500', id: 8, name: "Increment", link: "Increment", icons: <BsCashStack />},  
        {style: 'text-green-500', id: 9, name: "Vehicle", link: "Vehicle", icons: <BsCarFrontFill />},  
        {style: 'text-yellow-500', id: 10, name: "SiteAdmin", link: "SiteAdmins", icons: <BsPersonFillLock />},  
        {style: 'text-purple-600', id: 11, name: "Employee", link: "Employee", icons: <BsPeopleFill />},          
    ]

    const [UserNameDropDown, SetUserNameDropDown] = useState(false);
    const toggleUserDropDown = () => {
        SetUserNameDropDown(!UserNameDropDown);
    };

    const headleLogOut = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }
    
     
    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="">
                <button className="md:hidden fixed top-4 right-4 z-50 bg-gray-600 text-white p-2 rounded font-semibold" onClick={toggleSidebar}>
                    {
                        !isOpen ? <BsList /> : <BsX />
                    }
                </button>
                <div className={`w-full md:w-auto md:min-h-screen bg-gray-800 text-white md:relative fixed overflow-auto top-0 left-0 h-full  bg-gray-800 text-white w-auto transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="py-4 px-2">                
                        <div className="flex">
                            <p className="text-blue-600 pl-4 pt-2"><BsMortarboard className='h-10 w-auto'/></p>
                            <div className="pl-4">
                                <h1 className="mt-1 uppercase text-xl font-semibold tracking-[0.3em]">NIFS</h1>
                                <p className="py-2 md:block hidden">ERP System</p>
                                <div className="cursor-pointer mt-2 md:hidden block" >
                                    <div className="flex" onClick={toggleUserDropDown}>
                                        <BsPersonCircle className='text-xl'/>
                                        <p className="ml-2">{EmailUser}</p>
                                        <p className="duration-500" >
                                            {
                                                !UserNameDropDown ? <BsCaretDownFill className='mt-1 ml-2'/> : <BsCaretUpFill className='mt-1 ml-2'/>
                                            }                            
                                        </p>
                                    </div>
                                    <div className={`${!UserNameDropDown ? 'hidden' : 'block'} w-full bg-none py-4 px-8 transform transition-transform duration-500 rounded ease-in-out`}>
                                        <div className="text-white py-2 flex">
                                            <p className=" "><BsPersonGear className='text-xl'/> </p>
                                            <p className="pl-2">My Profile</p>
                                        </div>
                                        <div className="text-red-500 py-2 flex" onClick={headleLogOut}>
                                            <p className=" "><BsPower className='text-xl'/> </p>
                                            <p className="pl-2">Logout</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
    
                        
                </div>
                <hr className='border border-[#242423]'/>
                    <div className="my-4 pr-16 px-4">
                            {
                                SideLink.map((side) => {
                                    if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
                                        return (
                                            <a href={side.link}>
                                                <div className="">
                                                    <div className={`w-full my-2 py-3 px-2 rounded cursor-pointer duration-500 hover:backdrop-blur-sm hover:bg-white/10`}>
                                                        <div className="flex">
                                                            <p className={`text-2xl ${side.style}`}>{side.icons}</p>
                                                            <p className="pl-2">{side.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    }
                                    if(RoleUser === "HOD"){
                                        if(side.id !== 10){
                                            return (
                                                <a href={side.link}>
                                                    <div className="">
                                                        <div className={`w-full my-2 py-3 px-2 rounded cursor-pointer duration-500 hover:backdrop-blur-sm hover:bg-white/10`}>
                                                            <div className="flex">
                                                                <p className={`text-2xl ${side.style}`}>{side.icons}</p>
                                                                <p className="pl-2">{side.name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            )
                                        }
                                    }
                                    else{
                                        if(side.id !== 10 && side.id !== 11){
                                            return (
                                                <a href={side.link}>
                                                    <div className="">
                                                        <div className={`w-full my-2 py-3 px-2 rounded cursor-pointer duration-500 hover:backdrop-blur-sm hover:bg-white/10`}>
                                                            <div className="flex">
                                                                <p className={`text-2xl ${side.style}`}>{side.icons}</p>
                                                                <p className="pl-2">{side.name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
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

export default DashSide