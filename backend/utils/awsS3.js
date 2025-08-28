require('dotenv').config();
const { S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// const uploadToS3 = async (fileBuffer , FilterRuleName, mimeType) => {
//     const params = {
//         Bucket: process.env.S3_BUCKET_NAME,
//         Key: FilterRuleName,
//         Body: fileBuffer,
//         ContentType: mimeType,
//     }

//     try{
//         await s3.send(new PutObjectCommand(params));
//         console.log("Upload Successful");
//     }
//     catch(err) {
//         console.log(err);
//     }
// }

module.exports = { s3 , PutObjectCommand};