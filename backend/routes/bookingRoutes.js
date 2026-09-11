const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');


const validateBookingInput = (req, res, next) => {
    
    const { user_id, movie_id, date, cinema, theaterName, time, selectedSeats, totalPrice, type_payment } = req.body;

    if (!user_id || !movie_id || !date || !cinema || !theaterName || !time || !selectedSeats || selectedSeats.length === 0 || !totalPrice || !type_payment) {
        return res.status(400).json({ error: 'Missing required booking information.' });
    }
    if (isNaN(parseInt(user_id)) || isNaN(parseInt(movie_id)) || isNaN(parseFloat(totalPrice))) {
        return res.status(400).json({ error: 'Invalid numeric values for user_id, movie_id, or totalPrice.' });
    }
    next();
};


//Route Post for booking
router.post('/', validateBookingInput, bookingController.createBooking); 



module.exports = router;