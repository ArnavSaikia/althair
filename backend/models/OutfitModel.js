const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, required:true},
    description: {type: String},
    items: [{type: mongoose.Schema.Types.ObjectId, ref: "Clothing"}],
}, {timestamps: true});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;