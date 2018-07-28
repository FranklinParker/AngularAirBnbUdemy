const Rental = require('../models/rental');
const express = require('express');
const userCtl = require('../controllers/user');

const router = express.Router();

router.get('/secret', userCtl.authMiddleware, (req, res) => {
  res.json({'secret': true});
});


router.get('/:id', (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err, foundRental) {

      if (err) {
        return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
      }

      return res.json(foundRental);
    });

});


router.get('', (req, res) => {
  const city = req.query.city;
  const query = city ? {city : new RegExp(city, 'i')} : {};
  Rental.find(query)
    .select('-bookings')
    .exec(function(err, foundRentals) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (city && foundRentals.length === 0) {
        return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});
      }

      return res.json(foundRentals);
    });

});



router.post('',  userCtl.authMiddleware, (req, res) => {
  const rentalData = req.body;
  rentalData.user =  res.locals.user;
  rentalData.bookings  = [];
  console.log('rentalData', rentalData);
  const rental = new Rental(
    rentalData
  );
  rental.save(function(err, rental) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    return res.json(rental);
  });

});


module.exports = router;
