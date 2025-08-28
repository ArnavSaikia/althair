const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    color: String,
    fit: String,
    size: String,
    additionalNotes: String,
    imageUrl: String,
}, { timestamps: true });

const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;