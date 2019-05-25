const express=require('express')
require('./db/mongoose.js')
const User=require('./models/user')
const Task=require('./models/task')
const userrouter=require('./routers/user')
const taskrouter=require('./routers/task')
const app=express()


app.use(express.json())
app.use(userrouter)// to use the router for user create update delete
app.use(taskrouter)//to use the router for task create update delete
   
module.exports=app