const mogoose = require("mongoose");

const AddressSchema = new mogoose.Schema({
    province: { 
        type: String, 
        required: true },
    district: {
        type: String,
        required: true,
    },
    ward: {
        type : String,
        required : true
    },
    street: {
        type : String,
        required : true
    }
},
{
    timestamps: true,
}
);
module.exports = mogoose.model("Address", AddressSchema);
