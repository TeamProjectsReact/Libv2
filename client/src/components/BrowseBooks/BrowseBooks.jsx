import React, { useEffect, useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import axios from 'axios'

const BrowseBooks = () => {
    const [AllBooks, setAllBooks] = useState([])

    useEffect(() => {   
        axios.get('http://localhost:5000/books/ViewGestBooks')
        .then(res => setAllBooks(res.data.Result))
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='bg-gray-200 py-4 px-8 min-h-screen'>
        <div className="flex justify-between">
            <div className="text-gray-500">
                Browse Books
            </div>
            <div className="flex text-gray-500">
                <BsPersonCircle className='text-3xl '/>
                <p className="pl-2 pt-1">Gest</p>
            </div>
        </div>
        <div className="my-8">
            <table className='w-full '>
                <thead className=''>
                    <tr className='bg-white h-16 text-gray-600 font-sembold border-b border-gray-400'>
                        <th className='max-w-8'>Acc Number</th>
                        <th >Book Name</th>
                        <th className='hidden md:table-cell'>ISBN Number</th>
                        <th className='hidden md:table-cell'>Publisher</th>
                        <th className='hidden md:table-cell'>Year of Publication</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {
                        AllBooks.map((bookgest, index) => {
                            return (
                                <tr key={index} className='border-b border-gray-400 h-10'>
                                    <td className='text-center border-r border-gray-300 md:max-w-8'>{bookgest.AccNumber}</td>
                                    <td className='border-r border-gray-300 pl-3 md:max-w-36 max-w-20'>{bookgest.Title}</td>
                                    <td className='text-center border-r border-gray-300 hidden md:table-cell md:max-w-36 max-w-20'>{bookgest.ISBNNumber}</td>
                                    <td className='border-r border-gray-300 pl-3 hidden md:table-cell md:max-w-36 max-w-20'>{bookgest.Publisher}</td>
                                    <td className='text-center border-r border-gray-300 hidden md:table-cell'>{bookgest.YearofPublication}</td>
                                    <td className='text-center'>Available</td>
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

export default BrowseBooks