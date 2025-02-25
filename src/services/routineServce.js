const RoutineRepository = require("../repositories/routineRepository");
const SkinTypeRepository = require("../repositories/skinTypeRepository");

const RoutineService = {
    async getByskintype(skinTyypeId) {
        const skintype = await SkinTypeRepository.GetById(skinTyypeId);

        return await RoutineRepository.getByskintype(skinTyypeId);
    },
    async createRoutine(routinedata){
        return await RoutineRepository.createRoutine(routinedata);
    },
    async deleteRoutine(id){
        await RoutineRepository.getById(id);
        return await RoutineRepository.deleteRoutine(id);
    },
    async updateRoutine(id,routineData){
        await RoutineRepository.getById(id);
        return await RoutineRepository.updateRoutine(id,routineData);
    }
} 
module.exports = RoutineService