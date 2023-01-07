const asyncHandler = require('express-async-handler');
const ToDoList = require('../models/toDoList');

const createToDo = asyncHandler (async(req,res)=>{
    const{user,name,todoSubject,todoDescription,todoStatus,todoCreateDate,todoUpdateDate} = req.body;
    //create 
    const toDo = await ToDoList.create({
        user:req.user.id,
        name:req.user.name,
        todoSubject,
        todoDescription,
        todoStatus:'new',
        todoCreateDate,
        todoUpdateDate
    }) 
    console.log(`========>${req.user.name}`)
    res.status(201).json(toDo)
})

module.exports = {
    createToDo,
}