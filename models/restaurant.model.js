const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Restaurant = new Schema({
  restaurant_name: {
    type: String,
  },
  cuisine_type: {
    type: String,
  },

  owner_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },

  address: {
    city: { type: String },
    area: {
      type: String,
    },
    postal_code: {
        type: String,
      },
  },
  
  image: {
    data: Buffer,
    contentType: String,
  },
  food_image: {
    data: Buffer,
    contentType: String,
  },
  documents: {
    type: Array,
    images: [
      {
        id: String,
        data: Buffer,
        contentType: String,
      },
    ],
  },
  business_hours: {
    type: Array,
    business_hours: [
      {
        id: String,
        option: { type: String },
        time: { type: String },
        day_meal: { type: String },
      },
    ],
  },
  commision: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Restaurant", Restaurant);
