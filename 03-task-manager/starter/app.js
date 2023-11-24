const express= require('express');
const app=express();
const tasks= require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks',tasks)



const PORT =3000;

const start= async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(3000,console.log(`Server is listening at port ${PORT}...`))
    }
    catch(error){
        console.log(error)
    }
}

start()