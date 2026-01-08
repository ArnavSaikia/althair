const verifyToken = require('../utils/verifyToken');
const Outfit = require('../models/OutfitModel');
const Clothing = require('../models/ClothingModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const uploadOutfit = async (req,res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(401).json({message: "User not logged in or invalid token"});

        const {name, description, referenceImage, canvasItems} = req.body;

        if (!name || !Array.isArray(canvasItems) || canvasItems.length === 0) {
            return res.status(400).json({
                message: "Outfit must have a name and at least one canvas item",
            });
        }

        const wardrobeSet = new Set(user.wardrobe.map(item => item.clothing.toString()));

        const anyInvalidItem = canvasItems.find( item => !wardrobeSet.has(item.clothingId?.toString()));
        if (anyInvalidItem){
            return res.status(403).json(
                {
                    message: "One or more items are not in your wardrobe",
                }
            )
        };

        const newOutfit = new Outfit({
            user: user._id,
            name,
            description,
            referenceImage,
            canvasItems,
        });

        const savedOutfit = await newOutfit.save();
        return res.status(201).json({ outfit: savedOutfit });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

const fetchOutfits = async (req,res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(401).json({message: "User not logged in or invalid token"});

        const ownOutfits = await Outfit.find({
            user: user._id
        })
        .sort({createdAt: -1})
        .populate("canvasItems.clothingId"); //this populate thingy here will open the items array and replace the id objects inside with the actual clothing object from the Clothing schema

        //redundant since i can just check array length on frontend but keeping for debugging
        // if(!ownOutfits) return res.status(404).json({message: "No Outfit found belonging to the user"});

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

const deleteOutfit = async (req, res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const id = req.params.id;
        const outfit = await Outfit.findOne({
            user: user._id,
            _id: id
        });

        if (!outfit) return res.status(404).json({message: `Outfit with ID ${id} nout found`});

        await Outfit.deleteOne({_id: id});
        res.status(200).json({ message: `Outfit ${outfit._id} successfully deleted` });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

// currently only allowing user to search their own outfit. this would need modification when i introduce public sharing of outfits
const searchOutfit = async (req, res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const {query} = req.query;

        const outfits = await Outfit.find({
            user: user._id,
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        }).populate("items");

        return res.status(200).json(outfits);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = {uploadOutfit , fetchOutfits, fetchSpecificOutfit, updateOutfit, deleteOutfit, searchOutfit};