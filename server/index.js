const express = require('express');
const mongoose = require('mongoose');
const dbUri = require('./config/dev').dbUri;
const fakeDb = require('./fake-db');

fakeDb.pushRentalsToDB();

const promiseLib = global.Promise;
mongoose.Promise = global.Promise;
const mongoDB = mongoose.connect(dbUri, {
  promiseLibrary: promiseLib // Deprecation issue again
});

mongoDB.then(function (db) {
    console.log('Mongodb has been connected ');
  }).catch(function (err) {
  console.log('Error while trying to connect with mongodb');
  throw err;
});

const app = express();

app.get('/rentals', (req, res)=>{
  res.json({ success: true});

});



const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
  console.log('I am running! on port:' + PORT);
});
