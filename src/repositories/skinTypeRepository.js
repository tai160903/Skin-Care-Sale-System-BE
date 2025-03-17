const SkinType = require("../models/skinType")

const SkinTypeRepository = {
    async GetById(id){
        const skintype = await SkinType.findById(id);
        if(!skintype){
            throw new Error("Skin type not found");
        }
        return skintype;
    },
    async CreateSkinType(data){
        const skintype = SkinType.create(...data);
        return skintype;
    },
    async GetAll(){
        const skintype = await SkinType.find();
        return skintype;
    }
}

module.exports = SkinTypeRepository