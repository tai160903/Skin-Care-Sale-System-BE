const ConditionPoint = require('../models/conditionPoint');

const ConditionPointRepository = {
  async createConditionPoint(conditionPointData) {
    try {
      const conditionPoint = new ConditionPoint(conditionPointData);
      return await conditionPoint.save();
    } catch (error) {
      throw new Error('Error creating condition point: ' + error.message);
    }
  },

  async getConditionPoints() {
    try {
      return await ConditionPoint.find();
    } catch (error) {
      throw new Error('Error fetching condition points: ' + error.message);
    }
  },
  async updateConditionPoint(id, conditionPointData) {
    try {
      return await ConditionPoint.findByIdAndUpdate(id, conditionPointData, { new: true });
    } catch (error) {
      throw new Error('Error updating condition point: ' + error.message);
    }
  },

  async getConditionPointById(id) {
    try {
      return await ConditionPoint.findById(id);
    } catch (error) {
      throw new Error('Error fetching condition point by ID: ' + error.message);
    }
  },
};

module.exports = ConditionPointRepository;