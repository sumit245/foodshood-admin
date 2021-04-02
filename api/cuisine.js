const express = require("express");
const router = express.Router();
const Cuisine = require("../models/cuisine.model");

router.route("/").get(function (req, res) {
    Cuisine.find(function (err, cuisine) {
        if (err) {
            console.log(err);
        } else {
            res.json(cuisine);
        }
    });
});

router.route("/").post(function (req, res) {
    let cuisine = new Cuisine(req.body);
    cuisine
        .save()
        .then((cuisine) => cuisine)
        .then((cuisine) => {
            res.status(200).json({ cuisine: "Done..." });
            res.send(cuisine);
        })
        .catch((err) => {
            res.status(400).send("adding new Cuisine failed");
        });
});
//save a singe cuisine to database



router.route("/:id").post(function (req, res) {
    Cuisine.findById(req.params.id, function (err, cuisine) {
        if (!cuisine) res.status(404).send("data is not found");
        else
            (cuisine.twoPlan = req.body.twoPlan),
                (cuisine.fifteenPlan = req.body.fifteenPlan),
                (cuisine.thirtyPlan = req.body.thirtyPlan),
                cuisine
                    .save()
                    .then((cuisine) => {
                        res.json("Cuisine Update Successfully");
                    })
                    .catch((err) => {
                        res.status(400).send("Update not possible");
                    });
    });
});
//update a cuisine
router.route("/:id").delete((req, res, next) => {
    Cuisine.findByIdAndDelete(req.params.id, (err, cuisine) => {
        if (err) {
            console.log(next(err));
            res.status(200).json({ cuisine: "deleted" });
        } else {
            console.log("deleted_succesfully");
        }
    });
});
//delete a user

module.exports = router;
