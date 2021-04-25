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
router.route("/:id").post(function (req, res) {
    NewRestaurant.findById(req.params.id, function (err, restaurant) {
        if (!restaurant) res.status(404).send("No Such Restaurant");
        else
            (restaurant.restaurant_name = req.body.restaurant_name),
                (restaurant.phone = req.body.phone),
                (restaurant.email = req.body.email),
                (restaurant.owner_name = req.body.owner_name),
                (restaurant.locality = req.body.locality),
                (restaurant.city = req.body.city),
                (restaurant.state = req.body.state),
                (restaurant.country = req.body.country),
                (restaurant.postal_code = req.body.postal_code),
                (restaurant.cousine_type = req.body.cousine_type),
                (restaurant.commission = req.body.commission),
                (restaurant.status = req.body.status),
                (restaurant.about = req.body.about),
                (restaurant.meals = req.body.meals),
                (restaurant.plan = req.body.plan),
                (restaurant.documents = req.body.documents),
                (restaurant.bank_info = req.body.bank_info),
                restaurant
                    .save()
                    .then((restaurant) => {
                        res.status(200).json({ restaurant: "restaurant updated successfully" });
                    })
                    .catch((err) => {
                        res.status(400).send("Failed");
                    });
    })
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
