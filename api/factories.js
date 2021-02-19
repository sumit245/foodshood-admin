const express = require("express");
const router = express.Router();
const Factories = require("../models/kingsgate.model");

router.route("/").get(function (req, res) {
  Factories.find(function (err, factories) {
    if (err) {
      console.log(err);
    } else {
      res.json(factories);
    }
  });
});
//get all factories

router.route("/:id").delete((req, res, next) => {
  Factories.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted successfully");
    }
  });
});
//delete a factory

router.route("/").post(function (req, res) {
  let factory = new Factories(req.body);
  factory
    .save()
    .then((factory) => {
      res.status(200).json({ factory: "factory added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//save a factory
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Factories.findById(id, function (err, factory) {
    res.json(factory);
  });
});
//get specific factory


router.route("/:id").post(function (req, res) {
  Factories.findById(req.params.id, function (err, factory) {
    if (!factory) res.status(404).send("data is not found");
    else
      (factory.client_name = req.body.client_name),
        (factory.mobile_number = req.body.mobile_number),
        (factory.phone_number = req.body.phone_number),
        (factory.factory_name = req.body.factory_name),
        (factory.factory_sector = req.body.factory_sector),
        (factory.factory_block = req.body.factory_block),
        (factory.factory_address = req.body.factory_address),
        (factory.factory_group = req.body.factory_group),
        (factory.factory_closedate = req.body.factory_closedate),
        factory
          .save()
          .then((factory) => {
            res.json("Client Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
});
//update a factory

module.exports = router;
