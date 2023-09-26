const { Router } = require("express");
const router = Router();
const { toggleLike } = require("../controllers/LikesController");
const { verifyToken } = require("../config/Jwt");

router.get("/like-toggle/:userId", verifyToken, toggleLike);
module.exports = router;
