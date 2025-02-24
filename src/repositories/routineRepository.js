const Routine = require("../models/routine");

const RoutineRepository = {
    async getByskintype(skinTpeId){
        return await Routine.find({ skinType: skinTpeId }).populate("steps.recommendProducts");
    },
    async createRoutine(routineData){
        return await Routine.create(routineData);
    },
    async deleteRoutine(id){
        return await Routine.findByIdAndDelete(id); 
    },
    async updateRoutine(id,routinData){
       
        return await Routine.findByIdAndUpdate(
            id,
            {skinTpe: routinData.skinType, steps : routinData.steps},
            { new: true, }
        );   
    },  
    async getById(id){
        const routin = await Routine.findById(id);
        if(!routin){
            throw new Error("routine not found");
        }
        return routin;
    }
}

module.exports = RoutineRepository;