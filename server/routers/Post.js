const { Router } = require("express");
const router = Router();
const {
  CreatePost,
  deletePost,
  getPosts,
} = require("../controllers/PostController");
const { verifyToken } = require("../config/Jwt");

router.post("/create-post/:userId", verifyToken, CreatePost);
router.delete("/delete-post/:postId", verifyToken, deletePost);

router.get("/posts", getPosts);
module.exports = router;
