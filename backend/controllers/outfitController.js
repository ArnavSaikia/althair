const verifyToken = require('../utils/verifyToken');
const Outfit = require('../models/OutfitModel');
const Clothing = require('../models/ClothingModel');

const uploadOutfit = async (req,res) => {
    try{
        const user = verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const {name, description, items} = req.body;

        if (!name || !items || !Array.isArray(items) || items.length == 0){
            return res.status(400).json({message: "An outfit must have a name and atleast one clothing item"});
        }

        const clothingItems = await Clothing.find({ _id: { $in: items}, user: user._id});
        if (clothingItems.length !== items.length) return res.status(403).json({message: "One or more of the items are not present in the user's wardrobe"});

        const newOutfit = new Outfit({
            user: user._id,
            name,
            description,
            items
        });

        const savedOutfit = await newOutfit.save();

        res.status(201).json({
            message: "Outfit created successfully",
            outfit: savedOutfit
        });
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
}

module.exports = uploadOutfit;