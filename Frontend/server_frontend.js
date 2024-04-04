const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const fetchStaffCounts = require('./components/script.js/fetchStaffCounts');
const fetchDemandForecast = require('./components/fetchDemandForecast');
const fetchStaffSchedule = require('./components/fetchStaffSchedule');
const fetchEstimatedCost = require('./components/fetchEstimatedCost');
const fetchEmployees = require('./components/fetchEmployees');


// Serve the HTML file and static assets
app.use(express.static(path.join(__dirname, 'public')));

app.get('/staff-counts', async (req, res) => {
  try {
    const staffCounts = await fetchStaffCounts();
    res.json(staffCounts);
  } catch (error) {
    console.error('Error fetching staff counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/demand-forecast', async (req, res) => {
  try {
    const demandForecast = await fetchDemandForecast();
    res.json(demandForecast);
  } catch (error) {
    console.error('Error fetching demand forecast data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/staff-schedule', async (req, res) => {
  try {
    const staffSchedule = await fetchStaffSchedule();
    res.json(staffSchedule);
  } catch (error) {
    console.error('Error fetching staff schedule data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/estimated-cost', async (req, res) => {
  try {
    const estimatedCost = await fetchEstimatedCost();
    res.json(estimatedCost);
  } catch (error) {
    console.error('Error fetching estimated cost data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await fetchEmployees();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employee data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
