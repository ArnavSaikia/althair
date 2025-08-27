const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wardrobeSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    color: String,
    size: String,
    image: String,
}, { timestamps: true });