const request=require('supertest')
const app=require('../src/apptest')
const User=require('../src/models/user')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
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
beforeEach(async()=>{
await User.deleteMany();
await new User(userone).save()
})
test('Should sign up the user',async ()=>{
    const response=await request(app).post('/users').send({
        name:'Ajay Bhatia',
        email:'bhatiaa746@gmail.com',
        password:'Happy head'
    }).expect(201)

    //Assert the database was chaanged correctly or not
    const user=await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    //assertions about the response
    expect(response.body).toMatchObject({
        user:{
            name:'Ajay Bhatia',
        email:'bhatiaa746@gmail.com'
        },
        token:user.tokens[0].token
    })

})
test('Check login',async()=>{
const response=await request(app).post('/users/login').send({
    email:userone.email,
    password:userone.password
}).expect(200)
const user=await User.findById(userone._id)
expect(response.body.token).toBe(user.tokens[1].token)
})

test('Checking login for bad inputs',async()=>{
await request(app).post('/user/login').send({
  email:'iudgqiwhd@kjsjdnas',
  password:'ewdqkdkwqkn'  
}).expect(404)
})

test('Checking the user me',async()=>{
    await request(app).get('/users/me')
    .set('Authorization','Bearer '+userone.tokens[0].token)
    .send()
    .expect(200)

})
test('Checking the unauthorised user',async()=>{
    await request(app).get('/users/me')
    // .set('Authorization','Bearer '+userone.tokens[0].token)
    .send()
    .expect(401)
})
test('to delete the login user',async()=>{
const response=await request(app).delete('/users/me')
.set('Authorization','Bearer '+userone.tokens[0].token)
.send().expect(200)
const user=await User.findById(userone._id)
expect(user).toBeNull()
})
test('to check deleting the unauthorised user',async()=>{
await request(app).delete('/users/me')
.send().expect(401)
})
