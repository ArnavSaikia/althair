const router = require('express').Router();
const upload = require('../utils/multer');
const { addClothingItem,fetchWardrobe,fetchItem,updateItem,deleteItem,searchClothingItems, addCuratedToWardrobe, uploadCuratedClothing } = require('../controllers/wardrobeController');

router.post('/', upload.single('image'), addClothingItem);

router.get('/', fetchWardrobe);

//admin only route
router.post('/upload-curated', upload.single('image'), uploadCuratedClothing);

router.post('/add-curated/:id', addCuratedToWardrobe);

router.get('/search', searchClothingItems); //not implemented on frontend yet

router.get('/:id', fetchItem);

router.put('/:id', updateItem); //not implemented on frontend yet

router.delete('/:id', deleteItem);  //not implemented on frontend yet

module.exports = router;
