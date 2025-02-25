const ShipFeeService = require("../services/shipFeeService")

 const ShipFeeController = {
    async GetShipFeeByLocation(req,res){
        try {
            const shipFee = await ShipFeeService.GetShipFeeByLocation(req.query);
            res.status(200).json(shipFee);
        } catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    async GetAll(req,res){
        try{
            const ShipFees = await ShipFeeService.getAllShipfee();
            res.status(200).json(ShipFees);
        } catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    async CreateShipFee(req,res){
        try{
            const ShipFee = await ShipFeeService.createShipFee(req.body);
            res.status(201).json(ShipFee);
        }catch (error){
            res.status(500).json({ message: error.message });
        }
    },
    async UpdateShipFee(req,res){
        try{
            const updateShipFee = await ShipFeeService.updateShipFee(req.params.id, req.body);
            res.status(200).json(updateShipFee);
        }catch (error){
            res.status(500).json({ message: error.message });
        }
    },
    async deleteShipFee(req,res){
        try{
            const deleted = await ShipFeeService.deleteShipFee(req.params.id);
        if (!deleted){
        }
        res.status(200).json({message : "Ship Fee delete success"})
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    } 
 }
 module.exports = ShipFeeController