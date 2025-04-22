import api from './api';

// Get all visits
export const getAllVisits = async () => {
  try {
    const response = await api.get('/visits');
    return response.data;
  } catch (error) {
    console.error('Error fetching visits:', error);
    throw error;
  }
};

// Get visits by pet ID
export const getVisitsByPet = async (petId) => {
  try {
    const response = await api.get(`/visits/pet/${petId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching visits for pet ID ${petId}:`, error);
    throw error;
  }
};

// Get visit by ID
export const getVisitById = async (id) => {
  try {
    const response = await api.get(`/visits/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching visit with ID ${id}:`, error);
    throw error;
  }
};

// Create new visit
export const createVisit = async (visitData) => {
  try {
    const response = await api.post('/visits', visitData);
    return response.data;
  } catch (error) {
    console.error('Error creating visit:', error);
    throw error;
  }
};

// Update visit
export const updateVisit = async (id, visitData) => {
  try {
    const response = await api.put(`/visits/${id}`, visitData);
    return response.data;
  } catch (error) {
    console.error(`Error updating visit with ID ${id}:`, error);
    throw error;
  }
};

// Delete visit
export const deleteVisit = async (id) => {
  try {
    const response = await api.delete(`/visits/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting visit with ID ${id}:`, error);
    throw error;
  }
}; 