import React from 'react'
import DashSide from './DashSide';
import { Outlet } from 'react-router-dom';
import DashNav from './DashNav';
import DashFooter from './DashFooter';


const Dashboard = () => {
  return (
    // <div className="flex">
    //   <DashSide />
    //   {/* <DashSideTest /> */}
    //   <div className="flex-1 bg-white">
    //     <DashNav />
    //     <div className="py-4 px-4">
    //         <Outlet />
    //     </div>
    //     <DashFooter />
    //   </div>
    // </div>
    <div className="flex">
      <div className="fixed top-0 left-0 h-full md:w-64 bg-gray-200">
        <DashSide />
      </div>
      <div className="flex-1 md:ml-64 bg-white">
        <DashNav />
        <div className="py-4 px-4">
          <Outlet />
        </div>
        <DashFooter />
      </div>
    </div>
  )
}

export default Dashboard