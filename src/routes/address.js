const express = require("express");
const AddressController = require("../controllers/addressController");
const router = express.Router();

router.post("/", AddressController.createAddress);
router.get("/", AddressController.getAllAddress);
router.get("/wards/:district", AddressController.getWardsByDistrict);
router.get("/districts/:province", AddressController.getDistrictsByProvince);


module.exports = router;