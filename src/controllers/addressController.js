const { getAllDistrict } = require("../repositories/addressRepository");
const AddressService = require("../services/addressService");

const AddressController = {
  getAllAddress: async (req, res) => {
    try {
      const address = await AddressService.getAllAddress();
      res.json(address);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  createAddress: async (req, res) => {
    try {
      const address = await AddressService.createAddress(req.body);
      res.json(address);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getWardsByDistrict: async (req, res) => {
    try {
      const { district } = req.params;
      const wards = await AddressService.getWardsByDistrict(district);
      res.json(wards);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getDistrictsByProvince: async (req, res) => {
    const { province } = req.params;
    const districts = await AddressService.getDistrictsByProvince(province);
    res.json(districts);
  },
  getAllProvince: async (req, res) => {
    try {
      const districts = await AddressService.getAllProvince();
      res.json(districts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = AddressController;
