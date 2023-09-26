// user schema collection

const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profileImage: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
