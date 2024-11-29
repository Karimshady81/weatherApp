require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error('an error occurred', error))
db.once('open', () => console.log('connected to database'));


app.use(express.json());
app.use(express.static('public'));


const weatherRouter = require('./routes/weather');
app.use('/weather',weatherRouter);

//Activate the server
app.listen(3000, () => console.log('Server connected'));