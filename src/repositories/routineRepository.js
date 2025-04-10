const Routine = require("../models/routine");

const RoutineRepository = {
  async getByskintype(skinTpeId) {
    return await Routine.findOne({ skinType: skinTpeId }).populate(
      "steps.recommendProducts"
    );
  },
  async getAllRoutines() {
    return await Routine.find()
      .populate("skinType")
      .populate("steps.recommendProducts");
  },
  async createRoutine(routineData) {
    return await Routine.create(routineData);
  },
  async deleteRoutine(id) {
    return await Routine.findByIdAndDelete(id);
  },
  async updateRoutine(id, routinData) {
    return await Routine.findByIdAndUpdate(
      id,
      { skinTpe: routinData.skinType, steps: routinData.steps },
      { new: true }
    ).populate("skinType")
    .populate("steps.recommendProducts");
  },
  async getById(id) {
    const routin = await Routine.findById(id).populate(
      "steps.recommendProducts"
    );
    if (!routin) {
      throw new Error("không tìm thấy lộ trình");
    }
    return routin;
  },
};

module.exports = RoutineRepository;
