import Books from './Books'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import axios from 'axios';
import { BsEyeFill, BsFileXFill, BsPenFill, BsX } from 'react-icons/bs';

const AllBooks = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  // useState for books search
  const [query, setQuery] = useState('');

  // search Result
  const [BooksSearchData, SetBooksSearchData] = useState([])

  // check search form is submitted
  const [SearchForm, SetSearchForm] = useState(false)

  // book search
  const headleBookSearch = async (e) => {
    e.preventDefault();
    SetSearchForm(true)
    try{
      const res = await axios.get(`http://localhost:5000/books/SearchBook?query=${query}`)
      SetBooksSearchData(res.data.Result)      
    }
    catch (err) {
      console.log(err)
    }

  }

  // clear search
  const healeClearSearch = () => {
    SetSearchForm(false)
  }

  // get last 10 books
  const [LastTenBooks, SetLastTenBooks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/books/TenLastBooks')
    .then(res => SetLastTenBooks(res.data.Result))
    .catch(err => console.log(err))
  }, [])

  // store data in viewbook
  const [AccNoView, SetAccNoView] = useState()
  const [isViewClick, SetisViewClick] = useState(false)

  const [ViewResult, SetViewResult] = useState([])

  // update Book
  const [UpdateBook, SetUpdateBook] = useState(false)

  const headleUpdate = () => {
    SetUpdateBook(true)
  }

  const ViewAccNo = (id) => {
    SetisViewClick(true)
    SetAccNoView(id)
    SetUpdateBook(false)

    try{
      axios.get('http://localhost:5000/books/GetViewBook/' + id)
      .then(res => SetViewResult(res.data.Result))
      .catch(err => console.log(err))
    }
    catch (err) {
      console.log(err)
    }
  }  

  const headelCloseView = () => {
    SetisViewClick(false)
  }



  const headleCloseUpdate = () => {
    SetUpdateBook(false)
  }

  const [UpdateBookData, SetUpdateBookData] = useState({
    Title: '',
    ClassNo: '',
    AuthorEditort: '',
    AuthorEditor: '',
    Discription: '',
    ISBNNumber: '',
    Keywords1: '',
    Keywords2: '',
    Publisher: '',
    YearofPublication: '',
    PlaceofPublisher: ''
  })

  const headleBookUpdate = async (e) => {
    e.preventDefault();
    // alert(AccNoView)
    // console.log(UpdateBookData)

    try{
      const res = await axios.post(`http://localhost:5000/books/DataUpdateBook/${AccNoView}`, UpdateBookData)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("Book Updated Successfully")
          window.location.reload()
        }
        else{
          alert(res.data.Error)
        }
      })
    }
    catch(err){
      console.log(err)
    }
  } 

  // borrow book
  const headleBorrowed = async (id) => {
    // alert(id)
    try{
      const res = await axios.post(`http://localhost:5000/books/BorrowBook/${AccNoView}/${EmailUser}`)
      .then(res => {
        if(res.data.Status === "Success"){
          alert("You borrowed Book Successfully")
          window.location.reload()
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

  if(RoleUser !== null && EmailUser !== null){
    return (
      <div>
          <Books />
          <div className="my-8">
            {
              (() => {
                if(isViewClick === false){
                  return (
                    <div className=""></div>
                  )
                }
                else{
                  return (
                    <div className="" id='ViewBook'>
                      <div className="my-4 pt-4 bg-gray-200 p-4 rounded shadow-md" >
                        {
                          (() => {
                            if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
                              return (
                                <div className="my-2">
                                  {
                                    (() => {
                                      if(UpdateBook === false){
                                        return(
                                          <button onClick={headleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded duration-500 hover:bg-blue-500 shadow-md">Update</button>
                                        )
                                      }
                                      else{
                                        return (
                                          <button onClick={headleCloseUpdate} className="bg-red-500 text-white py-2 px-4 rounded duration-500 hover:bg-red-500 shadow-md">Close</button>
                                        )
                                      }
                                    })()
                                  }                                  
                                </div>
                              )
                            }
                            else{
                              if(ViewResult.Status === "Available"){
                                return (
                                  <button onClick={() => headleBorrowed(AccNoView)} className='my-2 bg-blue-500 text-white py-2 px-4 rounded shadow-md'>Borrow</button>
                                )
                              }
                              else{
                                return (
                                  <button className='text-red-500 text-xl my-5'>This Book Already Borrowed...</button>
                                )
                              }
                            }
                          })()
                        }
                        
                          <div className="flex justify-between">
                            <h1 className="text-xl font-semibold text-gray-500">Book Acc Number : {AccNoView}</h1>
                            <p className="mr-4 cursor-pointer" onClick={headelCloseView}>
                              <BsFileXFill className='h-10 w-auto text-red-500'/>
                            </p>
                          </div>
                          {
                            (() => {
                              if(UpdateBook === true) {
                                return (
                                  <div className="">
                                    <div className="bg-white py-2 px-4 rounded shadow-md my-4">
                                      <h1 className="text-xl font-semibold text-gray-500">Update Book</h1>
                                      <form onSubmit={headleBookUpdate} method="post">
                                        <div className="md:grid grid-cols-3 gap-4 my-4">
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Book Name' 
                                            onChange={e => SetUpdateBookData({...UpdateBookData, Title:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Book Class No'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, ClassNo:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Book Author 1'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, AuthorEditort:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Book Author 2'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, AuthorEditor:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Description'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, Discription:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='ISBN Number'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, ISBNNumber:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Key Word 1'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, Keywords1:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Key Word 2'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, Keywords2:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Publisher'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, Publisher:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="number" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Publish Year'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, YearofPublication:e.target.value})}/>
                                          </div>
                                          <div className="">
                                            <input type="text" name="" id="" className="md:my-0 my-2 w-full h-12 pl-2 rounded bg-gray-200" placeholder='Publish Place'
                                            onChange={e => SetUpdateBookData({...UpdateBookData, PlaceofPublisher:e.target.value})}/>
                                          </div>
                                        </div>
                                        <div className="my-2">
                                          <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 shadow-md">Update Book</button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                )
                              }
                              else{
                                return (
                                  <div className=""></div>
                                )
                              }
                            })()
                          }
                                <div className="">
                                  <table className='table-auto bg-white my-4 min-w-full'>
                                    <tr className='h-12 border-b border-gray-200 '>
                                      <th className='text-left pl-4 border-r border-gray-200 md:w-72'>Book Title</th>
                                      <td className='text-left pl-4'>{ViewResult.Title}</td>
                                    </tr>
                                    <tr className='h-12 border-b border-gray-200'>
                                      <th className='text-left pl-4 border-r border-gray-200'>Class No</th>
                                      <td className='text-left pl-4'>{ViewResult.ClassNo}</td>
                                    </tr>
                                    <tr className='h-12 border-b border-gray-200'>
                                      <th className='text-left pl-4 border-r border-gray-200'>Authores</th>
                                      <td className='text-left pl-4'>{ViewResult.AuthorEditort} {ViewResult.AuthorEditor}</td>
                                    </tr>
                                    <tr className='h-12 border-b border-gray-200'>
                                      <th className='text-left pl-4 border-r border-gray-200'>Description</th>
                                      <td className='text-left pl-4'>{ViewResult.Discription}</td>
                                    </tr>
                                    <tr className='h-12 border-b border-gray-200'>
                                      <th className='text-left pl-4 border-r border-gray-200'>Publisher</th>
                                      <td className='text-left pl-4'>{ViewResult.Publisher}</td>
                                    </tr>
                                    <tr className='h-12 border-b border-gray-200'>
                                      <th className='text-left pl-4 border-r border-gray-200'>Publish Year</th>
                                      <td className='text-left pl-4'>{ViewResult.YearofPublication}</td>
                                    </tr>
                                    <tr className='h-12 border-b border-gray-200'>
                                      <th className='text-left pl-4 border-r border-gray-200'>Publish Place</th>
                                      <td className='text-left pl-4'>{ViewResult.PlaceofPublisher}</td>
                                    </tr>
                                    <tr className='h-12 border-b border-gray-200'>
                                      <th className='text-left pl-4 border-r border-gray-200'>Status</th>
                                      <td className='text-left pl-4'>
                                        {
                                          (() => {
                                            if(ViewResult.Status === "Available"){
                                              return(
                                                <div className="text-green-500 font-semibold">Available</div>
                                              )
                                            }
                                          })()
                                        }
                                      </td>
                                    </tr>
      
                                  </table>
                                </div>


                      </div>
                    </div>
                  )
                }
              })()
            }
            <h1 className="text-xl font-semibold text-gray-500">Search Books</h1>
            <hr />

            <form onSubmit={headleBookSearch}>
                <input
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search items..."
                  className='h-12 pl-2 bg-gray-200 rounded my-4 w-full'
                  required
                />

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
                        <th className='hidden md:table-cell'>Class No</th>
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
                                <td className='text-center border-r border-gray-300 hidden md:table-cell'>{lastbooks.ClassNo}</td>
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

                                                    <div className="md:flex">
                                                      
                                                      <a href='#ViewBook' onClick={() => ViewAccNo(lastbooks.AccNumber)}>
                                                        <div className='cursor-pointer py-2 px-2 my-2 ml-2 rounded bg-purple-500 text-white duration-500 hover:bg-purple-600 flex text-sm'>
                                                          <BsEyeFill className=''/>
                                                          <span className='pl-2'>View</span>
                                                        </div>
                                                      </a>                                         
                                                    </div>

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
                                <td className='text-center border-r border-gray-300 hidden md:table-cell'>{bookSearch.ClassNo}</td>
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
                                                    <div className="md:flex">
                                                      
                                                        <a href='#ViewBook' onClick={() => ViewAccNo(bookSearch.AccNumber)}>
                                                          <div className='cursor-pointer py-2 px-2 my-2 ml-2 rounded bg-purple-500 text-white duration-500 hover:bg-purple-600 flex text-sm'>
                                                            <BsEyeFill className=''/>
                                                            <span className='pl-2'>View</span>
                                                          </div>
                                                        </a>     
                                                      </div>


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