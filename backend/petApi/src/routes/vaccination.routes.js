const router = require("express").Router();

const vaccinationController = require("../controllers/vaccination.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
    "/:petId",
    authMiddleware,
    vaccinationController.addVaccination
);

router.get(
    "/done/:petId",
    authMiddleware,
    vaccinationController.getDoneVaccines
);

router.get(
    "/upcoming/:petId",
    authMiddleware,
    vaccinationController.getUpcomingVaccines
);

router.get(
    "/overdue/:petId",
    authMiddleware,
    vaccinationController.getOverdueVaccines
);

router.get(
    "/:id",
    authMiddleware,
    vaccinationController.getVaccinationById
);

router.put(
    "/:id",
    authMiddleware,
    vaccinationController.updateVaccination
);

router.delete(
    "/:id",
    authMiddleware,
    vaccinationController.deleteVaccination
);

module.exports = router;