const express = require("express");
const router = express.Router();
const Staff = require("../models/kingsgate_tasks.model");

router.route("/").get(function (req, res) {
  Staff.find(function (err, staff) {
    if (err) {
      console.log(err);
    } else {
      res.json(staff);
    }
  });
});

router.route("/").post(function (req, res) {
  let staff = new Staff(req.body);
  staff
    .save()
    .then((staff) => {
      res.status(200).json({ staff: "Success" });
    })
    .catch((err) => {
      res.status(400).send("failed");
    });
});

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Staff.findById(id, function (err, staff) {
    res.json(staff);
  });
});
router.route("/:id").post(function (req, res) {
  Staff.findById(req.params.id, function (err, staff) {
    if (!staff) res.status(404).send("data is not found");
    else
      (staff.staff_name = req.body.staff_name),
        (staff.mobile_number = req.body.mobile_number),
        (staff.email_id = req.body.email_id),
        (staff.address = req.body.address),
        staff
          .save()
          .then((staff) => {
            res.json("Staff Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
});

router.route("/:id").delete((req, res, next) => {
  Staff.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
  router.route("/:id").put((req, res, next) => {
  Staff.findByIdAndDelete(req.params.id, (err, data) => {

    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});


module.exports = router;
