const { getAllDistrict } = require("../repositories/addressRepository");
const AddressService = require("../services/addressService")


const AddressController = {
    getAllAddress: async (req, res) => {
        const address = await AddressService.getAllAddress();
        res.status(200).json(address);
    },
    createAddress: async (req, res) => {
        const address = await AddressService.createAddress(req.body);
        res.status(200).json(address);
    },
    getWardsByDistrict: async (req, res) => {
        const { district } = req.params;
        const wards = await AddressService.getWardsByDistrict(district);
        res.status(200).json(wards);
    },
    getDistrictsByProvince: async (req, res) => {
        const { province } = req.params;
        const districts = await AddressService.getDistrictsByProvince(province);
        res.status(200).json(districts);
    },    
    getAllProvince: async (req, res) => {
        const districts = await AddressService.getAllProvince();
        res.status(200).json(districts);
    },  
};

module.exports = AddressController;