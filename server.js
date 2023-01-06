const express = require('express');
const app = express();
const {readdirSync} = require('fs');
const path = require('path');
const helmet = require('helmet');
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require('./middlewares/errorMiddleware');

//middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes middleware
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

//error middlewares
app.use(errorHandler);

//server
const Port = process.env.PORT||8000;

//connect db to start server
mongoose.connect(process.env.DATABASE)
    .then(()=>{
        app.listen(Port,()=> console.log(`server running on port ${Port}`))
    })
