const { Router } = require("express");
const router = Router();
const {
  createComment,
  deleteComment,
} = require("../controllers/CommentController");
const { verifyToken } = require("../config/Jwt");

router.post("/create-comment/:userId", verifyToken, createComment);
router.delete("/delete-comment/:commentId", verifyToken, deleteComment);

module.exports = router;
