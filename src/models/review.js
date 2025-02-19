const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
    customer_id: {
        type : String,
        require : true,
    },
    product_id: {
        type : String,
        require : true,
    },
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

module.exports = mongoose.model("Review", reviewSchema);