import React from 'react'
import Books from './Books'

const AddNewBook = () => {
  return (
    <div>
        <Books />
        <div className="my-4">
          <h1 className="text-gray-500 font-semibold text-xl">Add New Book</h1>
          <hr />

          <div className="">
            <div className="md:grid grid-cols-4 gap-4">

              <div className="my-2">
                <label htmlFor="" className="text-gray-500">Book Title</label>
                <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200" placeholder='Book Title'/>
              </div>

              <div className="my-2">
                <label htmlFor="" className="text-gray-500">Book Title</label>
                <input type="text" name="" id="" className="h-12 pl-2 w-full my-2 bg-gray-200" placeholder='Book Title'/>
              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default AddNewBook