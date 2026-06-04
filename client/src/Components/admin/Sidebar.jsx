import React from 'react'
import { NavLink } from 'react-router-dom'
import assets from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-3 p-4 bg-white shadow-md h-full'>

      {/* Dashboard */}
      <NavLink 
        end 
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg cursor-pointer 
          hover:bg-gray-100 transition 
          ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
        }
      >
        <img src={assets.home_icon} alt='' className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>

      {/* Add Blog */}
      <NavLink 
        to="/admin/addblog"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg cursor-pointer 
          hover:bg-gray-100 transition 
          ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
        }
      >
        <img src={assets.add_icon} alt='' className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Add Blog</p>
      </NavLink>

      {/* List Blog */}
      <NavLink 
        to="/admin/listblogs"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg cursor-pointer 
          hover:bg-gray-100 transition 
          ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
        }
      >
        <img src={assets.list_icon} alt='' className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>List Blog</p>
      </NavLink>

      {/* Comments */}
      <NavLink 
        to="/admin/comment"
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg cursor-pointer 
          hover:bg-gray-100 transition 
          ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
        }
      >
        <img src={assets.list_icon} alt='' className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>

    </div>
  )
}

export default Sidebar
