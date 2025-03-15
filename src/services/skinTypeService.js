const SkinTypeRepository = require("../repositories/skinTypeRepository");
const SkinTypeService = {
    async GetById(id){
        return await SkinTypeRepository.GetById(id);
    },
    async CreateSkinType(data){
        return await SkinTypeRepository.CreateSkinType(data);
    },
    async GetAll(){
        return await SkinTypeRepository.GetAll();
    }
}
module.exports = SkinTypeService
