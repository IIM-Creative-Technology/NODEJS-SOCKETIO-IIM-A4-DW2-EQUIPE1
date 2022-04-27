// User Controller
/**
 * Get all Users
 * @param req
 * @param res
 */
 exports.getUsers = function (req, res) {
    res.send("get user!");
  };
  /**
   * New User
   * @param req
   * @param res
   */
  exports.postUser = function (req, res) {
    res.send("post user");
  };
  /**
   * Update User from ID
   * @param req
   * @param res
   */
  exports.updateUser = function (req, res) {
    res.send("put user!");
  };
  /**
   * Delete User
   * @param req
   * @param res
   */
  exports.deleteUser = function (req, res) {
    res.send("delete user!");
  };
  