const RestoreService = require("../services/restoreService");

const RestoreController = {
    async getAllRestore(req,res)  {
        try {
         const restores = await RestoreService.getAllRestore();
         res.status(200).Json(restores);
        } catch(error){
            res.status(500).json({ message: "lỗi khi lấy danh sách trả hàng" });
        }
    },
    async getRestoreById(req,res){
    try{
        const restore = await RestoreService.getRestoreById(req.parans._id);
        req.status(200).Json(restore);
    } catch(error) {
        res.status(500).json({ message: "lỗi khi lấy danh sách trả hàng" }); 
    }
},
    async updateRestore(req, res){
        try{
        const status = req.body.status 
        const respone = req.body.respone
        const restore = await RestoreService.updateRestore(req.params.id, status,respone)
        if(!restore) {
            return messgae({message : "không tìm thấy restore"})
        }
        res.status(200).Json(restore);
        }catch (error){
        res.status(500).json({ message: "lỗi khi lấy cập nhật trả hàng" }); 
        }
    },
    async createRestore(res,req){
        try{
        const restore = await RestoreController.createRestore(req.body);
        res.status(201).Json(restore)
    } catch (error){
        res.status(500).json({ message: "lỗi khi tạo trả hàng" });
    }
    }
}

module.exports = RestoreController


