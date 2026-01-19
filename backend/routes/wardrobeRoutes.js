const router = require('express').Router();
const upload = require('../utils/multer');
const { addClothingItem,fetchWardrobe,fetchItem,updateItem,deleteItem,searchClothingItems } = require('../controllers/wardrobeController');

router.post('/', upload.single('image'), addClothingItem);

router.get('/', fetchWardrobe);

router.get('/search', searchClothingItems);

router.get('/:id', fetchItem);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;
