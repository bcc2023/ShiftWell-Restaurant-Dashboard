const axios = require('axios');

const fetchDataFromBackend = async () => {
    try {
        const response = await axios.get('http://localhost:4000/getData');
        return response.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        throw error;
    }
}

module.exports = fetchDataFromBackend;