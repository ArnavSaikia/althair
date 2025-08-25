const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(3000 , console.log("Server up on 3000")))
.catch((err) => console.log(err));

app.use(express.json());

// Users Section
const userRoutes = require('./routes/userRoutes')

app.use('/users' , userRoutes);
