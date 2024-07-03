import React from 'react'
import { BsPersonCircle } from 'react-icons/bs'

const BrowseBooks = () => {
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
                        <th>Acc Number</th>
                        <th>Book Name</th>
                        <th>ISBN Number</th>
                        <th>Publisher</th>
                        <th>Year of Publication</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    <tr className='border-b border-gray-400 h-10'>
                        <td className='text-center border-r border-gray-300'>1</td>
                        <td className='border-r border-gray-300 pl-3'>MOLECUALR AND CELLULAR ASPECTS OF MICROBIAL EVOLUTION</td>
                        <td className='text-center border-r border-gray-300'>BK123456</td>
                        <td className='border-r border-gray-300 pl-3'>Prof Kamal Perera</td>
                        <td className='text-center border-r border-gray-300'>1998</td>
                        <td className='text-center'>Available</td>
                    </tr>
                    <tr className='border-b border-gray-400 h-10'>
                        <td className='text-center border-r border-gray-300'>1</td>
                        <td className='border-r border-gray-300 pl-3'>MOLECUALR AND CELLULAR ASPECTS OF MICROBIAL EVOLUTION</td>
                        <td className='text-center border-r border-gray-300'>BK123456</td>
                        <td className='border-r border-gray-300 pl-3'>Prof Kamal Perera</td>
                        <td className='text-center border-r border-gray-300'>1998</td>
                        <td className='text-center'>Available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default BrowseBooks