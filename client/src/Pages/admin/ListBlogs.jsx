import React, { useEffect, useState } from "react";
import BlogTable from "../../Components/admin/BlogTable";
import { useAppContext } from "../../context/AppContest";
import toast from "react-hot-toast";

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("api/admin/blogs");
      if (data.success) {
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // REMOVE any console.log or debugging code that uses `blogs` before it's defined
  // For example, don't put console.log(blogs) here unless it's inside useEffect or after useState

  return (
    <div className="flex-1 h-screen bg-gray-100 p-5 sm:p-10 overflow-hidden">
      {/* PAGE TITLE */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-gray-700">All Blogs</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage all published & draft blog posts
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-lg p-5 h-[80vh] overflow-y-auto">
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3">Blog Title</th>
                <th className="px-3 py-3 max-sm:hidden">Date</th>
                <th className="px-3 py-3 max-sm:hidden">Status</th>
                <th className="px-3 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* FIXED: Added proper conditional rendering */}
              {Array.isArray(blogs) && blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <BlogTable
                    key={blog._id ? String(blog._id) : `blog-${index}`}
                    blog={blog}
                    fetchBlogs={fetchBlogs}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlogs;