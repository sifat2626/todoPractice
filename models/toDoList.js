const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    name:{
        type:String,
    },
    todoSubject:{
        type:String,
        required:true,
        default:'subject'
    },
    todoDescription:{
        type:String,
        required:true,
        default:'description'
    },
    todoStatus:{
        type:String
    },
    todoCreateDate:{
        type:Date
    },
    todoUpdateDate:{
        type:Date
    },

},{versionKey:false});
const toDoListModel = mongoose.model("toDoList",dataSchema);
module.exports = toDoListModel;