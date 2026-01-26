const router = require('express').Router();
const upload = require('../utils/multer');
const {uploadOutfit , fetchOutfits, fetchSpecificOutfit, updateOutfit, deleteOutfit, searchOutfit} = require('../controllers/outfitController');

//for uploading a wardrobe to your list
router.post('/', upload.single('referenceImage') , uploadOutfit);

router.get('/', fetchOutfits);

router.get('/search', searchOutfit);

router.get('/:id', fetchSpecificOutfit);

router.put('/:id', updateOutfit);

router.delete('/:id', deleteOutfit);

module.exports = router;