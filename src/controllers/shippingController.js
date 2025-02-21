const ShippingService = require('../services/shippingService');

const ShippingController = {
    async getAllShipping(req, res){
        try{
            const shippings = await ShippingService.getAllShipping();
            res.status(200).json(shippings);
        } catch (error) {
            res.status(500).json({ message: error.message });
          }
        },
    async updateStatusShipping(req, res){
        try{
            console.log("status: ",req.body.shipping_status);
            const updatedShipping = await ShippingService.updateStatusShipping(req.params.id, req.body.shipping_status);
            if(!updatedShipping){
                return res.status(404).json({message: "Shipping not found"});
            }
            res.status(200).json(updatedShipping);
        } catch (error) {
            res.status(500).json({ message: error.message });
          }
        },
    async updateReasonShipping(req, res){ 
        try{
            const updatedShipping = await ShippingService.updateReasonShipping(req.params.id, req.body.reason);
            if(!updatedShipping){
                return res.status(404).json({message: "Shipping not found"});
            }
            res.status(200).json(updatedShipping);
        } catch (error) {
            res.status(500).json({ message: error.message });
          }
        },
    async getShippingByOrderId(req, res){
        try{
            const orderId = req.params;
            console.log("orderID", orderId);
            const shipping = await ShippingService.getShippingByOrderId(req.params);
            
            if(!shipping){
                return res.status(404).json({message: "Shipping not found"});
            }
            res.status(200).json(shipping);
        } catch (error) {
            res.status(500).json({ message: error.message });
          }
        }
};
module.exports = ShippingController;