const express = require("express");
const {
	getAllTasks,
	getTask,
	updateTask,
	saveTask,
	deleteTask,
} = require("../controllers/tasks");

const router = express.Router();

router.route("/").get(getAllTasks).post(saveTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
