const asyncHandler = require('express-async-handler');
const { findById } = require('../models/todoList');
const todoListModel = require('../models/todoList');


const createTodo = asyncHandler (async(req,res)=>{
    const{user,name,todoSubject,todoDescription,todoStatus,todoCreateDate,todoUpdateDate} = req.body;
    //create 
    const todo = await todoListModel.create({
        user:req.user.id,
        userName:req.user.userName,
        todoSubject,
        todoDescription,
        todoStatus:'new',
        todoCreateDate:Date.now(),
        todoUpdateDate:Date.now()
    }) 
    res.status(201).json(todo)
})
const selectTodo = asyncHandler(async (req,res)=>{
    let username = req.headers["username"];
    let toDo = await todoListModel.find({userName:username})
    if(toDo)
    {
        res.status(200).json(toDo)
    }
})

const updateTodo = asyncHandler(async(req,res)=>{
    let todo = await todoListModel.findOne({_id:req.body._id});
    if(await todo.userName !== req.user.userName)
    {
        res.status(400);
        throw new Error("this is not your list!");
    }
    const{
        todoSubject,
        todoDescription,
    } = todo;
    todo.todoSubject = req.body.todoSubject || todoSubject;
    todo.todoDescription = req.body.todoDescription || todoDescription;
    todo.todoUpdateDate = Date.now();
    const updatedTodo = await todo.save();
    res.json({updatedTodo})
})
    
exports.UpdateStatusTodo = (req,res)=>{
    let id = req.body["_id"];
    let toDoStatus = req.body["TodoStatus"];
    let toDoUpdateDate = Date.now();

    let PostBody = {
        TodoStatus: toDoStatus,
        ToDoUpdateDate:toDoUpdateDate

    };
    toDoListModel.updateOne({_id:id},{$set:PostBody},{upsert:true},(error,data)=>{

        if (error) {
            res.status(400).json({status: "failed", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    });
};
exports.RemoveTodo = (req,res)=>{
    let id = req.body["_id"];
    toDoListModel.remove({_id:id},(error,data)=>{

        if (error) {
            res.status(400).json({status: "failed", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    });
};
exports.SelectTodoByStatus = (req,res)=>{
    let status = req.body["TodoStatus"];
    toDoListModel.find({TodoStatus:status},(error,data)=>{
        if (error) {
            res.status(400).json({status: "fail", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    })
};
exports.SelectTodoByDate = (req,res)=>{
    let fromDate = req.body["FromDate"]  ;
    let toDate = req.body["ToDate"]  ;
    toDoListModel.find({TodoCreateDate: {$gte: new Date(fromDate),$lte: new Date(toDate)}},(error,data)=>{
        if (error) {
            res.status(400).json({status: "fail", data: error});
        } else {
            res.status(200).json({status: "success", data: data});
        }
    })
};

module.exports = {
    createTodo,
    selectTodo,
    updateTodo
}
//je req dicche tar user id = jei product er id deya hoise tar user id
//1. product er id diye user id ber korte hobe