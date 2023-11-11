const express = require("express");
const Task = require("../models/tasks");

const router = express.Router();

// save task
router.post("/new_task", (req, res) => {
  const newTask = new Task(req.body);

  newTask
    .save()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        success: true,
        message: "Task Creating Success",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Task Creating Fail",
      });
    });
});

// get tasks
router.get("/view_tasks", (req, res) => {
  Task.find()
    .then((result) => {
      return res.status(200).json({
        success: true,
        tasks: result,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Tasks Loading Fail",
      });
    });
});

//get task by id
router.get("/get_task/:id", (req, res) => {
  const task_id = req.params.id;

  Task.findById(task_id)
    .then((result) => {
      return res.status(200).json({
        success: true,
        task: result,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Task Loading Fail",
      });
    });
});

module.exports = router;
