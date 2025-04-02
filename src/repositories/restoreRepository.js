const { get } = require("mongoose");
const Restore = require("../models/restore");
const { updateLocale } = require("moment-timezone");

const RestoreRepository = {
    async createRestore(data) {
        return await Restore.create(data);
    },
    async getRestoreByCustomerId(customerId) {
        return await Restore.find({ customer_id: customerId })
            .populate({ path: 'customer_id', select: 'name' }) 
            .populate({ path: 'product_id', select: 'name' }); 
    },

    async getAllRestore(){
        return await Restore.find({}).populate('product_id');
    },
    async getRestoreById(id){
        return await Restore.findById(id);    
    },
    async updateRestore(id, status, response){
        return await Restore.findByIdAndUpdate(id,{restore_status : status, staff_respone : response }, {new: true});
    },
    async deleteRestore(id){
        return await Restore.findByIdAndDelete(id);
    }   

}

module.exports = RestoreRepository