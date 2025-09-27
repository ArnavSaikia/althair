const router = require('express').Router();
const {uploadOutfit , fetchOutfits} = require('../controllers/outfitController');

//for uploading a wardrobe to your list
router.post('/', uploadOutfit);

router.get('/', fetchOutfits);

module.exports = router;