const jwt = require("jsonwebtoken")

class AuthenticationService {
	#jwtKey = process.env.JWTPRIVATEKEY;
	#jwtExpirySeconds = 300;
	#refreshTokenExpirySeconds = 600;

	createJwtToken = (res, username) => {
		// Create a new token with the username in the payload
		// and which expires 300 seconds after issue
		const token = jwt.sign({ username }, this.#jwtKey, {
			algorithm: "HS256",
			expiresIn: this.#jwtExpirySeconds,
		});

		const refreshToken = jwt.sign({ username }, this.#jwtKey, {
			algorithm: "HS256",
			expiresIn: this.#refreshTokenExpirySeconds,
		});
		console.log("token:", token);

		// set the cookie as the token string, with a similar max age as the token
		// here, the max age is in milliseconds, so we multiply by 1000
		res.cookie("token", token, { maxAge: this.#jwtExpirySeconds * 1000 });
		res.cookie("refreshToken", refreshToken, { maxAge: this.#refreshTokenExpirySeconds * 1000 });
		res.end();
	}

	refreshJwtToken = (req, res) => {
		// Get token by cookie
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).end();
			// TODO Send back to login
		}

		var payload
		try {
			payload = jwt.verify(refreshToken, this.#jwtKey);
			createJwtToken(res, payload.username);
		} catch (e) {
			if (e instanceof jwt.JsonWebTokenError) {
				return res.status(401).end();
			}
			return res.status(400).end();
		}
	}

}

module.exports = AuthenticationService;