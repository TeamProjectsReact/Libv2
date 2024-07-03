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
        <div className="">
            
        </div>
    </div>
  )
}

export default BrowseBooks