const express = require('express');
const protect = require('../middlewares/auth');
const router = express.Router();
const {
    createTodo,
    selectTodo,
    updateTodo,
    updateTodoStatus,
    removeTodo,
    selectTodoByStatus,
    selectTodoByDate

} = require('../controllers/todoList');

router.post('/createTodo',protect,createTodo);
router.get('/selectTodo',protect,selectTodo);
router.post('/updateTodo',protect,updateTodo);
router.post('/updateTodoStatus',protect,updateTodoStatus); 
router.delete('/removeTodo',protect,removeTodo); 
router.get('/selectTodoByStatus',protect,selectTodoByStatus);
router.get('/selectTodoByDate',protect,selectTodoByDate);
module.exports = router;