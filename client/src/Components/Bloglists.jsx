import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import Blogcard from "./Blogcard";
import { useAppContext } from "../context/AppContest";

function Bloglists() {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      {/* Categories */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer relative px-4 py-1 rounded-full transition-all
                ${menu === item ? "text-white" : "text-gray-500"}
              `}
            >
              {/* Category Name */}
              {item}

              {/* Highlight background */}
              {menu === item && (
                <motion.div
                  layoutId="menuHighlight"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <Blogcard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
}

export default Bloglists;
