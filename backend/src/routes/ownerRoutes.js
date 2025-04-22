const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

// GET all owners
router.get('/', ownerController.getAllOwners);

router.get('/', (req, res) => {
    res.send('Owners route is working');
  });

// GET a single owner by ID
router.get('/:id', ownerController.getOwnerById);

// POST create a new owner
router.post('/', ownerController.createOwner);

// PUT update an owner
router.put('/:id', ownerController.updateOwner);

// DELETE an owner
router.delete('/:id', ownerController.deleteOwner);

module.exports = router; 