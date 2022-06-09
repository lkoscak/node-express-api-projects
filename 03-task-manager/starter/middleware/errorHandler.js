const { CustomAPIError } = require("../errors/custom-error");

const errorHandler = (err, _req, res, _next) => {
	return res
		.status(err instanceof CustomAPIError ? err.statusCode : err.status)
		.json({ error: err.message });
};

module.exports = errorHandler;
