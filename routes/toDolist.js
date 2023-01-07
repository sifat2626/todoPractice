const express = require('express');
const protect = require('../middlewares/auth');
const router = express.Router();
const {
    createToDo,

} = require('../controllers/toDoList');

router.post('/createToDo',protect,createToDo);
module.exports = router;