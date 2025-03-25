const { getShippingByCustomerId, getShippingByCustomerAndStatus, getShippingByStatus } = require("../repositories/shippingRepository");
const ShippingService = require("../services/shippingService");

const ShippingController = {
  async getAllShipping(req, res) {
    try {
        const { order_id, shipping_status, customer_id, page = 1, limit = 10 } = req.query; 
        let filter = {};

        if (order_id) filter.order_id = order_id;
        if (customer_id) filter.customer_id = customer_id;
        if (shipping_status) filter.shipping_status = shipping_status;

        const pagination = {
          page: parseInt(page) || 1,
          limit: parseInt(limit) || 10 
      };

        const result = await ShippingService.getAllShipping(filter, pagination);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

  async getShippingByCustomerId(req, res) {
    try{
      const shipping = await ShippingService.getShippingByCustomerId(req.params.customerId);
      if (!shipping) {
        return res.status(404).json({ message: "Shipping not found" });
      }
      res.status(200).json(shipping); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updateStatusShipping(req, res) {
    try {
      console.log(req.params.id);
      const updatedShipping = await ShippingService.updateStatusShipping(
        req.params.id,
        req.body.shipping_status
      );
      if (!updatedShipping) {
        return res.status(404).json({ message: "Shipping not found" });
      }
      res.status(200).json(updatedShipping);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updateReasonShipping(req, res) {
    try {
      const updatedShipping = await ShippingService.updateReasonShipping(
        req.params.id,
        req.body.reason
      );
      res.status(200).json(updatedShipping);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    },

    async getShippingById(req, res) {
      try {
        const { id } = req.params;
        const shipping = await ShippingService.getShippingById(id);
        
        if (!shipping) {
          return res.status(404).json({ message: "Shipping not found" });
        }
    
        return res.status(200).json(shipping);
      } catch (error) {
        console.error("Error in getShippingId:", error); 
        return res.status(500).json({ message: "Internal Server Error" });
      }
    },    
    async getShippingPrice(req, res) {
      try {
        const { lat, lng } = req.body;
        const shippingPrice = await ShippingService.calculateShipping(lat,lng);
        return res.status(200).json(shippingPrice); 
      } catch (error) {
        console.error("Error in getShippingPrice:", error); 
        return res.status(500).json({ message: "Internal Server Error" });
      }
    },
};
module.exports = ShippingController;
