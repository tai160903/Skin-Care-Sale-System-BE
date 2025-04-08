const express = require('express');
const router = express.Router();
const ConditionPointController = require('../controllers/conditionPointController');    

router.post('/', ConditionPointController.createConditionPoint);
router.put('/:id', ConditionPointController.updateConditionPoint);
router.delete('/:id', ConditionPointController.deleteConditionPoint);
router.get('/:id', ConditionPointController.getConditionPointById);
router.get('/', ConditionPointController.getConditionPoints);   

module.exports = router;