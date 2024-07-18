import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import CountUp from 'react-countup'
import Books from './Books';

const BorrowReq = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  // book request data
  const [BookRequestData, SetBookRequestData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/books/BookRequestData/')
    .then(res => SetBookRequestData(res.data.Result))
    .catch(err => console.log(err))
  }, [])

  if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div>
          <Books />
          <div className="my-4">
            <h1 className="text-gray-500 font-semibold text-xl">Book Borrowed Requests</h1>
            <hr />

            <div className="overflow-hidden rounded-t-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 h-12 text-white">
                        <tr>
                            <th scope="col" className="md:table-cell hidden max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Book Acc No
                            </th>
                            <th scope="col" className="md:table-cell hidden max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Requested By
                            </th>
                            <th scope="col" className="md:table-cell hidden max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Requested At
                            </th>
                            <th scope="col" className="md:hidden table-cell  max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Request Info
                            </th>
                            <th scope="col" className="max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
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

export default BorrowReq