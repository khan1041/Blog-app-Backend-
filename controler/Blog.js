
import mongoose, { mongo } from "mongoose";
import { Blog } from "../Models/Blogscema.js";
import { v2 as cloudinary } from "cloudinary";

//----crate Blog//--

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }
    const { Blogimage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedFormats.includes(Blogimage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }
    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category & about are required fields" });
    }
    const adiminname = req?.user?.name;
    const adiminphoto= req?.user?.photo?.url;
    const createdby= req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(

      Blogimage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }
    const blogData = {
      title,
      about,
      category,
      adiminname,
       adiminphoto,
      createdby,
      Blogimage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    const blog = await Blog.create(blogData);
     console.log(blog)
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};


//--Blog Delete--//


export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};


//--ALL BLOG FIND()--//


export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};


//==SINGALE BLOG FIND()



export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};


//==Ceak my Blog



export const getMyBlogs = async (req, res) => {
  const createdBy = req.params.id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};



//== Blog updated


export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });



  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(updatedBlog);
};

