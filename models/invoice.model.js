const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Challan = new Schema({
    challan_num:{
        type:String
    },
    client_name: {
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
    total:{type:String},
    grand_disc:{type:String},
    grand_total:{type:String},
    challan_date:{type:String},
    balance:{type:String},
    status:{type:String},
    amount_paid:{type:String},
    comments:{type:Array}
    
});

module.exports = mongoose.model('Challan', Challan);