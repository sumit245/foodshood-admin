const express = require("express");
const router = express.Router();
const RestaurantCredential = require("../models/restaurant_credentials.model");
var multer = require("multer")

router.route("/").get(function (req, res) {
  RestaurantCredential.find(function (err, factories) {
    if (err) {
      console.log(err);
    } else {
      res.json(factories);
    }
  });
});

router.post(
  "/login",
  // [
  //   check("email", "Please enter a valid email").isEmail(),
  //   check("password", "Please enter a valid password").isLength({
  //     min: 6
  //   })
  // ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.route("/").post(function (req, res) {
  let restaurant = new RestaurantCredential(req.body);
  restaurant
    .save()
    .then((restaurant) => {
      res.status(200).json({ restaurant: "restaurant added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});


module.exports = router;
