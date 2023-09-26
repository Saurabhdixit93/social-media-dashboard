// Like schema collection

const { Schema, model } = require("mongoose");
const likeSchema = new Schema(
  {
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Likable: { type: Schema.Types.ObjectId, require: true, refPath: "onModel" },
    onModel: { type: String, require: true, enum: ["post", "comment"] },
  },
  { timestamps: true }
);

module.exports = model("Likes", likeSchema);
