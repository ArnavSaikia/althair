const multer = require('multer'); //middleware

const storage = multer.memoryStorage(); //storing the image file in RAM here temporarily
const upload = multer({storage});   //object instancse of a multer object with storing in RAM setting enabled

module.exports = upload;