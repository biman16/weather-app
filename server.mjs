// const express = require("express");
// const app = express();
// const PORT = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello from backend!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



// const express = require("express");
// const cors = require("cors");
// const fetch = require("node-fetch@2");


import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import connectDB from "./models/db.mjs";
import City from "./models/City.mjs";



const app = express();
const PORT = 3000;
await connectDB();

app.use(cors());

const API_KEY = "0852ed4e859e86f2737c470d0088d2d1"; // Use your key

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }







  //  try {
   //  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


// const response = await fetch(apiUrl);
// const data = await response.json();

// if (!response.ok) {
//   console.error("Weather API error:", data);
//   return res.status(response.status).json({ error: data.message || "API error" });
// }
// console.log("Data received from API:", data);

// res.json(data);

//   } catch (error) {
//     console.error("Error in backend:", error);
//     res.status(500).json({ error: "Failed to fetch weather data" });
//   }





try {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  console.log("Requesting:", apiUrl); // log the full URL

  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log("API response:", data); // log what the API sent back

  if (response.ok) {
    
    
    
try {
  const cityName = city.toLowerCase();

  // Check if city already exists in DB
  const existingCity = await City.findOne({ name: cityName });

  if (!existingCity) {
    await City.create({ name: cityName });
    console.log(`✅ City saved to DB: ${cityName}`);
  } else {
    console.log(`ℹ️ City already in DB: ${cityName}`);
  }
} catch (dbError) {
  console.error("❌ Failed to save city:", dbError.message);
}




    res.json(data); // send data to frontend
  } else {
    res.status(response.status).json({ error: data.message || "Weather API error" });
  }
} catch (error) {
  console.error("Backend fetch error:", error);
  res.status(500).json({ error: "Backend server error" });
}


  });





  app.get("/history", async (req, res) => {
  try {
    const cities = await City.find().sort({ createdAt: -1 }); // latest first
    const cityNames = cities.map(c => c.name); // just send names
    res.json(cityNames);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch search history" });
  }
});




app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

