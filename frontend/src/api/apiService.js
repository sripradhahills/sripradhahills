import axios from 'axios';

// Access environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SALESFORCE_CONSUMER_KEY = import.meta.env.VITE_SALESFORCE_CONSUMER_KEY;
const SALESFORCE_CONSUMER_SECRET = import.meta.env.VITE_SALESFORCE_CONSUMER_SECRET;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('API_BASE_URL', API_BASE_URL);
console.log('SALESFORCE_CONSUMER_KEY', SALESFORCE_CONSUMER_KEY);
console.log('SALESFORCE_CONSUMER_SECRET', SALESFORCE_CONSUMER_SECRET);
// Get Flats
export const getFlats = async () => {
  try {
    const response = await apiClient.get('/flats', {
      headers: {
        'Authorization': `Bearer ${SALESFORCE_CONSUMER_KEY}` // Replace with actual auth mechanism
      }
    });
    console.log('API Response (Flats):', response.data); // Log the data
    // Adjust this according to the actual structure of your API response
    return Array.isArray(response.data) ? response.data : response.data.flats; // Adjust if needed
  } catch (error) {
    console.error('Error fetching flats:', error);
    throw error;
  }
};

// Get Dashboard Data
export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard', {
      headers: {
        'Authorization': `Bearer ${SALESFORCE_CONSUMER_KEY}` // Replace with actual auth mechanism
      }
    });
    console.log('API Response (Dashboard):', response.data); // Log the data
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};
