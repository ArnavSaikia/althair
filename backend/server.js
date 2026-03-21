const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(PORT , console.log(`Server up on ${PORT}`)))
.catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

// Users Section
const userRoutes = require('./routes/userRoutes')

app.use('/users' , userRoutes);

//Wardrobe Section
const wardrobeRoutes = require('./routes/wardrobeRoutes')

app.use('/wardrobe', wardrobeRoutes);

//Outfit Section
const outfitRoutes = require('./routes/outfitRoutes');

app.use('/outfits', outfitRoutes);
