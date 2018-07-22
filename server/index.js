const express = require('express');
const mongoose = require('mongoose');
const rentalRoutes = require('./routes/rental');

const dbUri = require('./config/dev').dbUri;
const fakeDb = require('./fake-db');

const promiseLib = global.Promise;
mongoose.Promise = global.Promise;
const mongoDB = mongoose.connect(dbUri, {
  promiseLibrary: promiseLib // Deprecation issue again
});

mongoDB.then(async function (db) {
    console.log('Mongodb has been connected ');
    //await fakeDb.seedDB();
  }).catch(function (err) {
  console.log('Error while trying to connect with mongodb');
  throw err;
});

const app = express();

app.use('/api/v1/rentals',rentalRoutes );

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
  console.log('I am running! on port:' + PORT);
});
