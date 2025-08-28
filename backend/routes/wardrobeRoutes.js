const router = require('express').Router();
const upload = require('../utils/multer');
const { addClothingItem } = require('../controllers/wardrobeController');

router.post('/add', upload.single('image'), addClothingItem);

module.exports = router;