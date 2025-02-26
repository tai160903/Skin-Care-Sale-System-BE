const AddressService = require("../services/addressService")


const AddressController = {
    getAllAddress: async (req, res) => {
        const address = await AddressService.getAllAddress();
        res.json(address);
    },
    createAddress: async (req, res) => {
        const address = await AddressService.createAddress(req.body);
        res.json(address);
    },
    getWardsByDistrict: async (req, res) => {
        const { district } = req.params;
        const wards = await AddressService.getWardsByDistrict(district);
        res.json(wards);
    },
    getDistrictsByProvince: async (req, res) => {
        const { province } = req.params;
        const districts = await AddressService.getDistrictsByProvince(province);
        res.json(districts);
    },    
};

module.exports = AddressController;