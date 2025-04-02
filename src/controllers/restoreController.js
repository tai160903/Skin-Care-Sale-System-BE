const RestoreService = require("../services/restoreService");

const RestoreController = {
    async getAllRestore(req,res)  {
        try {
         const restores = await RestoreService.getAllRestore();
         res.status(200).json(restores);
        } catch(error){
            res.status(500).json({ message: "lỗi khi lấy danh sách trả hàng" });
        }
    },
    async getRestoreByCustomerId(req, res){
        try{
            console.log(req.params.customerId);
        const restore = await RestoreService.getRestoreByCustomerId(req.params.customerId);
        res.status(200).json(restore);
        }catch (error){
        
        res.status(500).json({ message: "lỗi khi lấy danh sách trả hàng của khách hàng" }); 
        }
    },
    async getRestoreById(req,res){
    try{
        const restore = await RestoreService.getRestoreById(req.parans._id);
        req.status(200).json(restore);
    } catch(error) {
        res.status(500).json({ message: "lỗi khi lấy danh sách trả hàng" }); 
    }
},
    async updateRestore(req, res){
        try{
        console.log(req.body);
        const status = req.body.status 
        const response = req.body.response
        const restore = await RestoreService.updateRestore(req.params.id, status,response)
        if(!restore) {
            return messgae({message : "không tìm thấy restore"})
        }
        res.status(200).json(restore);
        }catch (error){
        res.status(500).json({ message: "lỗi khi lấy cập nhật trả hàng" }); 
        }
    },
    
    async createRestore(req,res){
        try{
        console.log(req.body);
        const restore = await RestoreService.createRestore(req.body);
        res.status(201).json(restore)
    } catch (error){
        console.log(error);
        res.status(500).json({ message: "lỗi khi tạo trả hàng" });
        
    }
    }
}

module.exports = RestoreController


