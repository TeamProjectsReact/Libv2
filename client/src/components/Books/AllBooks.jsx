import Books from './Books'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import { BsEyeFill, BsPenFill } from 'react-icons/bs';

const AllBooks = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  // useState for books search
  const [searchBooks, SetsearchBooks] = useState({
    Title: '',
    Author: '',
    ISBNNumber: '',
    Keywords: '',
    Publisher: '',
    YearofPublication: '',
    PlaceofPublisher: '',
  })

  // search Result
  const [BooksSearchData, SetBooksSearchData] = useState([])

  // check search form is submitted
  const [SearchForm, SetSearchForm] = useState(false)

  // book search
  const headleBookSearch = async (e) => {
    e.preventDefault();
    SetSearchForm(true)
    try{
      const res = await axios.get('http://localhost:5000/books/SearchBook', {params: searchBooks })
      SetBooksSearchData(res.data.Result)      
    }
    catch (err) {
      console.log(err)
    }

  }

  // clear search
  const healeClearSearch = () => {
    window.location.reload()
  }

  // get last 10 books
  const [LastTenBooks, SetLastTenBooks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/books/TenLastBooks')
    .then(res => SetLastTenBooks(res.data.Result))
    .catch(err => console.log(err))
  }, [])


  if(RoleUser !== null && EmailUser !== null){
    return (
      <div>
          <Books />
          <div className="my-8">
            <h1 className="text-xl font-semibold text-gray-500">Search Books</h1>
            <hr />

            <form onSubmit={headleBookSearch}>
              <div className="md:grid grid-cols-4 gap-4">
                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Book Title : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Title'
                  onChange={e => SetsearchBooks({...searchBooks, Title:e.target.value})}/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Author / Editor : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Author or Editor'
                  onChange={e => SetsearchBooks({...searchBooks, Author:e.target.value})}/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>ISBN Number : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books ISBN Number'
                  onChange={e => SetsearchBooks({...searchBooks, ISBNNumber:e.target.value})}/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Keywords : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Keywords'
                  onChange={e => SetsearchBooks({...searchBooks, Keywords:e.target.value})}/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Publisher : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Publisher'
                  onChange={e => SetsearchBooks({...searchBooks, Publisher:e.target.value})}/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Year of Publication : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Year of Publication'
                  onChange={e => SetsearchBooks({...searchBooks, YearofPublication:e.target.value})}/>
                </div>

                <div className="my-2">
                  <label htmlFor="" className='text-gray-500'>Place of Publication : </label>
                  <input type="text" name="" id="" className="w-full pl-2 h-12 bg-gray-200 rounded mt-2" placeholder='Books Place of Publication'
                  onChange={e => SetsearchBooks({...searchBooks, PlaceofPublisher:e.target.value})}/>
                </div>
              </div>

              <div className="my-4">
                <input type="submit" value="Search Book" className="py-4 px-8 rounded bg-purple-500 text-white duration-500 hover:bg-purple-600 cursor-pointer" />
              </div>
            </form>
          </div>

          <hr />

          <div className="">
            <h1 className="text-xl text-gray-500 font-semibold mt-8">Book Result</h1>
            {
              (() => {
                if(SearchForm === false){
                  return (
                    <p className="">Newest Books</p>
                  )
                }
                else{
                  return (
                    <button onClick={healeClearSearch} className="my-4 py-2 px-4 rounded bg-red-500 text-white duration-500 hover:bg-red.600">Clear Search</button>
                  )
                }
              })()
            }
            
            <hr />

            <table className="w-full">
              <thead className=''>
                    <tr className='bg-white h-16 text-gray-600 font-sembold border-b border-gray-400'>
                        <th className='max-w-8 hidden md:table-cell'>Acc Number</th>
                        <th >Book Name</th>
                        <th className='hidden md:table-cell'>ISBN Number</th>
                        <th className='hidden md:table-cell'>Publisher</th>
                        <th className='hidden md:table-cell'>Year of Publication</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    (() => {
                      if(SearchForm === false) {
                        return (
                          LastTenBooks.map((lastbooks, index) => {
                            return (
                              <tr key={index} className='border-b border-gray-400 h-10'>
                                <td className='text-center border-r border-gray-300 md:max-w-8 hidden md:table-cell'>{lastbooks.AccNumber}</td>
                                <td className='border-r border-gray-300 pl-3 md:max-w-36 max-w-20'>{lastbooks.Title}</td>
                                <td className='text-center border-r border-gray-300 hidden md:table-cell md:max-w-36 max-w-20'>{lastbooks.ISBNNumber}</td>
                                <td className='border-r border-gray-300 pl-3 hidden md:table-cell md:max-w-36 max-w-20'>{lastbooks.Publisher}</td>
                                <td className='text-center border-r border-gray-300 hidden md:table-cell'>{lastbooks.YearofPublication}</td>
                                <td className='text-center'>
                                    {
                                        (() => {
                                            if(lastbooks.Status === "Available"){
                                                return (
                                                    <p className="text-green-500 font-semibold">Available</p>
                                                )
                                            }
                                        })()
                                    }
                                </td>
                                <td className='text-center'>
                                    {
                                        (() => {
                                            if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
                                                return (
                                                    <div className="md:flex">
                                                      <div className='cursor-pointer py-2 px-2 my-2 ml-2 rounded bg-blue-500 text-white duration-500 hover:bg-blue-600 flex text-sm'><BsPenFill className=''/> <span className='pl-2'>Update</span></div>
                                                      <div className='cursor-pointer py-2 px-2 my-2 ml-2 rounded bg-purple-500 text-white duration-500 hover:bg-purple-600 flex text-sm'><BsEyeFill className=''/> <span className='pl-2'>View</span></div>
                                                    </div>
                                                )
                                            }
                                            else{
                                              return (
                                                <div className="md:flex">
                                                  <div className='cursor-pointer py-2 px-2 my-2 ml-2 rounded bg-purple-500 text-white duration-500 hover:bg-purple-600 flex text-sm'><BsEyeFill className=''/> <span className='pl-2'>View</span></div>
                                                </div>
                                              )
                                            }
                                        })()
                                    }
                                </td>
                            </tr>
                            )
                          })
                        )
                      }
                      else{
                        return (
                          BooksSearchData.map((bookSearch, index) => {
                            return (
                              <tr key={index} className='border-b border-gray-400 h-10'>
                                <td className='text-center border-r border-gray-300 md:max-w-8 hidden md:table-cell'>{bookSearch.AccNumber}</td>
                                <td className='border-r border-gray-300 pl-3 md:max-w-36 max-w-20'>{bookSearch.Title}</td>
                                <td className='text-center border-r border-gray-300 hidden md:table-cell md:max-w-36 max-w-20'>{bookSearch.ISBNNumber}</td>
                                <td className='border-r border-gray-300 pl-3 hidden md:table-cell md:max-w-36 max-w-20'>{bookSearch.Publisher}</td>
                                <td className='text-center border-r border-gray-300 hidden md:table-cell'>{bookSearch.YearofPublication}</td>
                                <td className='text-center'>
                                    {
                                        (() => {
                                            if(bookSearch.Status === "Available"){
                                                return (
                                                    <p className="text-green-500 font-semibold">Available</p>
                                                )
                                            }
                                        })()
                                    }
                                </td>
                                <td className='text-center'>
                                    {
                                        (() => {
                                            if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
                                                return (
                                                    <div className="md:flex">
                                                      <div className='cursor-pointer py-2 px-2 my-2 ml-2 rounded bg-blue-500 text-white duration-500 hover:bg-blue-600 flex text-sm'><BsPenFill className=''/> <span className='pl-2'>Update</span></div>
                                                      <div className='cursor-pointer py-2 px-2 my-2 ml-2 rounded bg-purple-500 text-white duration-500 hover:bg-purple-600 flex text-sm'><BsEyeFill className=''/> <span className='pl-2'>View</span></div>
                                                    </div>
                                                )
                                            }
                                            else{
                                              return (
                                                <div className="md:flex">
                                                  <div className='cursor-pointer py-2 px-2 my-2 ml-2 rounded bg-purple-500 text-white duration-500 hover:bg-purple-600 flex text-sm'><BsEyeFill className=''/> <span className='pl-2'>View</span></div>
                                                </div>
                                              )
                                            }
                                        })()
                                    }
                                </td>
                            </tr>
                            )
                          })
                        )
                      }

                    })()
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

export default AllBooks