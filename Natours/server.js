const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
).replace('<DATABASE>', process.env.DATABASE_NAME);
mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log(`DB connection successful`);
  });

/*
//Needed below code for testing
const testTour = new Tour({
  name: 'The Ski Camper',
  price: 997,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => console.log('ERROR 💥💥', err));
  */
// console.log(app.get('env'));
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
