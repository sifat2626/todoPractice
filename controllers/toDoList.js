const asyncHandler = require("express-async-handler");
const { findById } = require("../models/todoList");
const todoListModel = require("../models/todoList");

const createTodo = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    todoSubject,
    todoDescription,
    todoStatus,
    todoCreateDate,
    todoUpdateDate,
  } = req.body;
  //create
  const todo = await todoListModel.create({
    user: req.user.id,
    userName: req.user.userName,
    todoSubject,
    todoDescription,
    todoStatus: "new",
    todoCreateDate: Date.now(),
    todoUpdateDate: Date.now(),
  });
  res.status(201).json(todo);
});
const selectTodo = asyncHandler(async (req, res) => {
  let username = req.headers["username"];
  let toDo = await todoListModel.find({ userName: username });
  if (toDo) {
    res.status(200).json(toDo);
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  let todo = await todoListModel.findOne({ _id: req.body._id });
  if ((await todo.userName) !== req.user.userName) {
    res.status(400);
    throw new Error("this is not your list!");
  }
  let { todoSubject, todoDescription, todoUpdateDate } = todo;
  todo.todoSubject = req.body.todoSubject || todoSubject;
  todo.todoDescription = req.body.todoDescription || todoDescription;
  todo.todoUpdateDate = Date.now();
  const updatedTodo = await todo.save();
  res.json({ updatedTodo });
});
const updateTodoStatus = asyncHandler(async (req, res) => {
  let todo = await todoListModel.findOne({ _id: req.body._id });
  if ((await todo.userName) !== req.user.userName) {
    res.status(400);
    throw new Error("this is not your list!");
  }
  let { todoStatus } = todo;
  todo.todoStatus = req.body.todoStatus || todoStatus;
  const updatedTodo = await todo.save();
  res.json({ updatedTodo });
});

const removeTodo = asyncHandler(async (req,res)=>{
    let todo = await todoListModel.findOne({ _id: req.body._id });
    if ((await todo.userName) !== req.user.userName) {
    res.status(400);
    throw new Error("this is not your list!");
  }
    const deleteTodo = await todoListModel.findOneAndDelete(todo);
    res.json({message:"list removed successfully!"})
})
const selectTodoByStatus = asyncHandler (async (req,res)=>{
    let status = req.body.todoStatus;
    const _id = req.user.id;
    const selectedTodo = await todoListModel.find({todoStatus:status,user:_id})
    console.log(selectedTodo);
    if(!selectedTodo)
    {
        res.status(400);
        throw new Error("no list found with this status");
    }
    res.json({selectedTodo})
})
const selectTodoByDate = asyncHandler (async (req,res)=>{
    let {fromDate} = req.body;
    let {toDate} = req.body;
    const _id = req.user.id;
    const selectedTodo = await todoListModel.find({todoCreateDate:{$gte: new Date(fromDate),$lte:new Date(toDate)},user:_id})
    if(!selectedTodo)
    {
        res.status(400);
        throw new Error("no list found with this date");
    }
    res.json({selectedTodo})
})

module.exports = {
  createTodo,
  selectTodo,
  updateTodo,
  updateTodoStatus,
  removeTodo,
  selectTodoByStatus,
  selectTodoByDate
};
//je req dicche tar user id = jei product er id deya hoise tar user id
//1. product er id diye user id ber korte hobe
