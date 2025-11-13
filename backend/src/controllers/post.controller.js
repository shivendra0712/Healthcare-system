import Post from "../models/Post.js";

// Create post (Editor only)
export const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ message: "Title and content are required" });

  const newpost = await Post.create({
    title,
    content,
    author: req.user._id,
  });
  console.log("newpost",newpost);
 const post = await Post.findById(newpost._id).populate("author", "name role");
 console.log("post",post);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(201).json(post);
};

// Get all posts (Public)
export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name role");
  res.status(200).json(posts);
};

// Get single post
export const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name role");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(200).json(post);
};

// Update post (Editor only)
export const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.title = title || post.title;
  post.content = content || post.content;
  await post.save();
  
  res.status(200).json(post);
};

// Delete post (Editor only)
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.deleteOne();
  res.status(200).json({ message: "Post deleted successfully" });
};
