import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/Products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default apiClient;