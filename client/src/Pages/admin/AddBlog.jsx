import React, { useEffect, useRef, useState } from "react";
import assets, { blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContest";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const generateContent = async () => {
    if (!title) {
      toast.error("Please enter a blog title first");
      return;
    }

    setIsGenerating(true);
    try {
      const { data } = await axios.post("/api/blog/generate", {
        title,
        subtitle,
        category,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = data.content;
        toast.success("Content generated!");
      } else {
        toast.error(data.message || "Failed to generate content");
      }
    } catch (error) {
      toast.error("AI generation failed: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const blog = {
        title,
        subTitle: subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("api/blog/add", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setTitle("");
        setSubtitle("");
        setCategory("");
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-3xl mx-auto p-3 space-y-5">
      {/* Upload Image */}
      <div>
        <p className="font-semibold mb-2">Upload Thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="w-48 h-32 object-cover border rounded"
          />
          <input
            id="image"
            type="file"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      </div>

      {/* Title */}
      <div>
        <p className="font-semibold mb-1">Blog Title</p>
        <input
          type="text"
          placeholder="Enter blog title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Subtitle */}
      <div>
        <p className="font-semibold mb-1">Subtitle</p>
        <input
          type="text"
          placeholder="Enter subtitle"
          className="w-full border px-3 py-2 rounded"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />
      </div>

      {/* Category */}
      <div>
        <p className="font-semibold mb-1">Category</p>
        <select
          name="category"
          className="w-full p-2 border rounded-md text-gray-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Description + AI Button */}
      <div className="relative">
        <p className="font-semibold mb-2">Blog Description</p>
        <div
          ref={editorRef}
          className="bg-white border rounded min-h-[200px] p-2"
        ></div>

        <button
          type="button"
          onClick={generateContent}
          disabled={isGenerating}
          className="absolute bottom-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow hover:bg-blue-900 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full"></span>
              Generating...
            </>
          ) : (
            "Generate with AI"
          )}
        </button>
      </div>

      {/* Publish Checkbox */}
      <div className="flex items-center gap-2">
        <p className="font-medium">Publish Now</p>
        <input
          type="checkbox"
          checked={isPublished}
          className="scale-125 cursor-pointer"
          onChange={(e) => setIsPublished(e.target.checked)}
        />
      </div>

      {/* Submit */}
      <button
        disabled={isAdding}
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
      >
        {isAdding ? "Adding..." : "Add Blog"}
      </button>
    </form>
  );
};

export default AddBlog;