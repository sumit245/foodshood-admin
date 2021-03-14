const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RestaurantCredential = new Schema({
    user_id:{type:String},
    password:{type:String}
});

module.exports = mongoose.model("RestaurantCredential", RestaurantCredential);
