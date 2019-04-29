const express=require('express')
const Task=require('../models/task')
const routertask=new express.Router()


routertask.get('/task',async(req,res)=>{
        
    try{
        const task=await Task.find({})
            res.send(task)
    }catch(e){
            res.status(500).send(e)
    }
})
routertask.get('/task/:id',async(req,res)=>{
const _id=req.params.id
try{
    const task=await Task.findById(_id)
    if(!task){
      return  res.status(404).send('Sorry No task')
    }
    res.send(task)
}catch(e){
    res.status(500).send(e)
}
})


routertask.patch('/task/:id',async(req,res)=>{
const _id=req.params.id
const update =Object.keys(req.body)
const allowupdate=['description','completed']
const isvalidoperation=update.every((update)=>allowupdate.includes(update))
if(!isvalidoperation){
return res.status(400).send('No such field in the table')
}
try{
//const updatetask=await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
const updatetask=await Task.findById(_id)
update.forEach((update)=>updatetask[update]=req.body[update])
updatetask.save()//Here middleware save
if(!updatetask){
return res.status(400).send('No element')
}
res.send(updatetask)
}catch(e){
res.status(500).send(e)
}
})

//delete task
routertask.delete('/task/:id',async(req,res)=>{
try{
    const task=await Task.findByIdAndDelete(req.params.id)
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