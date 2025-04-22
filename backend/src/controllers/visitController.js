const Visit = require('../models/Visit');
const Pet = require('../models/Pet');
const Veterinarian = require('../models/Veterinarian');

// Get all visits
exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find()
      .populate('pet', 'name species breed')
      .populate('veterinarian', 'firstName lastName');
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get visits by pet ID
exports.getVisitsByPet = async (req, res) => {
  try {
    const petId = req.params.petId;
    
    // Verify pet exists
    const petExists = await Pet.exists({ _id: petId });
    if (!petExists) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    const visits = await Visit.find({ pet: petId })
      .populate('pet', 'name species breed')
      .populate('veterinarian', 'firstName lastName')
      .sort({ date: -1 }); // Most recent visits first
      
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single visit by ID
exports.getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate('pet')
      .populate('veterinarian');
      
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }
    
    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new visit
exports.createVisit = async (req, res) => {
  try {
    // Verify that pet exists
    const petId = req.body.pet;
    const petExists = await Pet.exists({ _id: petId });
    if (!petExists) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    // Verify that veterinarian exists
    const vetId = req.body.veterinarian;
    const vetExists = await Veterinarian.exists({ _id: vetId });
    if (!vetExists) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    const newVisit = new Visit(req.body);
    const savedVisit = await newVisit.save();
    
    // Populate related fields before returning
    const populatedVisit = await Visit.findById(savedVisit._id)
      .populate('pet', 'name species breed')
      .populate('veterinarian', 'firstName lastName');
    
    res.status(201).json(populatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a visit
exports.updateVisit = async (req, res) => {
  try {
    // If pet ID is being updated, verify that new pet exists
    if (req.body.pet) {
      const petExists = await Pet.exists({ _id: req.body.pet });
      if (!petExists) {
        return res.status(404).json({ message: 'Pet not found' });
      }
    }
    
    // If veterinarian ID is being updated, verify that new veterinarian exists
    if (req.body.veterinarian) {
      const vetExists = await Veterinarian.exists({ _id: req.body.veterinarian });
      if (!vetExists) {
        return res.status(404).json({ message: 'Veterinarian not found' });
      }
    }
    
    const updatedVisit = await Visit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('pet', 'name species breed')
      .populate('veterinarian', 'firstName lastName');
    
    if (!updatedVisit) {
      return res.status(404).json({ message: 'Visit not found' });
    }
    
    res.status(200).json(updatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a visit
exports.deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }
    
    res.status(200).json({ message: 'Visit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 