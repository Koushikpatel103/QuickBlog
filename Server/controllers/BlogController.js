import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";

/* ---------------- ADD BLOG ---------------- */
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } =
      JSON.parse(req.body.blog);

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const uploaded = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // delete temp image
    fs.unlinkSync(imageFile.path);

    const optimizedImageUrl = imagekit.url({
      path: uploaded.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- GET ALL BLOGS ---------------- */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- GET BLOG BY ID ---------------- */
export const getBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- DELETE BLOG ---------------- */
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;

    await Blog.findByIdAndDelete(id);

    // delete all comments related to this blog
    await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- TOGGLE PUBLISH ---------------- */
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: "Blog status updated",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- ADD COMMENT ---------------- */
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || !name || !content) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    await Comment.create({
      blog,
      name,
      content,
      isApproved: false,
    });

    res.json({
      success: true,
      message: "Comment added for review",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- GET BLOG COMMENTS (FIXED) ---------------- */
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 }); // ✅ FIXED (NO toSorted)

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- GENERATE BLOG CONTENT WITH AI ---------------- */
export const generateBlogContent = async (req, res) => {
  try {
    const { title, subtitle, category } = req.body;

    if (!title) {
      return res.json({ success: false, message: "Title is required" });
    }

    const prompt = `Write a well-structured blog post about: "${title}"${subtitle ? ` (subtitle: ${subtitle})` : ""}${category ? ` in the ${category} category` : ""}.

Return the content as clean HTML using <h2>, <p>, <ul>, <li>, <strong> tags only. Do not include <html>, <body>, or <head> tags. Write 4-6 paragraphs with subheadings. Be informative, engaging and professional.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data));
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      res.json({ success: true, content: text });
    } else {
      res.json({ success: false, message: data?.error?.message || "AI generation failed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};