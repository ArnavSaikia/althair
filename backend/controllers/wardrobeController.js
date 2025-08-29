const verifyToken = require('../utils/verifyToken');
const Clothing = require('../models/ClothingModel');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const addClothingItem = async(req , res) =>{
    try{
        const user = await verifyToken(req);
        if(!user) return res.status(400).json({message: "User not logged in or invalid token"});

        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const userId = user._id;
        const {name,category,color,fit,size,additionalNotes} = req.body;
        const file = req.file;

        if (!file) return res.status(400).json({ message: "Image is required" });

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `clothing/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(params));

        const newClothing = new Clothing({
            user: userId,
            name,
            category,
            color: color || null,
            fit: fit || null,
            size: size || null,
            additionalNotes: additionalNotes || null,
            imageUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`
        });

        await newClothing.save();
        res.status(201).json({message: "Successfully Uploaded the Item", item: newClothing});
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {addClothingItem}