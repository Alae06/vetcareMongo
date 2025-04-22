const express = require('express');
const router = express.Router();
const vetController = require('../controllers/vetController');

// GET all veterinarians
router.get('/', vetController.getAllVeterinarians);

// GET a single veterinarian by ID
router.get('/:id', vetController.getVeterinarianById);

// POST create a new veterinarian
router.post('/', vetController.createVeterinarian);

// PUT update a veterinarian
router.put('/:id', vetController.updateVeterinarian);

// DELETE a veterinarian
router.delete('/:id', vetController.deleteVeterinarian);

module.exports = router; 