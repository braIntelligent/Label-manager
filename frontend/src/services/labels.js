import api from './api'
import axios from 'axios';

export const createLabel = async (formData) => {
  try {
    const response = await axios.post('/api/labels/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating label:', error.response?.data);
    throw error;
  }
};


export const getLabels = async () => {
  const response = await api.get('/labels/')
  return response.data
}

export const updateLabelStatus = async (id, status) => {
  try {
    const response = await api.patch(
      `/labels/${id}/`,
      { estado: status },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error updating label status:', error)
    throw error
  }
}
