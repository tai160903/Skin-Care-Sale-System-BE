const AddressRepository = require("../repositories/addressRepository");

const AddressService = {
  getAllAddress: async () => {
    const response = await AddressRepository.getAllAddress();
    return {
      message: "Get all address success",
      data: response,
    };
  },
  createAddress: async (address) => {
    const response = await AddressRepository.createAddress(address);
    return {
      message: "Create address success",
      data: response,
    };
  },
  getWardsByDistrict: async (district) => {
    const response = await AddressRepository.getWardsByDistrict(district);
    return {
      message: "Get wards by district success",
      data: response,
    };
  },
  getAllProvince: async () => {
    const response = await AddressRepository.getAllProvince();
    return {
      message: "Get all province success",
      data: response,
    };
  },
  getDistrictsByProvince: async (province) => {
    const response = await AddressRepository.getDistrictsByProvince(province);
    return {
      message: "Get districts by province success",
      data: response,
    };
  },
};
module.exports = AddressService;
