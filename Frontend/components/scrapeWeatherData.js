const axios = require('axios');
const cheerio = require('cheerio');

const scrapeWeatherData = async () => {
    try {
        const response = await axios.get('https://www.timeanddate.com/weather/@1880272/hourly');
        const html = response.data;
        const $ = cheerio.load(html);

        const weatherDetails = [];

        const weatherDiv = $('div.row.pdflexi').html();

        const regex = /<th>(.*?)<\/th><td class="wt-ic"><img class="mtt" title="(.*?)" src="(.*?)" width=".*?" height=".*?"><\/td><td>(.*?)<\/td><td class="small">(.*?)<\/td><td class="sep">(.*?)<\/td><td>(.*?)<\/td><td><span class="comp sa\d+" title=".*?">↑<\/span><\/td><td>(.*?)<\/td><td class="sep">(.*?)<\/td><td>(.*?)<\/td>/g;

        let match;
        while ((match = regex.exec(weatherDiv)) !== null) {
            const [
                time,
                weatherCondition,
                weatherIcon,
                temperature,
                description,
                feelsLike,
                wind,
                humidity,
                precipitationChance,
                precipitationAmount
            ] = match.slice(1);

            weatherDetails.push({
                time,
                weatherCondition,
                weatherIcon,
                temperature,
                description,
                feelsLike,
                wind,
                humidity,
                precipitationChance,
                precipitationAmount
            });
        }

        return weatherDetails;
    } catch (error) {
        throw error;
    }
};

module.exports = scrapeWeatherData;
