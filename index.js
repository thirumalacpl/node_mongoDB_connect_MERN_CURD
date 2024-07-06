
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());


mongoose.Promise = global.Promise;
//using mongodb
mongoose.connect('mongodb://localhost:27017/mean-app')
.then(()=>{
        console.log("db connected");
})
.catch((err)=> {
        console.log(err)
})


//creating schema
const todoSchema = new mongoose.Schema({
        title: {
                required: true,
                type: String
        },
        description: String
})

//creating model
const todoModel = mongoose.model('Todo', todoSchema)


//Insert record in mongodb
app.use(express.json());
app.post('/todos', async(req, res) => {
       const {title,description} = req.body;
        try {
                const newTodo = new todoModel({title, description});
                await newTodo.save();   
                res.status(201).json(newTodo)
        } catch (error) {
                console.log(error);
                res.status(500).json(error)
        }   
})


//get all record from mongodb
app.get('/todos', async(req,res)=> {
        try {
                const todos = await todoModel.find();    
                res.json(todos) 
        } catch (error) {
                console.log(error);
                res.status(500).json(error)
        }
})

const port = 3001;
app.listen(port, () => {
        console.log("Server listening")
})






//old code for later reference
//local variable
// let todos = [];
// app.use(express.json());
// app.post('/todos', (req, res) => {
//         const { title, description } = req.body;
//         const newTodo = {
//                 id: todos.length + 1,
//                 title,
//                 description
//         };
//         todos.push(newTodo);
//         console.log(todos);
//         res.status(201).json(newTodo)
// })