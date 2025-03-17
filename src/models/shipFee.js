
const mongoose = require("mongoose");

const ShipFeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    shiping_price :{
        type : Number,
        required: true
    }
   },
    { timestamps: true });

module.exports = mongoose.model("ShipFee", ShipFeeSchema);