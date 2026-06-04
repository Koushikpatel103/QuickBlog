import React, { useEffect, useState } from 'react'
import assets, { dashboard_data } from '../../assets/assets'
import BlogTable from '../../Components/admin/BlogTable'  

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboard = async () => {
    
    setDashboardData(dashboard_data)
      
     
    
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className="ml-48 flex-1 p-4 md:p-10 bg-blue-50/50">

      <div className="flex flex-wrap gap-4">

        {/* Blogs Card */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" className="w-10" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        {/* Comments Card */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" className="w-10" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.comments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" className="w-10" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>

        {/* Latest Blogs */}
        <div className="w-full mt-6">
          <div className="flex items-center gap-3">
            <img src={assets.dashboard_icon_4} alt="" className="w-8" />
            <p className="text-lg font-semibold text-gray-600">Latest Blogs</p>
          </div>

          <div className="relative max-w-4xl mt-4 overflow-x-auto rounded-lg bg-white shadow scrollbar-hide">
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-500 text-left uppercase bg-gray-50">
                <tr>
                  <th className="px-2 py-4">#</th>
                  <th className="px-2 py-4">Blog Title</th>
                  <th className="px-2 py-4 max-sm:hidden">Date</th>
                  <th className="px-2 py-4 max-sm:hidden">Status</th>
                  <th className="px-2 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => {
                  return (
                    <BlogTable
                      key={blog._id}
                      blog={blog}
                      fetchBlogs={fetchDashboard}
                      index={index + 1}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
