const request=require('supertest')
const app=require('../src/apptest')
const Task=require('../src/models/task')
const {_id,userone,setupDatabase}=require('./fixtures/db')
beforeEach(setupDatabase)
test('Should create task for the user',async()=>{
const response=request(app).
                post('/task')
                .set('Authorization',`${userone.tokens[0].token}`)
                .send({description:'USer task'})
                .expect(201)
              
})