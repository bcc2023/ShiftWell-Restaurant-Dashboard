import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const employees = [
    { id: 1, name: "John", shiftId: "Morning" },
    { id: 2, name: "Jane", shiftId: "Afternoon" },
    { id: 3, name: "Doe", shiftId: "Night" },
    { id: 4, name: "Alice", shiftId: "Morning" },
    { id: 5, name: "Bob", shiftId: "Afternoon" }
]; 

app.get("/getData",(req,res)=>{
    // Example employee data, replace with actual data from your backend
    
    res.json(employees);
});

app.get("/getDataSchedule",(req,res)=>{
    const employees = [
        { id: 1, name: "John", shiftId: "Morning" },
        { id: 2, name: "Jane", shiftId: "Afternoon" },
        { id: 3, name: "Doe", shiftId: "Night" },
        { id: 4, name: "Alice", shiftId: "Morning" },
        { id: 5, name: "Bob", shiftId: "Afternoon" }
    ]; // Example employee names, replace with actual data from your backend
    res.json(employees);
});

app.get("/chart", (req, res) => {
    // Render the HTML file containing the chart
    res.sendFile(path.join(__dirname, "public", "employeeChart.html"));
});

app.get("/getDemandForecast", (req, res) => {
    const forecastData = ["Forecast 1", "Forecast 2", "Forecast 3", "Forecast 4", "Forecast 5"]; // Example demand forecast data, replace with actual data from your backend
    res.json(forecastData);
});

// Endpoint to update employee data
app.put("/updateData", (req, res) => {
    const updatedEmployee = req.body; // Assuming the request body contains the updated employee data

    // Find the index of the employee to update
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
        // Update the employee data
        employees[index] = updatedEmployee;
        res.json({ message: "Employee data updated successfully" });
    } else {
        res.status(404).json({ error: "Employee not found" });
    }
});

app.listen(4000, () => console.log(`backend app is running and sending stuff`));

