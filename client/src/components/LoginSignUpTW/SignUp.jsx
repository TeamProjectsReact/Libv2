import React, { useState } from 'react'
import { BsBookFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import bgImg from '../../assets/nifsBG.jpg'

const SignUp = () => {
    const navigate = useNavigate()
     // for login data
    const [SignUpData, SetSignUpData] = useState({
        username: '',
        email: '',
        password: ''
    })

    // send data to backend using axios
    // send data to backend using axios
    const headleSubmit = async (e) => {
        e.preventDefault();

        try{
            // custom created REST API
            const res = await axios.get('https://teamprojectsreact.github.io/EMPAPI/EmpRestAPI.employees.json')
            const data = res.data;

            const emailExists = data.some((item) => item.email === SignUpData.email);
            const foundUser = data.find((item) => item.email === SignUpData.email);

            
            if(emailExists){                  
                const res = await axios.post('http://localhost:5000/auth/SignUp', {SignUpData, foundUser})
                .then(res => {
                    if(res.data.Status === "Success"){
                        alert("Registation Successfull")
                        navigate('/')
                    }
                    else{
                        alert(res.data.Error)
                    }
                })
            }
            else{
                alert("You are not a NIFS Member")
            }
        }   
        catch (err) {
            console.log(err)
        }

    }
  return (
    <div className='bg-cover bg-center min-h-screen py-16 px-8' style={{ backgroundImage: `url(${bgImg})`}}>
        <div className="md:grid grid-cols-3 gap-2">
            <div className=""></div>
            <div className="">
                <div className="bg-white py-4 px-8 rounded shadow-md w-full ">
                    <h1 className="text-xl text-gray-500 font-semibold text-center my-8">Members Registation</h1>
                    <hr className='my-2'/>
                    <div className="my-4">
                        <form onSubmit={headleSubmit}>
                             <div className="my-2 md:mx-8">
                                <label htmlFor="" className=''>Username : </label>
                                <input type="text" name="" id="" className="w-full h-12 pl-2 rounded bg-gray-200" required placeholder='Enter Username'
                                onChange={e => SetSignUpData({...SignUpData, username:e.target.value})}/>
                            </div>
                            <div className="my-2 md:mx-8">
                                <label htmlFor="" className=''>Email : </label>
                                <input type="email" name="" id="" className="w-full h-12 pl-2 rounded bg-gray-200" required placeholder='Enter Email Address'
                                onChange={e => SetSignUpData({...SignUpData, email:e.target.value})}/>
                            </div>
                            <div className="my-2 md:mx-8">
                                <label htmlFor="" className=''>Password : </label>
                                <input type="password" name="" id="" className="w-full h-12 pl-2 rounded bg-gray-200" required placeholder='Enter Password' 
                                onChange={e => SetSignUpData({...SignUpData, password:e.target.value})}/>
                            </div>
                            <div className="my-2 md:mx-8">
                                <button type='submit' className='mt-8 font-semibold w-full py-4 px-8 rounded bg-blue-500 text-white shadow-md duration-500 hover:bg-blue-600'>Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <hr className='my-2'/>
                    <p className="my-4">Already have an Account ? <Link to={'/'}><span className="text-blue-500">SignUp</span></Link></p>
                </div>  
            </div>
            <div className=""></div>
        </div>
    </div>
  )
}

export default SignUp