const DraftOrderService = require("../services/darftOrderService");

const DraftOrderController = {
  async getDraftOrderByCustomerId(req, res) {
    try {
      const customerId = req.params.customerId;
      const draftOrder = await DraftOrderService.getDraftOrderByCustomerId(
        customerId
      );
      res.send(draftOrder);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // async creatDraftOrder(req, res) {
  //   try {
  //     const customerId = req.query.customer_id;
  //     const newDraftOrder = await DraftOrderService.creatDraftOrder(customerId);
  //     res.send(newDraftOrder);
  //   } catch (error) {
  //     res.status(500).send(error.message);
  //   }
  // },
  async applyPromotion(req, res) {
    try {
      console.log("req", req.body);
      const { promoCode } = req.body;
      const updatedraftOrder = await DraftOrderService.applyPromotion(
        promoCode
      );
      res.json(updatedraftOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = DraftOrderController;
