const express = require("express");
const router = express.Router();

const Clients = require("../models/kingsgate.model");

router.route("/").get(function (req, res) {
  Clients.find(function (err, clients) {
    if (err) {
      console.log(err);
    } else {
      res.json(clients);
    }
  });
});
//get all data from database


router.route("/").post(function (req, res) {
  let client = new Clients(req.body);
  let msg = "Hello " + client.client_name + " Welcome to our Security Site";
  client
    .save()
    .then((client) => {
      res.status(200).json({ client: "client added successfully" });
      //   msg91.send(client.mobile_number, msg, function (err, res) {
      //     console.log(err);
      //     console.log(res);
      //     console.log(msg + "sent to" + res + client.client_name);
      //   });
    })
    .catch((err) => {
      res.status(400).send("adding new Client failed");
    });
});
//save a singe client to database

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Clients.findById(id, function (err, client) {
    res.json(client);
  });
});
//get specific client


router.route("/:id").post(function (req, res) {
  Clients.findById(req.params.id, function (err, client) {
    if (!client) res.status(404).send("data is not found");
    else
      (client.client_name = req.body.client_name),
        (client.mobile_number = req.body.mobile_number),
        (client.phone_number = req.body.phone_number),
        (client.email_id = req.body.email_id),
        (client.sector = req.body.sector),
        (client.block = req.body.block),
        (client.address = req.body.address),
        (client.company = req.body.company),
        (client.gst_num = req.body.gst_num),
        client
          .save()
          .then((client) => {
            res.json("Client Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
});
//update a client

router.route("/:id").delete((req, res, next) => {
  Clients.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
//delete a client

module.exports = router;
