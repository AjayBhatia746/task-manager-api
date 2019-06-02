const express=require('express')
const Task=require('../models/task')
const auth=require('../middleware/auth')
const routertask=new express.Router()
const multer=require('multer')
const sharp=require('sharp')

const upload=multer({
     limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            cb(new Error('Please upload the image only'))
        }
        cb(undefined,true)
    }
})
routertask.post('/task',auth,upload.single('upload'),async(req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({height:250,width:250}).png().toBuffer()
    const task=new Task({
        ...req.body,//...es6 spread operator
        owner:req.user.id,
        avatar:buffer
    }) 
    try{
         await task.save()
        res.send(task)
    }catch(e){
            res.status(500).send(e)
    }
},(error,req,res,next)=>{
    res.status(500).send({
        error:error.message
})
})



//here if we wan to get specific task like completed =true than we add parameters to query
//GET/task?completed=true
//GET/task?limit=4&skip=10
//GET/task?sortBy=createdAt desc
routertask.get('/task',auth,async(req,res)=>{
        const match={}
            const sort={}
        if(req.query.completed){
            match.completed=req.query.completed==='true'//if i did n't use the===true than it will return the true but that is string not boolean
        }
        if(req.query.sortBy){
            const parts=req.query.sortBy.split(':')
            sort[parts[0]]=parts[1]==='desc'?-1:1
            
        }
        
    try{
        //const task=await Task.find({owner:req.user._id})
         await req.user.populate({path:'tasks',
         match,
         options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort 
         }
                
        }).execPopulate()//above or this work same 
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