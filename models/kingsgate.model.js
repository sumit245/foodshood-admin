const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Clients = new Schema({
    client_name: {
        type: String
    },
    mobile_number: {
        type: String
    },
    phone_number: {
        type: String
    },
    email_id: {
        type: String
    },
    sector:{
        type:String
    },
    block:{
        type:String
    },
    address:{
        type:String
    },
    company:{
        type:String
    },
    gst_num:{
        type:String
    },
    client_type:{
        type:String
    }
});

module.exports = mongoose.model('Clients', Clients);