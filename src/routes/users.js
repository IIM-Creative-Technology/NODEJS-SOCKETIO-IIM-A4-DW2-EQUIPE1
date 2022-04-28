const express = require("express");
const path = require("path");
const auth  = require('../middleware/authentication');
const router = express.Router();
const {
  getMe,
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
/**
 * User Routes
 */
router.get("/me", new auth().authentication, getMe);
router.get("/all", getAllUsers);
router.post("/register", registerUser);
router.get('/register', (req, res) => {
  res.sendFile(path.resolve('template/register.html'))
});
router.post("/login", loginUser);
router.get('/login', (req, res) => {
  res.sendFile(path.resolve('template/login.html'))
});
router.put("/:id/update", new auth().authentication, updateUser);
router.delete("/:id/delete", new auth().authentication, deleteUser);

module.exports = router;
