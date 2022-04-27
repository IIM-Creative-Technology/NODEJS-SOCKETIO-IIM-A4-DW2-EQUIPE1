const jwt = require("jsonwebtoken");
const AuthenticationService = require("../services/authentication/authenticationToken");
const authService = new AuthenticationService();

class AuthenticationMiddleware{
    authentication (req, res, next) {
        try {
            const token = req.header("x-auth-token");
            if (!token) return res.status(403).send("Access denied.");
    
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
            req.user = decoded;
            next();
        } catch (error) {
            authService.refreshJwtToken();
            //res.status(400).send("Invalid token");
        }
    };
}

module.exports = AuthenticationMiddleware;