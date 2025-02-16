const { updateStatusShipping, updateReasonShipping, getShippingByOrderId } = require('../repositories/shippingRepository');
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
            const updatedShipping = await ShippingService.updateStatusShipping(req.params.id, req.body.status);
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
            const shipping = await ShippingService.getShippingByOrderId(req.params.order_id);
            if(!shipping){
                return res.status(404).json({message: "Shipping not found"});
            }
            res.status(200).json(shipping);
        } catch (error) {
            res.status(500).json({ message: error.message });
          }
        }
};
moudle.exports = ShippingController;