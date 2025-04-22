const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

// GET all visits
router.get('/', visitController.getAllVisits);

// GET visits by pet ID
router.get('/pet/:petId', visitController.getVisitsByPet);

// GET a single visit by ID
router.get('/:id', visitController.getVisitById);

// POST create a new visit
router.post('/', visitController.createVisit);

// PUT update a visit
router.put('/:id', visitController.updateVisit);

// DELETE a visit
router.delete('/:id', visitController.deleteVisit);

module.exports = router; 