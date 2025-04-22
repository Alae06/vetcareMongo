const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// GET all pets
router.get('/', petController.getAllPets);

// GET pets by owner ID
router.get('/owner/:ownerId', petController.getPetsByOwner);

// GET a single pet by ID
router.get('/:id', petController.getPetById);

// POST create a new pet
router.post('/', petController.createPet);

// PUT update a pet
router.put('/:id', petController.updatePet);

// DELETE a pet
router.delete('/:id', petController.deletePet);

module.exports = router; 