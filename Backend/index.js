import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/getData",(req,res)=>{
    res.send("this is some data from backend");}
);

app.listen(4000, () => console.log(`backend app is running`));