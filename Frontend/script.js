//a server file to test out and view the webpage 
//start server from console with command node script.js and webpage will be available on http://localhost:8080

const path = require('path');
const express = require('express')
const { readFile } = require('fs');
const app = express();

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, "project.html"))
});

app.get('/style.css', (request, responseC) => {
    responseC.sendFile(path.join(__dirname, "style.css"))
});

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.listen(process.env.PORT || 8080, () => console.log('App availible on http://localhost:8080'))

// replace with actual counts
const fullTimeCount = 8;
const partTimeCount = 2;

// Update the content with actual counts
document.getElementById('full-time-count').innerText = fullTimeCount;
document.getElementById('part-time-count').innerText = partTimeCount;