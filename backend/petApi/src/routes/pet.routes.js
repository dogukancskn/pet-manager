const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get("/", authMiddleware, petController.getMyPets);

router.post("/", authMiddleware, petController.createPet);

router.get("/:id", authMiddleware, petController.getPetById);

router.put("/:id", authMiddleware, petController.updatePet);

router.delete("/:id", authMiddleware, petController.deletePet);

module.exports = router;