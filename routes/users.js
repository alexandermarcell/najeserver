const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    registerUser, 
    loginUser, 
    logOutUser, 
    logOutAll, 
    getMe 
} = require('../controllers/userController');



router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', auth, logOutUser);

router.post('/logoutAll', auth, logOutAll);

router.get('/me', auth, getMe);


module.exports = router;