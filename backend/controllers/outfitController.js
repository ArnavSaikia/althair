const verifyToken = require('../utils/verifyToken');
const Outfit = require('../models/OutfitModel');
const Clothing = require('../models/ClothingModel');
const mongoose = require('mongoose');

const uploadOutfit = async (req,res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const {name, description, items} = req.body;

        if (!name || !items || !Array.isArray(items) || items.length == 0){
            return res.status(400).json({message: "An outfit must have a name and at least one clothing item"});
        }

        const clothingItems = await Clothing.find({
            _id: { $in: items.map(id => new mongoose.Types.ObjectId(id)) },
            user: new mongoose.Types.ObjectId(user._id)
        });
        console.log(clothingItems);
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
};

const fetchOutfits = async (req,res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const ownOutfits = await Outfit.find({
            user: user._id
        }).populate('items'); //this populate thingy here will open the items array and replace the id objects inside with the actual clothing object from the Clothing schema

        if(!ownOutfits) return res.status(404).json({message: "No Outfit found belonging to the user"});

        return res.status(200).json({outfits: ownOutfits});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

//kinda seems like a redundant route cuz i can prolly use the route above this and pass it down to specific pages on the frontend
//might deprecate later
const fetchSpecificOutfit = async (req, res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const id = req.params.id;
        const outfit = await Outfit.findOne({
            user: user._id,
            _id: id
        }).populate('items');

        if (!outfit) return res.status(404).json({message: `Outfit with ID ${id} nout found`});

        return res.status(200).json({outfit});
    }

    catch(err){
        res.status(500).json({message: err.message});
    }
};

const updateOutfit = async (req, res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const id = req.params.id;
        const {name, description, items} = req.body;

        const outfit = await Outfit.findOne({
            user: user._id,
            _id: id
        }).populate('items');
        
        if(!outfit) res.status(404).json({message: `Outfit with ID ${id} nout found`});

        if(name) outfit.name = name;
        if(description) outfit.description = description;

        if (items && Array.isArray(items) && items.length > 0){
            const clothingItems = await Clothing.find({
                _id: { $in: items.map((id) => new mongoose.Types.ObjectId(id))},
                user: new mongoose.Types.ObjectId(user._id),
            });

            if (clothingItems.length !== items.length) return res.status(403).json({message: "Trying to update with items not in ur wardrobe"});

            outfit.items = items;
        }

        const updatedOutfit = await outfit.save();

        res.status(200).json({
        message: `Outfit ${outfit._id} updated successfully`,
        outfit: updatedOutfit,
        });
    }

    catch(err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {uploadOutfit , fetchOutfits, fetchSpecificOutfit, updateOutfit};