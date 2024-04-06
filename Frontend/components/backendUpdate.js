const axio = require('axios');

const updateDataOnBackend = async (updatedData) => {
    try {
        const response = await axios.put('http://localhost:4000/updateData', updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating data on backend:', error);
        throw error;
    }
}

module.exports = updateDataOnBackend;