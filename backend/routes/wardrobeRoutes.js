const router = require('express').Router();
const upload = require('../utils/multer');
const { addClothingItem , fetchWardrobe , fetchItem} = require('../controllers/wardrobeController');

router.post('/add', upload.single('image'), addClothingItem);

router.get('/', fetchWardrobe);

router.get('/:id', fetchItem);

module.exports = router;