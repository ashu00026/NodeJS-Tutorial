require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
//connect db
const connectDb= require('./db/connect')
//routers
const authRouter=require('./routes/auth')
const jobsRouter=require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(express.json());

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',jobsRouter)
// extra packages

// // routes
// app.get('/', (req, res) => {
//   res.send('jobs api<a href="/api/v1/auth/register">register</a>');
// });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
