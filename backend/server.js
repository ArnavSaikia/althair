const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(3000 , console.log("Server up on 3000")))
.catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

// Users Section
const userRoutes = require('./routes/userRoutes')

app.use('/users' , userRoutes);

//Wardrobe Section
const wardrobeRoutes = require('./routes/wardrobeRoutes')

app.use('/wardrobe', wardrobeRoutes);

//Outfit Section
const outfitRoutes = require('./routes/outfitRoutes');

app.use('/outfits', outfitRoutes);
