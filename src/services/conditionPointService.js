const ConditionPointRepository = require('../repositories/conditonPointRepository');
const ConditionPointService = {
  async createConditionPoint(conditionPointData) {
    try {
      return await ConditionPointRepository.createConditionPoint(conditionPointData);
    } catch (error) {
      throw new Error('Error creating condition point: ' + error.message);
    }
  },

  async getConditionPoints() {
    try {
      return await ConditionPointRepository.getConditionPoints();
    } catch (error) {
      throw new Error('Error fetching condition points: ' + error.message);
    }
  },    
  async updateConditionPoint(id, conditionPointData) {
    try {
      return await ConditionPointRepository.updateConditionPoint(id, conditionPointData);
    } catch (error) {
      throw new Error('Error updating condition point: ' + error.message);
    }    
  },
  async getConditionPointById(id) {
    try {
      return await ConditionPointRepository.getConditionPointById(id);
    } catch (error) {
      throw new Error('Error fetching condition point by ID: ' + error.message);
    }    
  }
  }
  module.exports = ConditionPointService;