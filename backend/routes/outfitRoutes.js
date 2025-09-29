const router = require('express').Router();
const {uploadOutfit , fetchOutfits, fetchSpecificOutfit, updateOutfit} = require('../controllers/outfitController');

//for uploading a wardrobe to your list
router.post('/', uploadOutfit);

router.get('/', fetchOutfits);

router.get('/:id', fetchSpecificOutfit);

router.put('/:id', updateOutfit);

module.exports = router;