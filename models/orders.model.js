
const mongoose = require("mongoose");
const Restaurant=require("./restaurant.model")
const Users = require("./users.model")
const Schema = mongoose.Schema;

let Order = new Schema({

  restaurant: {
    restaurant:Restaurant
  },
  user:{user:User},
  
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Restaurant", Restaurant);
