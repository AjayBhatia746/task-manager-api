const express=require('express')
const User=require('../models/user')
const router=new express.Router()
//Here we divide all the routers here we create the new router and work require it in the index file and use
//there using app.use we expoted the router made here and used it in the index file
router.post('/users',async(req,res)=>{
    
    const user= new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(500).send(e)
    }
    //previously it was written as this when done by the promise chaining
    // user.save().then(()=>{
    //     
    // }).catch((e)=>{
        
    //     res.status(400).send(e)

    // })

})
router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        
        res.send(user)
    }catch(e){
        res.status(400).send(e.message)
        console.log(e.message)
    }
})



router.get('/users',async(req,res)=>{
try{
    const user=await User.find({})
    res.send(user)
}
catch(e){
    res.status(500).send(e)
}
    // User.find({}).then((users)=>{
// res.send(users)
// }).catch((e)=>{
// res.status(500).send(e)
// })
})

router.get('/users/:id',async (req,res)=>{
    const _id=req.params.id
    console.log(_id)
    try{
        const userfindbyid= await User.findById(_id)
        if(!userfindbyid){
            return res.send('No user of this id')
        }
        res.send(userfindbyid)
    }catch(e){
        res.status(500).send(e)
    }
    
    })
    router.patch('/users/:id',async(req,res)=>{
        const _id=req.params.id
        const updates=Object.keys(req.body)//it will tell all the fiels that need to be updated by user
        const allowupdate=['name','age','email','password']
        const isvalidoperation=updates.every((update)=>allowupdate.includes(update)//this line will return true or
        //false that mean whether the property mentioned in the request actuaaly exist in the database or not
        )
        if(!isvalidoperation){
            return res.status(400).send('The property doesnt exist in your database')
        }
        try{
         //const user=await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})//New :true means that we get the new value of the user nad runvalidator help to apply all valdation on given data too)
        //    const user=await User.findByIdAndUpdate(_id) 
        //     updates.foreach((update)=>user[update]=req.body[update])
        //     await user.save()
           
           
            const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

           
            if(!user){
                return   res.status(404).send('No user of this Id') 
            }
            res.send(user)
        }catch(e){
            res.status(400).send(e)//Status 400 means bad request validaator not followed
            
        }
    })

    router.delete('/users/:id',async (req,res)=>{
        try{
            const user=await User.findByIdAndDelete(req.params.id)
            if(!user){
                return res.status(404).send('No user of this id exists');
            }
            res.send(user)
        }catch(e){
            res.status(500).send(e)
        }
    })



module.exports=router