const jwt = require("jsonwebtoken");
const AuthenticationService = require("../services/authentication/authenticationToken");
const authService = new AuthenticationService();

class AuthenticationMiddleware{
    authentication = async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) return res.redirect('/api/users/login');
    
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
            req.user = decoded;
            return next();
        } catch (error) {
            await authService.refreshJwtToken();
        }
    };
}

module.exports = AuthenticationMiddleware;