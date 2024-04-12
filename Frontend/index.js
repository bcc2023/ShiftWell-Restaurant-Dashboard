const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const PORT = 8000;
/* const BACKEND_PORT = 4000;  */
const app = express();

// Import component logic
const scrapeWeatherData = require('./components/scrapeWeatherData');
const fetchDataFromBackend = require('./components/backendDataFetcher');
const fetchDataFromBackendSchedule = require('./components/backendDataFetcher');
const fetchDataFromBackendDemandForecast = require('./components/backendDataFetcher');


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json('Welcome to my first scraping');
});


app.get('/weather', async (req, res) => {
    try {
        const weatherDetails = await scrapeWeatherData();
        res.json(weatherDetails);
    } catch (error) {
        console.error('Error scraping weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/* app.get('/backendData', async (req, res) => {
    try {
        // Fetch backend data from the backend server
        const backendData = await fetchDataFromBackend();
        
        // Serve the HTML file containing the chart with the fetched backend data
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'), { backendData });
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}); */


app.get('/backendData', async (req, res) => {
    try {
        // Fetch backend data from the backend server
        const backendData = await fetchDataFromBackend();
        
        // Serve the HTML file containing the chart with the fetched backend data
        res.sendFile(path.join(__dirname, 'public', 'employeeChart.html'), { backendData });
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}); 

app.get('/backendData/employees', async (req, res) => {
    try {
        // Fetch backend data from the backend server
        const backendData = await fetchDataFromBackend();
        res.sendFile(path.join(__dirname, 'public', 'employee.html'), { backendData });


    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/backendData/schedule', async (req, res) => {
    try {
        // Fetch backend data from the backend server
        const backendDataSchedule = await fetchDataFromBackendSchedule();
        
        // Serve the HTML file containing the chart with the fetched backend data
        res.sendFile(path.join(__dirname, 'public', 'schedule.html'), { backendDataSchedule });
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/backendData/demandForecast', async (req, res) => {
    try {
        // Fetch demand forecast data from the backend server
        const demandForecastData = await fetchDataFromBackendDemandForecast();
        
        // Serve the HTML file containing the demand forecast data
        res.sendFile(path.join(__dirname, 'public', 'demandForecast.html'),{demandForecastData});
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/backendData/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


app.get('/backendData/employeeManagement', async (req, res) => {
    try {
        // Fetch backend data from the backend server
        const backendData = await fetchDataFromBackend();
        res.sendFile(path.join(__dirname, 'public', 'employeeManagement.html'), { backendData });


    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/backendData/getDataSchedule', async (req, res) => {
    try {
        const backendData = await fetchDataFromBackendSchedule();
        res.sendFile(path.join(__dirname, 'public', 'schedule_test.html'), { backendData });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
