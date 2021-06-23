const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema({
  user: { type: Object },
  order_time: {
    type: String,
  },
  status: {
    type: String,
    default: "pending"
  },
  address: { type: Object },
  restaurant: { type: String },
  time: { type: String },
  plan: { type: String },
  price: { type: String },
  discount: { type: String },
  total: { type: String },
  tip: { type: String },
  start_date: { type: String },
  end_date: { type: String },
  notes: { type: String },
  status: { type: String }
});

module.exports = mongoose.model("Order", Order);
