import api from './api';

// Get all owners
export const getAllOwners = async () => {
  try {
    const response = await api.get('/owners');
    return response.data;
  } catch (error) {
    console.error('Error fetching owners:', error);
    throw error;
  }
};

// Get owner by ID
export const getOwnerById = async (id) => {
  try {
    const response = await api.get(`/owners/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching owner with ID ${id}:`, error);
    throw error;
  }
};

// Create new owner
export const createOwner = async (ownerData) => {
  try {
    const response = await api.post('/owners', ownerData);
    return response.data;
  } catch (error) {
    console.error('Error creating owner:', error);
    throw error;
  }
};

// Update owner
export const updateOwner = async (id, ownerData) => {
  try {
    const response = await api.put(`/owners/${id}`, ownerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating owner with ID ${id}:`, error);
    throw error;
  }
};

// Delete owner
export const deleteOwner = async (id) => {
  try {
    const response = await api.delete(`/owners/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting owner with ID ${id}:`, error);
    throw error;
  }
}; 