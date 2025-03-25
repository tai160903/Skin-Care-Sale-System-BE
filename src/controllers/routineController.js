const { getAllRoutines } = require("../repositories/routineRepository");
const RoutineService = require("../services/routineServce");

const RoutineController = {
    async getByskintype(req,res){
        try{
            
            const routine = await RoutineService.getByskintype(req.params.skintypeId);
            res.status(200).json(routine);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getAllRoutines(req,res){
        try{
            const routine = await RoutineService.getAllRoutines();
            res.status(200).json(routine);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async createRoutine(req,res){
        try{
            const newRoutine = await RoutineService.createRoutine(req.body);
            res.status(201).json(newRoutine);
        } catch (error) {
            res.status(500).json({ message: error.message });
          }
        },
    async deleteRoutine(req,res){
        try{
            const deleteRoutine = await RoutineService.deleteRoutine(req.params.id);
            if(!deleteRoutine){
            }
            res.status(200).json({message : " routine deleted success"})
         } catch (error) {
            res.status(500).json({ message: error.message });
          }
        },
    async updateRoutine(req,res){
        try{
            const updateRoutine = await RoutineService.updateRoutine(req.params.id, req.body);
            res.status(200).json({updateRoutine})
    } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
}
module.exports = RoutineController