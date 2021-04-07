const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoice.model");

router.route("/").get(function (req, res) {
  Invoice.find(function (err, invoice) {
    if (err) {
      console.log(err);
    } else {
      res.json(invoice);
    }
  });
});

///get all invoice

router.route("/").post(function (req, res) {
  let invoice = new Invoice(req.body);
  invoice
    .save()
    .then((invoice) => {
      res.status(200).json({ invoice: "Success" });
    })
    .catch((err) => {
      res.status(400).send("failed");
    });
});
//save a invoice

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Invoice.findById(id, function (err, invoice) {
    res.json(invoice);
  });
});
//get specific invoice

router.route("/:id").post(function (req, res) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if (!invoice) res.status(404).send("data is not found");
    else
      (invoice.invoice_num = req.body.invoice_num),
        (invoice.invoice_date = req.body.invoice_date),
        (invoice.user_name = req.body.user_name),
        (invoice.mobile_number = req.body.mobile_number),
        (invoice.company = req.body.company),
        (invoice.address = req.body.address),
        (invoice.item_name = req.body.item_name),
        (invoice.item_cost = req.body.item_cost),
        (invoice.item_disc = req.body.item_disc),
        (invoice.item_price = req.body.item_price),
        (invoice.sub_total = req.body.sub_total),
        (invoice.grand_disc = req.body.grand_disc),
        (invoice.grand_total = req.body.grand_total),
        (invoice.balance = req.body.balance),
        invoice
          .save()
          .then((invoice) => {
            res.json("Client Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
});
//update a invoice

router.route("/:id").delete((req, res, next) => {
  Invoice.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
//delete a invoice

module.exports = router;
