const Rental = require('../models/rental');
const express = require('express');

const router = express.Router();

router.get('', (req,res)=>{
  Rental.find({}, function (err, rentals) {
    res.json(rentals);
  });

});

router.get('/:id', (req,res)=>{
  const id = req.params.id;
  Rental.findById(id, function (err, rentals) {
    res.json(rentals);
  });

});

module.exports = router;
