const RestoreRepository = require("../repositories/restoreRepository");
const OrderRepository = require("../repositories/orderRepository");
const ProducRepository = require("../repositories/productRepository");

const RestoreService = {
  createRestore: async (data) => {
    const order = await OrderRepository.getOrderById(data.order_id);
    const createdAtDate = new Date(order.createdAt);
    const now = new Date();
    const differenceInDays = (now - createdAtDate) / (1000 * 60 * 60 * 24);
    console.log("differenceInDays", differenceInDays);
    if (differenceInDays > 7) {
      return {
        message: `Bạn chỉ có thể trả hàng trong vòng 7 ngày. Đơn hàng của bạn đã được tạo cách đây ${Math.floor(
          differenceInDays
        )} ngày.`,
      };
    }
    return await RestoreRepository.createRestore(data);
  },
  getAllRestore: async () => {
    const data = await RestoreRepository.getAllRestore();
    return { message: "Lấy danh sách hoàn trả thành công", data };
  },
  getRestoreById: async (id) => {
    const data = await RestoreRepository.getRestoreById(id);
    return { message: "Lấy đơn hoàn trả thành công", data };
  },
  getRestoreByCustomerId: async (CustomerId) => {
    const data = await RestoreRepository.getRestoreByCustomerId(CustomerId);
    return { message: "Lấy danh sách hoàn trả của khách hàng", data };
  },
  updateRestore: async (id, status, response) => {
    const restore = await RestoreRepository.getRestoreById(id);
    if (!restore) {
      return { message: "không tìm thấy hoàn trả" };
    }

    const order = await OrderRepository.getOrderById(restore.order_id);
    const createdAtDate = new Date(order.createdAt);
    const now = new Date();
    const differenceInDays = (now - createdAtDate) / (1000 * 60 * 60 * 24);
    console.log("differenceInDays", differenceInDays);
    if (differenceInDays > 7) {
      return {
        message: `Bạn chỉ có thể trả hàng trong vòng 7 ngày. Đơn hàng của bạn đã được tạo cách đây ${Math.floor(
          differenceInDays
        )} ngày.`,
      };
    }
    if (restore.restore_status === "Reject") {
      throw new Error("hoàn trả đã bị từ chối, không thể thay đổi trạng thái");
    }
    if (restore.restore_status === "Accepted") {
      throw new Error("hoàn trả đã được chấp nhận, không thể thay đổi trạng thái");
    }
    if (status === "Accepted") {
      await ProducRepository.UpdateStockRestore([
        { product_id: restore.product_id, quantity: restore.quantity },
      ]);
      const data = await RestoreRepository.updateRestore(id, status, response);
      return { message: "hoàn trả thành công", data };
    }
    const data = await RestoreRepository.updateRestore(id, status, response);
    return data;
  },
};

module.exports = RestoreService;
