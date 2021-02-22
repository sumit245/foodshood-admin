const express = require("express");
const router = express.Router();
const Order = require("../models/orders.model");

router.route("/").get(function (req, res) {
  Restaurant.find(function (err, factories) {
    if (err) {
      console.log(err);
    } else {
      res.json(factories);
    }
  });
});
//get all factories

router.route("/:id").delete((req, res, next) => {
  Restaurant.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted successfully");
    }
  });
});
//delete a restaurant

router.route("/").post(function (req, res) {
  let restaurant = new Restaurant(req.body);
  restaurant
    .save()
    .then((restaurant) => {
      res.status(200).json({ restaurant: "restaurant added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//save a restaurant
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Restaurant.findById(id, function (err, restaurant) {
    res.json(restaurant);
  });
});
//get specific restaurant

router.route("/:id").put(function (req, res) {
  Restaurant.findById(req.params.id, function (err, restaurant) {
    if (!restaurant) res.status(404).send("data is not found");
    else
      (restaurant.client_name = req.body.client_name),
        (restaurant.restaurant_name = req.body.restaurant_name),
        (restaurant.email = req.body.email),
        (restaurant.owner_name = req.body.owner_name),
        (restaurant.cuisine_type = req.body.cuisine_type),
        (restaurant.city = req.body.city),
        (restaurant.area = req.body.area),
        (restaurant.phone = req.body.phone),
        (restaurant.address = req.body.address),
        (restaurant.postal_code = req.body.postal_code),
        (restaurant.image =req.body.image),
        (restaurant.food_name=req.body.food_name),
        (restaurant.documents = req.body.documents),
        (restaurant.business_hours = req.body.business_hours),
        (restaurant.commissions = req.body.commissions)
        restaurant
          .save()
          .then((restaurant) => {
            res.json("Client Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
});
//update a restaurant

module.exports = router;
