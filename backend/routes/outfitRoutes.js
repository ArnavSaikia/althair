const router = require('express').Router();

//for uploading a wardrobe to your list
router.post('/', uploadOutfit);

module.exports = router;