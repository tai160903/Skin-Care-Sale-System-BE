const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
    user_id: {
        type : String,
        require : true,
    },
    title:{
        type : String,
        require : true,
    },
    content: {
        type : String,
        require : true
    }, 
    image: {
        type : String,
        require : true
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Blog", blogSchema);