const express = require('express');
const router = express.Router();
const {
    registerUser,
    userLogin
} = require('../controllers/user')




router.post('/createUser',registerUser);
router.get('/login',userLogin);
module.exports = router;