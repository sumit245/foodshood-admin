const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Cuisine = new Schema({
    name: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String,
    },
});

module.exports = mongoose.model("Cuisine", Cuisine);
