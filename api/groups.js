const express = require("express");
const router = express.Router();
const Groups = require("../models/bills.model");

router.route("/").get(function (req, res) {
  Groups.find(function (err, groups) {
    if (err) {
      console.log(err);
    } else {
      res.json(groups);
    }
  });
});
//get all groups

router.route("/").post(function (req, res) {
  let group = new Groups(req.body);
  group
    .save()
    .then((group) => {
      res.status(200).json({ groups: "Success" });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//save a group
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Groups.findById(id, function (err, group) {
    res.json(group);
  });
});
//get specific group

router.route("/:id").post(function (req, res) {
  Groups.findById(req.params.id, function (err, group) {
    if (!task) res.status(404).send("data is not found");
    else group.group_name = req.body.group_name;
    group
      .save()
      .then((task) => {
        res.json("Client Update Successfully");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

router.route("/:id").delete((req, res, next) => {
  Groups.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
//delete a group

module.exports = router;
