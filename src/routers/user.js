const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const router=new express.Router()
//Here we divide all the routers here we create the new router and work require it in the index file and use
//there using app.use we expoted the router made here and used it in the index file
router.post('/users',async(req,res)=>{
    
    const user= new User(req.body)
    const token=await user.generateAutoToken();
    try{
        await user.save()
        res.status(201).send({user,token})
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
        const token =await user.generateAutoToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e.message)
        console.log(e.message)
    }
})

router.post('/users/logout',auth,async (req,res)=>{///it will logout from a single device
try{
req.user.tokens=req.user.tokens.filter((token)=>{
return token.token != req.token
})

await req.user.save()
res.send('You have successfully logout')
}
catch(e){
res.status(501).send('error')
}
})

router.post('/users/logout-all',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send('You have successfully logged out from all devices')
    }catch(e){
            res.status(501).send('Error')
    }

})

router.get('/users/me',auth,async(req,res)=>{
res.send(req.user)
    // User.find({}).then((users)=>{
// res.send(users)
// }).catch((e)=>{
// res.status(500).send(e)
// })
})

    router.patch('/users/me',auth,async(req,res)=>{
       
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
           
           
            // const user = await User.findById(req.user.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()    
        res.send(req.user)
        }catch(e){
            res.status(400).send(e)//Status 400 means bad request validaator not followed
            
        }
    })

    router.delete('/users/me',auth,async (req,res)=>{
        try{
           await req.user.remove()
            res.send(req.user)
        }catch(e){
            res.status(500).send(e)
        }
    })



module.exports=router


