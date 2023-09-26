const PostModel = require("../models/PostModel");
const LikeModel = require("../models/LikeModel");
const CommentModel = require("../models/CommentModel");

// Create new Post
const CreatePost = async (req, res) => {
  const { text, postImage } = req.body;
  const { userId } = req.params;
  try {
    const newPost = await new PostModel({
      text,
      postImage,
      User: userId,
    });
    await newPost.save();

    return res.json({
      success: true,
      message: "Post created successfully.",
      newPost,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to create the post. Please try again later.",
    });
  }
};

// Get All Posts with likes and comments
const getPosts = async (req, res) => {
  try {
    let posts = await PostModel.find({})
      .sort("-createdAt")
      .populate("User")
      .populate({
         path: 'Comments',
        populate: {
          path: "User",
        },
      })
      .populate({
        path: 'Comments',
        populate: {
          path: "Likes",
        },
      })
      .populate("Likes");

    if (!posts || posts.length === 0) {
      return res.json({
        success: true,
        message: "No posts available.",
        posts: [],
      });
    }

    return res.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message:
        "An error occurred while fetching posts. Please try again later.",
      error
    });
  }
};

// Delete the post
const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const deletePosts = await PostModel.findByIdAndDelete(postId);
    if (!deletePosts) {
      return res.json({
        success: false,
        message: "Failed to delete posts. Please try again later.",
      });
    }
    await LikeModel.deleteMany({ likable: postId, onModel: "post" });
    await LikeModel.deleteMany({ _id: { $in: postId.Comments } });
    await CommentModel.deleteMany({ Post: postId });
    return res.json({
      success: true,
      message: "Post, comments, and likes have been deleted successfully.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message:
        "An error occurred while deleting the post. Please try again later.",
    });
  }
};

module.exports = {
  CreatePost,
  getPosts,
  deletePost,
};
