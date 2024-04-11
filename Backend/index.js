const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Sample initial employee data
let employees = [
    { id: 1, name: "John", shiftId: "Morning" },
    { id: 2, name: "Jane", shiftId: "Afternoon" },
    { id: 3, name: "Doe", shiftId: "Night" },
    { id: 4, name: "Alice", shiftId: "Morning" },
    { id: 5, name: "Bob", shiftId: "Afternoon" }
];

// Route to get updated employee data
app.get("/getUpdatedData", (req, res) => {
    res.json(employees);
});

// Route to get initial employee data
app.get("/getData", (req, res) => {
    res.json(employees);
});

// Route to get schedule data
app.get("/getDataSchedule", (req, res) => {
    // Assuming you have some schedule data
    const scheduleData = [
        { id: 1, name: "Jo", shiftId: "Morning" },
        { id: 2, name: "Jane", shiftId: "Afternoon" },
        { id: 3, name: "Doe", shiftId: "Night" },
        { id: 4, name: "Alice", shiftId: "Morning" },
        { id: 5, name: "Bob", shiftId: "Afternoon" },
        {id:1, name: "Brandon", shiftId: "Morning"}
    ];
    res.json(scheduleData);
});

// Route to serve the chart HTML file
app.get("/chart", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "employeeChart.html"));
});

// Route to get demand forecast data
app.get("/getDemandForecast", (req, res) => {
    const forecastData = ["Forecast 1", "Forecast 2", "Forecast 3", "Forecast 4", "Forecast 5"];
    res.json(forecastData);
});

// Route to update employee data
app.put("/updateData", (req, res) => {
    const updatedEmployee = req.body;

    // Find the index of the employee to update
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
        // Update the employee data
        employees[index] = updatedEmployee;
        res.json({ message: "Employee data updated successfully", updatedEmployee });
    } else {
        res.status(404).json({ error: "Employee not found" });
    }
});

app.listen(4000, () => console.log(`Backend app is running and serving data.`));
