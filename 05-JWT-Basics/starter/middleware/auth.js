const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../errors/index");

const authorize = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization || !authorization.startsWith("Bearer ")) {
		throw new Unauthorized("No token provided");
	}
	const token = authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		res.locals.username = decoded.username;
		next();
	} catch (error) {
		throw new Unauthorized("Not authorized to access this route");
	}
};

module.exports = authorize;
