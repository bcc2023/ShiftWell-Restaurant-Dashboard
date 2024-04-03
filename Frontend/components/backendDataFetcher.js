const axios = require('axios');

// Modularize the endpoint URL
const BACKEND_DATA_URL = 'http://localhost:4000/getData';

const fetchDataFromBackend = async () => {
    try {
        const response = await axios.get(BACKEND_DATA_URL);
        // Returning null or an empty object could be an alternative to throwing an error
        // This depends on how you want to handle the absence of data in your application
        return response.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error.message);
        // Consider whether you want to throw an error or handle it gracefully
        // If you throw, make sure to catch it in the calling function
        return null; // or return {}; for an empty object
    }
}

module.exports = fetchDataFromBackend;
