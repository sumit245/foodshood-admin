const express = require("express");
const router = express.Router();
const Plan = require("../models/plans.model");

router.route("/").get(function (req, res) {
    Plan.find(function (err, plans) {
        if (err) {
            console.log(err);
        } else {
            res.json(plans);
        }
    });
});

router.route("/").post(function (req, res) {
    let plan = new Plan(req.body);
    plan
        .save()
        .then((plan) => plan)
        .then((plan) => {
            res.status(200).json({ plan: "Done..." });
            res.send(plan);
        })
        .catch((err) => {
            res.status(400).send("adding new Plan failed");
        });
});
//save a singe plan to database



router.route("/:id").post(function (req, res) {
    Plan.findById(req.params.id, function (err, plan) {
        if (!plan) res.status(404).send("data is not found");
        else
            (plan.twoPlan = req.body.twoPlan),
            (plan.fifteenPlan = req.body.fifteenPlan),
            (plan.thirtyPlan = req.body.thirtyPlan),  
        plan
            .save()
            .then((plan) => {
                res.json("Plan Update Successfully");
            })
            .catch((err) => {
                res.status(400).send("Update not possible");
            });
    });
});
//update a plan

module.exports = router;
