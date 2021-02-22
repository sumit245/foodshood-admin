const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("./database/database");
const invoice=require('./api/invoice')
const restaurant=require('./api/restaurant')
const factories=require("./api/factories")
const groups=require("./api/groups");
const payments=require("./api/payments")
const staff=require("./api/staffs")
const subscriptions=require('./api/subscriptions')
const tasks=require("./api/tasks")
const users = require("./api/users");


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({'limit':'50mb'}));
app.use(cors());
app.use("/api/restaurant",restaurant)
app.use("/api/invoice",invoice)
app.use("/api/factories",factories)
app.use("/api/groups",groups)
app.use("/api/payment",payments)
app.use("/api/staff",staff)
app.use("/api/subscriptions",subscriptions)
app.use("/api/tasks",tasks)
app.use("/api/users", users);

// app.use(express.static(path.join(__dirname, './build')))
// app.get("*", (req, res) => {
//   let url = path.join(__dirname, './build', 'index.html');
//   if (!url.startsWith('/app/')) // since we're on local windows
//     url = url.substring(1);
//   res.sendFile(url);
// });
if(process.env.NODE_ENV=='production'){
  app.use(express.static(path.join(__dirname, "./build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build"));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
