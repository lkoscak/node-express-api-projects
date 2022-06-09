const express = require("express");
const path = require("path");
require("dotenv").config();

const connectToDb = require("./db/connect");
const tasksRouter = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// middleware
app.use(express.json());

// routes
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler); // this will work because error midleware is hit only if error happens on valid route

const start = async () => {
	try {
		await connectToDb(process.env.MONGO_URI);
		const port = process.env.PORT || 5000;
		app.listen(port, () => {
			console.log(`Listening on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
