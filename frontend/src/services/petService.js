import api from './api';

// Get all pets
export const getAllPets = async () => {
  try {
    const response = await api.get('/pets');
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

// Get pets by owner ID
export const getPetsByOwner = async (ownerId) => {
  try {
    const response = await api.get(`/pets/owner/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pets for owner ID ${ownerId}:`, error);
    throw error;
  }
};

// Get pet by ID
export const getPetById = async (id) => {
  try {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pet with ID ${id}:`, error);
    throw error;
  }
};

// Create new pet
export const createPet = async (petData) => {
  try {
    const response = await api.post('/pets', petData);
    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

// Update pet
export const updatePet = async (id, petData) => {
  try {
    const response = await api.put(`/pets/${id}`, petData);
    return response.data;
  } catch (error) {
    console.error(`Error updating pet with ID ${id}:`, error);
    throw error;
  }
};

// Delete pet
export const deletePet = async (id) => {
  try {
    const response = await api.delete(`/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting pet with ID ${id}:`, error);
    throw error;
  }
}; 