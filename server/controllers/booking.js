const Booking = require('../models/booking');
const {normalizeErrors} = require('../helpers/mongoose');


module.exports.createBooking =  (req, res)=>{
  const bookingData = req.body;
  const booking = new Booking(
    bookingData
  );
  res.json({createdBooking: 'ok'});

}
