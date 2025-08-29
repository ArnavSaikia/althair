const router = require('express').Router();
const upload = require('../utils/multer');
const { addClothingItem , fetchWardrobe } = require('../controllers/wardrobeController');

router.post('/add', upload.single('image'), addClothingItem);

router.get('/', fetchWardrobe);

module.exports = router;