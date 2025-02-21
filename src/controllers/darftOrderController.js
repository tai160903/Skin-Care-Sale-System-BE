const DraftOrderService = require("../services/darftOrderService");

const DraftOrderController = {
    async getDraftOrderByCustomerId(req, res) {
        try {
            const customerId = req.params.customerId;
            const draftOrder = await DraftOrderService.getDraftOrderByCustomerId(customerId);
            res.send(draftOrder);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    async creatDraftOrder(req, res) {
        try {
            const customerId = req.query.customer_id;
            console.log("Creating draft order for customer:", customerId);
            const newDraftOrder = await DraftOrderService.creatDraftOrder(customerId);
            res.send(newDraftOrder);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
};
module.exports = DraftOrderController;