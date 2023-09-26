const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// User Registration

const Signup = async (req, res) => {
  const { name, email, password, confirmPassword, profileImage } = req.body;
  if (password !== confirmPassword) {
    return res.json({
      success: false,
      message: "Password and confirm password do not match.",
    });
  }
  const securePassword = await bcryptjs.hash(password, 15);
  const validEmail = email.toLowerCase();

  try {
    const userExists = await UserModel.findOne({ email: validEmail });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists. Please choose a different email.",
      });
    }
    const newAccount = await new UserModel({
      name,
      email: validEmail,
      password: securePassword,
      profileImage,
    });
    await newAccount.save();
    return res.json({
      success: true,
      message: "Registration successful. Welcome to our platform!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occurred during registration. Please try again later.",
    });
  }
};

// User Login

const Login = async (req, res) => {
  const { email, password } = req.body;
  const validEmail = email.toLowerCase();
  try {
    const user = await UserModel.findOne({ email: validEmail });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found. !",
      });
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({
        success: false,
        message:
          "Incorrect password. Please check your password and try again.",
      });
    }
    const token = await jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      message: "Login successful. Welcome!",
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message:
        "An error occurred during Login wia Password. Please try again later.",
    });
  }
};

// Get Specific User Detatis

const GetUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found.",
      });
    }
    user.password = undefined;
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message:
        "An error occurred during Getting User Details .Please try again later.",
    });
  }
};
// Account delete

const AccountDelete = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await UserModel.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.json({
        success: false,
        message: "User not found. No user was deleted.",
      });
    }
    return res.json({
      success: true,
      message: "User has been successfully deleted.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message:
        "An error occurred during Delete Account. Please try again later.",
    });
  }
};

module.exports = {
  Signup,
  Login,
  AccountDelete,
  GetUserId,
};
