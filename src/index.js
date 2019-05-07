const express=require('express')
require('./db/mongoose.js')
const User=require('./models/user')
const Task=require('./models/task')
const userrouter=require('./routers/user')
const taskrouter=require('./routers/task')
const app=express()
const port=process.env.PORT||3000

// app.use((req,res,next)=>{//It is middleware function
//     return res.status(503).send('All requestes are disabled')
// //next() means now the routers code can run
// })
app.use(express.json())
app.use(userrouter)// to use the router for user create update delete
app.use(taskrouter)//to use the router for task create update delete
   

app.listen(port,()=>{
    console.log('Server is on the port: ' + port)
})


// const main=async function(){
//     // const task=await Task.findById('5cd136b617249832004f597c')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user=await User.findById('5cd1342d088cba32f0fc40f9')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()