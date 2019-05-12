const request=require('supertest')
const app=require('../src/apptest')
test('Should sign up the user',async ()=>{
    await request(app).post('/users').send({
        name:'Ajay Bhatia',
        email:'bhatiaa746@gmail.com',
        password:'Happy head'
    }).expect(201)
})
