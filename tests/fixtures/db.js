const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=require('../../src/models/user')
const _id= new  mongoose.Types.ObjectId();
const userone={
    _id,
    name:'mike',
    password:'1223das@#$d',
    email:'mike@example.com',
    tokens:[{
        token:jwt.sign({_id},process.env.JWT_SECRET)
    }]
}

const setupDatabase=async()=>{
    await User.deleteMany();
    await new User(userone).save()
}
module.exports={
    _id,
    userone,
    setupDatabase
}