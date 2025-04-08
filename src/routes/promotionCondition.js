const express = require('express');
const router = express.Router();
const PromotionConditionController = require('../controllers/PromotionConditionController');

router.post('/', PromotionConditionController.createPromotionCondition);
router.put('/:id', PromotionConditionController.updatePromotionCondition);
router.delete('/:id', PromotionConditionController.deletePromotionCondition);
router.get('/:id', PromotionConditionController.getPromotionConditionById);
router.get('/', PromotionConditionController.getAllPromotionConditions);

module.exports = router;