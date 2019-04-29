const express=require('express')
require('./db/mongoose.js')
const User=require('./models/user')
const Task=require('./models/task')
const userrouter=require('./routers/user')
const taskrouter=require('./routers/task')
const app=express()
const port=process.env.PORT||3000


app.use(express.json())
app.use(userrouter)// to use the router for user create update delete
app.use(taskrouter)//to use the router for task create update delete
   

app.listen(port,()=>{
    console.log('Server is on the port: ' + port)
})
// For providing security to our code we uses the hash function.Difference between hash and encrypt is that
// we can convert the encrypted code back into the plane text. But for hash if we convert it into hash code than we can't convert
//it the hashing technique that I have used here is bcyrpt 

// const bcrypt= require('bcrypt')
// const my_functon=async()=>{
// const password='Hello'
// const bcryptpassword=await bcrypt.hash(password,8)//uses await here because it return promise
// console.log(password)
// console.log(bcryptpassword)
// const ismatch=await bcrypt.compare('Hello',bcryptpassword)
// console.log(ismatch)
// }
// my_functon()