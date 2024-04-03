const axios = require('axios');
const cheerio = require('cheerio');

// It's good practice to put URLs and selectors into constants
const WEATHER_URL = 'https://www.timeanddate.com/weather/@1880272/hourly';
const WEATHER_DIV_SELECTOR = 'div.row.pdflexi';

const scrapeWeatherData = async () => {
    try {
        const response = await axios.get(WEATHER_URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const weatherDetails = [];

        // Use a more specific selector to ensure you're targeting the right element
        const weatherDiv = $(WEATHER_DIV_SELECTOR).html();
        
        // Add more descriptive names to the regex groups
        const weatherDataRegex = /.../; // Your existing regex pattern

        // Process data with cheerio instead of regex when possible
        // It is usually more reliable than regex for HTML content parsing

        $(WEATHER_DIV_SELECTOR).each((index, element) => {
            // use $(element).find() to locate specific data within the div
            // This can be more readable and maintainable than using regex
            // Extract and push data into weatherDetails array
        });

        return weatherDetails;
    } catch (error) {
        console.error('Error scraping weather data:', error.message);
        // Handle errors according to the expected behavior in the application
        return []; // Return an empty array as an indication of no data
    }
};

module.exports = scrapeWeatherData;
