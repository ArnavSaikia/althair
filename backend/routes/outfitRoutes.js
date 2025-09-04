const router = require('express').Router();
const uploadOutfit = require('../controllers/outfitController');

//for uploading a wardrobe to your list
router.post('/', uploadOutfit);

module.exports = router;