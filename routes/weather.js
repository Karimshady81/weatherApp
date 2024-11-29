require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = process.env.BASE_URL

router.get('/', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(404).json({ message: 'City required' });
    }

    try {
        //Fetch the city LON & LAT
        const geoResponse = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
            params: {
                q: city,
                limit: 1,
                appid: OPENWEATHER_API_KEY
            }
        }); 

        if (geoResponse.data.response === 0) {
            return res.json({ message: 'city not found' });
        }  

        const { lat, lon } = geoResponse.data[0];
        console.log(`Coordinates for ${city}: LAT=${lat}, LON=${lon}`);

        //Fetch the weather data 
        const weatherResponse = await axios.get(`${BASE_URL}/data/2.5/weather`, {
            params: {
                lat,
                lon,
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
        })
        console.log(weatherResponse.data)
        res.status(200).json(weatherResponse.data)
    }
    catch (err) { 
        res.status(404).json({ message: err.message });
    }
});

module.exports = router