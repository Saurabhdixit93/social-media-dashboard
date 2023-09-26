// Post schema collection

const { Schema, model } = require("mongoose");
const postSchema = new Schema(
  {
    text: { type: String, require: true },
    postImage: { type: String },
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
   Likes: [{ type: Schema.Types.ObjectId, ref: 'Likes' }],
  },
  { timestamps: true }
);

module.exports = model("Posts", postSchema);
