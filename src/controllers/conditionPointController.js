const ConditionPointService = require('../services/conditionPointService');

const ConditionPointController = {
    getConditionPoints: async (req, res) => {
        try {
            const conditionPoints = await ConditionPointService.getConditionPoints();
            res.status(200).json(conditionPoints);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    ,
    createConditionPoint: async (req, res) => {
        try {
            const conditionPointData = req.body;
            const conditionPoint = await ConditionPointService.createConditionPoint(conditionPointData);
            res.status(201).json(conditionPoint);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    ,
    updateConditionPoint: async (req, res) => {
        try {
            const  id  = req.params.id;
            const conditionPointData = req.body.codition;
            console.log(req.params);
            console.log(req.body);
            const updatedConditionPoint = await ConditionPointService.updateConditionPoint(id, conditionPointData);
            res.status(200).json(updatedConditionPoint);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    ,
    deleteConditionPoint: async (req, res) => {
        try {
            const { id } = req.params;
            await ConditionPointService.deleteConditionPoint(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    ,
    getConditionPointById: async (req, res) => {
        try {
            const { id } = req.params;
            const conditionPoint = await ConditionPointService.getConditionPointById(id);
            res.status(200).json(conditionPoint);    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }   
        },
};

module.exports = ConditionPointController;