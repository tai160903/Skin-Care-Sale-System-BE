const OrderService = require("../services/orderService");

const OrderController = {
    async createOrder(req, res) {
        try {
            const { customerId, payment_method, address, phone } = req.body;
            if (!customerId || !payment_method || !address || !phone) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const { newOrder, newShipping, checkoutUrl } = await OrderService.createOrder(
                customerId,
                payment_method,
                address,
                phone
            );

            return res.status(201).json({
                message: "Order created successfully",
                order: newOrder,
                shipping: newShipping,
                checkoutUrl,
            });
        } catch (error) {
            console.error("Error creating order:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
};

module.exports = OrderController;