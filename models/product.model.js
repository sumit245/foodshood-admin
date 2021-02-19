const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema({
  product_num: {
    type: String,
  },
  product_name:{
      type:String
  },
  model_number:{
    type:String
  },
  quantity: {
    type: String,
  },
  cost: {
    type: String,
  },
});

module.exports = mongoose.model("Product", Product);
