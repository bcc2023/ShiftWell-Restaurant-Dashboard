const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const PORT = 8000;
/* const BACKEND_PORT = 4000;  */
const app = express();

// Import component logic

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


app.get('/dashboard', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'Dashboard.html'));
    } catch (error) {
        console.error('Error serving Dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/dashboard/schedule', async (req, res) => {
    try {
        /* // Fetch backend data from the backend server
        const backendDataSchedule = await fetchDataFromBackendSchedule(); */
        res.sendFile(path.join(__dirname, 'public', 'schedule.html'));
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/dashboard/demandForecast', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'demandForecast.html'));
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/dashboard/employeeManagement', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'employeeManagement.html'));
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/logout', async (req, res) => {
    res.json('You have been logged out');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
