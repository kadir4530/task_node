const express = require('express');
require('dotenv').config();

const app = express();

//express includes body-parser
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Test
app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to Todos API ...'});
})


// routes
const usersRouter = require('./routes/usersRouter');
const todosRouter = require('./routes/todosRouter');

app.use('/users',usersRouter);
app.use('/todos',todosRouter);




app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`)
})
