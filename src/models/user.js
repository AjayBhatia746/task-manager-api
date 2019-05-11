/* const user=mongoose.model('User',{})
using this line the values that will be passed in the object mongoose wll create the schema of that values
we can create our own schema too that we are going to do to setup the bcrypt for our passwords we are going to use the
middleware of the the mongoose that allows us to run the function before and after the update. Here one thing we found
that User.findByidAndUpdate() this syntax bypass this thus we have to change that one in the router user and task files

const userSchema=new mongoose.Schema({}) here we are creating new userschema({here we passesd the things that you
want in your database}) 
*/
const Task=require('../models/task')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0
    },
    password:{
        required:true,
        type:String,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password canot be your password')
            }
        }
        
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',//it means localfield that is user id is a relationship between user id and task collection's owner field
    foreignField:'owner'

})


userSchema.methods.toJSON= function(){
    const user=this
    const userObject=user.toObject();
    delete userObject.tokens
    delete userObject.password
    delete userObject.avatar
    return userObject
}
userSchema.methods.generateAutoToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials=async function(email,password){
const user=await User.findOne({email})

if(!user){
    throw new Error('Unable to login')
}
const ismatch=await bcrypt.compare(password,user.password)
if(!ismatch){
    throw new Error('Unable to login')
}
return user
}




//to bcrypt the password
userSchema.pre('save',async function(next){
    const user=this//It give s acces to individual user that about to be saved
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()//that mean we are done with the pre task that need to be done
    })


    // construct a middleware so that when user delete itself than alll the task related to it shoul be deleted
    userSchema.pre('remove',async function(next){
        const user=this
       await Task.deleteMany({owner:user._id})
        next()
    })

const User=mongoose.model('User',userSchema)

module.exports=User