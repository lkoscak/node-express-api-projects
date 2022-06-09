require("dotenv").config();
const express = require("express");
require("express-async-errors");
const connectToDB = require("./db/connect");

const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const productsRouter = require("./routes/products");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello world");
});
app.use("/api/v1/products", productsRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await connectToDB(process.env.MONGO_URI);
		const port = process.env.PORT || 5000;
		app.listen(port, () => {
			console.log(`Server listening on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
