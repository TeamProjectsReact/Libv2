import React from 'react'
import { Outlet } from 'react-router-dom';
import Books from './Books';

const BookLists = () => {
  return (
    <div>
        <div className="">
            <Books />
        </div>
        <div className="">
            <Outlet />
        </div>
    </div>
  )
}

export default BookLists