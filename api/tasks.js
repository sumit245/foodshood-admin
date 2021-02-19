const express = require("express");
const router = express.Router();
const Task = require("../models/kingsgate_tasks.model");

router.route("/").get(function (req, res) {
  Task.find(function (err, task) {
    if (err) {
      console.log(err);
    } else {
      res.json(task);
    }
  });
});

router.route("/").post(function (req, res) {
  let task = new Task(req.body);
  task
    .save()
    .then((task) => {
      res.status(200).json({ task: "Success" });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Task.findById(id, function (err, task) {
    res.json(task);
  });
});
//get specific task

router.route("/:id").post(function (req, res) {
  Task.findById(req.params.id, function (err, task) {
    if (!task) res.status(404).send("data is not found");
    else
      (task.task_type = req.body.task_type),
        (task.staff_name = req.body.staff_name),
        (task.group = req.body.group),
        (task.status = req.body.status),
        task
          .save()
          .then((task) => {
            res.json("Client Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
});
//update a task

router.route("/:id").delete((req, res, next) => {
  Task.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
//delete a task

module.exports = router;
