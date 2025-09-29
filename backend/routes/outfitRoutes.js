const router = require('express').Router();
const {uploadOutfit , fetchOutfits, fetchSpecificOutfit} = require('../controllers/outfitController');

//for uploading a wardrobe to your list
router.post('/', uploadOutfit);

router.get('/', fetchOutfits);

router.get('/:id', fetchSpecificOutfit);

module.exports = router;