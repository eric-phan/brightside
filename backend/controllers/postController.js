const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/postModel");
const mongoose = require("mongoose");

// Multer configuration

// get all users' posts
const getPosts = async (req, res) => {
  const user_id = req.user._id;
  // gets the user id

  const posts = await Post.find({ user_id }).sort({ createdAt: -1 });
  // find based on user id, only by the currently logged in user

  res.status(200).json(posts);
};
// get feed posts
const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: "desc" }).lean();

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get a single post
const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

// create new post
const createPost = async (req, res) => {
  const { title, reps, caption } = req.body;
  const image = req.file; // Use req.file instead of req.body.image

  // ...

  try {
    const user_id = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(image.path, {
      upload_preset: "postsMERN",
      transformation: [
        { width: 500, height: 500, crop: "fill", responsive: true },
        // { width: "auto", height: "auto", crop: "fill", responsive: true },
        // Adjust the width and height as needed
      ],
    });

    const post = await Post.create({
      title,
      image: uploadResponse.secure_url,
      cloudinaryId: uploadResponse.public_id,
      reps,
      caption,
      user_id,
    });

    // ...

    res.status(200).json(post);
    console.log(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    let post = await Post.findById({ _id: id });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such post" });
    }

    await cloudinary.uploader.destroy(post.cloudinaryId);
    await Post.findOneAndDelete({ _id: id });

    if (!post) {
      return res.status(400).json({ error: "No such post" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a post

const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // This option returns the updated post instead of the original one
    );

    if (!post) {
      return res.status(400).json({ error: "No such post" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getFeedPosts,
};
