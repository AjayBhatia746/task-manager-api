/* const user=mongoose.model('User',{})
using this line the values that will be passed in the object mongoose wll create the schema of that values
we can create our own schema too that we are going to do to setup the bcrypt for our passwords we are going to use the
middleware of the the mongoose that allows us to run the function before and after the update. Here one thing we found
that User.findByidAndUpdate() this syntax bypass this thus we have to change that one in the router user and task files

const userSchema=new mongoose.Schema({}) here we are creating new userschema({here we passesd the things that you
want in your database}) 
*/
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
    }
})

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

const user=mongoose.model('User',userSchema)

module.exports=user