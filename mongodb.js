// //CRUD (create read update delete)
// const mongodb= require('mongodb')//it iss a native driver
// const MongoClient=mongodb.MongoClient
const{MongoClient,ObjectId}=require('mongodb')//another ways using destructuring

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='Task-Manager'
// const id = new ObjectId()//here new is completely optional but generally we write it
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
if(error){
    return console.log("Error is there");
}
const db=client.db(databaseName)

db.collection('users').deleteMany({age:35}).then((result)=>{
    console.log(result + " Items deleted")
}).catch((error)=>{
  console.log(error)  
})
})