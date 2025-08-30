const router = require('express').Router();
const upload = require('../utils/multer');
const { addClothingItem , fetchWardrobe , fetchItem, updateItem, deleteItem} = require('../controllers/wardrobeController');

router.post('/add', upload.single('image'), addClothingItem);

router.get('/', fetchWardrobe);

router.get('/:id', fetchItem);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;