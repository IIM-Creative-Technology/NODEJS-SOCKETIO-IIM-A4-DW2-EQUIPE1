const express = require("express");
const router = express.Router();
const {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
/**
 * User Routes
 */
router.get("/", getUsers);
router.post("/", postUser);
router.put("/:id/update", updateUser);
router.delete("/:id/delete", deleteUser);

module.exports = router;
