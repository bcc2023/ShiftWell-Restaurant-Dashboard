const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const scrapeWeatherData = async () => {
    try {
        const response = await axios.get('https://www.timeanddate.com/weather/@1880272/ext');
        const html = response.data;
        const $ = cheerio.load(html);

        const weatherDetails = [];
        const weatherDiv = $('div.row.pdflexi').html();
        const regex = /<th>(.*?)<\/th><td class="wt-ic"><img class="mtt" title="(.*?)" src="(.*?)" width=".*?" height=".*?"><\/td><td>(.*?)<\/td><td class="small">(.*?)<\/td><td class="sep">(.*?)<\/td><td>(.*?)<\/td><td><span class="comp sa\d+" title=".*?">↑<\/span><\/td><td>(.*?)<\/td><td class="sep">(.*?)<\/td><td>(.*?)<\/td>/g;

        let match;
        while ((match = regex.exec(weatherDiv)) !== null) {
            const [
                day,
                weatherCondition,
                weatherIcon,
                temperature,
                description,
                feelsLike,
                wind,
                humidity,
                precipitationChance,
                precipitationAmount,
                uv,
                sunrise,
                sunset
            ] = match.slice(1);

            weatherDetails.push({
                day,
                weatherCondition,
                weatherIcon,
                temperature,
                description,
                feelsLike,
                wind,
                humidity,
                precipitationChance,
                precipitationAmount,
                uv,
                sunrise,
                sunset
            });
        }

        // Save to a JSON file
        fs.writeFileSync('next_7_day.json', JSON.stringify(weatherDetails, null, 2));
        
        return weatherDetails;
    } catch (error) {
        console.error('Failed to scrape data:', error);
        throw error;
    }
};

scrapeWeatherData();
