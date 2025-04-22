const Veterinarian = require('../models/Veterinarian');

// Get all veterinarians
exports.getAllVeterinarians = async (req, res) => {
  try {
    const vets = await Veterinarian.find();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single veterinarian by ID
exports.getVeterinarianById = async (req, res) => {
  try {
    const vet = await Veterinarian.findById(req.params.id);
    if (!vet) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new veterinarian
exports.createVeterinarian = async (req, res) => {
  try {
    const newVet = new Veterinarian(req.body);
    const savedVet = await newVet.save();
    res.status(201).json(savedVet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a veterinarian
exports.updateVeterinarian = async (req, res) => {
  try {
    const updatedVet = await Veterinarian.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedVet) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }
    
    res.status(200).json(updatedVet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a veterinarian
exports.deleteVeterinarian = async (req, res) => {
  try {
    const vet = await Veterinarian.findByIdAndDelete(req.params.id);
    
    if (!vet) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }
    
    res.status(200).json({ message: 'Veterinarian deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 