const express = require("express");
const Task = require("../models/tasks");

const router = express.Router();

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
        message: "Tasks Loading Fail"
      })
    });
});

module.exports = router;
