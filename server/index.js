const express = require('express');
const mongoose = require('mongoose');
const rentalRoutes = require('./routes/rental');
const userRoutes = require('./routes/user');
const cors = require('cors');
const bodyParser = require('body-parser');

const {DB_URI} = require('./config');
const fakeDb = require('./fake-db');

const promiseLib = global.Promise;
mongoose.Promise = global.Promise;
const mongoDB = mongoose.connect(DB_URI, {
  promiseLibrary: promiseLib // Deprecation issue again
});

mongoDB.then(async function (db) {
  console.log('Mongodb has been connected ');
//  await fakeDb.seedDb();
}).catch(function (err) {
  console.log('Error while trying to connect with mongodb');
  throw err;
});

const app = express();
app.use(bodyParser.json());
//app.use(cors());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('I am running! on port:' + PORT);
});
