const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const canvasItemSchema = new Schema(
    {
        clothingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothing",
        },

        src: String,
        type: String,

        canvasId: String,

        x: Number,
        y: Number,

        scale: Number,
        normalizedScale: Number,

        zIndex: Number,

        xCenter: Number,
        yCenter: Number,
    },
    { _id: false }
)

const outfitSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, required:true},
    description: {type: String},
    referenceImage: {type: String},
    editorialNote: {type: String},
    canvasItems: [canvasItemSchema]
}, {timestamps: true});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;