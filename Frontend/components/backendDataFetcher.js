// components/backendDataFetcher.js
const axios = require('axios');

const fetchDataFromBackend = async () => {
    try {
        const response = await axios.get('http://localhost:4000/getData'); // Adjust URL based on your backend endpoint
        return response.data;
    } catch (error) {
        throw error;
    }
};

module.exports = fetchDataFromBackend;
