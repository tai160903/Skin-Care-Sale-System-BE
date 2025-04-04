const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
     customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Product", 
         required: true },
    rating: {
        type : Number,
        default: 0,
    },
    comment:{
        type : String,
    },
},
{
    timestamps: true,
}
);
reviewSchema.index({ customer_id: 1, product_id: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);