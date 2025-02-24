const DraftOrder = require("../models/draftOrder");

const DarftOrderRepository = {
    async getDraftOrderByCustomerId(customerId) {
        return await DraftOrder.findOne({ customer_id: customerId }).populate("items.product_id");  
    },
    async createDraftOrder(customerId) {
        try {
            const newDraftOrder = await DraftOrder.create({ customer_id: customerId.customer_id,
                items: customerId.items,
                totalPrice: customerId.totalPrice,
                discount: customerId.discount,
                descriptions: customerId.description,
                amountPrice: customerId.amountPrice,
                finalPrice : customerId.finalPrice
 });
            return newDraftOrder;
        } catch (error) {
            throw new Error("Failed to create draft order: " + error.message);
            
        }
    },
    async clearDraftOrder(customerId) {
        return await DraftOrder.findOneAndUpdate(
            { customer_id: customerId },
            { items: [], totalPrice: 0,descriptions:"" , discount: 0, finalPrice: 0 },
            { new: true }
        );
    },
    async deleteOrderCard(customerId){
        return await DraftOrder.findOneAndDelete({customer_id: customerId})
    },
    async updateDraftOrder(draftorder){
        return await draftorder.save();
    }
};

module.exports = DarftOrderRepository;