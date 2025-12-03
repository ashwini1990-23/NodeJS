const express = require('express');
const morgan = require('morgan');
const { dirname } = require('path');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// 1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// Creating our own middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware ');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
/*
app.get('/', (req, res) => {
  // res.status(200).send('Hello from the server side!!');
  res
    .status(200)
    .json({ message: 'Hello from the server side!!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send(`You can post to this end point....`);
});
*/

// GET
// app.get('/api/v1/tours', getAllTours);

// GET with id
// app.get('/api/v1/tours/:id', getTour);

// POST
// app.post('/api/v1/tours', createTour);

// PATCH
// app.patch('/api/v1/tours/:id', updateTour);

// DELETE
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
