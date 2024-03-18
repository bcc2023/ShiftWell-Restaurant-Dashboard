const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const info = []

app.get('/', (req,res) => {
    res.json('welcome to my first scraping')
})

app.get('/weather', (req,res) => {
    axios.get('https://www.timeanddate.com/weather/@1880272/hourly')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            const weatherDiv = $('div.row.pdflexi').html(); // Selecting the div with class 'row pdflexi'

            // Further breakdown of weatherDiv
            const regex = /<th>(.*?)<\/th><td class="wt-ic"><img class="mtt" title="(.*?)" src="(.*?)" width=".*?" height=".*?"><\/td><td>(.*?)<\/td><td class="small">(.*?)<\/td><td class="sep">(.*?)<\/td><td>(.*?)<\/td><td><span class="comp sa\d+" title=".*?">↑<\/span><\/td><td>(.*?)<\/td><td class="sep">(.*?)<\/td><td>(.*?)<\/td>/g;
            const weatherDetails = [];
            let match;
            while ((match = regex.exec(weatherDiv)) !== null) {
                const time = match[1];
                const weatherCondition = match[2];
                const weatherIcon = match[3];
                const temperature = match[4];
                const description = match[5];
                const feelsLike = match[6];
                const wind = match[7];
                const humidity = match[8];
                const precipitationChance = match[9];
                const precipitationAmount = match[10];

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

            res.json(weatherDetails); 
        }).catch((err) => console.log(err))
});
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
