const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Users = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  profile_picture: {
    data:Buffer,
    contentType:String,
  },

  phone: {
    type: String,
  },
  email_id: {
    type: String,
  },
  address: {
    flat_num: {
      type: String,
    },
    locality: {
      type: String,
    },
  
    sector: {
      type: String,
    },
    block: {
      type: String,
    },
    city: {
      type: String,
    },
    state:{
        type:String
    },
    country: {
      type:String
    },
    postal_code:{
      type:String
    },
    geo:{
      lat:{type: String},
      lng:{type: String}
    }
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Users", Users);
