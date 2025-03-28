const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage: storage });

router.get('/blogs/new', (req, res) => {
  res.render('blogform', { blog: null });
});

router.post('/blogs', upload.single("blogImage"), async (req, res) => {
  const { title, description } = req.body;
  const blogImage = req.file ? req.file.path : null; 

  if (!title || title.length < 3) {
    return res.send("Title must be at least 3 characters!");
  }
  if (!description || description.length < 10) {
    return res.send("Description is too short!");
  }

  try {
    const blog = new Blog({
      title,
      image: blogImage,
      description,
      userId: req.user._id,
    });
    await blog.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.log("Error saving blog:", err);
    res.send("Failed to save blog!");
  }
});

router.get('/blogs/:id/edit', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!blog) {
      return res.send("Blog not found!");
    }
    res.render('blogform', { blog });
  } catch (err) {
    console.log("Error fetching blog:", err);
    res.send("Something went wrong!");
  }
});

router.post('/blogs/:id', upload.single("blogImage"), async (req, res) => {
  const { title, description } = req.body;
  const blogImage = req.file ? req.file.path : null;

  if (!title || title.length < 3) {
    return res.send("Title must be at least 3 characters!");
  }
  if (!description || description.length < 10) {
    return res.send("Description is too short!");
  }

  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!blog) {
      return res.send("Blog not found!");
    }
    blog.title = title;
    blog.description = description;
    if (blogImage) blog.image = blogImage;
    await blog.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.log("Error updating blog:", err);
    res.send("Failed to update blog!");
  }
});

router.get('/blogs/:id/delete', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!blog) {
      return res.send("Blog not found!");
    }
    await Blog.deleteOne({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.log("Error deleting blog:", err);
    res.send("Failed to delete blog!");
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
      .populate("comments.userId", "username")
      .populate("comments.replies.userId", "username");
    if (!blog) {
      return res.send("Blog not found!");
    }
    res.render('blogdetail', { blog, user: req.user });
  } catch (err) {
    console.log("Error fetching blog:", err);
    res.send("Something went wrong!");
  }
});


router.post('/blogs/:id/comments', async (req, res) => {
  const { commentText } = req.body;

  if (!commentText || commentText.length < 5) {
    return res.send("Comment must be at least 5 characters!");
  }

  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!blog) {
      return res.send("Blog not found!");
    }
    blog.comments.push({
      text: commentText,
      userId: req.user._id,
    });
    await blog.save();
    res.redirect(`/blogs/${req.params.id}`);
  } catch (err) {
    console.log("Error adding comment:", err);
    res.send("Failed to add comment!");
  }
});

router.post('/blogs/:blogId/comments/:commentId/reply', async (req, res) => {
  const { replyText } = req.body;

  if (!replyText || replyText.length < 5) {
    return res.send("Reply must be at least 5 characters!");
  }

  try {
    const blog = await Blog.findOne({
      _id: req.params.blogId,
      userId: req.user._id,
    });
    if (!blog) {
      return res.send("Blog not found!");
    }
    const comment = blog.comments.id(req.params.commentId);
    if (!comment) {
      return res.send("Comment not found!");
    }
    comment.replies.push({
      text: replyText,
      userId: req.user._id,
    });
    await blog.save();
    res.redirect(`/blogs/${req.params.blogId}`);
  } catch (err) {
    console.log("Error adding reply:", err);
    res.send("Failed to add reply!");
  }
});

module.exports = router;
