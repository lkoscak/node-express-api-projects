const { BadRequest } = require("../errors/index");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
	const { username, password } = req.body;
	if (!username.trim() || !password.trim()) {
		throw new BadRequest("Please provide username and password");
	}
	const id = new Date().getDate();
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
	res.status(200).json({ msg: "User login", token });
};

const dashboard = (req, res, next) => {
	const luckyNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: `Hello ${res.locals.username}`,
		secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
	});
};

module.exports = { login, dashboard };
