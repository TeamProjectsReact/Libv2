import React, { useState } from 'react'
import { BsBookFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import  secureLocalStorage  from  "react-secure-storage";
import bgImg from '../../assets/nifsBG.jpg'

const SignIn = () => {
    const navigate = useNavigate()
    // for login data
    const [LoginData, SetLoginData] = useState({
        email: '',
        password: ''
    })

    // send data to backend using axios
    const headleSubmit = async (e) => {
        e.preventDefault();

        // login to system

        try{
            const res = axios.post('http://localhost:5000/auth/SignIn', LoginData)
            .then(res => {
                if(res.data.Status === "Success"){
                    alert("Login Successfull")
                    localStorage.setItem('token', res.data.Token)
                    navigate('/Dashboard/home')
                    // login user Email 
                    secureLocalStorage.setItem('Login1', res.data.Result.email)
                    secureLocalStorage.setItem('Login2', res.data.Result.Role)                    
                }
                else{
                    alert(res.data.Error)
                }
            })
        }
        catch (err){
            console.log(err)
        }
    }

    
  return (
    <div className='bg-cover bg-center min-h-screen py-16 px-8' style={{ backgroundImage: `url(${bgImg})`}}>
        <div className=""></div>
        <div className="md:grid grid-cols-2 gap-2">
            <div className="my-[15%]">
                <div className="text-white text-center text-black">
                <h1 className="text-2xl font-semibold">
                    The National Institute of Fundamental Studies
                </h1>
                <p className="">
                    E-Library
                </p>
            </div>
                <div className="md:mx-16 rounded bg-white py-4 px-8 mt-8">
                    <h1 className="text-gray-500 py-4">If you're Guest ? </h1>
                    <button className="bg-purple-500 text-white font-semibold w-full py-2 px-4 rounded duration-500 hover:bg-purple-600">Browse Books</button>
                </div>
            </div>
            <div className="md:mx-[10%] py-[10%]">
                <div className="bg-white py-4 px-8 rounded shadow-md w-auto md:mx-16 py-[10%]">
                    <h1 className="text-xl text-gray-500 font-semibold text-center">Members Login</h1>
                    <hr className='my-2'/>
                    <div className="my-4">
                        <form onSubmit={headleSubmit}>
                            <div className="my-2 md:mx-8">
                                <label htmlFor="" className=''>Email : </label>
                                <input type="email" name="" id="" className="w-full h-12 pl-2 rounded bg-gray-200" required placeholder='Enter Email Address'
                                onChange={e => SetLoginData({...LoginData, email:e.target.value})}/>
                            </div>
                            <div className="my-2 md:mx-8">
                                <label htmlFor="" className=''>Password : </label>
                                <input type="password" name="" id="" className="w-full h-12 pl-2 rounded bg-gray-200" required placeholder='Enter Password' 
                                onChange={e => SetLoginData({...LoginData, password:e.target.value})}/>
                            </div>
                            <div className="my-0 md:mx-8">
                                <button type='submit' className='mt-8 font-semibold w-full py-4 px-8 rounded bg-blue-500 text-white shadow-md duration-500 hover:bg-blue-600'>SignIn</button>
                            </div>
                        </form>
                        <Link><p className="my-2 md:mx-8 text-blue-500 font-semibold">Forget Password ? </p></Link>
                    </div>
                    <hr className='my-2'/>
                    <Link to={'/SignUp'}>
                        <div className="mx-8">
                            <button className="bg-purple-500 text-white font-semibold w-full py-2 px-4 rounded duration-500 hover:bg-purple-600">Create Account</button>
                        </div>
                    </Link>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default SignIn