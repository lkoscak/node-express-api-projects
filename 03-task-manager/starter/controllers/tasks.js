const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomAPIError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (_req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks, amount: tasks.length });
});

const saveTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;
	const task = await Task.findOne({ _id: id });
	if (task === null) {
		return next(createCustomAPIError(`No task with provided id: ${id}`, 404));
	}
	res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const task = await Task.findOneAndUpdate({ _id: id }, data, {
		new: true,
		runValidators: true,
		//overwrite: true -- for PUT
	});
	if (task === null) {
		return next(createCustomAPIError(`No task with provided id: ${id}`, 404));
	}
	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const { id } = req.params;
	const task = await Task.findOneAndDelete({ _id: id });
	if (task === null) {
		return next(createCustomAPIError(`No task with provided id: ${id}`, 404));
	}
	res.status(200).json({ task });
	//res.status(200).send();
});

module.exports = { getAllTasks, saveTask, getTask, deleteTask, updateTask };
