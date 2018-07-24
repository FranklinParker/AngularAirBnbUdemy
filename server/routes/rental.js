const Rental = require('../models/rental');
const express = require('express');
const userCtl = require('../controllers/user');

const router = express.Router();

router.get('/secret', userCtl.authMiddleware, (req,res)=>{
 res.json({'secret': true});
});

router.get('', (req,res)=>{
  Rental.find({}, function (err, rentals) {
    res.json(rentals);
  });

});

router.get('/:id', (req,res)=>{
  const id = req.params.id;
  Rental.findById(id, function (err, rental) {
    if(err){
      res.status(422).send({ errors: [{ title: 'Rental Errors!', detail: ' Could not Find Rental'}]})

    }else {
      res.json(rental);
    }
  });

});

module.exports = router;
