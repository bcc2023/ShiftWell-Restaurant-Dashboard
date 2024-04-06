import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/getData",(req,res)=>{
    const employees = [
        { id: 1, name: "John", shiftId: "Morning" },
        { id: 2, name: "Jane", shiftId: "Afternoon" },
        { id: 3, name: "Doe", shiftId: "Night" },
        { id: 4, name: "Alice", shiftId: "Morning" },
        { id: 5, name: "Bob", shiftId: "Afternoon" }
    ]; // Example employee data, replace with actual data from your backend
    
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

app.listen(4000, () => console.log(`backend app is running and sending stuff`));

