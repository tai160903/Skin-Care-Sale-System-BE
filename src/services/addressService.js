const AddressRepository = require("../repositories/addressRepository");

const AddressService = {
    getAllAddress: async () => {
        return await AddressRepository.getAllAddress();
    },
    createAddress: async (address) => {
        return await AddressRepository.createAddress(address); 
    },
    getWardsByDistrict: async (district) => {
        return await AddressRepository.getWardsByDistrict(district);
    },
    getDistrictsByProvince: async (province) => {
        return await AddressRepository.getDistrictsByProvince(province);
    }
}
module.exports = AddressService;