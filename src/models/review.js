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

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;