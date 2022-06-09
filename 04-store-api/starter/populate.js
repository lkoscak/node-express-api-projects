require("dotenv").config();

const connectToDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
	try {
		await connectToDB(process.env.MONGO_URI);
		await Product.deleteMany();
		await Product.create(jsonProducts);
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
