const router = require('express').Router();
const {registerUser , loginUser , logoutUser , fetchUserDetails} = require('../controllers/userController')

router.post('/register' , registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser)

router.get('/profile', fetchUserDetails);

module.exports = router;