const SkinTypeService = require("../services/skinTypeService");

const SkinTypeController = {
    GetAll: async (req, res) => {
        try {
            const skintypes = await SkinTypeService.GetAll();
            return res.json({ message: "get all skintype success", data: skintypes });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }    
    }
};

module.exports = SkinTypeController;