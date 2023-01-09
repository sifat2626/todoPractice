const express = require('express');
const protect = require('../middlewares/auth');
const router = express.Router();
const {
    createTodo,
    selectTodo,
    updateTodo

} = require('../controllers/todoList');

router.post('/createTodo',protect,createTodo);
router.get('/selectTodo',protect,selectTodo);
router.post('/updateTodo',protect,updateTodo);
module.exports = router;