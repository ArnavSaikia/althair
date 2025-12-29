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
    editorialNote: String,
    source: String,
    isCurated: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: ["men", "women", "unisex"]
    }
}, { timestamps: true });

const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;