import api from './api';

// Get all veterinarians
export const getAllVeterinarians = async () => {
  try {
    const response = await api.get('/vets');
    return response.data;
  } catch (error) {
    console.error('Error fetching veterinarians:', error);
    throw error;
  }
};

// Get veterinarian by ID
export const getVeterinarianById = async (id) => {
  try {
    const response = await api.get(`/vets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching veterinarian with ID ${id}:`, error);
    throw error;
  }
};

// Create new veterinarian
export const createVeterinarian = async (vetData) => {
  try {
    const response = await api.post('/vets', vetData);
    return response.data;
  } catch (error) {
    console.error('Error creating veterinarian:', error);
    throw error;
  }
};

// Update veterinarian
export const updateVeterinarian = async (id, vetData) => {
  try {
    const response = await api.put(`/vets/${id}`, vetData);
    return response.data;
  } catch (error) {
    console.error(`Error updating veterinarian with ID ${id}:`, error);
    throw error;
  }
};

// Delete veterinarian
export const deleteVeterinarian = async (id) => {
  try {
    const response = await api.delete(`/vets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting veterinarian with ID ${id}:`, error);
    throw error;
  }
}; 