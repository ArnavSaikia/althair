const verifyToken = require('../utils/verifyToken');
const Clothing = require('../models/ClothingModel');
const Outfit = require('../models/OutfitModel');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// for the route POST /wardrobe/add
//using form data here. might need to change later
//this func is intended only for user uploads. I intend to add curated items directly from mongo and aws dashboard
const addClothingItem = async(req , res) =>{
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const userId = user._id;
        const { name, category, color, fit, size, additionalNotes } = req.body;

        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const file = req.file;

        if (!file) return res.status(400).json({ message: "Image is required" });

        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `clothing/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(params));

        const newClothing = new Clothing({
            name,
            category,
            color: color || null,
            fit: fit || null,
            size: size || null,
            additionalNotes: additionalNotes || null,
            imageUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
            source: "users",
            isCurated: false,
        });

        await newClothing.save();

        user.wardrobe.push({ clothing: newClothing._id });
        await user.save();

        res.status(201).json({message: "Successfully Uploaded the Item", item: newClothing});
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
}

//only adds the curated clothing reference to the user's wardrobe field
const addCuratedToWardrobe = async (req,res) => {
    try {
        const user = await verifyToken(req);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const clothing = await Clothing.findById(req.params.id);
        if (!clothing || !clothing.isCurated) {
            return res.status(404).json({ message: "Curated item not found" });
        }

        const alreadyExists = user.wardrobe.some(w =>
            w.clothing.equals(clothing._id)
        );

        if (alreadyExists) {
            return res.status(400).json({ message: "Already in wardrobe" });
        }

        user.wardrobe.push({ clothing: clothing._id });
        await user.save();

        res.status(200).json({ message: "Added to wardrobe" });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};


// for the route GET /wardrobe
const fetchWardrobe = async (req,res) => {
    try {
        const user = await verifyToken(req);
        if(!user) return res.status(401).json({message: "User not logged in or invalid token"});

        const populatedUser = await user.populate("wardrobe.clothing");
        res.status(200).json(populatedUser.wardrobe.map(wEntry => wEntry.clothing));    //might add pagination here if scale grows
    }

    catch(err) {
        res.status(500).json({message: err.message});
    }

};

const fetchCurated = async (req,res) => {
    try{
        const { gender } = req.query;

        const filters = { isCurated: true };
        if (gender) filters.gender = gender;

        const items = await Clothing.find(filters);
        res.status(200).json(items);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
};

const fetchItem = async (req,res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(401).json({message: "User not logged in or invalid token"});

        const _id = req.params.id;
        const item = await Clothing.findOne({_id});

        if(!item) {
            res.status(404).json({message: `No item found with ID ${_id}`});
            return;
        }
        
        if(item.isCurated) {
            res.status(200).json(item);
            return;
        }

        const itemOwnedFlag = user.wardrobe.some(entry => entry.clothing.equals(item._id));

        if(!itemOwnedFlag){
            res.status(403).json({message: "clothing not in user's wardrobe"});
            return;
        }

        const presentIn = await Outfit.find({
            user: user._id,
            "canvasItem.clothingId": item._id
        })
        // .populate('canvasItem.clothingId'); not quite sure if we need to populate here since we already have src for the canvasItems

        const itemObj = item.toObject();
        itemObj.presentIn = presentIn;
        res.status(200).json(itemObj);
    }

    catch(err) {
        res.status(500).json({message: err.message});
    }
}

const updateItem = async (req, res) => {
    try {
        const user = await verifyToken(req);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const clothing = await Clothing.findById(req.params.id);
        if (!clothing || clothing.isCurated) {
            return res.status(403).json({ message: "Cannot modify curated item" });
        }

        const ownsItem = user.wardrobe.some(w =>
            w.clothing.equals(clothing._id)
        );

        if (!ownsItem) {
            return res.status(403).json({ message: "Not in your wardrobe" });
        }

        const allowed = ["name", "category", "color", "fit", "size", "additionalNotes"];
        allowed.forEach(field => {
            if (req.body[field] !== undefined) clothing[field] = req.body[field];
        });

        await clothing.save();
        res.status(200).json(clothing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//for now this func is strictly for deleting user's own uploaded items. DO NOT ATTEMPT to use it on a webscraped item
//possible soln i can think of rn: creating a new folder in s3 for web scraped items and adding a guard in this func to not touch that folder
const deleteItem = async (req,res) => {
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const { id } = req.params;

        const clothing = await Clothing.findById(id);
        if (!clothing) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check if item exists in user's wardrobe
        const inWardrobe = user.wardrobe.some(entry =>
            entry.clothing.equals(clothing._id)
        );

        if (!inWardrobe) {
            return res.status(403).json({ message: "Item is not in your wardrobe" });
        }

        // curated item
        if (clothing.isCurated) {
            user.wardrobe = user.wardrobe.filter(
                entry => !entry.clothing.equals(clothing._id)
            );

            await user.save();

            return res.status(200).json({
                message: "Removed curated item from your wardrobe"
            });
        }

        //user's own item
        // Remove from user's wardrobe first
        user.wardrobe = user.wardrobe.filter(
            entry => !entry.clothing.equals(clothing._id)
        );
        await user.save();

        // Delete from S3
        const urlParts = clothing.imageUrl.split("/");
        const keyIndex = urlParts.findIndex(part => part === "clothing");
        const s3Key = urlParts.slice(keyIndex).join("/");

        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: s3Key,
            })
        );

        // Finally delete the Clothing document
        await Clothing.deleteOne({ _id: clothing._id });

        res.status(200).json({
            message: "Deleted clothing item and its image"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//using query params instead of body params cuz this is going to be a GET request
//on the front end probably should implemnent blocks for each param in the search box. name being the default value of the box with params being the sub boxes
const searchClothingItems = async (req, res) => {
    try {
        const user = await verifyToken(req);
        if (!user) {
            return res.status(401).json({ message: "User not logged in or invalid token" });
        }

        const { q } = req.query;

        // If no query provided, just return full wardrobe
        const populatedUser = await user.populate("wardrobe.clothing");
        const wardrobeIds = populatedUser.wardrobe.map(entry => entry.clothing._id);

        if (!q) {
            const allItems = await Clothing.find({ _id: { $in: wardrobeIds } });
            return res.status(200).json({ items: allItems });
        }

        const regex = { $regex: q, $options: "i" };

        const items = await Clothing.find({
            _id: { $in: wardrobeIds },
            $or: [
                { name: regex },
                { category: regex },
                { color: regex },
                { fit: regex },
                { size: regex },
                { additionalNotes: regex }
            ]
        });

        res.status(200).json({ items });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//admin only for 
//only for adding curated outfits
const addCuratedClothing = async (req, res) => {
    try{
        if (process.env.ENABLE_CURATED_UPLOAD !== "true") {
            return res.status(404).json({ message: "NOT IN ADMIN ENVIRONMENT"});
        }

        const { name, category, color, fit, size, additionalNotes, gender} = req.body;

        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const file = req.file;

        if (!file) return res.status(400).json({ message: "Image is required" });

        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `clothing/curated/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(params));

        const newClothing = new Clothing({
            name,
            category,
            color: color || null,
            fit: fit || null,
            size: size || null,
            additionalNotes: additionalNotes || null,
            imageUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
            source: "curated",
            isCurated: true,
            gender: gender || null,
        });

        await newClothing.save();

        res.status(201).json({ message: "Successfully Uploaded the Item", item: newClothing });
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {addClothingItem , addCuratedToWardrobe, fetchWardrobe , fetchItem, fetchCurated, updateItem, deleteItem, searchClothingItems};