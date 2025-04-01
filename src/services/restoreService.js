const RestoreRepository = require("../repositories/restoreRepository");
const OrderRepository = require("../repositories/orderRepository");
const ProducRepository = require("../repositories/ProductRepository")

const RestoreService = {
    createRestore: async (data) => {
        return await RestoreRepository.createRestore(data);
    },
    getAllRestore: async () => {
        const data = await RestoreRepository.getAllRestore();    
        return ({message : "Lấy danh sách hoàn trả thành công", data});
    },    
    getRestoreById: async (id) => {
        const data = await RestoreRepository.getRestoreById(id);
        return ({message : "Lấy đơn hoàn trả thành công", data});
    },    
    updateRestore: async (id, status, respone) => {  
        const restore = await RestoreRepository.getRestoreById(id);
        if (!restore) {
            return ({message : "không tìm thấy hoàn trả"});
        }
        const order = await OrderRepository.getOrderById(restore.order_id);
            const createdAtDate = new Date(order.createdAt);
            const now = new Date();
            const differenceInDays = (now - createdAtDate) / (1000 * 60 * 60 * 24);
            if (differenceInDays > 7) {
                return {
                message: `Bạn chỉ có thể trả hàng trong vòng 7 ngày. Đơn hàng của bạn đã được tạo cách đây ${Math.floor(differenceInDays)} ngày.`,
                };
        }if(status === "Accepted"){
            await ProducRepository.updateStockAndPurchaseCount([{ product_id: restore.product_id, quantity: restore.quanity }]);
            return ({message : "hoàn trả thành công"});
        }

        if (restore.restore_status === "Accepted") {
            return ({message : "hoàn trả đã được chất nhận, không thể thay đổi trạng thái"});
}
        if (restore.restore_status === "Reject") {
            return ({message : "hoàn trả đã bị từ chối, không thể thay đổi trạng thái"});
}
        return await RestoreRepository.updateRestore(id, status, respone);
    },
    }

module.exports = RestoreService