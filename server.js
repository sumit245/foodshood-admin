const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("./database/database");
const invoice=require('./api/invoice')
const restaurant=require('./api/restaurant')
const payments=require("./api/payments")
const staff=require("./api/staffs")
const subscriptions=require('./api/subscriptions')
const tasks=require("./api/tasks")
const users = require("./api/users");
const plan = require("./api/plan")
const cuisine = require("./api/cuisine")
const restaurantlogin = require("./api/restaurantlogin");


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({'limit':'50mb'}));
app.use(cors());
app.use("/api/restaurant",restaurant)
app.use("/api/invoice",invoice)
app.use("/api/payment",payments)
app.use("/api/staff",staff)
app.use("/api/subscriptions",subscriptions)
app.use("/api/tasks",tasks)
app.use("/api/users", users);
app.use("/api/plans", plan)
app.use("/api/cuisine", cuisine)
app.use("/api/restaurantlogin", restaurantlogin);


if(process.env.NODE_ENV=='production'){
  app.use(express.static(path.join(__dirname, "./build/")));
  app.get("/**", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/"));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
