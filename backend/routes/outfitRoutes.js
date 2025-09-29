const router = require('express').Router();
const {uploadOutfit , fetchOutfits, fetchSpecificOutfit, updateOutfit, deleteOutfit} = require('../controllers/outfitController');

//for uploading a wardrobe to your list
router.post('/', uploadOutfit);

router.get('/', fetchOutfits);

router.get('/:id', fetchSpecificOutfit);

router.put('/:id', updateOutfit);

router.delete('/:id', deleteOutfit);

module.exports = router;