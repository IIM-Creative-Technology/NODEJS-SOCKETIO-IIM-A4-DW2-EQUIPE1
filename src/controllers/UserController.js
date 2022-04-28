const userModel = require("../data/userModel");
const jwtToken = require("../services/authentication/authenticationToken");
const bcrypt = require('bcryptjs');
// User Controller
/**
 * Get all users
 * @param req
 * @param res
 */
exports.getAllUsers = async function (req, res) {
    const userList = await userModel.findAll();
    res.json(userList);
}
/**
 * Get current User
 * @param req
 * @param res
 */
exports.getMe = function (req, res) {
    res.json(req.user);
};
/**
 * New User
 * @param req
 * @param res
 */
exports.registerUser = async function (req, res) {
    console.log(req.body);
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await userModel.create(req.body);
        new jwtToken().createJwtToken(res, user.email);
        res.redirect('/api/users/me');
    } catch (e) {
        res.send(e);
    }
};
/**
 * Login User
 * @param req
 * @param res
 */
exports.loginUser = async function (req, res) {
    console.log(req.body);
    try {
        const user = await userModel.findOne({ where: { email: req.body.email } });
        if (user != null) {
            const isGood = bcrypt.compareSync(req.body.password, user.password);
            if (isGood) {
                new jwtToken().createJwtToken(res, user.email);
                res.redirect('/api/users/me');
            } else {
                res.status(403);
            }
        } else { res.status(403); }
    } catch (e) {
        res.status(500).send(e);
    }
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
exports.deleteUser = async function (req, res) {
    try {
        await userModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204);
    } catch (e) {
        res.status(500);
    }
};
