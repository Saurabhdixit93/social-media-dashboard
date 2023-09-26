const { Router } = require("express");
const router = Router();

router.use("/user", require("./User"));
router.use("/post", require("./Post"));
router.use("/comment", require("./Comment"));
router.use("/like", require("./Likes"));
module.exports = router;
