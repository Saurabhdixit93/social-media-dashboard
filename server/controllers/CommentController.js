const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");
const LikeModel = require("../models/LikeModel");

const createComment = async (req, res) => {
  const { userId } = req.params;
  const { text, postId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post) {
      let comment = await CommentModel.create({
        text,
        Post: postId,
        User: userId,
      });
      post.Comments.push(comment);
      post.save();
      comment = await comment.populate("User", "name email");
      return res.json({
        success: true,
        message: "Comment created successfully.",
      });
    } else {
      return res.json({
        success: false,
        message: "Post not found. Comment creation failed.",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to create the comment. Please try again later.",
    });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.query;
  try {
    let comment = await CommentModel.findById(commentId);
    if (comment.User === userId) {
      let postId = comment.Post;
      await CommentModel.deleteOne({ _id: comment._id });
      let post = await PostModel.findByIdAndUpdate(postId, {
        $pull: { Comments: commentId },
      });
      await LikeModel.deleteMany({
        likable: comment._id,
        onModel: "comment",
        reaction: { $exists: true },
      });
    }
  } catch (error) {}
};

module.exports = {
  createComment,
  deleteComment,
};
