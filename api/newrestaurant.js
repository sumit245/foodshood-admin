const express = require("express");
const router = express.Router();
const NewRestaurant = require("../models/newRestaurant.model");

router.route("/").get(function (req, res) {
    NewRestaurant.find(function (err, factories) {
        if (err) {
            console.log(err);
        } else {
            res.json(factories);
        }
    });
});
//get all factories

router.route("/:id").delete((req, res, next) => {
    NewRestaurant.findByIdAndDelete(req.params.id, (err, data) => {
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
    let restaurant = new NewRestaurant(req.body);
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
    NewRestaurant.findById(id, function (err, restaurant) {
        res.json(restaurant);
    });
});
//get specific restaurant


//update a restaurant

module.exports = router;
