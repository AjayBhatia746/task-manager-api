/*Mongoose fells into broader category f toools known as odm (object document member) its role its to map
the objects of our node js application with the document of mongodb collection.
Using mongo client we have done the crud operation but for some other operaions like validation etc we need mongoose

IN mongoose we define model to add the real world objects inour database

***Here I uses task-manager-api in the mongooose.coonect which is different from our data base name just to 
specify that it is of monggose


save function return the promises so we use .then and .catch

When we save the module and apply console.log on it we found __v also with our data that is specifying the version

** IF we write capital m in model than also error coming of object something

Here we have seen that collection name that i have entered and the collection name in the robo3t are different
actuaaly they are in lower case mongodb does that for us.

data sanitization is altering the data befor saving it for example remove the empty space etc.
data validation means that adding some properties on the data like age must be greater than 20 etc
for validation I can use the monggose validator provide like required min max etc or we can create our own validator
function where we define the type etc or we can use the npm module known as vaidator

using mongoose we ca easily customize the models
*/
const mongoose=require('mongoose')
const validator=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{useNewUrlParser:true,
useCreateIndex:true,
useFindAndModify:false // It is used to solve the decorate property
})


// const me = new User({
//     name:'Thor',
//     age:4000,
//    email:'abcde@jd.com',
//    password: 'passwrd234'
// })
// me.save().then(()=>{
// console.log(me);
// }).catch((error)=>{
// console.log('Error! ' + error)
// })

// const task=new Tasks({
//     description:'  Clean Room',
//   //  completed:true
// })
// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('Error ' + error)
// })