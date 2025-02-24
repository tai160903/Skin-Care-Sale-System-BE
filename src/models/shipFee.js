
const mongoose = require("mongoose");

const ShipFeeSchema = new mongoose.Schema({
    location : {
        type : String,
        required: true
    },
    price :{
        type : Number,
        required: true
    }
   },
    { timestamps: true });

module.exports = mongoose.model("ShipFee", ShipFeeSchema);