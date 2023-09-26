const Post = require("../models/PostModel");
const Comments = require("../models/CommentModel");
const Likes = require("../models/LikeModel");

const toggleLike = async (req, res) => {
  let likable;
  let deleted = false;
   let likableId = req.query.id ;
  let { userId } = req.params;
  let type = req.query.type;
  try {
    if (type == "post") {
      likable = await Post.findById(likableId).populate("Likes");
    } else {
      likable = await Comments.findById(likableId).populate("Likes");
    }
    let existingLike = await Likes.findOne({
      User: userId,
      Likable: likableId,
      onModel: type,
    }).lean();
    if (existingLike) {
      likable.Likes.pull(existingLike._id);
      likable.save();

      await Likes.deleteOne({ _id: existingLike._id });
      deleted = true;
      return res.json({
        success:false,
        message:"Post Disliked !",
      })
    } else {
      newLike = await Likes.create({
        User: userId,
        Likable: likableId,
        onModel: type,
      });
      likable.Likes.push(newLike._id);
      likable.save();
    }
    return res.json({
      success:true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Errorr ..",
      error,
    });
  }
};

module.exports = {
  toggleLike,
};
