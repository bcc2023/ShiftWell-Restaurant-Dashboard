const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = 8000;
const app = express();

// Import component logic
const scrapeWeatherData = require('./components/scrapeWeatherData');
const fetchDataFromBackend = require('./components/backendDataFetcher');

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



app.get('/backendData', async (req, res) => {
    try {
        const backendData = await fetchDataFromBackend();
        res.json(backendData);
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
