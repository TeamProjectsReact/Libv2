import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import CountUp from 'react-countup'
import Books from './Books';

const BorrowedBooks = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  const [BKBorrowedData, SetBKBorrowedData] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/books/BookBorrowedData`)
    .then(res => SetBKBorrowedData(res.data.Result))
    .catch(err => console.log(err))
  }, [])

  if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
    return (
      <div>
          <Books />
          <h1 className="text-gray-500 font-semibold text-xl mt-2">Book Borrowed Requests</h1>
            <hr />
          <div className="overflow-hidden rounded-t-lg border border-gray-200 my-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 h-12 text-white">
                        <tr>
                            <th scope="col" className="md:table-cell hidden max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Book Acc No
                            </th>
                            <th scope="col" className="md:table-cell hidden max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Borrowed By
                            </th>
                            <th scope="col" className="md:table-cell hidden max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Return At
                            </th>
                            <th scope="col" className="md:hidden table-cell  max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Borrowed Info
                            </th>
                            <th scope="col" className="max-w-72 px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        BKBorrowedData.map((Book, index) => {
                          return (
                            <tr key={index}>
                                <td className="md:hidden table-cell px-6 py-4 max-w-40 truncate whitespace-nowrap text-sm font-medium text-gray-900">
                                    <p className="">{Book.AccNumber}</p>
                                    <p className="">{Book.email}</p>
                                    <p className="">{Book.shouldReturnAt}</p>
                                </td>
                                <td className="md:table-cell hidden px-6 py-4 max-w-40 truncate whitespace-nowrap text-sm font-medium text-gray-900">
                                    {Book.AccNumber}
                                </td>
                                <td className="md:table-cell hidden px-6 py-4 max-w-40 truncate whitespace-nowrap text-sm font-medium text-gray-900">
                                    {Book.email}
                                </td>
                                <td className="md:table-cell hidden px-6 py-4 max-w-40 truncate whitespace-nowrap text-sm font-medium text-gray-900">
                                    {Book.shouldReturnAt}
                                </td>
                                <td className="md:table-cell hidden px-6 py-4 max-w-40 truncate whitespace-nowrap text-sm font-medium text-gray-900">
                                    <button className="bg-blue-500 text-white py-1 px-4 rounded">Return</button>
                                </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                </table>
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

export default BorrowedBooks