import React from 'react';
import assets from '../../assets/assets';
import { useAppContext } from '../../context/AppContest';
import toast from 'react-hot-toast';

const BlogTable = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to update blog status');
    }
  };

  const deleteBlog = async () => {
    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>

      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>
          {blog.isPublished ? 'Published' : 'Draft'}
        </p>
      </td>

      <td className='px-2 py-4 flex text-xs gap-3'>
        <button
          onClick={togglePublish}
          className={`border px-2 py-0.5 mt-1 rounded cursor-pointer transition-colors ${
            blog.isPublished
              ? 'border-orange-400 text-orange-600 hover:bg-orange-50'
              : 'border-green-400 text-green-600 hover:bg-green-50'
          }`}
        >
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          className='w-8 hover:scale-110 transition-all cursor-pointer'
          alt="Delete"
        />
      </td>
    </tr>
  );
};

export default BlogTable;
