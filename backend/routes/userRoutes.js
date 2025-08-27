const router = require('express').Router();
const {registerUser , loginUser , logoutUser , fetchUserDetails, updateUserDetails, deleteProfile} = require('../controllers/userController')

router.post('/register' , registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser)

router.get('/profile', fetchUserDetails);

router.put('/update-profile', updateUserDetails);

router.delete('/delete-profile', deleteProfile);

//need to add a 404 handler at the last here

module.exports = router;