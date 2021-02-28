const express = require("express");
const router = express.Router();
const Users = require("../models/users.model");
router.route("/").get(function (req, res) {
    Users.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.route("/").post(function (req, res) {
  let user = new Users(req.body);
  user
    .save()
    .then((user) => user)
    .then((user) => {
      res.status(200).json({ user: "Done..." });
      res.send(user);
      //   msg91.send(user.mobile_number, msg, function (err, res) {
      //     console.log(err);
      //     console.log(res);
      //     console.log(msg + "sent to" + res + user.user_name);
      //   });
    })
    .catch((err) => {
      res.status(400).send("adding new Client failed");
    });
});
//save a singe user to database

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Users.findById(id, function (err, user) {
    res.json(user);
  });
});
//get specific user

router.route("/:id").post(function (req, res) {
  Users.findById(req.params.id, function (err, user) {
    if (!user) res.status(404).send("data is not found");
    else
      (user.first_name = req.body.first_name),
        (user.last_name = req.body.last_name),
        (user.phone = req.body.phone),
        (user.address = req.body.address),
        (user.gst_num = req.body.gst_num),
        (user.status= req.body.status)
        user
          .save()
          .then((user) => {
            res.json("Client Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
});
//update a user

router.route("/:id").delete((req, res, next) => {
  Users.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
//delete a user

module.exports = router;
