const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({ featured: true });
	res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.query;
	const queryObject = {};
	if (featured) {
		queryObject.featured = featured === "true" ? true : false;
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: "i" };
	}

	if (numericFilters) {
		const operatorMap = {
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
			"<=": "$lte",
			"<": "$lt",
		};
		const options = ["price", "rating"];
		const regEx = /\b(<|>|>=|<=|=|<)\b/g;
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		);
		filters = filters.split(",").forEach((item) => {
			const [option, operator, value] = item.split("-");
			if (!options.includes(option)) return;
			queryObject[option] = { [operator]: Number(value) };
		});
		console.log(queryObject);
	}

	let result = Product.find(queryObject); // not awaiting because sort and other methods will be chained conditionally
	if (sort) {
		result = result.sort(sort.split(",").join(" "));
	} else {
		result = result.sort("createdAt");
	}
	if (fields) {
		result = result.select(fields.split(",").join(" "));
	}
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);

	const products = await result;
	res.status(200).json({ products });
};

module.exports = { getAllProducts, getAllProductsStatic };
