const shipFee = require("../models/shipFee");

const ShipFeeRepositoy = {
    async GetShipFeeByLocation(location){
        try {

            const lowerLocation = location.location.toLowerCase();
            
            const importantKeywords = await this.getImportantKeywords();

            const query = importantKeywords.filter(keyword => lowerLocation.includes(keyword));

            if(query.length === 0){
                throw new Error("location not found")
            }

            const queryConditions = query.map(keyword => ({
                location : { $regex : keyword, $options : "i"}
            }));

            const shipFees = await shipFee.find({ $or : queryConditions});
            return shipFees
        } catch (error) {
            console.error("Error fetching ship fees by location:", error);
            throw error;
        }
    },
    async create(data){
        return await shipFee.create(data);
    },
    async update(id, data){
        await this.getById(id);
        return await shipFee.findByIdAndUpdate(id,data, { new: true });
    },
    async delete(id){
        await this.getById(id);
        return await shipFee.findByIdAndDelete(id);
    },
    async getImportantKeywords(){
        const locations = await shipFee.find().distinct("location");
        return locations.map(loc => loc.toLowerCase());
    },
    async getById(id){
        const ShipFee = await shipFee.findById(id);
        if(!ShipFee){
            throw new Error("ShipFee not found");
        }
        return ShipFee;
    } ,
    async getAll(){
        return await shipFee.find();
    }
}
module.exports = ShipFeeRepositoy