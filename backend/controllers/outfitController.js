const verifyToken = require('../utils/verifyToken');
const Outfit = require('../models/OutfitModel');
const Clothing = require('../models/ClothingModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const uploadOutfit = async (req, res) => {
    try {
        const user = await verifyToken(req);
        if (!user) {
            return res.status(401).json({ message: "User not logged in or invalid token" });
        }

        const { name, description } = req.body;

        // canvasItems comes as STRING in multipart/form-data
        let canvasItems;
        try {
            canvasItems = JSON.parse(req.body.canvasItems);
        } catch {
            return res.status(400).json({ message: "Invalid canvasItems format" });
        }

        if (!name || !Array.isArray(canvasItems) || canvasItems.length === 0) {
            return res.status(400).json({
                message: "Outfit must have a name and at least one canvas item",
            });
        }

        // Validate wardrobe ownership
        const wardrobeSet = new Set(
            user.wardrobe.map(item => item.clothing.toString())
        );

        const invalidItem = canvasItems.find(
            item => !wardrobeSet.has(item.clothingId?.toString())
        );

        if (invalidItem) {
            return res.status(403).json({
                message: "One or more items are not in your wardrobe",
            });
        }

        // Handle reference image (optional)
        const file = req.file;

        let referenceImageUrl = null;

        if (file) {
            const s3 = new S3Client({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            });

            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `outfits/reference/${Date.now()}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            await s3.send(new PutObjectCommand(params));

            referenceImageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        }

        const newOutfit = new Outfit({
            user: user._id,
            name,
            description: description || null,
            referenceImage: referenceImageUrl,
            canvasItems,
        });

        const savedOutfit = await newOutfit.save();
        return res.status(201).json({ outfit: savedOutfit });

    } catch (err) {
        return res.status(500).json({ message: err.message });
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
        }).populate("canvasItems.clothingId");

        if (!outfit) return res.status(404).json({message: `Outfit with ID ${id} not found`});

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
        const { name, description, referenceImage, canvasItems } = req.body;

        if (!Array.isArray(canvasItems) || canvasItems.length === 0) {
            return res.status(400).json({
                message: "Canvas items are required to update an outfit",
            });
        }

        const outfit = await Outfit.findOne({
            user: user._id,
            _id: id
        });
        
        if(!outfit) res.status(404).json({message: `Outfit with ID ${id} nout found`});

        const wardrobeSet = new Set(
            user.wardrobe.map(entry => entry.clothing.toString())
        );

        const invalidItem = canvasItems.find(
            item => !wardrobeSet.has(item.clothingId?.toString())
        );

        if (invalidItem) {
            return res.status(403).json({
                message: "One or more canvas items are not in your wardrobe",
            });
        }

        if (name !== undefined) outfit.name = name;
        if (description !== undefined) outfit.description = description;
        if (referenceImage !== undefined) outfit.referenceImage = referenceImage;

        outfit.canvasItems = canvasItems;

        const updatedOutfit = await outfit.save();

        return res.status(200).json({
            message: "Outfit updated successfully",
            outfit: updatedOutfit,
        });
    }
    catch(err){
        return res.status(500).json({message: err.message})
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

        if (!outfit) return res.status(404).json({message: `Outfit with ID ${id} not found`});

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

        if (!query || !query.trim()) {
            return res.status(400).json({
                message: "Search query is required",
            });
        }

        const outfits = await Outfit.find({
            user: user._id,
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        }).sort({ updatedAt: -1 })
        .populate("canvasItems.clothingId");    //might remove populate later. added for now because user may not have uploaded a preview/referenceImage

        return res.status(200).json(outfits);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = {uploadOutfit , fetchOutfits, fetchSpecificOutfit, updateOutfit, deleteOutfit, searchOutfit};