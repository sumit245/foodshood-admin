const express = require("express");
const router = express.Router();
const Subscription = require("../models/product.model");

router.route("/").get(function (req, res) {
  Subscription.find(function (err, subs) {
    if (err) {
      console.log(err);
    } else {
      res.json(subs);
    }
  });
});

router.route("/").post(function (req, res) {
  let subs = new Subscription(req.body);
  subs
    .save()
    .then((subs) => {
      res.status(200).json({ subs: "Success" });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Subscription.findById(id, function (err, subs) {
    res.json(subs);
  });
});
//get specific subs

router.route("/:id").post(function (req, res) {
  Subscription.findById(req.params.id, function (err, subs) {
    if (!subs) res.status(404).send("data is not found");
    else
      (subs.client_name = req.body.client_name),
        (subs.mobile_number = req.body.mobile_number),
        (subs.subscription_type = req.body.subscription_type),
        (subs.factory_name = req.body.company),
        (subs.start_date = req.body.start_date),
        (subs.end_date = req.body.end_date);
    subs
      .save()
      .then((subs) => {
        res.json("Client Update Successfully");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});
//update a subs

router.route("/:id").delete((req, res, next) => {
  Subscription.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
//delete a subs

module.exports = router;
