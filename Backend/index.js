import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/getData",(req,res)=>{
    const employees = ["John", "Jane", "Doe", "Alice", "Bob"]; // Example employee names, replace with actual data from your backend
    res.json(employees);
});

app.get("/getDataSchedule",(req,res)=>{
    const employees = ["John", "Jane", "Doe", "Alice", "Bob"]; // Example employee names, replace with actual data from your backend
    res.json(employees);
});

app.get("/chart", (req, res) => {
    // Render the HTML file containing the chart
    res.sendFile(path.join(__dirname, "public", "employeeChart.html"));
});

app.listen(4000, () => console.log(`backend app is running and sending stuff`));

