const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = 8000;
const app = express();

// Import scraping logic
const scrapeWeatherData = require('./components/scrapeWeatherData');

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

app.get()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
