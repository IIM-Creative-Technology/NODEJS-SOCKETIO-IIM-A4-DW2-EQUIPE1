const express = require("express");
const auth  = require('../middleware/authentication');
const router = express.Router();
const {
  getMe,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
/**
 * User Routes
 */
router.get("/me", new auth().authentication, getMe);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id/update", new auth().authentication, updateUser);
router.delete("/:id/delete", new auth().authentication, deleteUser);

module.exports = router;
