const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Bill = new Schema({
    bill_num:{
        type:String
    },
    supplier: {
        type: String
    },
    mobile_number:{
        type:String
    },
    company:{
        type:String
    },
    address:{
        type:String
    },
    item:[{
        item_name:{type:String},
        quantity:{type:String},
        item_cost:{type:String},
        item_disc:{type:String},
        item_description:{type:String},
        item_price:{type:String},
    }],
    grand_total:{
        type:String

    },
    challan_date:{
        type:String
    },
    grand_disc:{
        type:String

    },
    balance:{
        type:String
    }
});

module.exports = mongoose.model('Bill', Bill);