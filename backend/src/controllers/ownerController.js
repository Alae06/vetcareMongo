const Owner = require('../models/Owner');

// Get all owners
exports.getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single owner by ID
exports.getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new owner
exports.createOwner = async (req, res) => {
  try {
    const newOwner = new Owner(req.body);
    const savedOwner = await newOwner.save();
    res.status(201).json(savedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an owner
exports.updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedOwner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    
    res.status(200).json(updatedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an owner
exports.deleteOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    
    res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 