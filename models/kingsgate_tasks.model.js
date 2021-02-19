const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Task=new Schema({
    product_name:{type:String},
    quantity:{type:String},
    unit_cost:{type:String},
    status:{type:String}
});
module.exports = mongoose.model('Task', Task);