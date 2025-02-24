const express = require("express");

const ShipFeeController = require("../controllers/shipFeeController")
const router = express.Router();

router.get("/",ShipFeeController.GetAll);
router.get("/location",ShipFeeController.GetShipFeeByLocation);
router.post("/",ShipFeeController.CreateShipFee);
router.delete("/:id", ShipFeeController.deleteShipFee);
router.put("/:id",ShipFeeController.UpdateShipFee);

module.exports = router;