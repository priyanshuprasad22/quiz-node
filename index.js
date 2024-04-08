const express = require('express');
const dotenv=require('dotenv');
const cors = require('cors');
const path = require('path');

const notfound= require('./middleware/notfound.js');
const routes = require('./routes/question.js');

const app=express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());



app.use('/api/quiz',routes);

app.use(notfound);

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

// app.use('/',(req,res)=>{
//     res.status(200).send('Hello');
// })

app.listen( PORT , ()=>{
    console.log(`The application is listening to port ${PORT}`);
});