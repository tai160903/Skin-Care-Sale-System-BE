const shipFee = require("../models/shipFee");

const ShipFeeRepositoy = {

  async create(data) {
    return await shipFee.create(data);
  },
  async update(id, data) {
    await this.getById(id);
    return await shipFee.findByIdAndUpdate(id, data, { new: true });
  },
  async delete(id) {
    await this.getById(id);
    return await shipFee.findByIdAndDelete(id);
  },
 
  async getById(id) {
    const ShipFee = await shipFee.findById(id);
    if (!ShipFee) {
      throw new Error("ShipFee not found");
    }
    return ShipFee;
  },
  async getAll() {
    return await shipFee.find();
  },
};
module.exports = ShipFeeRepositoy;
