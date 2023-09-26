// JWT config

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.json({
        success: false,
        message:
          "Authorization token missing. Please include the authorization token in your request headers.",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.json({
        success: false,
        message: "Sorry, the session has expired. Please log in again.",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.json({
        success: false,
        message:
          "Authorization token is invalid. Please provide a valid authorization token.",
      });
    }

    return res.json({
      success: false,
      message:
        "Internal Server Error. Please try again later or contact support.",
    });
  }
};

module.exports = { verifyToken };
