const Rental = require('../models/rental');
const User = require('../models/user');
const express = require('express');
const userCtl = require('../controllers/user');
const {normalizeErrors} = require('../helpers/mongoose');


const router = express.Router();

router.get('/secret', userCtl.authMiddleware, (req, res) => {
  res.json({'secret': true});
});


router.get('/manage', userCtl.authMiddleware, function (req, res) {
  const user = res.locals.user;

  Rental
    .where({user})
    .populate('bookings')
    .exec(function (err, foundRentals) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json(foundRentals);
    });
});


router.get('/:id/verify-user', userCtl.authMiddleware, function (req, res) {
  const user = res.locals.user;

  Rental
    .findById(req.params.id)
    .populate('user')
    .exec(function (err, foundRental) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      }


      return res.json({ verified: true});
    });
});

router.get('/:id', (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function (err, foundRental) {

      if (err) {
        return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
      }

      return res.json(foundRental);
    });

});


router.get('', (req, res) => {
  const city = req.query.city;
  const query = city ? {city: new RegExp(city, 'i')} : {};
  Rental.find(query)
    .select('-bookings')
    .exec(function (err, foundRentals) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (city && foundRentals.length === 0) {
        return res.status(422).send({
          errors: [{
            title: 'No Rentals Found!',
            detail: `There are no rentals for city ${city}`
          }]
        });
      }

      return res.json(foundRentals);
    });

});


router.post('', userCtl.authMiddleware, function (req, res) {
  const {title, city, street, category, image, shared, bedrooms, description, dailyRate} = req.body;
  const user = res.locals.user;

  const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate});
  rental.user = user;

  Rental.create(rental, function (err, newRental) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    User.update({_id: user.id}, {$push: {rentals: newRental}}, function () {
    });

    return res.json(newRental);
  });
});




router.delete('/:id', userCtl.authMiddleware, function (req, res) {
  const user = res.locals.user;

  Rental
    .findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: {startAt: {$gt: new Date()}}
    })
    .exec(function (err, foundRental) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      }

      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: [{
            title: 'Active Bookings!',
            detail: 'Cannot delete rental with active bookings!'
          }]
        });
      }

      foundRental.remove(function (err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.json({'status': 'deleted'});
      });
    });
});

router.patch('/:id', userCtl.authMiddleware, function (req, res) {
  const user = res.locals.user;
  const rentalData = req.body;

  Rental
    .findById(req.params.id)
    .populate('user', '_id')
    .exec(function (err, foundRental) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      }

      foundRental.set(rentalData);

      foundRental.save((err, updatedRental) => {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        return res.status(200).send(updatedRental);
      });


    });
});


module.exports = router;
