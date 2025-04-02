const mongoose = require("mongoose");

const restoreSchema = new mongoose.Schema({
   customer_id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Customer",
             required: true,
},
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    reason: {
        type: String,
        require: true,
    },
    staff_respone:{
        type: String,
        require: true,
        default: "",
    },
    restore_status: {
        type: String,
        enum: ["Pending", "Accepted", "Reject"],
          default: "Pending",
        },
    image: {
        type: String,
        require: true,
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Restore", restoreSchema);      