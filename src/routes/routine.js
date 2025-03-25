const espress = require("express")

const RoutineController = require("../controllers/routineController");
const router = espress.Router();

router.get("/skintype/:skintypeId",RoutineController.getByskintype);
router.get("/",RoutineController.getAllRoutines);
router.post("/", RoutineController.createRoutine);
router.put("/:id",RoutineController.updateRoutine);
router.delete("/:id",RoutineController.deleteRoutine);

module.exports = router ;