const express = require('express');
const router = express.Router();
const {
    registerUser,
    userLogin,
    logout
} = require('../controllers/user')




router.post('/createUser',registerUser);
router.get('/login',userLogin);
router.post('/logout',logout);
module.exports = router;