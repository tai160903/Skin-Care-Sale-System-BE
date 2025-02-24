const ShipFeeRepositoy = require("../repositories/shippFeeRepository")

const ShipFeeService = {
    async GetShipFeeByLocation(location){
        return await ShipFeeRepositoy.GetShipFeeByLocation(location);
    },
    async createShipFee(data){
        return await ShipFeeRepositoy.create(data);
    },
    async updateShipFee(id,data){
        return await ShipFeeRepositoy.update(id,data);
    },
    async deleteShipFee(id){
        return await ShipFeeRepositoy.delete(id);
    },
    async getAllShipfee(){
        return await ShipFeeRepositoy.getAll();
    }
}
module.exports = ShipFeeService