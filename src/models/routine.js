const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
    skinType : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "SkinType",
        require : true 
    },
    steps: [{
        stepNumber : Number,
        title : String,
        description : String,
        recommendProducts : [{
            type : mongoose.Schema.ObjectId,
            ref : "Product"
        }],
    }], 
},
{
    timestamps: true,
}
);
module.exports = mongoose.model("Routine",routineSchema);

