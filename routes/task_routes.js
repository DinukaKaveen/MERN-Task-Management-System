const express = require("express");
const Task = require("../models/tasks");

const router = express.Router();

router.post("/new_task", (req, res) => {
  const newTask = new Task(req.body);

  newTask.save((err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Task Creating Fail",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Task Creating Success",
      });
    }
  });
});

module.exports = router;