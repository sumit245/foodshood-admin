const express = require("express");
const router = express.Router();
const Payment = require("../models/payments.model");

router.route("/").get(function (req, res) {
  Payment.find(function (err, pays) {
    if (err) {
      console.log(err);
    } else {
      res.json(pays);
    }
  });
});

router.route("/").post(function (req, res) {
  let payment = new Payment(req.body);
  payment
    .save()
    .then((payment) => {
      res.status(200).json({ payment: "Success" });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Payment.findById(id, function (err, payment) {
    res.json(payment);
  });
});
//get specific payment

router.route("/:id").post(function (req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if (!payment) res.status(404).send("data is not found");
    else
      (payment.client_name = req.body.client_name),
        (payment.challan_number = req.body.challan_number),
        (payment.payment_details=req.body.payment_details)
        (payment.status = req.body.status),
        payment
          .save()
          .then((payment) => {
            res.json("Client Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
});
//update a payment

router.route("/:id").delete((req, res, next) => {
  Payment.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
//delete a payment
module.exports = router;
