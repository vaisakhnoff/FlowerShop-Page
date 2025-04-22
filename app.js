const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const  dotenv = require('dotenv');
const db = require('./config/db')

dotenv.config();
const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());  

db();


// app.use('/',user);

app.listen(process.env.PORT,()=>{
    console.log("server running 3500");
    
})

