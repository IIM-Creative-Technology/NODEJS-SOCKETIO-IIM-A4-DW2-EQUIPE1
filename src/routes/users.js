const router = require("express").Router();

router.post("/", (req, res) => {
  // #swagger.summary = 'Create a new user';
  // #swagger.tags = ['Users']
  res.send("CREATE user");
});

router.get("/:id", (req, res) => {
  // #swagger.summary = 'Get user by id'
  // #swagger.tags = ['Users']
  res.send(req.params);
});

router.get("/", (req, res) => {
  // #swagger.summary = 'Get all users'
  // #swagger.tags = ['Users']
  res.send("get users");
});

router.delete("/:id", (req, res) => {
  // #swagger.summary = 'Delete user by id'
  // #swagger.tags = ['Users']
  res.send("DELETE USER");
});

module.exports = router;
