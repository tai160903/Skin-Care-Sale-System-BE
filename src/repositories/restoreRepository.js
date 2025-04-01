const { get } = require("mongoose");
const Restore = require("../models/restore");
const { updateLocale } = require("moment-timezone");

const RestoreRepository = {
    async createRestore(data) {
        return await Restore.create(data);
    },

    async getAllRestore(){
        return await Restore.find({});
    },
    async getRestoreById(id){
        return await Restore.findById(id);    
    },
    async updateRestore(id, status, respone){
        return await Restore.findByIdAndUpdate(id,{restore_status : status}, {staff_respone : respone}, {new: true});
    },
    async deleteRestore(id){
        return await Restore.findByIdAndDelete(id);
    }   

}

module.exports = RestoreRepository