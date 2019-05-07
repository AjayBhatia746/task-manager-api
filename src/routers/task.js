const express=require('express')
const Task=require('../models/task')
const auth=require('../middleware/auth')
const routertask=new express.Router()

routertask.post('/task',auth,async(req,res)=>{
    const task=new Task({
        ...req.body,//...es6 spread operator
        owner:req.user.id
    }) 
    try{
         await task.save()
        res.send(task)
    }catch(e){
            res.status(500).send(e)
    }
})



routertask.get('/task',auth,async(req,res)=>{
        
    try{
        //const task=await Task.find({owner:req.user._id})
         await req.user.populate('tasks').execPopulate()//above or this work same 
        res.send(req.user.tasks)
    }catch(e){
            res.status(500).send(e.message)
    }
})


routertask.get('/task/:id',auth,async(req,res)=>{
const _id=req.params.id
try{
    const task=await Task.findOne({_id,owner:req.user._id})
    if(!task){
      return  res.status(404).send('Sorry No task')
    }
    res.send(task)
}catch(e){
    res.status(500).send(e)
}
})


routertask.patch('/task/:id',auth,async(req,res)=>{
const _id=req.params.id
const update =Object.keys(req.body)
const allowupdate=['description','completed']
const isvalidoperation=update.every((update)=>allowupdate.includes(update))
if(!isvalidoperation){
return res.status(400).send('No such field in the table')
}
try{
//const updatetask=await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
const updatetask=await Task.findOne({_id,owner:req.user._id})

if(!updatetask){
return res.status(400).send('No element')
}
update.forEach((update)=>updatetask[update]=req.body[update])
updatetask.save()//Here middleware save

res.send(updatetask)
}catch(e){
res.status(500).send(e)
}
})

//delete task
routertask.delete('/task/:id',auth,async(req,res)=>{
try{
    const _id=req.params.id
    const task=await Task.findOneAndDelete({_id,owner:req.user._id})
    if(!task){
   return  res.status(400).send('No task exist of this id')
    }
    res.send(task)

}
catch(e){
    res.status(500).send(e)
}
})


module.exports=routertask