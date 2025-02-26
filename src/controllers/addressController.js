const { getAllDistrict } = require("../repositories/addressRepository");
const AddressService = require("../services/addressService")


const AddressController = {
    getAllAddress: async (req, res) => {
        try{
        const address = await AddressService.getAllAddress();
        res.status(200).json(address);
        }catch (error){
            res.status(500).json({ message: error.message });
        }
    },
    createAddress: async (req, res) => {
        try{
        const address = await AddressService.createAddress(req.body);
        res.status(200).json(address);
    }catch (error){
        res.status(500).json({ message: error.message });
    }
    },
    getWardsByDistrict: async (req, res) => {
        try{
        const { district } = req.params;
        const wards = await AddressService.getWardsByDistrict(district);
        res.status(200).json(wards);
         }catch (error){
            res.status(500).json({ message: error.message });
        }
    },
    getDistrictsByProvince: async (req, res) => {
        const { province } = req.params;
        const districts = await AddressService.getDistrictsByProvince(province);
        res.status(200).json(districts);
    },    
    getAllProvince: async (req, res) => {
        try{
        const districts = await AddressService.getAllProvince();
        res.status(200).json(districts);
    }catch (error){
        res.status(500).json({ message: error.message });
    }
    },  
};

module.exports = AddressController;