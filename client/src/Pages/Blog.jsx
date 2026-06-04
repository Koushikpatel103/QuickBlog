import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";
import moment from "moment";
import { assets } from "../assets/assets";

function Blog() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // Fetch blog details
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch blog data"
      );
    }
  };

  // Fetch blog comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch comments"
      );
    }
  };

  // Add a new comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/addComment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchComments(); // Refresh comments after adding
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add comment"
      );
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  if (!data) return <Loader />;

  return (
    <div className="pb-0">
      {/* Background + Navbar */}
      <div className="relative">
        <img
          src={assets.gradientBackground}
          alt="background"
          className="absolute -top-10 left-0 w-full opacity-40 -z-10"
        />

        <Navbar />

        <div className="max-w-4xl mx-auto mt-10 px-4">
          <p className="text-center text-gray-500 text-sm">
            Published on {moment(data.createdAt).format("MMMM Do YYYY")}
          </p>

          <h1 className="text-center font-semibold text-2xl sm:text-5xl text-gray-900 max-w-2xl mx-auto mt-2">
            {data.title}
          </h1>

          <h2 className="text-center text-xl text-gray-600 mt-2 truncate max-w-2xl mx-auto">
            {data.subTitle}
          </h2>

          <p className="mx-auto w-max py-2 px-6 rounded-full mb-6 
   border text-sm sm:text-base border-primary/40 
   bg-primary/10 font-semibold text-primary 
   text-center mt-5 ">
            Michael Brown
          </p>
        </div>

        {/* Blog Image + Description */}
        <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
          <img src={data.image} alt="" className="rounded-3xl mb-5" />

          <div
            className="rich-text max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        </div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto px-3">
          <p className="text-lg font-semibold mb-3">
            Comments ({comments.length})
          </p>

          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="bg-primary/5 border border-primary/10 p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {moment(item.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto mt-12 p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
          <p className="text-xl font-semibold mb-4 text-gray-800">
            Add your Comment
          </p>

          <form onSubmit={addComment} className="flex flex-col gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-primary/50 
                 text-gray-700"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 h-32 resize-none focus:outline-none focus:ring-2 
                 focus:ring-primary/50 text-gray-700"
            ></textarea>

            <button
              type="submit"
              className="w-max bg-primary text-white py-2 px-6 rounded-lg 
                 font-medium shadow-md hover:bg-primary/90 
                 transition-all duration-200"
            >
              Post Comment
            </button>
          </form>
        </div>

        {/* Social Media Share */}
        <div className="max-w-3xl mx-auto mt-12 mb-20 px-3">
          <p className="text-2xl font-semibold text-gray-800">
            Share this blog to others
          </p>

          <div className="flex items-center gap-6 mt-4">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <img
              src={assets.googleplus_icon}
              alt="Google Plus"
              className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
