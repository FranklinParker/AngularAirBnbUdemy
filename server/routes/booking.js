const bookingController = require('../controllers/booking');
const express = require('express');
const userCtl = require('../controllers/user');

const router = express.Router();

router.post('', userCtl.authMiddleware, bookingController.createBooking);


module.exports = router;
