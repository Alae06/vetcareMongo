const Pet = require('../models/Pet');
const Owner = require('../models/Owner');

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner', 'firstName lastName');
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pets by owner ID
exports.getPetsByOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    
    // Verify owner exists
    const ownerExists = await Owner.exists({ _id: ownerId });
    if (!ownerExists) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    
    const pets = await Pet.find({ owner: ownerId }).populate('owner', 'firstName lastName');
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single pet by ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('owner');
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new pet
exports.createPet = async (req, res) => {
  try {
    // Verify that owner exists
    const ownerId = req.body.owner;
    const ownerExists = await Owner.exists({ _id: ownerId });
    if (!ownerExists) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const newPet = new Pet(req.body);
    const savedPet = await newPet.save();
    
    // Populate owner details before returning
    const populatedPet = await Pet.findById(savedPet._id).populate('owner', 'firstName lastName');
    
    res.status(201).json(populatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a pet
exports.updatePet = async (req, res) => {
  try {
    // If owner ID is being updated, verify that new owner exists
    if (req.body.owner) {
      const ownerExists = await Owner.exists({ _id: req.body.owner });
      if (!ownerExists) {
        return res.status(404).json({ message: 'Owner not found' });
      }
    }
    
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('owner', 'firstName lastName');
    
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a pet
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 