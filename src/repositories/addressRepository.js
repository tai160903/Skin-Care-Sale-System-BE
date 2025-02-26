const Address = require("../models/address");

const AddressRepository = {
    createAddress: async (address) => {
        try {
            return await Address.create(address);
        } catch (error) {
            console.error("Error creating address:", error);
            throw error;
        }   
    },

    getAllAddress: async () => {
        try {    
            return await Address.find();
        } catch (error) {
            console.error("Error fetching all address:", error);
            throw error;
        }    
    },
    getDistrictsByProvince: async (province) => {
        console.log(province);
        try {
            return await Address.find({ province: province }).select("district -_id").distinct("district");
        } catch (error) {
            console.error("Error fetching districts by province:", error);
            throw error;
        }
    },

    getWardsByDistrict: async (district) => {
        try {
            return await Address.find({ district: district }).select("ward -_id").distinct("ward");
        } catch (error) {
            console.error("Error fetching wards by district:", error);
            throw error;
        }
    },
};

module.exports = AddressRepository;